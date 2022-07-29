import { model, Schema } from "mongoose";

import type { Inft } from "./interface/nftSchema.i";

const nftSchema = new Schema<Inft>(
  {
    nftType: { type: String, required: true, enum: ["paint", "sport"] },
    nftContract: { type: String, required: true },
    seller: { type: String, required: true },
    owner: { type: String, required: true },
    sold: { type: Boolean, required: true, default: false },
    tokenId: { type: Number, required: true },
    createdTime: { type: String, required: true },
    price: { type: Number, required: true },
    itemId: { type: Number, required: true },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);

const nftModel = model("nftModel", nftSchema);

export default nftModel;
