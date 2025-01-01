import { registerUserCU } from '../../domain/use_cases/registerUserCU.mjs';

export const registerUserController = async (req, res) => {
    const { nombre, apellidos, email, password } = req.body;

    if (!nombre || !apellidos || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos.' });
    }

    try {
        await registerUserCU({ name: nombre, surname: apellidos, email, password });
        res.status(200).json({ message: 'Usuario creado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creando el usuario.', error: error.message });
    }
};
