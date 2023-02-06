// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.17;

import './Setup.sol';

/// @title FunctionWrappers
/// @author FlacoJones
/// @notice Wraps methods across contracts so they can be fuzzed
/// @dev Echidna only fuzzes and calls methods which are public and external in the inheritance chain of your Echidna fuzz-test contracts
contract FunctionWrappers is Setup {
    constructor() {}

    function _transferOracle(address _newOracle) public {
        require(_newOracle != address(0), 'No zero address');
        openQ.transferOracle(_newOracle);
    }

    function _setBountyFactory(address _newBountyFactory) public {
        require(_newBountyFactory != address(0), 'No zero address');
        openQ.setBountyFactory(_newBountyFactory);
    }

    function _setClaimManager(address _newClaimManager) public {
        require(_newClaimManager != address(0), 'No zero address');
        openQ.setClaimManager(_newClaimManager);
    }

    function _setDepositManager(address _newDepositManager) public {
        require(_newDepositManager != address(0), 'No zero address');
        openQ.setDepositManager(_newDepositManager);
    }

    function _upgradeTo(address _newImplementation) public {
        require(_newImplementation != address(0), 'No zero address');
        openQ.upgradeTo(_newImplementation);
    }

    function _setTokenWhitelist(address _newTokenWhitelist) public {
        require(_newTokenWhitelist != address(0), 'No zero address');
        depositManager.setTokenWhitelist(_newTokenWhitelist);
    }
}
