// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import './TokenWhitelist.sol';

/// @title OpenQTokenWhitelist
/// @author FlacoJones
/// @notice OpenQTokenWhitelist provides the list of verified token addresses
/// @dev Whitelisting and token address limit is implemented primarily as a means of preventing out-of-gas exceptions when looping over funded addresses for payouts
contract OpenQTokenWhitelist is TokenWhitelist {
    constructor() TokenWhitelist() {}
}
