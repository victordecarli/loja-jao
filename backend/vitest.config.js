import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'), // Alias para src/
        },
    },
    test: {
        environment: 'node', // Ambiente Node.js
        coverage: {
            provider: 'istanbul', // Gerar relatório de cobertura
        },
    },
});