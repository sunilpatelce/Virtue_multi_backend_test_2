import { createClient } from "redis";

import logger from "../../util/logger";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("error", (err) => logger.error(`redis error: \r\n ${err}`));

const connectRedis = () => redis.connect();

export default redis;
export { connectRedis };
