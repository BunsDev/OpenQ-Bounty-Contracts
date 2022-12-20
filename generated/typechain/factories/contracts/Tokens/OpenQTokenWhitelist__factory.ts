/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  OpenQTokenWhitelist,
  OpenQTokenWhitelistInterface,
} from "../../../contracts/Tokens/OpenQTokenWhitelist";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenAddressLimit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [],
    name: "TOKEN_ADDRESS_LIMIT",
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
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "addToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
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
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "removeToken",
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
        internalType: "uint256",
        name: "newTokenAddressLimit",
        type: "uint256",
      },
    ],
    name: "setTokenAddressLimit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenCount",
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
        name: "",
        type: "address",
      },
    ],
    name: "whitelist",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161066038038061066083398101604081905261002f91610090565b61003833610040565b6001556100a9565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156100a257600080fd5b5051919050565b6105a8806100b86000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638da5cb5b116100665780638da5cb5b1461012b5780639b19251a146101465780639f181b5e14610169578063d48bfca714610172578063f2fde38b1461018557600080fd5b80633af32abf146100a35780635e9ab49c146100e45780635fa7b584146100f9578063601260d81461010c578063715018a614610123575b600080fd5b6100cf6100b13660046104c1565b6001600160a01b031660009081526003602052604090205460ff1690565b60405190151581526020015b60405180910390f35b6100f76100f23660046104f1565b610198565b005b6100f76101073660046104c1565b6101a5565b61011560015481565b6040519081526020016100db565b6100f761029c565b6000546040516001600160a01b0390911681526020016100db565b6100cf6101543660046104c1565b60036020526000908152604090205460ff1681565b61011560025481565b6100f76101803660046104c1565b6102b0565b6100f76101933660046104c1565b61039e565b6101a0610417565b600155565b6101ad610417565b604051633af32abf60e01b81526001600160a01b03821660048201523090633af32abf90602401602060405180830381865afa1580156101f1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610215919061050a565b6102665760405162461bcd60e51b815260206004820152601d60248201527f544f4b454e5f4e4f545f414c52454144595f57484954454c495354454400000060448201526064015b60405180910390fd5b6001600160a01b0381166000908152600360205260408120805460ff19169055600280549161029483610542565b919050555050565b6102a4610417565b6102ae6000610471565b565b6102b8610417565b604051633af32abf60e01b81526001600160a01b03821660048201523090633af32abf90602401602060405180830381865afa1580156102fc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610320919061050a565b1561036d5760405162461bcd60e51b815260206004820152601960248201527f544f4b454e5f414c52454144595f57484954454c495354454400000000000000604482015260640161025d565b6001600160a01b0381166000908152600360205260408120805460ff19166001179055600280549161029483610559565b6103a6610417565b6001600160a01b03811661040b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161025d565b61041481610471565b50565b6000546001600160a01b031633146102ae5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161025d565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156104d357600080fd5b81356001600160a01b03811681146104ea57600080fd5b9392505050565b60006020828403121561050357600080fd5b5035919050565b60006020828403121561051c57600080fd5b815180151581146104ea57600080fd5b634e487b7160e01b600052601160045260246000fd5b6000816105515761055161052c565b506000190190565b60006001820161056b5761056b61052c565b506001019056fea2646970667358221220090345f725e1dfe45e83d608f119ac117c4ca30a39565bc8b965ff485d2a173a64736f6c63430008100033";

type OpenQTokenWhitelistConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OpenQTokenWhitelistConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OpenQTokenWhitelist__factory extends ContractFactory {
  constructor(...args: OpenQTokenWhitelistConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _tokenAddressLimit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OpenQTokenWhitelist> {
    return super.deploy(
      _tokenAddressLimit,
      overrides || {}
    ) as Promise<OpenQTokenWhitelist>;
  }
  override getDeployTransaction(
    _tokenAddressLimit: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_tokenAddressLimit, overrides || {});
  }
  override attach(address: string): OpenQTokenWhitelist {
    return super.attach(address) as OpenQTokenWhitelist;
  }
  override connect(signer: Signer): OpenQTokenWhitelist__factory {
    return super.connect(signer) as OpenQTokenWhitelist__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OpenQTokenWhitelistInterface {
    return new utils.Interface(_abi) as OpenQTokenWhitelistInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OpenQTokenWhitelist {
    return new Contract(address, _abi, signerOrProvider) as OpenQTokenWhitelist;
  }
}
