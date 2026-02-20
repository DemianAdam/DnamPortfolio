import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["*/_generated/server"],
              importNames: ["query", "mutation", "action"],
              message:
                "Use zQuery/zMutation/zAction from convex/zod/zod.ts instead",
            },
          ],
        },
      ],
    },
    linterOptions: {
      reportUnusedDisableDirectives: false
    }
  },
  {
    files: ["convex/auth/adapter.ts","convex/zod/zod.ts"],
    rules: {
      "no-restricted-imports": "off"
    }
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
