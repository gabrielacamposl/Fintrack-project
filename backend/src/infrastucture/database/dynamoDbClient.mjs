import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const saveUser = async (userData) => {
    const params = {
        TableName: 'Users',
        Item: userData,
    };

    await dynamoDB.put(params).promise();
};
