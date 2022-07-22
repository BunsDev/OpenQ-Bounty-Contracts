/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  BountyFactory,
  BountyFactoryInterface,
} from "../../../contracts/BountyFactory/BountyFactory";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_openQ",
        type: "address",
      },
      {
        internalType: "address",
        name: "_beacon",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [],
    name: "getBeacon",
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
        internalType: "string",
        name: "_id",
        type: "string",
      },
      {
        internalType: "address",
        name: "_issuer",
        type: "address",
      },
      {
        internalType: "string",
        name: "_organization",
        type: "string",
      },
      {
        components: [
          {
            internalType: "uint32",
            name: "operationType",
            type: "uint32",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct OpenQDefinitions.Operation[]",
        name: "operations",
        type: "tuple[]",
      },
    ],
    name: "mintBounty",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "openQ",
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

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610f56380380610f5683398101604081905261002f91610078565b603380546001600160a01b0319166001600160a01b0384161790556001600160a01b0316608052506100ab565b80516001600160a01b038116811461007357600080fd5b919050565b6000806040838503121561008b57600080fd5b6100948361005c565b91506100a26020840161005c565b90509250929050565b608051610e8a6100cc60003960008181604d015261011b0152610e8a6000f3fe60806040523480156200001157600080fd5b5060043610620000465760003560e01c80632d6b3a6b146200004b5780637dc81fa21462000089578063fb254de3146200009b575b600080fd5b7f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b03909116815260200160405180910390f35b6033546001600160a01b03166200006d565b6200006d620000ac366004620002dc565b6033546000906001600160a01b0316336001600160a01b031614620001175760405162461bcd60e51b815260206004820181905260248201527f4d6574686f64206973206f6e6c792063616c6c61626c65206279204f70656e51604482015260640160405180910390fd5b60007f0000000000000000000000000000000000000000000000000000000000000000868686620001506033546001600160a01b031690565b604051602401620001659493929190620004de565b60408051601f198184030181529181526020820180516001600160e01b0316630f67d67760e11b179052516200019b90620001d0565b620001a89291906200052c565b604051809103906000f080158015620001c5573d6000803e3d6000fd5b509695505050505050565b6108fa806200055b83390190565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156200021a576200021a620001de565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156200024c576200024c620001de565b604052919050565b600067ffffffffffffffff831115620002715762000271620001de565b62000286601f8401601f191660200162000220565b90508281528383830111156200029b57600080fd5b828260208301376000602084830101529392505050565b600082601f830112620002c457600080fd5b620002d58383356020850162000254565b9392505050565b60008060008060808587031215620002f357600080fd5b67ffffffffffffffff80863511156200030b57600080fd5b6200031a8787358801620002b2565b945060208601356001600160a01b03811681146200033757600080fd5b93506040860135818111156200034c57600080fd5b6200035a88828901620002b2565b9350506060860135818111156200037057600080fd5b8601601f810188136200038257600080fd5b803582811115620003975762000397620001de565b620003a860208260051b0162000220565b8082825260208201915060208360051b85010192508a831115620003cb57600080fd5b602084015b838110156200047e578581351115620003e857600080fd5b803585016040818e03601f190112156200040157600080fd5b6200040b620001f4565b602082013563ffffffff811681146200042357600080fd5b81526040820135888111156200043857600080fd5b8083019250508d603f8301126200044e57600080fd5b620004628e60208401356040850162000254565b60208201528085525050602083019250602081019050620003d0565b50979a9699509497505050505050565b6000815180845260005b81811015620004b65760208185018101518683018201520162000498565b81811115620004c9576000602083870101525b50601f01601f19169290920160200192915050565b608081526000620004f360808301876200048e565b6001600160a01b03868116602085015283820360408501526200051782876200048e565b92508085166060850152505095945050505050565b6001600160a01b038316815260406020820181905260009062000552908301846200048e565b94935050505056fe60806040526040516108fa3803806108fa83398101604081905261002291610456565b61002e82826000610035565b5050610580565b61003e83610100565b6040516001600160a01b038416907f1cf3b03a6cf19fa2baba4df148e9dcabedea7f8a5c07840e207e5c089be95d3e90600090a260008251118061007f5750805b156100fb576100f9836001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100e99190610516565b836102a360201b6100291760201c565b505b505050565b610113816102cf60201b6100551760201c565b6101725760405162461bcd60e51b815260206004820152602560248201527f455243313936373a206e657720626561636f6e206973206e6f74206120636f6e6044820152641d1c9858dd60da1b60648201526084015b60405180910390fd5b6101e6816001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d79190610516565b6102cf60201b6100551760201c565b61024b5760405162461bcd60e51b815260206004820152603060248201527f455243313936373a20626561636f6e20696d706c656d656e746174696f6e206960448201526f1cc81b9bdd08184818dbdb9d1c9858dd60821b6064820152608401610169565b806102827fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d5060001b6102de60201b6100641760201c565b80546001600160a01b0319166001600160a01b039290921691909117905550565b60606102c883836040518060600160405280602781526020016108d3602791396102e1565b9392505050565b6001600160a01b03163b151590565b90565b60606001600160a01b0384163b6103495760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610169565b600080856001600160a01b0316856040516103649190610531565b600060405180830381855af49150503d806000811461039f576040519150601f19603f3d011682016040523d82523d6000602084013e6103a4565b606091505b5090925090506103b58282866103bf565b9695505050505050565b606083156103ce5750816102c8565b8251156103de5782518084602001fd5b8160405162461bcd60e51b8152600401610169919061054d565b80516001600160a01b038116811461040f57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561044557818101518382015260200161042d565b838111156100f95750506000910152565b6000806040838503121561046957600080fd5b610472836103f8565b60208401519092506001600160401b038082111561048f57600080fd5b818501915085601f8301126104a357600080fd5b8151818111156104b5576104b5610414565b604051601f8201601f19908116603f011681019083821181831017156104dd576104dd610414565b816040528281528860208487010111156104f657600080fd5b61050783602083016020880161042a565b80955050505050509250929050565b60006020828403121561052857600080fd5b6102c8826103f8565b6000825161054381846020870161042a565b9190910192915050565b602081526000825180602084015261056c81604085016020870161042a565b601f01601f19169190910160400192915050565b6103448061058f6000396000f3fe60806040523661001357610011610017565b005b6100115b610027610022610067565b610100565b565b606061004e83836040518060600160405280602781526020016102e860279139610124565b9392505050565b6001600160a01b03163b151590565b90565b600061009a7fa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50546001600160a01b031690565b6001600160a01b0316635c60da1b6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100fb919061023f565b905090565b3660008037600080366000845af43d6000803e80801561011f573d6000f35b3d6000fd5b60606001600160a01b0384163b6101915760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084015b60405180910390fd5b600080856001600160a01b0316856040516101ac9190610298565b600060405180830381855af49150503d80600081146101e7576040519150601f19603f3d011682016040523d82523d6000602084013e6101ec565b606091505b50915091506101fc828286610206565b9695505050505050565b6060831561021557508161004e565b8251156102255782518084602001fd5b8160405162461bcd60e51b815260040161018891906102b4565b60006020828403121561025157600080fd5b81516001600160a01b038116811461004e57600080fd5b60005b8381101561028357818101518382015260200161026b565b83811115610292576000848401525b50505050565b600082516102aa818460208701610268565b9190910192915050565b60208152600082518060208401526102d3816040850160208701610268565b601f01601f1916919091016040019291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212209d11f6b792b44bdcc12984b746d6869c77be4aa1884503fc5b37d0b6504edca364736f6c634300080d0033416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220f0527a99f323a7c7055fd37f816af7c8db0fddae84b6e14a33dc4ea56d1b2d5f64736f6c634300080d0033";

type BountyFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BountyFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BountyFactory__factory extends ContractFactory {
  constructor(...args: BountyFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _openQ: PromiseOrValue<string>,
    _beacon: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BountyFactory> {
    return super.deploy(
      _openQ,
      _beacon,
      overrides || {}
    ) as Promise<BountyFactory>;
  }
  override getDeployTransaction(
    _openQ: PromiseOrValue<string>,
    _beacon: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_openQ, _beacon, overrides || {});
  }
  override attach(address: string): BountyFactory {
    return super.attach(address) as BountyFactory;
  }
  override connect(signer: Signer): BountyFactory__factory {
    return super.connect(signer) as BountyFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BountyFactoryInterface {
    return new utils.Interface(_abi) as BountyFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BountyFactory {
    return new Contract(address, _abi, signerOrProvider) as BountyFactory;
  }
}
