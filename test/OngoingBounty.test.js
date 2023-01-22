/* eslint-disable */
const { BigNumber } = require('@ethersproject/bignumber');
const { expect } = require('chai');
const { ethers } = require("hardhat");
const truffleAssert = require('truffle-assertions');
require('@nomiclabs/hardhat-waffle');

const { generateDepositId, generateClaimantId } = require('./utils');

describe('OngoingBountyV1.sol', () => {
	// CONTRACT FACTORIES
	let OngoingBountyV1;

	// ACCOUNTS
	let owner;
	let claimManager;
	let depositManager;

	// MOCK ASSETS
	let mockLink;
	let mockDai;
	let mockNft;

	// UTILS
	let abiCoder = new ethers.utils.AbiCoder;

	// CONSTANTS
	let closerData = abiCoder.encode(['address', 'string', 'address', 'string'], [ethers.constants.AddressZero, "FlacoJones", ethers.constants.AddressZero, "https://github.com/OpenQDev/OpenQ-Frontend/pull/398"]);
	const thirtyDays = 2765000;
	const mockId = "mockId";
	const organization = "mockOrg";
	const mockOpenQId = "mockOpenQId";
	const mockClaimantAsset = "https://github.com/OpenQDev/OpenQ-Frontend/pull/398";

	// BOUNTY TYPES
	let ONGOING_CONTRACT = 1;

	// INITIALIZATION OPERATIONS
	let ongoingContractInitOperation;

	// TEST CONTRACTS
	let ongoingContract;
	let ongoingContract_noFundingGoal;

	// MISC
	let initializationTimestampAtomic;
	let initializationTimestampOngoingNoFundingGoal;

	beforeEach(async () => {
		OngoingBountyV1 = await ethers.getContractFactory('OngoingBountyV1');
		const MockLink = await ethers.getContractFactory('MockLink');
		const MockDai = await ethers.getContractFactory('MockDai');
		const MockNft = await ethers.getContractFactory('MockNft');

		[owner, claimManager, depositManager] = await ethers.getSigners();

		// MOCK ASSETS
		mockLink = await MockLink.deploy();
		await mockLink.deployed();

		mockDai = await MockDai.deploy();
		await mockDai.deployed();

		mockNft = await MockNft.deploy();
		await mockNft.deployed();

		await mockNft.safeMint(owner.address);
		await mockNft.safeMint(owner.address);
		await mockNft.safeMint(owner.address);
		await mockNft.safeMint(owner.address);
		await mockNft.safeMint(owner.address);
		await mockNft.safeMint(owner.address);

		// ONGOIN CONTRACT
		ongoingContract = await OngoingBountyV1.deploy();
		await ongoingContract.deployed();
		let abiEncodedParamsFundingGoalBounty = abiCoder.encode(["address", "uint256", "bool", "address", "uint256", "bool", "bool", "bool", "string", "string", "string"], [mockLink.address, '100', true, mockLink.address, '100', true, true, true, mockOpenQId, "", ""]);
		ongoingContractInitOperation = [ONGOING_CONTRACT, abiEncodedParamsFundingGoalBounty];
		initializationTimestamp = await setNextBlockTimestamp();
		await ongoingContract.initialize(mockId, owner.address, organization, owner.address, claimManager.address, depositManager.address, ongoingContractInitOperation);

		await mockNft.approve(ongoingContract.address, 0);
		await mockNft.approve(ongoingContract.address, 1);
		await mockNft.approve(ongoingContract.address, 2);
		await mockNft.approve(ongoingContract.address, 3);
		await mockNft.approve(ongoingContract.address, 4);
		await mockNft.approve(ongoingContract.address, 5);

		// Pre-approve LINK and DAI for transfers during testing
		await mockLink.approve(ongoingContract.address, 10000000);
		await mockDai.approve(ongoingContract.address, 10000000);

		// ATOMIC CONTRACT W/ NO FUNDING GOAL
		ongoingContract_noFundingGoal = await OngoingBountyV1.deploy();
		await ongoingContract_noFundingGoal.deployed();
		let abiEncodedParamsNoFundingGoalBounty = abiCoder.encode(["address", "uint256", "bool", "address", "uint256", "bool", "bool", "bool", "string", "string", "string"], [mockLink.address, '100', false, ethers.constants.AddressZero, '0', true, true, true, mockOpenQId, "", ""]);
		const ongoingBountyNoFundingGoalInitOperation = [ONGOING_CONTRACT, abiEncodedParamsNoFundingGoalBounty];
		initializationTimestampOngoingNoFundingGoal = await setNextBlockTimestamp();
		await ongoingContract_noFundingGoal.initialize(mockId, owner.address, organization, owner.address, claimManager.address, depositManager.address, ongoingBountyNoFundingGoalInitOperation);
	});

	describe('initializer', () => {
		describe('ONGOING', () => {
			it(`should initialize bounty with correct metadata`, async () => {
				// ARRANGE/ASSERT
				await expect(await ongoingContract.bountyId()).equals(mockId);
				await expect(await ongoingContract.issuer()).equals(owner.address);
				await expect(await ongoingContract.organization()).equals(organization);
				await expect(await ongoingContract.status()).equals(0);
				await expect(await ongoingContract.openQ()).equals(owner.address);
				await expect(await ongoingContract.claimManager()).equals(claimManager.address);
				await expect(await ongoingContract.depositManager()).equals(depositManager.address);
				await expect(await ongoingContract.bountyCreatedTime()).equals(initializationTimestamp);
				await expect(await ongoingContract.bountyType()).equals(ONGOING_CONTRACT);
				await expect(await ongoingContract.hasFundingGoal()).equals(true);
				await expect(await ongoingContract.fundingToken()).equals(mockLink.address);
				await expect(await ongoingContract.fundingGoal()).equals(100);
				await expect(await ongoingContract.invoiceable()).equals(true);
				await expect(await ongoingContract.kycRequired()).equals(true);
				await expect(await ongoingContract.externalUserId()).equals(mockOpenQId);
				await expect(await ongoingContract.supportingDocuments()).equals(true);
			});
		});

		describe('REVERTS', () => {
			it('should revert if bountyId is empty', async () => {
				// ARRANGE
				const OngoingBountyV1 = await ethers.getContractFactory('OngoingBountyV1');
				ongoingContract = await OngoingBountyV1.deploy();

				// ASSERT
				await expect(ongoingContract.initialize("", owner.address, organization, owner.address, claimManager.address, depositManager.address, ongoingContractInitOperation)).to.be.revertedWith('NO_EMPTY_BOUNTY_ID');
			});

			it('should revert if organization is empty', async () => {
				// ARRANGE
				const OngoingBountyV1 = await ethers.getContractFactory('OngoingBountyV1');
				ongoingContract = await OngoingBountyV1.deploy();

				// ASSERT
				await expect(ongoingContract.initialize(mockId, owner.address, "", owner.address, claimManager.address, depositManager.address, ongoingContractInitOperation)).to.be.revertedWith('NO_EMPTY_ORGANIZATION');
			});
		});
	});

	describe('receiveFunds', () => {
		describe('REVERTS', () => {
			it('should revert if not called by Deposit Manager contract', async () => {
				// ARRANGE
				const [, , , , notDepositManager] = await ethers.getSigners();

				// ASSERT
				await expect(ongoingContract.connect(notDepositManager).receiveFunds(owner.address, mockLink.address, 100, thirtyDays)).to.be.revertedWith('DepositManagerOwnable: caller is not the current OpenQ Deposit Manager');
			});

			it('should revert if no volume is sent', async () => {
				// ASSERT
				await expect(ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, 0, thirtyDays)).to.be.revertedWith('ZERO_VOLUME_SENT');
			});

			it('should revert if funder tries to send more than allowance', async () => {
				const greaterThanAllowance = 100000000;
				await expect(ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, greaterThanAllowance, thirtyDays)).to.be.revertedWith('ERC20: insufficient allowance');
			});

			it('should revert if expiration is negative', async () => {
				await expect(ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, 100, 0)).to.be.revertedWith('EXPIRATION_NOT_GREATER_THAN_ZERO');
			});

			it('should revert if bounty is closed', async () => {
				// ARRANGE
				const volume = 1000;
				await ongoingContract.connect(owner).closeOngoing(owner.address);

				await expect(ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, volume, thirtyDays)).to.be.revertedWith('CONTRACT_IS_CLOSED');
			});
		});

		describe('DEPOSIT INITIALIZATION', () => {
			it(`should initialize token deposit data with correct metadata`, async () => {
				// ARRANGE
				const depositId = generateDepositId(mockId, 0);
				const expectedTimestamp = await setNextBlockTimestamp();

				// ACT
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, 100, thirtyDays);

				// ASSERT
				expect(await ongoingContract.funder(depositId)).to.equal(owner.address);
				expect(await ongoingContract.tokenAddress(depositId)).to.equal(mockLink.address);
				expect(await ongoingContract.volume(depositId)).to.equal(100);
				expect(await ongoingContract.expiration(depositId)).to.equal(thirtyDays);
				expect(await ongoingContract.isNFT(depositId)).to.equal(false);
				expect(await ongoingContract.depositTime(depositId)).to.equal(expectedTimestamp);
			});

			it('should create a globally unique deposit id across all bounties', async () => {
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, 100, thirtyDays);
				const deposits = await ongoingContract.getDeposits();
				const depositId = deposits[0];

				const newBounty = await OngoingBountyV1.deploy();
				await newBounty.deployed();
				await newBounty.initialize('other-mock-id', owner.address, organization, owner.address, claimManager.address, depositManager.address, ongoingContractInitOperation);

				await mockLink.approve(newBounty.address, 20000);
				await newBounty.connect(depositManager).receiveFunds(owner.address, mockLink.address, 100, thirtyDays);
				const newDeposits = await newBounty.getDeposits();
				const newDepositId = newDeposits[0];

				expect(newDepositId).to.not.equal(depositId);
			});
		});

		describe('TOKEN ADDRESSES', () => {
			it('should add funding address to token address set', async () => {
				// ACT
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, 100, thirtyDays);
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, 100, thirtyDays);

				const tokenAddresses = await ongoingContract.getTokenAddresses();
				expect(tokenAddresses.length).to.equal(1);
				expect(tokenAddresses[0]).to.equal(mockLink.address);
			});
		});

		describe('ERC20 TRANSFER', () => {
			describe('NO FEE TRANSFER', () => {
				it('should transfer volume of ERC20 from sender to bounty', async () => {
					// ASSUME
					const initialFunderMockLinkBalance = (await mockDai.balanceOf(owner.address)).toString();
					const initialFunderMockDaiBalance = (await mockLink.balanceOf(owner.address)).toString();
					expect(initialFunderMockLinkBalance).to.equal('10000000000000000000000');
					expect(initialFunderMockDaiBalance).to.equal('10000000000000000000000');

					const initialIssueMockLinkBalance = (await mockLink.balanceOf(ongoingContract.address)).toString();
					const initialIssueMockDaiBalance = (await mockDai.balanceOf(ongoingContract.address)).toString();
					expect(initialIssueMockLinkBalance).to.equal('0');
					expect(initialIssueMockDaiBalance).to.equal('0');

					// ARRANGE
					const value = 100;

					// ACT
					await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, value, thirtyDays);
					await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockDai.address, value, thirtyDays);

					// ASSERT
					const funderMockLinkBalance = (await mockDai.balanceOf(owner.address)).toString();
					const funderFakeTokenBalance = (await mockLink.balanceOf(owner.address)).toString();
					expect(funderMockLinkBalance).to.equal('9999999999999999999900');
					expect(funderFakeTokenBalance).to.equal('9999999999999999999900');

					const bountyMockTokenBalance = (await mockLink.balanceOf(ongoingContract.address)).toString();
					const bountyFakeTokenBalance = (await mockDai.balanceOf(ongoingContract.address)).toString();
					expect(bountyMockTokenBalance).to.equal('100');
					expect(bountyFakeTokenBalance).to.equal('100');
				});
			});

			describe('FEE TRANSFER', () => {
				it('should transfer volume of ERC20 from sender to bounty MINUS whatever the ERC20 takes in fees', async () => {
					// ASSUME
					const initialFunderMockLinkBalance = (await mockDai.balanceOf(owner.address)).toString();
					const initialFunderMockDaiBalance = (await mockLink.balanceOf(owner.address)).toString();
					expect(initialFunderMockLinkBalance).to.equal('10000000000000000000000');
					expect(initialFunderMockDaiBalance).to.equal('10000000000000000000000');

					const initialIssueMockLinkBalance = (await mockLink.balanceOf(ongoingContract.address)).toString();
					const initialIssueMockDaiBalance = (await mockDai.balanceOf(ongoingContract.address)).toString();
					expect(initialIssueMockLinkBalance).to.equal('0');
					expect(initialIssueMockDaiBalance).to.equal('0');

					// ARRANGE
					const value = 100;

					// ACT
					await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, value, thirtyDays);
					await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockDai.address, value, thirtyDays);

					// ASSERT
					const funderMockLinkBalance = (await mockDai.balanceOf(owner.address)).toString();
					const funderFakeTokenBalance = (await mockLink.balanceOf(owner.address)).toString();
					expect(funderMockLinkBalance).to.equal('9999999999999999999900');
					expect(funderFakeTokenBalance).to.equal('9999999999999999999900');

					const bountyMockTokenBalance = (await mockLink.balanceOf(ongoingContract.address)).toString();
					const bountyFakeTokenBalance = (await mockDai.balanceOf(ongoingContract.address)).toString();
					expect(bountyMockTokenBalance).to.equal('100');
					expect(bountyFakeTokenBalance).to.equal('100');
				});
			});
		});

		describe('PROTOCOL TOKEN TRANSFER', () => {
			it('should accept msg.value if token address is zero address', async () => {
				const volume = ethers.utils.parseEther("1.0");
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, ethers.constants.AddressZero, volume, thirtyDays, { value: volume });
				const bountyProtocolTokenBalance = await ongoingContract.provider.getBalance(ongoingContract.address);
				expect(bountyProtocolTokenBalance).to.equal(volume);
			});
		});
	});

	describe('receiveNFT', () => {

		describe('REVERTS', () => {
			it('should revert if too many NFT deposits', async () => {
				// ASSUME
				expect(await mockNft.ownerOf(0)).to.equal(owner.address);
				expect(await mockNft.ownerOf(1)).to.equal(owner.address);
				expect(await mockNft.ownerOf(2)).to.equal(owner.address);
				expect(await mockNft.ownerOf(3)).to.equal(owner.address);
				expect(await mockNft.ownerOf(4)).to.equal(owner.address);

				// ACT
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 0, 1, []);
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 1, 1, []);
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 2, 1, []);
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 3, 1, []);
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 4, 1, []);

				// ASSERT
				await expect(ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 5, 1, [])).to.be.revertedWith('NFT_DEPOSIT_LIMIT_REACHED');
			});

			it('should revert if expiration is negative', async () => {
				await expect(ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 0, 0, [])).to.be.revertedWith('EXPIRATION_NOT_GREATER_THAN_ZERO');
			});
		});

		describe('DEPOSIT INITIALIZATION', () => {
			it(`should initialize nft deposit data with correct metadata`, async () => {

				// ACT
				const expectedTimestamp = await setNextBlockTimestamp();
				const depositId = generateDepositId(mockId, 0);
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 1, thirtyDays, []);

				// ASSERT
				expect(await ongoingContract.funder(depositId)).to.equal(owner.address);
				expect(await ongoingContract.tokenAddress(depositId)).to.equal(mockNft.address);
				expect(await ongoingContract.tokenId(depositId)).to.equal(1);
				expect(await ongoingContract.expiration(depositId)).to.equal(thirtyDays);
				expect(await ongoingContract.isNFT(depositId)).to.equal(true);

				const depositTime = await ongoingContract.depositTime(depositId);
				expect(depositTime.toString()).to.equal(expectedTimestamp.toString());
			});
		});

		describe('transfer', () => {
			it('should transfer NFT from owner to bounty contract', async () => {
				// ASSUME
				expect(await mockNft.ownerOf(0)).to.equal(owner.address);

				// ACT
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 0, 1, []);

				// ASSERT
				expect(await mockNft.ownerOf(0)).to.equal(ongoingContract.address);
			});
		});
	});

	describe('refundDeposit', () => {

		describe('REVERTS', () => {
			it('should revert if not called by Deposit Manager contract', async () => {
				// ARRANGE
				const [, , , , , notDepositManager] = await ethers.getSigners();
				let issueWithNonOwnerAccount = ongoingContract.connect(notDepositManager);

				const mockDepositId = generateDepositId(owner.address, mockLink.address, 123);

				// ASSERT
				await expect(issueWithNonOwnerAccount.refundDeposit(mockDepositId, owner.address, 100)).to.be.revertedWith('DepositManagerOwnable: caller is not the current OpenQ Deposit Manager');
			});

			it('should revert if called before expiration', async () => {
				// ARRANGE
				const volume = 100;

				// ASSUME
				const linkDepositId = generateDepositId(mockId, 0);
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, volume, 10000);

				// ACT
				await expect(ongoingContract.connect(depositManager).refundDeposit(linkDepositId, owner.address, volume)).to.be.revertedWith('PREMATURE_REFUND_REQUEST');
			});
		});

		describe('refunded', () => {
			it('should set deposit refunded to true on refund', async () => {
				// ARRANGE
				const volume = 100;

				// ASSUME
				const linkDepositId = generateDepositId(mockId, 0);
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, volume, 1);
				expect(await ongoingContract.refunded(linkDepositId)).to.equal(false);

				const daiDepositId = generateDepositId(mockId, 1);
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockDai.address, volume, 1);
				expect(await ongoingContract.refunded(daiDepositId)).to.equal(false);

				const protocolDepositId = generateDepositId(mockId, 2);
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, ethers.constants.AddressZero, volume, 1, { value: volume });
				expect(await ongoingContract.refunded(protocolDepositId)).to.equal(false);

				// ACT
				await ongoingContract.connect(depositManager).refundDeposit(linkDepositId, owner.address, volume);
				await ongoingContract.connect(depositManager).refundDeposit(daiDepositId, owner.address, volume);
				await ongoingContract.connect(depositManager).refundDeposit(protocolDepositId, owner.address, volume);

				// ASSERT
				expect(await ongoingContract.refunded(linkDepositId)).to.equal(true);
				expect(await ongoingContract.refunded(daiDepositId)).to.equal(true);
				expect(await ongoingContract.refunded(protocolDepositId)).to.equal(true);
			});
		});

		describe('transfer', () => {
			it('should transfer refunded ERC20 and protocol token asset from bounty contract to funder', async () => {
				// ARRANGE
				const volume = 100;

				const linkDepositId = generateDepositId(mockId, 0);
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, volume, 1);

				const daiDepositId = generateDepositId(mockId, 1);
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockDai.address, volume, 1);

				const protocolDepositId = generateDepositId(mockId, 2);
				await ongoingContract.connect(depositManager).receiveFunds(owner.address, ethers.constants.AddressZero, volume, 1, { value: volume });

				// ASSUME
				const bountyMockTokenBalance = (await mockLink.balanceOf(ongoingContract.address)).toString();
				const bountyFakeTokenBalance = (await mockDai.balanceOf(ongoingContract.address)).toString();
				const bountyProtocolTokenBalance = (await ethers.provider.getBalance(ongoingContract.address)).toString();

				expect(bountyMockTokenBalance).to.equal('100');
				expect(bountyFakeTokenBalance).to.equal('100');
				expect(bountyProtocolTokenBalance).to.equal('100');

				const funderMockLinkBalance = (await mockLink.balanceOf(owner.address)).toString();
				const funderFakeTokenBalance = (await mockDai.balanceOf(owner.address)).toString();
				expect(funderMockLinkBalance).to.equal('9999999999999999999900');
				expect(funderFakeTokenBalance).to.equal('9999999999999999999900');

				// // // ACT
				await ongoingContract.connect(depositManager).refundDeposit(linkDepositId, owner.address, volume);
				await ongoingContract.connect(depositManager).refundDeposit(daiDepositId, owner.address, volume);

				// // // // ASSERT
				const newBountyMockLinkBalance = (await mockLink.balanceOf(ongoingContract.address)).toString();
				const newBountyFakeTokenBalance = (await mockDai.balanceOf(ongoingContract.address)).toString();
				expect(newBountyMockLinkBalance).to.equal('0');
				expect(newBountyFakeTokenBalance).to.equal('0');

				const newFunderMockLinkBalance = (await mockLink.balanceOf(owner.address)).toString();
				const newFunderFakeTokenBalance = (await mockDai.balanceOf(owner.address)).toString();
				expect(newFunderMockLinkBalance).to.equal('10000000000000000000000');
				expect(newFunderFakeTokenBalance).to.equal('10000000000000000000000');
			});

			it('should transfer NFT from bounty to sender', async () => {
				// ASSUME
				expect(await mockNft.ownerOf(1)).to.equal(owner.address);

				// ARRANGE
				const depositId = generateDepositId(mockId, 0);
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 1, 1, []);

				// ASSUME
				expect(await mockNft.ownerOf(1)).to.equal(ongoingContract.address);

				// ACT
				await ongoingContract.connect(depositManager).refundDeposit(depositId, owner.address, 0);

				// ASSERT
				expect(await mockNft.ownerOf(1)).to.equal(owner.address);
			});
		});
	});

	describe('extendDeposit', () => {
		it('should extend deposit expiration by _seconds', async () => {
			// ARRANGE
			const volume = 100;

			// ASSUME
			const linkDepositId = generateDepositId(mockId, 0);
			await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, volume, 1);

			// ACT
			await ongoingContract.connect(depositManager).extendDeposit(linkDepositId, 1000, owner.address);

			// ASSERT
			// This will fail to revert without a deposit extension. Cannot test the counter case due to the inability to call refund twice, see DEPOSIT_ALREADY_REFUNDED
			await expect(ongoingContract.connect(depositManager).refundDeposit(linkDepositId, owner.address, volume)).to.be.revertedWith('PREMATURE_REFUND_REQUEST');
		});
	});

	describe('claimOngoingPayout', () => {
		it('should transfer payoutVolume of payoutTokenAddress to claimant', async () => {
			// ARRANGE
			const volume = 300;

			const [, claimer] = await ethers.getSigners();

			await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, volume, thirtyDays);

			const deposits = await ongoingContract.getDeposits();
			const linkDepositId = deposits[0];

			// ASSUME
			const bountyMockTokenBalance = (await mockLink.balanceOf(ongoingContract.address)).toString();
			expect(bountyMockTokenBalance).to.equal('300');

			const claimerMockTokenBalance = (await mockLink.balanceOf(claimer.address)).toString();
			expect(claimerMockTokenBalance).to.equal('0');

			// ACT
			await ongoingContract.connect(claimManager).claimOngoingPayout(claimer.address, closerData);

			// ASSERT
			const newClaimerMockTokenBalance = (await mockLink.balanceOf(claimer.address)).toString();
			expect(newClaimerMockTokenBalance).to.equal('100');

			const newBountyMockLinkBalance = (await mockLink.balanceOf(ongoingContract.address)).toString();
			expect(newBountyMockLinkBalance).to.equal('200');

			// ACT
			await ongoingContract.connect(claimManager).claimOngoingPayout(claimer.address, closerData);

			// ASSERT
			const newClaimerMockTokenBalance2 = (await mockLink.balanceOf(claimer.address)).toString();
			expect(newClaimerMockTokenBalance2).to.equal('200');

			const newBountyMockLinkBalance2 = (await mockLink.balanceOf(ongoingContract.address)).toString();
			expect(newBountyMockLinkBalance2).to.equal('100');
		});

		it('should set claimantId to true for the claimant and claimant asset', async () => {
			// ARRANGE
			let claimantId = generateClaimantId('FlacoJones', "https://github.com/OpenQDev/OpenQ-Frontend/pull/398");
			await ongoingContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, 10000000, thirtyDays);


			// ASSUME
			let claimantIdClaimed = await ongoingContract.claimantId(claimantId);
			expect(claimantIdClaimed).to.equal(false);

			// ACT
			await ongoingContract.connect(claimManager).claimOngoingPayout(owner.address, closerData);

			// ASSERT
			claimantIdClaimed = await ongoingContract.claimantId(claimantId);
			expect(claimantIdClaimed).to.equal(true);
		});

		it('should revert if not called by claim manager', async () => {
			// ACT/ASSERT
			await expect(ongoingContract.claimOngoingPayout(owner.address, closerData)).to.be.revertedWith('ClaimManagerOwnable: caller is not the current OpenQ Claim Manager');
		});
	});

	describe('claimNft', () => {
		describe('require and revert', () => {
			it('should revert if not called by Claim Manager contract', async () => {
				// ARRANGE
				const [, , , , , notClaimManager] = await ethers.getSigners();
				const value = 10000;
				let issueWithNonOwnerAccount = ongoingContract.connect(notClaimManager);

				// ASSERT
				await expect(issueWithNonOwnerAccount.claimNft(notClaimManager.address, ethers.utils.formatBytes32String('mockDepositId'))).to.be.revertedWith('ClaimManagerOwnable: caller is not the current OpenQ Claim Manager');
			});
		});

		describe('transfer', () => {
			it('should transfer NFT deposit from bounty contract to claimer', async () => {
				// ASSUME
				expect(await mockNft.ownerOf(1)).to.equal(owner.address);

				// ARRANGE
				const depositId = generateDepositId(mockId, 0);
				await ongoingContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 1, 1, []);

				// ASSUME
				expect(await mockNft.ownerOf(1)).to.equal(ongoingContract.address);

				// ACT
				await ongoingContract.connect(claimManager).claimNft(owner.address, depositId);

				// ASSERT
				expect(await mockNft.ownerOf(1)).to.equal(owner.address);
			});
		});
	});

	describe('closeOngoing', () => {
		describe('closeOngoing', () => {
			it('should revert if not called by OpenQ contract', async () => {
				// ARRANGE
				const [, , , , , notOpenQ] = await ethers.getSigners();

				// ASSERT
				await expect(ongoingContract.connect(notOpenQ).closeOngoing(owner.address)).to.be.revertedWith('Method is only callable by OpenQ');
			});

			it('should revert if already closed', async () => {
				// ARRANGE
				ongoingContract.connect(owner).closeOngoing(owner.address);
				//ACT / ASSERT
				await expect(ongoingContract.connect(owner).closeOngoing(owner.address)).to.be.revertedWith('CONTRACT_ALREADY_CLOSED');
			});

			it('should change status to CLOSED (1)', async () => {
				// ASSUME
				await expect(await ongoingContract.status()).equals(0);
				//ACT
				await ongoingContract.connect(owner).closeOngoing(owner.address);
				// ASSERT
				await expect(await ongoingContract.status()).equals(1);
			});

			it('should set bountyClosedTime to the block timestamp', async () => {
				// ARRANGE
				const expectedTimestamp = await setNextBlockTimestamp();
				// ASSUME
				await expect(await ongoingContract.bountyClosedTime()).equals(0);
				//ACT
				await ongoingContract.connect(owner).closeOngoing(owner.address);
				// ASSERT
				await expect(await ongoingContract.bountyClosedTime()).equals(expectedTimestamp);
			});
		});
	});

	describe('setFundingGoal', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();
			const volume = 10000;
			let bountyWithNonOwnerAccount = ongoingContract.connect(notOwner);

			// ASSERT
			await expect(bountyWithNonOwnerAccount.setFundingGoal(mockLink.address, volume)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set funding goal when none exists', async () => {
			// ASSUME
			let hasNoFundingGoal = await ongoingContract_noFundingGoal.hasFundingGoal();
			expect(hasNoFundingGoal).to.equal(false);

			// ACT
			await ongoingContract_noFundingGoal.setFundingGoal(mockLink.address, 100);

			// ASSERT
			let hasNoFundingGoalexpected = await ongoingContract_noFundingGoal.hasFundingGoal();
			let fundingToken = await ongoingContract_noFundingGoal.fundingToken();
			let fundingGoal = await ongoingContract_noFundingGoal.fundingGoal();
			expect(hasNoFundingGoalexpected).to.equal(true);
			expect(fundingToken).to.equal(mockLink.address);
			expect(fundingToken).to.equal(mockLink.address);
		});
	});

	describe('setSupportingDocuments', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			// ASSERT
			await expect(ongoingContract.connect(notOwner).setSupportingDocuments(true)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set supportingDocuments', async () => {
			// ASSUME
			expect(await ongoingContract.supportingDocuments()).to.equal(true)
			
			// ACT
			await ongoingContract.setSupportingDocuments(false);

			// ASSERT
			expect(await ongoingContract.supportingDocuments()).to.equal(false)
		})
	})

	describe('setInvoiceComplete', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			const claimId = generateClaimantId(mockOpenQId, mockClaimantAsset)
			let setInvoiceCompleteData = abiCoder.encode(["bytes32", "bool"], [claimId, true]);

			// ASSERT
			await expect(ongoingContract.connect(notOwner).setInvoiceComplete(setInvoiceCompleteData)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set invoiceComplete for given claimantId', async () => {
			const claimId = generateClaimantId(mockOpenQId, mockClaimantAsset)
			let setInvoiceCompleteData = abiCoder.encode(["bytes32", "bool"], [claimId, true]);
			
			// ASSUME
			expect(await ongoingContract.invoiceComplete(claimId)).to.equal(false)

			// ACT
			await ongoingContract.setInvoiceComplete(setInvoiceCompleteData);

			// ASSERT
			expect(await ongoingContract.invoiceComplete(claimId)).to.equal(true)
		})
	})

	describe('setSupportingDocumentsComplete', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			const claimId = generateClaimantId(mockOpenQId, mockClaimantAsset)
			let setSupportingDocumentsCompleteData = abiCoder.encode(["bytes32", "bool"], [claimId, true]);

			// ASSERT
			await expect(ongoingContract.connect(notOwner).setSupportingDocumentsComplete(setSupportingDocumentsCompleteData)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set supportingDocumentsComplete for given claimantId', async () => {
			const claimId = generateClaimantId(mockOpenQId, mockClaimantAsset)
			let setSupportingDocumentsCompleteData = abiCoder.encode(["bytes32", "bool"], [claimId, true]);

			// ASSUME
			expect(await ongoingContract.supportingDocumentsComplete(claimId)).to.equal(false)
			
			// ACT
			await ongoingContract.setSupportingDocumentsComplete(setSupportingDocumentsCompleteData);

			// ASSERT
			expect(await ongoingContract.supportingDocumentsComplete(claimId)).to.equal(true)
		})
	})

});

async function setNextBlockTimestamp() {
	return new Promise(async (resolve,) => {
		const blockNumBefore = await ethers.provider.getBlockNumber();
		const blockBefore = await ethers.provider.getBlock(blockNumBefore);
		const timestampBefore = blockBefore.timestamp;
		const expectedTimestamp = timestampBefore + 10;
		await network.provider.send("evm_setNextBlockTimestamp", [expectedTimestamp]);
		resolve(expectedTimestamp);
	});
}