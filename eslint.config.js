import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";


export default [        
    {
        files: [ "src/**/*.{ts,tsx}" ],
        languageOptions: {            
            globals: {
                ...globals.browser,
                ...globals.node
            },
            parser: tsParser
        },
        plugins: {
            "@typescript-eslint": tsPlugin,         
            "prettier": prettierPlugin
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...prettierPlugin.configs.recommended.rules
        }
    }    
];