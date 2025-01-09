import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'happy-dom',
        env: {
            NODE_ENV: 'test',
        },
        globals: true,
    },
});
