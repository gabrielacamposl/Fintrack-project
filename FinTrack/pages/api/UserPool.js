import {CognitoUserPool} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: "us-east-1_GekfsHedK",
  ClientId: "4htk2relqvm1g6m0i41urlpm4v"
};
export default new CognitoUserPool(poolData);
