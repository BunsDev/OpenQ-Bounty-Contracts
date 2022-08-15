/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DepositManager,
  DepositManagerInterface,
} from "../../../contracts/DepositManager/DepositManager";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "bountyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "closer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyClosedTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "BountyClosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "bountyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "issuerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyMintTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "BountyCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "claimTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "ClaimSuccess",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "depositId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newExpiration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "DepositExtended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "depositId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "bountyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "DepositRefunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "fundingGoalTokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundingGoalVolume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "FundingGoalSet",
    type: "event",
  },
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
        indexed: false,
        internalType: "string",
        name: "bountyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "closer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payoutTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "NFTClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "depositId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "bountyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "receiveTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "NFTDepositReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payoutTokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payoutTokenVolume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "PayoutSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "bountyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "closer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "payoutTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "TokenBalanceClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "depositId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "bountyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "bountyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "organization",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "receiveTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "volume",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountyType",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "version",
        type: "uint256",
      },
    ],
    name: "TokenDepositReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "VERSION_1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bountyAddress",
        type: "address",
      },
    ],
    name: "bountyIsOpen",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bountyAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_depositId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_seconds",
        type: "uint256",
      },
    ],
    name: "extendDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bountyAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_tier",
        type: "uint256",
      },
    ],
    name: "fundBountyNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bountyAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_volume",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
    ],
    name: "fundBountyToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
    ],
    name: "isWhitelisted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openQTokenWhitelist",
    outputs: [
      {
        internalType: "contract OpenQTokenWhitelist",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bountyAddress",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_depositId",
        type: "bytes32",
      },
    ],
    name: "refundDeposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_openQTokenWhitelist",
        type: "address",
      },
    ],
    name: "setTokenWhitelist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bountyAddress",
        type: "address",
      },
    ],
    name: "tokenAddressLimitReached",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b50608051612277610092600039600081816103fc01528181610445015281816106430152818161068301528181610780015281816107c0015281816108390152818161087901528181610b4801528181610b8801528181610c0d01528181610cbd01528181610cfd015281816110e5015261112501526122776000f3fe6080604052600436106100fe5760003560e01c806352d1902d116100955780638da5cb5b116100645780638da5cb5b14610262578063975b961514610294578063d0dec359146102b4578063f2fde38b146102d4578063f75161c6146102f457600080fd5b806352d1902d146102035780636da585e214610218578063715018a6146102385780638129fc1c1461024d57600080fd5b80633af32abf116100d15780633af32abf1461019d5780634f1ef286146101bd5780635255008c146101d0578063527b22db146101e357600080fd5b806326c20e5f146101035780632fa0ac291461012b57806332fe1fec1461015b5780633659cfe61461017d575b600080fd5b34801561010f57600080fd5b50610118600181565b6040519081526020015b60405180910390f35b34801561013757600080fd5b5061014b610146366004611b4d565b610314565b6040519015158152602001610122565b34801561016757600080fd5b5061017b610176366004611b6a565b6103f2565b005b34801561018957600080fd5b5061017b610198366004611b4d565b610639565b3480156101a957600080fd5b5061014b6101b8366004611b4d565b610701565b61017b6101cb366004611c0e565b610776565b61017b6101de366004611ca1565b61082f565b3480156101ef57600080fd5b5061017b6101fe366004611b4d565b610b36565b34801561020f57600080fd5b50610118610c00565b34801561022457600080fd5b5061017b610233366004611ce7565b610cb3565b34801561024457600080fd5b5061017b610f35565b34801561025957600080fd5b5061017b610f49565b34801561026e57600080fd5b506033546001600160a01b03165b6040516001600160a01b039091168152602001610122565b3480156102a057600080fd5b5061014b6102af366004611b4d565b611061565b3480156102c057600080fd5b5061017b6102cf366004611d38565b6110db565b3480156102e057600080fd5b5061017b6102ef366004611b4d565b6115c1565b34801561030057600080fd5b5060c95461027c906001600160a01b031681565b60c95460408051630c024c1b60e31b8152905160009284926001600160a01b039091169163601260d8916004808201926020929091908290030181865afa158015610363573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103879190611d64565b816001600160a01b031663c5b6e7056040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103e99190611d64565b10159392505050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036104435760405162461bcd60e51b815260040161043a90611d7d565b60405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610475611637565b6001600160a01b03161461049b5760405162461bcd60e51b815260040161043a90611dc9565b60405163166ea0d160e21b815260048101839052839033906001600160a01b038316906359ba834490602401602060405180830381865afa1580156104e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105089190611e15565b6001600160a01b0316146105685760405162461bcd60e51b815260206004820152602160248201527f4f4e4c595f46554e4445525f43414e5f524551554553545f455854454e53494f6044820152602760f91b606482015260840161043a565b60405163e83963eb60e01b815260048101849052602481018390523360448201526000906001600160a01b0383169063e83963eb906064016020604051808303816000875af11580156105bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e39190611d64565b60408051600080825260208201928390529293507fff6b606253b167363e000664c8b931e839bf0ab135de9d6cfc5e26311a1ff6c49261062a928892869291600190611e82565b60405180910390a15050505050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036106815760405162461bcd60e51b815260040161043a90611d7d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166106b3611637565b6001600160a01b0316146106d95760405162461bcd60e51b815260040161043a90611dc9565b6106e281611653565b604080516000808252602082019092526106fe9183919061165b565b50565b60c954604051633af32abf60e01b81526001600160a01b0383811660048301526000921690633af32abf90602401602060405180830381865afa15801561074c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107709190611eb9565b92915050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036107be5760405162461bcd60e51b815260040161043a90611d7d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166107f0611637565b6001600160a01b0316146108165760405162461bcd60e51b815260040161043a90611dc9565b61081f82611653565b61082b8282600161165b565b5050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036108775760405162461bcd60e51b815260040161043a90611d7d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166108a9611637565b6001600160a01b0316146108cf5760405162461bcd60e51b815260040161043a90611dc9565b836108d984610701565b610933576108e685610314565b156109335760405162461bcd60e51b815260206004820152601860248201527f544f4f5f4d414e595f544f4b454e5f4144445245535345530000000000000000604482015260640161043a565b61093c85611061565b6109805760405162461bcd60e51b815260206004820152601560248201527446554e44494e475f434c4f5345445f424f554e545960581b604482015260640161043a565b6040516335bf83d160e21b81523360048201526001600160a01b0385811660248301526044820185905260648201849052600091829184169063d6fe0f44903490608401604080518083038185885af11580156109e1573d6000803e3d6000fd5b50505050506040513d601f19601f82011682018060405250810190610a069190611edb565b915091507f5b079a43aec0177fbeb930213940b8d476a8c4e0b37343e2059b6d61400d97628288856001600160a01b031663c17bd75e6040518163ffffffff1660e01b8152600401600060405180830381865afa158015610a6b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a939190810190611eff565b866001600160a01b03166323bd4d7a6040518163ffffffff1660e01b8152600401600060405180830381865afa158015610ad1573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610af99190810190611eff565b6040805160008082526020820192839052610b2596959493928e92429233928f928d9291600190611f6d565b60405180910390a150505050505050565b610b3e6117cb565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610b865760405162461bcd60e51b815260040161043a90611d7d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610bb8611637565b6001600160a01b031614610bde5760405162461bcd60e51b815260040161043a90611dc9565b60c980546001600160a01b0319166001600160a01b0392909216919091179055565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610ca05760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840161043a565b506000805160206121fb83398151915290565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610cfb5760405162461bcd60e51b815260040161043a90611d7d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610d2d611637565b6001600160a01b031614610d535760405162461bcd60e51b815260040161043a90611dc9565b84610d5d85610701565b610d9e5760405162461bcd60e51b81526020600482015260126024820152711513d2d15397d393d517d050d0d15415115160721b604482015260640161043a565b610da786611061565b610deb5760405162461bcd60e51b815260206004820152601560248201527446554e44494e475f434c4f5345445f424f554e545960581b604482015260640161043a565b6040516324f0cae560e01b81523360048201526001600160a01b038681166024830152604482018690526064820185905260848201849052600091908316906324f0cae59060a4016020604051808303816000875af1158015610e52573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e769190611d64565b90507f113d7b68690d10a1b57a4033f31ccbe3071a8b22eb4156a27533b32fe2cfb1e48188846001600160a01b03166323bd4d7a6040518163ffffffff1660e01b8152600401600060405180830381865afa158015610ed9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610f019190810190611eff565b604080516000808252602082019092528b91429133918c918e91906001604051610b259b9a99989796959493929190612008565b610f3d6117cb565b610f476000611825565b565b600054610100900460ff1615808015610f695750600054600160ff909116105b80610f835750303b158015610f83575060005460ff166001145b610fe65760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161043a565b6000805460ff191660011790558015611009576000805461ff0019166101001790555b611011611877565b6110196118a6565b80156106fe576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a150565b60008082905060008063ffffffff16826001600160a01b031663200d2ed26040518163ffffffff1660e01b8152600401602060405180830381865afa1580156110ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d29190611d64565b14949350505050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036111235760405162461bcd60e51b815260040161043a90611d7d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611155611637565b6001600160a01b03161461117b5760405162461bcd60e51b815260040161043a90611dc9565b60405163166ea0d160e21b815260048101829052829033906001600160a01b038316906359ba834490602401602060405180830381865afa1580156111c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111e89190611e15565b6001600160a01b03161461123e5760405162461bcd60e51b815260206004820152601e60248201527f4f4e4c595f46554e4445525f43414e5f524551554553545f524546554e440000604482015260640161043a565b6040516356406fa560e01b8152600481018390526001600160a01b038216906356406fa590602401602060405180830381865afa158015611283573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112a79190611d64565b60405163968b098f60e01b8152600481018490526001600160a01b0383169063968b098f90602401602060405180830381865afa1580156112ec573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113109190611d64565b61131a91906120d7565b4210156113695760405162461bcd60e51b815260206004820152601860248201527f5052454d41545552455f524546554e445f524551554553540000000000000000604482015260640161043a565b604051630c82823f60e31b8152600481018390523360248201526001600160a01b0382169063641411f890604401600060405180830381600087803b1580156113b157600080fd5b505af11580156113c5573d6000803e3d6000fd5b505050507f69564edf78e6beb23606d24a3d00a7d77315e974782eca07c9a0139393ef797f82826001600160a01b031663c17bd75e6040518163ffffffff1660e01b8152600401600060405180830381865afa158015611429573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114519190810190611eff565b85846001600160a01b03166323bd4d7a6040518163ffffffff1660e01b8152600401600060405180830381865afa158015611490573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114b89190810190611eff565b6040516397bb3ce960e01b81526004810188905242906001600160a01b038816906397bb3ce990602401602060405180830381865afa1580156114ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115239190611e15565b6040516305657ba960e21b8152600481018a90526001600160a01b03891690631595eea490602401602060405180830381865afa158015611568573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061158c9190611d64565b6040805160008082526020820190925260016040516115b49a999897969594939291906120f8565b60405180910390a1505050565b6115c96117cb565b6001600160a01b03811661162e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161043a565b6106fe81611825565b6000805160206121fb833981519152546001600160a01b031690565b6106fe6117cb565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156116935761168e836118cd565b505050565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156116ed575060408051601f3d908101601f191682019092526116ea91810190611d64565b60015b6117505760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840161043a565b6000805160206121fb83398151915281146117bf5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840161043a565b5061168e838383611969565b6033546001600160a01b03163314610f475760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161043a565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff1661189e5760405162461bcd60e51b815260040161043a90612180565b610f47611994565b600054610100900460ff16610f475760405162461bcd60e51b815260040161043a90612180565b6001600160a01b0381163b61193a5760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161043a565b6000805160206121fb83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b611972836119c4565b60008251118061197f5750805b1561168e5761198e8383611a04565b50505050565b600054610100900460ff166119bb5760405162461bcd60e51b815260040161043a90612180565b610f4733611825565b6119cd816118cd565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b611a6c5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840161043a565b600080846001600160a01b031684604051611a8791906121cb565b600060405180830381855af49150503d8060008114611ac2576040519150601f19603f3d011682016040523d82523d6000602084013e611ac7565b606091505b5091509150611aef828260405180606001604052806027815260200161221b60279139611af8565b95945050505050565b60608315611b07575081611b31565b825115611b175782518084602001fd5b8160405162461bcd60e51b815260040161043a91906121e7565b9392505050565b6001600160a01b03811681146106fe57600080fd5b600060208284031215611b5f57600080fd5b8135611b3181611b38565b600080600060608486031215611b7f57600080fd5b8335611b8a81611b38565b95602085013595506040909401359392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611bde57611bde611b9f565b604052919050565b600067ffffffffffffffff821115611c0057611c00611b9f565b50601f01601f191660200190565b60008060408385031215611c2157600080fd5b8235611c2c81611b38565b9150602083013567ffffffffffffffff811115611c4857600080fd5b8301601f81018513611c5957600080fd5b8035611c6c611c6782611be6565b611bb5565b818152866020838501011115611c8157600080fd5b816020840160208301376000602083830101528093505050509250929050565b60008060008060808587031215611cb757600080fd5b8435611cc281611b38565b93506020850135611cd281611b38565b93969395505050506040820135916060013590565b600080600080600060a08688031215611cff57600080fd5b8535611d0a81611b38565b94506020860135611d1a81611b38565b94979496505050506040830135926060810135926080909101359150565b60008060408385031215611d4b57600080fd5b8235611d5681611b38565b946020939093013593505050565b600060208284031215611d7657600080fd5b5051919050565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b600060208284031215611e2757600080fd5b8151611b3181611b38565b60005b83811015611e4d578181015183820152602001611e35565b50506000910152565b60008151808452611e6e816020860160208601611e32565b601f01601f19169290920160200192915050565b85815284602082015283604082015260a060608201526000611ea760a0830185611e56565b90508260808301529695505050505050565b600060208284031215611ecb57600080fd5b81518015158114611b3157600080fd5b60008060408385031215611eee57600080fd5b505080516020909101519092909150565b600060208284031215611f1157600080fd5b815167ffffffffffffffff811115611f2857600080fd5b8201601f81018413611f3957600080fd5b8051611f47611c6782611be6565b818152856020838501011115611f5c57600080fd5b611aef826020830160208601611e32565b8c81526001600160a01b038c8116602083015261018060408301819052600091611f998483018f611e56565b91508382036060850152611fad828e611e56565b9150808c1660808501528a60a0850152808a1660c0850152508760e08401528661010084015285610120840152828103610140840152611fed8186611e56565b915050826101608301529d9c50505050505050505050505050565b8b81526001600160a01b038b16602082015261018060408201819052601f908201527f4e46544465706f73697452656365697665645f626f756e747949644d6f636b006101a08201526101c06060820181905260009061206a8184018d611e56565b6001600160a01b038c16608085015290508960a084015261209660c084018a6001600160a01b03169052565b8760e084015286610100840152856101208401528281036101408401526120bd8186611e56565b915050826101608301529c9b505050505050505050505050565b8082018082111561077057634e487b7160e01b600052601160045260246000fd5b60006101408c83528060208401526121128184018d611e56565b6001600160a01b038c811660408601528482036060860152909150612137828c611e56565b915089608085015280891660a0850152508660c08401528560e08401528281036101008401526121678186611e56565b915050826101208301529b9a5050505050505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b600082516121dd818460208701611e32565b9190910192915050565b602081526000611b316020830184611e5656fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220255fd0cf20fb02cb3404db515e4dbf5c815df21f00ea3d23ae7df404053edfb964736f6c63430008100033";

type DepositManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DepositManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DepositManager__factory extends ContractFactory {
  constructor(...args: DepositManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DepositManager> {
    return super.deploy(overrides || {}) as Promise<DepositManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DepositManager {
    return super.attach(address) as DepositManager;
  }
  override connect(signer: Signer): DepositManager__factory {
    return super.connect(signer) as DepositManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DepositManagerInterface {
    return new utils.Interface(_abi) as DepositManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DepositManager {
    return new Contract(address, _abi, signerOrProvider) as DepositManager;
  }
}
