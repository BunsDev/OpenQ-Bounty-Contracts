// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.17;

import './FunctionWrappers.sol';

contract DepositManagerV1FuzzTest is FunctionWrappers {
    constructor() {
        depositManager.renounceOwnership();
    }

    /// @notice Checks that no codepath exists that can change oracle BESIDES transferOracle()
    /// @dev Renounce ownership, and oracle should never be able to be transferred again
    function assert_cannot_set_token_whitelist() public view {
        assert(
            address(depositManager.openQTokenWhitelist()) == openQTokenWhiteList
        );
    }

    /// @notice Checks that no codepath exists that can call initialize after initialization
    /// @dev Initialize is called in constructor of Setup.sol
    function assert_cannot_call_initialize() public {
        (bool success, ) = payable(address(depositManager)).call(
            abi.encodeWithSignature('initialize()')
        );
        assert(!success);
    }
}
