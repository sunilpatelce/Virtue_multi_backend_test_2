import type { Iresult } from "../../../interface/result.i";

export interface IcontractService {
  explore: () => Promise<Iresult>;
}
