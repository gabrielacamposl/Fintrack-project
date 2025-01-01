import { registerUserCU } from "../../domain/use_cases/registerUserCU.mjs";

export const apigtwAdapter = async (apigtwEvent, stage) => {
  const httpMethod = apigtwEvent.httpMethod;
  const resource = apigtwEvent.resource;

  if (httpMethod === "POST" && resource === "/register") {
    const body = JSON.parse(apigtwEvent.body);
    const userPoolId = process.env.USER_POOL_ID;
    const clientId = process.env.CLIENT_ID;

    try {
      const response = await registerUserCU(body, userPoolId, clientId);
      return {
        statusCode: 201,
        body: JSON.stringify(response),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }

  return { statusCode: 404, body: "Not Found" };
};
