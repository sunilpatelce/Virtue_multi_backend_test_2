/* eslint-disable import/first */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../.env") });

import Application from "./app/app";
import contractController from "./component/contract/contract.module";
import connectMongoDB from "./connections/database/mongodb";
import { connectRedis } from "./connections/database/redis";
import cronJob from "./cronJobs/cronjobs";
import logger from "./util/logger";

const application = new Application();

function startCronJob() {
  cronJob(
    contractController.getAllNft.bind(contractController),
    "0 */8 * * * *"
  );
}

function main() {
  const mongo = connectMongoDB();
  const redis = connectRedis();

  Promise.all([mongo, redis, application.run(process.env.PORT)])
    .then(() => {
      logger.info("application is up");
      startCronJob();
    })
    .catch(() => {
      logger.info("application cannot go up");
      process.exit(1);
    });
}

main();
