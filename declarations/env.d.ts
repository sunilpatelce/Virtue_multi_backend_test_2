declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number | string;

      MARKET_PLACE: string;
      PRIVATE_KEY: string;
      WALLET_PROVIDER_URL: number | string;

      COOKIE_PARSER_SECRETKEY: string;

      REDIS_URL: string;

      MONGODB_PORT: string;
      MONGODB_HOST: string;
      MONGODB_DB_NAME: string;
    }
  }
}
export {};
