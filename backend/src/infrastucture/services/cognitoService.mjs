import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const cognito = new AWS.CognitoIdentityServiceProvider();

export const registerUser = async (email, password, name, surname) => {
    const params = {
        ClientId: '45d19d42089k2t28nc386jum98', // ID del Cliente
        Username: email,
        Password: password,
        UserAttributes: [
            { Name: 'name', Value: name },
            { Name: 'family_name', Value: surname },
            { Name: 'email', Value: email },
        ],
    };

    await cognito.signUp(params).promise();
};
