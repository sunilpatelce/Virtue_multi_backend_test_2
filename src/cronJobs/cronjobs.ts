import { CronJob } from "cron";

import logger from "../util/logger";

const cronJob = (job: () => any, timer: string) => {
  const cron = new CronJob(timer, job);
  cron.start();
  logger.info(`the cronjob start to work`);
};

export default cronJob;
