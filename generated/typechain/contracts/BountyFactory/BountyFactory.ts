/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace OpenQDefinitions {
  export type InitOperationStruct = {
    operationType: PromiseOrValue<BigNumberish>;
    data: PromiseOrValue<BytesLike>;
  };

  export type InitOperationStructOutput = [number, string] & {
    operationType: number;
    data: string;
  };
}

export interface BountyFactoryInterface extends utils.Interface {
  functions: {
    "getBeacon()": FunctionFragment;
    "mintBounty(string,address,string,address,address,(uint32,bytes))": FunctionFragment;
    "openQ()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getBeacon" | "mintBounty" | "openQ"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "getBeacon", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mintBounty",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      OpenQDefinitions.InitOperationStruct
    ]
  ): string;
  encodeFunctionData(functionFragment: "openQ", values?: undefined): string;

  decodeFunctionResult(functionFragment: "getBeacon", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintBounty", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "openQ", data: BytesLike): Result;

  events: {
    "Initialized(uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface BountyFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BountyFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getBeacon(overrides?: CallOverrides): Promise<[string]>;

    mintBounty(
      _id: PromiseOrValue<string>,
      _issuer: PromiseOrValue<string>,
      _organization: PromiseOrValue<string>,
      _claimManager: PromiseOrValue<string>,
      _depositManager: PromiseOrValue<string>,
      operation: OpenQDefinitions.InitOperationStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    openQ(overrides?: CallOverrides): Promise<[string]>;
  };

  getBeacon(overrides?: CallOverrides): Promise<string>;

  mintBounty(
    _id: PromiseOrValue<string>,
    _issuer: PromiseOrValue<string>,
    _organization: PromiseOrValue<string>,
    _claimManager: PromiseOrValue<string>,
    _depositManager: PromiseOrValue<string>,
    operation: OpenQDefinitions.InitOperationStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  openQ(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    getBeacon(overrides?: CallOverrides): Promise<string>;

    mintBounty(
      _id: PromiseOrValue<string>,
      _issuer: PromiseOrValue<string>,
      _organization: PromiseOrValue<string>,
      _claimManager: PromiseOrValue<string>,
      _depositManager: PromiseOrValue<string>,
      operation: OpenQDefinitions.InitOperationStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    openQ(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    getBeacon(overrides?: CallOverrides): Promise<BigNumber>;

    mintBounty(
      _id: PromiseOrValue<string>,
      _issuer: PromiseOrValue<string>,
      _organization: PromiseOrValue<string>,
      _claimManager: PromiseOrValue<string>,
      _depositManager: PromiseOrValue<string>,
      operation: OpenQDefinitions.InitOperationStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    openQ(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getBeacon(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mintBounty(
      _id: PromiseOrValue<string>,
      _issuer: PromiseOrValue<string>,
      _organization: PromiseOrValue<string>,
      _claimManager: PromiseOrValue<string>,
      _depositManager: PromiseOrValue<string>,
      operation: OpenQDefinitions.InitOperationStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    openQ(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
