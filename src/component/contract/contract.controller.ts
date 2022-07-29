import type { IcontractService } from "./interface/nft.service.i";

class ContractController {
  constructor(private readonly contractService: IcontractService) {}

  async getAllNft() {
    await this.contractService.explore();
  }
}

export default ContractController;
