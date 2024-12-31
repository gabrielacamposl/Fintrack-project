const AWS = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');

// Configura AWS
AWS.config.update({ region: 'us-east-1' });
const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const app = express();
app.use(bodyParser.json());

const USER_POOL_ID = '';
const CLIENT_ID = '';

// Endpoint para registro de usuario
app.post('/signup', async (req, res) => {
    const { nombre, apellidos, email, password } = req.body;

    // Validación simple
    if (!nombre || !apellidos || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        // Registro en Cognito
        const params = {
            ClientId: CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [
                { Name: 'name', Value: nombre },
                { Name: 'family_name', Value: apellidos },
                { Name: 'email', Value: email },
            ],
        };
        await cognito.signUp(params).promise();

        // Guarda información en DynamoDB
        const userId = `${Date.now()}-${Math.random()}`;
        await dynamoDB.put({
            TableName: 'Users',
            Item: { userId, nombre, apellidos, email },
        }).promise();

        res.status(200).json({ message: 'Usuario creado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creando el usuario.', error });
    }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
