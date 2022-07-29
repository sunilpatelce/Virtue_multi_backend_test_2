import type { ConnectOptions } from "mongoose";
import { connect } from "mongoose";

const connectMongoDB = async (url?: string, options?: ConnectOptions) => {
  if (url && options) await connect(url, options);
  else
    await connect("mongodb://0.0.0.0:27017/voomio", {
      serverSelectionTimeoutMS: 1000,
    });
};

export default connectMongoDB;
