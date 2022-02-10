// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

// Third Party
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import 'hardhat/console.sol';

// Custom
import '../Bounty.sol';

contract BountyV0 is Bounty {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    // Transactions
    function receiveFunds(
        address _funder,
        address _tokenAddress,
        uint256 _volume,
        uint256 _expiration
    ) public payable onlyOpenQ nonReentrant returns (bytes32, uint256) {
        require(_volume != 0, 'ZERO_VOLUME_SENT');

        uint256 volumeReceived;
        if (_tokenAddress == address(0)) {
            volumeReceived = msg.value;
        } else {
            volumeReceived = _receiveERC20(_tokenAddress, _funder, _volume);
        }

        bytes32 depositId = keccak256(
            abi.encode(_funder, _tokenAddress, deposits.length)
        );

        funder[depositId] = _funder;
        tokenAddress[depositId] = _tokenAddress;
        volume[depositId] = volumeReceived;
        depositTime[depositId] = block.timestamp;
        expiration[depositId] = _expiration;
        isNFT[depositId] = false;

        deposits.push(depositId);

        isAFunder[_funder] = true;

        return (depositId, volumeReceived);
    }

    function receiveNft(
        address _sender,
        address _tokenAddress,
        uint256 _tokenId,
        uint256 _expiration
    ) public onlyOpenQ nonReentrant returns (bytes32) {
        _receiveNft(_tokenAddress, _sender, _tokenId);

        bytes32 depositId = keccak256(
            abi.encode(_sender, _tokenAddress, deposits.length)
        );

        funder[depositId] = _sender;
        tokenAddress[depositId] = _tokenAddress;
        depositTime[depositId] = block.timestamp;
        tokenId[depositId] = _tokenId;
        expiration[depositId] = _expiration;
        isNFT[depositId] = true;

        deposits.push(depositId);

        isAFunder[_sender] = true;

        return (depositId);
    }

    function claim(address _payoutAddress, bytes32 depositId)
        external
        onlyOpenQ
        nonReentrant
        returns (bool success)
    {
        require(this.status() == BountyStatus.OPEN, 'CLAIMING_CLOSED_BOUNTY');
        require(!refunded[depositId], 'CLAIMING_REFUNDED_DEPOSIT');
        require(!claimed[depositId], 'CLAIMING_CLAIMED_DEPOSIT');

        if (tokenAddress[depositId] == address(0)) {
            _transferProtocolToken(_payoutAddress, volume[depositId]);
        } else if (isNFT[depositId]) {
            _transferNft(
                tokenAddress[depositId],
                _payoutAddress,
                tokenId[depositId]
            );
        } else {
            _transferERC20(
                tokenAddress[depositId],
                _payoutAddress,
                volume[depositId]
            );
        }

        claimed[depositId] = true;
        payoutAddress[depositId] = _payoutAddress;

        return true;
    }

    function closeBounty(address _payoutAddress)
        external
        onlyOpenQ
        returns (bool success)
    {
        require(this.status() == BountyStatus.OPEN, 'CLOSING_CLOSED_BOUNTY');
        status = BountyStatus.CLOSED;
        closer = _payoutAddress;
        bountyClosedTime = block.timestamp;
        return true;
    }

    function refundBountyDeposit(bytes32 _depositId)
        external
        onlyOpenQ
        nonReentrant
        returns (bool success)
    {
        // Check
        require(refunded[_depositId] == false, 'BOUNTY_ALREADY_REFUNDED');
        require(
            isAFunder[msg.sender] == true,
            'ONLY_FUNDERS_CAN_REQUEST_REFUND'
        );
        require(
            block.timestamp >=
                depositTime[_depositId].add(expiration[_depositId]),
            'PREMATURE_REFUND_REQUEST'
        );

        // Effects
        refunded[_depositId] = true;

        // Interactions
        if (tokenAddress[_depositId] == address(0)) {
            _transferProtocolToken(funder[_depositId], volume[_depositId]);
        } else if (isNFT[_depositId]) {
            _transferNft(
                tokenAddress[_depositId],
                funder[_depositId],
                tokenId[_depositId]
            );
        } else {
            _transferERC20(
                tokenAddress[_depositId],
                funder[_depositId],
                volume[_depositId]
            );
        }

        return true;
    }
}
