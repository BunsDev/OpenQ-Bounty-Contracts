/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BytesLike,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  OpenQProxy,
  OpenQProxyInterface,
} from "../../../../contracts/OpenQ/Proxy/OpenQProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_logic",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
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
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x608060405260405161072538038061072583398101604081905261002291610318565b818161003082826000610039565b50505050610435565b6100428361006f565b60008251118061004f5750805b1561006a5761006883836100af60201b6100291760201c565b505b505050565b610078816100db565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606100d483836040518060600160405280602781526020016106fe602791396101ad565b9392505050565b6100ee8161028b60201b6100551760201c565b6101555760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084015b60405180910390fd5b8061018c7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b61029a60201b6100641760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606001600160a01b0384163b6102155760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840161014c565b600080856001600160a01b03168560405161023091906103e6565b600060405180830381855af49150503d806000811461026b576040519150601f19603f3d011682016040523d82523d6000602084013e610270565b606091505b50909250905061028182828661029d565b9695505050505050565b6001600160a01b03163b151590565b90565b606083156102ac5750816100d4565b8251156102bc5782518084602001fd5b8160405162461bcd60e51b815260040161014c9190610402565b634e487b7160e01b600052604160045260246000fd5b60005b838110156103075781810151838201526020016102ef565b838111156100685750506000910152565b6000806040838503121561032b57600080fd5b82516001600160a01b038116811461034257600080fd5b60208401519092506001600160401b038082111561035f57600080fd5b818501915085601f83011261037357600080fd5b815181811115610385576103856102d6565b604051601f8201601f19908116603f011681019083821181831017156103ad576103ad6102d6565b816040528281528860208487010111156103c657600080fd5b6103d78360208301602088016102ec565b80955050505050509250929050565b600082516103f88184602087016102ec565b9190910192915050565b60208152600082518060208401526104218160408501602087016102ec565b601f01601f19169190910160400192915050565b6102ba806104446000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610067565b61009f565b565b606061004e838360405180606001604052806027815260200161025e602791396100c3565b9392505050565b6001600160a01b03163b151590565b90565b600061009a7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc546001600160a01b031690565b905090565b3660008037600080366000845af43d6000803e8080156100be573d6000f35b3d6000fd5b60606001600160a01b0384163b6101305760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084015b60405180910390fd5b600080856001600160a01b03168560405161014b919061020e565b600060405180830381855af49150503d8060008114610186576040519150601f19603f3d011682016040523d82523d6000602084013e61018b565b606091505b509150915061019b8282866101a5565b9695505050505050565b606083156101b457508161004e565b8251156101c45782518084602001fd5b8160405162461bcd60e51b8152600401610127919061022a565b60005b838110156101f95781810151838201526020016101e1565b83811115610208576000848401525b50505050565b600082516102208184602087016101de565b9190910192915050565b60208152600082518060208401526102498160408501602087016101de565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220c6eae4933979efad4cab71ecfdda9c3bfa36ada63b1bf2f2f33855f970500de064736f6c634300080d0033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564";

type OpenQProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OpenQProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OpenQProxy__factory extends ContractFactory {
  constructor(...args: OpenQProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _logic: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<OpenQProxy> {
    return super.deploy(_logic, _data, overrides || {}) as Promise<OpenQProxy>;
  }
  override getDeployTransaction(
    _logic: PromiseOrValue<string>,
    _data: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_logic, _data, overrides || {});
  }
  override attach(address: string): OpenQProxy {
    return super.attach(address) as OpenQProxy;
  }
  override connect(signer: Signer): OpenQProxy__factory {
    return super.connect(signer) as OpenQProxy__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OpenQProxyInterface {
    return new utils.Interface(_abi) as OpenQProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OpenQProxy {
    return new Contract(address, _abi, signerOrProvider) as OpenQProxy;
  }
}