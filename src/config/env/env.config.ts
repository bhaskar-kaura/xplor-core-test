// Export a function that returns a configuration object.
// This configuration object is used to set up the application environment.
export default () => ({
  // Parse the PORT environment variable to an integer. This is the port on which the application will run.
  port: parseInt(process.env.PORT, 10),
  // Use the DATABASE_URL environment variable to set the MongoDB connection string.
  databaseUrl: process.env.DATABASE_URL,
  // Use the NODE_ENV environment variable to set the application environment (e.g., 'development', 'production').
  node_env: process.env.NODE_ENV,
  // Use the E_AUTH_URI environment variable to set the URI for the eAuth service.
  eAuthUri: process.env.E_AUTH_URI,
  // Use the WALLET_URL environment variable to set the URI for the wallet service.
  walletUrl: process.env.WALLET_URL,
  // Use the USER_SERVICE_URL environment variable to set the URI for the user service.
  userServiceUrl: process.env.USER_SERVICE_URL,
  // Use the ORGANIZATION environment variable to set the name of the organization.
  organization: process.env.ORGANIZATION,
});
