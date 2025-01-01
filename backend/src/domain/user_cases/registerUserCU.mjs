import { registerUser } from "../../infrastructure/services/cognitoService.mjs";
import { saveUser } from "../../infrastructure/database/dynamoDbClient.mjs";

export const registerUserCU = async (userData, userPoolId, clientId) => {
  const { email, password, name, surname } = userData;

  // Registro en Cognito
  await registerUser(email, password, name, surname, userPoolId, clientId);

  // Guardar usuario en DynamoDB
  const user = {
    pk: `USER#${email}`,
    name,
    surname,
    createdAt: new Date().toISOString(),
  };
  await saveUser(user);

  return { success: true, message: "Usuario registrado con éxito" };
};
