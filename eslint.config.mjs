  import { dirname } from "path";
  import { fileURLToPath } from "url";
  import { FlatCompat } from "@eslint/eslintrc";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const compat = new FlatCompat({
    baseDirectory: __dirname,
  });

  const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      // biar unused vars bisa diabaikan pakai prefix "_"
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // biar "any" nggak bikin error
      "@typescript-eslint/no-explicit-any": "off",
      // biar Function type nggak error
      "@typescript-eslint/no-unsafe-function-type": "off",
      // hilangin error react
      "react/no-unescaped-entities": "off",
      "react/jsx-key": "off",
      // hilangin warning img (opsional)
      "@next/next/no-img-element": "off",
    },
    },
  ];

  export default eslintConfig;
