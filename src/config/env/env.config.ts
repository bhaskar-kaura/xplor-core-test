export default () => ({
  port: parseInt(process.env.PORT, 10),
  databaseUrl: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  eAuthUri: process.env.E_AUTH_URI,
  walletUrl: process.env.WALLET_URL,
  userServiceUrl: process.env.USER_SERVICE_URL,
});
