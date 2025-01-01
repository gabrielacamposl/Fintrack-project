import express from 'express';
import bodyParser from 'body-parser';
import { registerUserController } from './src/interfaces/controllers/userController.mjs';

const app = express();
app.use(bodyParser.json());

// Rutas
app.post('/signup', registerUserController);

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
