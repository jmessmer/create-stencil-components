import eslint from '@eslint/js';
import globals from "globals";
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import sonarlint from 'eslint-plugin-sonarjs';
import tsParser from '@typescript-eslint/parser';

export default defineConfig({
	extends: [
		eslint.configs.recommended,
		sonarlint.configs.recommended,
		tseslint.configs.recommended,
		tseslint.configs.strict,
		tseslint.configs.stylistic
	],
	files: ['**/**.{ts,tsx}'],
	languageOptions: {
		ecmaVersion: 2022,
		globals: {
			...globals.browser,
			...globals.jest
		},
    parser: tsParser
	},
	plugins: {
		sonarlint: sonarlint
	},
	rules: {
		"sonarjs/unused-import": "off",
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				"varsIgnorePattern": "^(h|Fragment)$"
			}
		],
	}
});
