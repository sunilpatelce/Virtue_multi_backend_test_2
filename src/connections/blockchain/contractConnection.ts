import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

import logger from "../../util/logger";
import marketPlace from "./marketplace.json";

class Contract {
  private readonly c;

  constructor() {
    const provider = new HDWalletProvider(
      process.env.PRIVATE_KEY,
      "https://rinkeby.infura.io/v3/49b2ce901eeb4d41bc972b31a4a7d1fb"
    );
    const web3 = new Web3(provider);
    this.c = new web3.eth.Contract(
      marketPlace.abi as any,
      process.env.MARKET_PLACE
    );
    logger.info("connection with contract establshed");
  }

  get contract() {
    return this.c;
  }
}

export default Contract;
