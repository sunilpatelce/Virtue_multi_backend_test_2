import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { readFileSync } from "fs";
import p from "path";
import swagger from "swagger-ui-express";

import logger from "../util/logger";
import v1Router from "./router.v1";

const swaggerDocument = (path: string) => readFileSync(path).toString("utf-8");

class Application {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.middleware();
    this.router();
  }

  private middleware(): void {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(cookieParser(process.env.COOKIE_PARSER_SECRETKEY));
  }

  private router(): void {
    // swagger documentation
    this.app.use(
      "/28d09f999815ce40",
      swagger.serve,
      swagger.setup(
        JSON.parse(
          swaggerDocument(p.resolve(__dirname, "../../swaggerDocument.json"))
        )
      )
    );
    // version one router used
    this.app.use("/api/v1/", v1Router);
  }

  public run(
    port: number | string,
    callback?: () => void
  ): Promise<Error | null> {
    return new Promise((resolve, reject) => {
      try {
        if (callback) this.app.listen(+port, callback);
        else
          this.app.listen(+port, () =>
            logger.info(`server running at port ${port}`)
          );
        resolve(null);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default Application;
