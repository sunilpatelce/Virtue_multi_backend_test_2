import type { RedisClientType } from "@redis/client";
import type { Model } from "mongoose";

import type { Inft } from "../../model/interface/nftSchema.i";
import type { InftService } from "../../services/interface/nft.i";
import logger from "../../util/logger";
import type { IcontractService } from "./interface/nft.service.i";

class NftService implements IcontractService {
  constructor(
    private readonly nftModel: Model<Inft>,
    private readonly nft: InftService,
    private readonly redis: RedisClientType
  ) {}

  async explore() {
    const nfts = await this.nft.explore();
    logger.info("NFTs recieved");

    const nftObject = await this.processNft(nfts);

    const writeDb = await this.nftModel.create({ ...nftObject });
    logger.info("creating NFTs and writing to mongoDB");

    const n = JSON.stringify(writeDb);

    await this.redis.set(writeDb.id, n);
    logger.info("writing NFTs to cache");

    logger.info("successfully received and stored NFTs");
    return {
      state: true,
      data: {
        message: "nfts saved to DB and cache",
      },
    };
  }

  private async processNft(nfts: any[][]): Promise<Inft> {
    await this.redis.set("name", `${nfts}`);
    return {
      createdTime: `${Date.now()}`,
      itemId: 2,
      nftContract: "dvdvdv",
      nftType: "sport",
      owner: "mmd",
      price: 2222,
      seller: "mmd2",
      sold: false,
      tokenId: 33,
    };
  }
}

export default NftService;
