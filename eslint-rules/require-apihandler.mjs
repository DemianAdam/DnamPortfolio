const requireApiHandler = {
  meta: {
    type: "problem",
    docs: {
      description: "Require apiHandler for API route handlers",
    },
    schema: [],
    messages: {
      mustUseApiHandler:
        "API route handlers (GET, POST, etc.) must be defined using apiHandler(...).",
      missingImport:
        "apiHandler must be imported when defining API route handlers.",
    },
  },

  create(context) {
    const filename = context.getFilename();

    if (!filename.includes("/app/api/")) {
      return {};
    }

    const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

    let hasApiHandlerImport = false;
    let foundInvalidHandler = false;

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        if (typeof source === "string" && source.includes("apiHandler")) {
          const hasImport = node.specifiers.some(
            (s) =>
              s.type === "ImportSpecifier" &&
              s.imported.name === "apiHandler"
          );

          if (hasImport) {
            hasApiHandlerImport = true;
          }
        }
      },

      ExportNamedDeclaration(node) {
        const decl = node.declaration;

        if (!decl || decl.type !== "VariableDeclaration") return;

        for (const d of decl.declarations) {
          if (d.id.type !== "Identifier") continue;

          const name = d.id.name;

          if (!HTTP_METHODS.includes(name)) continue;

          const init = d.init;

          const isApiHandlerCall =
            init &&
            init.type === "CallExpression" &&
            (
              (init.callee.type === "Identifier" &&
                init.callee.name === "apiHandler") ||
              (init.callee.type === "MemberExpression" &&
                init.callee.property.type === "Identifier" &&
                init.callee.property.name === "apiHandler")
            );

          if (!isApiHandlerCall) {
            foundInvalidHandler = true;

            context.report({
              node: d,
              messageId: "mustUseApiHandler",
            });
          }
        }
      },

      "Program:exit"() {
        if (foundInvalidHandler && !hasApiHandlerImport) {
          context.report({
            loc: { line: 1, column: 0 },
            messageId: "missingImport",
          });
        }
      },
    };
  },
};

export default requireApiHandler;