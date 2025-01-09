import ViteExpress from 'vite-express';

import { app } from './server';

const PORT = 3000;

ViteExpress.listen(app, PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
