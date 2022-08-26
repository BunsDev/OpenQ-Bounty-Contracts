/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ClaimManagerOwnable,
  ClaimManagerOwnableInterface,
} from "../../../../contracts/ClaimManager/OnlyClaimsManager.sol/ClaimManagerOwnable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousClaimManager",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newClaimManager",
        type: "address",
      },
    ],
    name: "OracleTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "claimManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class ClaimManagerOwnable__factory {
  static readonly abi = _abi;
  static createInterface(): ClaimManagerOwnableInterface {
    return new utils.Interface(_abi) as ClaimManagerOwnableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ClaimManagerOwnable {
    return new Contract(address, _abi, signerOrProvider) as ClaimManagerOwnable;
  }
}
