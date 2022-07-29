import type { RedisClientType } from "@redis/client";

import Contract from "../../connections/blockchain/contractConnection";
import redis from "../../connections/database/redis";
import nftModel from "../../model/nft.model";
import NftService from "../../services/blockchain/nft";
import ContractController from "./contract.controller";
import ContractService from "./contract.service";

const contract = new Contract();

const nftService = new NftService(contract.contract);

const contractService = new ContractService(
  nftModel,
  nftService,
  redis as RedisClientType
);

const contractController = new ContractController(contractService);

export default contractController;
