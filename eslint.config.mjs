import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import requireApiHandler from "./eslint-rules/require-apihandler.mjs";

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
      reportUnusedDisableDirectives: false,
    },
  },

  // ✅ API route rules
  {
    files: ["app/api/**/*.{ts,tsx}"],

    // ✅ Flat config plugin definition (ESM-safe)
    plugins: {
      local: {
        rules: {
          "require-apihandler": requireApiHandler,
        },
      },
    },

    rules: {
      // 🚫 Ban fetchQuery
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "convex/nextjs",
              importNames: ["fetchQuery"],
              message:
                "Do not use fetchQuery in API routes. Use ctx.convex.query via apiHandler.",
            },
          ],
        },
      ],

      // ✅ Enforce apiHandler usage
      "local/require-apihandler": "error",
    },
  },

  {
    files: ["convex/auth/adapter.ts", "convex/zod/zod.ts"],
    rules: {
      "no-restricted-imports": "off",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;