module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["./tsconfig.json"]
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
      '@typescript-eslint/no-empty-interface': 'off'
    },
    "overrides": [
        {
          "files": ['*.ts', '*.tsx']
        },
    ]
}
