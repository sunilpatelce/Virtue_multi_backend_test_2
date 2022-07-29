import logger from "../../util/logger";
import type { InftService } from "../interface/nft.i";

class ContractService implements InftService {
  constructor(private readonly c: any) {}

  explore(): Promise<any[][]> {
    logger.info("getting explorer NFTs from the contract");
    return this.c.methods.explore().call();
  }
}
export default ContractService;
