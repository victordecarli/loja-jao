import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node', // Ambiente Node.js
        coverage: {
            provider: 'istanbul', // Gerar relatório de cobertura
        },
    },
});