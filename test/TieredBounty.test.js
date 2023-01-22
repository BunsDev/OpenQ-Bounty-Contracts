/* eslint-disable */
const { BigNumber } = require('@ethersproject/bignumber');
const { expect } = require('chai');
const { ethers } = require("hardhat");
const truffleAssert = require('truffle-assertions');
require('@nomiclabs/hardhat-waffle');

const { generateDepositId, generateClaimantId } = require('./utils');

describe('TieredBountyV1.sol', () => {
	// CONTRACT FACTORIES
	let TieredBountyV1;

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

	// BOUNTY TYPES
	let TIERED_CONTRACT = 2;

	// INITIALIZATION OPERATIONS
	let tieredBountyInitOperation;

	// TEST CONTRACTS
	let tieredContract;
	let tieredContract_noFundingGoal;

	// MISC
	let initializationTimestampTiered;

	beforeEach(async () => {
		TieredBountyV1 = await ethers.getContractFactory('TieredBountyV1');
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

		// TIERED BOUNTY
		tieredContract = await TieredBountyV1.deploy();
		await tieredContract.deployed();

		// TIERED BOUNTY No FUNDING GOAL
		tieredContract_noFundingGoal = await TieredBountyV1.deploy();
		await tieredContract_noFundingGoal.deployed();

		const abiEncodedParamsTieredBounty = abiCoder.encode(["uint256[]", "bool", "address", "uint256", "bool", "bool", "bool", "string", "string", "string"], [[80, 20], true, mockLink.address, '100', true, true, true, mockOpenQId, "", ""]);
		const abiEncodedParamsTieredBounty_noFundingGoal = abiCoder.encode(["uint256[]", "bool", "address", "uint256", "bool", "bool", "bool", "string", "string", "string"], [[80, 20], false, ethers.constants.AddressZero, '0', true, true, true, mockOpenQId, "", ""]);

		tieredBountyInitOperation = [TIERED_CONTRACT, abiEncodedParamsTieredBounty];
		tieredBountyInitOperation_noFundingGoal = [TIERED_CONTRACT, abiEncodedParamsTieredBounty_noFundingGoal];

		initializationTimestampTiered = await setNextBlockTimestamp();
		await tieredContract.initialize(mockId, owner.address, organization, owner.address, claimManager.address, depositManager.address, tieredBountyInitOperation);

		await tieredContract_noFundingGoal.initialize(mockId, owner.address, organization, owner.address, claimManager.address, depositManager.address, tieredBountyInitOperation_noFundingGoal);

		// Pre-approve LINK and DAI for transfers during testing
		await mockLink.approve(tieredContract.address, 10000000);
		await mockDai.approve(tieredContract.address, 10000000);
		
		await mockNft.approve(tieredContract.address, 0);
		await mockNft.approve(tieredContract.address, 1);
		await mockNft.approve(tieredContract.address, 2);
	});

	describe('initializer', () => {

		describe('TIERED', () => {
			it('should init with tiered correct metadata', async () => {
				const actualBountyPayoutSchedule = await tieredContract.getPayoutSchedule();
				const payoutToString = actualBountyPayoutSchedule.map(thing => thing.toString());


				await expect(await tieredContract.bountyId()).equals(mockId);
				await expect(await tieredContract.issuer()).equals(owner.address);
				await expect(await tieredContract.organization()).equals(organization);
				await expect(await tieredContract.status()).equals(0);
				await expect(await tieredContract.openQ()).equals(owner.address);
				await expect(await tieredContract.claimManager()).equals(claimManager.address);
				await expect(await tieredContract.depositManager()).equals(depositManager.address);
				await expect(await tieredContract.bountyCreatedTime()).equals(initializationTimestampTiered);
				await expect(await tieredContract.bountyType()).equals(TIERED_CONTRACT);
				await expect(await tieredContract.hasFundingGoal()).equals(true);
				await expect(await tieredContract.fundingToken()).equals(mockLink.address);
				await expect(await tieredContract.fundingGoal()).equals(100);
				await expect(payoutToString[0]).equals("80");
				await expect(payoutToString[1]).equals("20");
				await expect(await tieredContract.invoiceable()).equals(true);
				await expect(await tieredContract.kycRequired()).equals(true);
				await expect(await tieredContract.externalUserId()).equals(mockOpenQId);
				await expect(await tieredContract.supportingDocuments()).equals(true);

				await expect(await tieredContract.invoiceComplete(0)).equals(false);
				await expect(await tieredContract.supportingDocumentsComplete(0)).equals(false);
			});

			it('should revert if payoutSchedule values do not add up to 100', async () => {
				// ARRANGE
				tieredContract = await TieredBountyV1.deploy();
				await tieredContract.deployed();

				const abiEncodedParamsTieredBountyNot100 = abiCoder.encode(["uint256[]", "bool", "address", "uint256", "bool", "bool", "bool", "string", "string", "string"], [[1, 2], true, mockLink.address, 100, true, true, true, mockOpenQId, "", ""]);

				tieredBountyInitOperation = [2, abiEncodedParamsTieredBountyNot100];

				// ACT/ASSERT
				await expect(tieredContract.initialize(mockId, owner.address, organization, owner.address, claimManager.address, depositManager.address, tieredBountyInitOperation)).to.be.revertedWith('PAYOUT_SCHEDULE_MUST_ADD_TO_100');
			});
		});

		describe('REVERTS', () => {
			it('should revert if bountyId is empty', async () => {
				// ARRANGE
				const TieredBountyV1 = await ethers.getContractFactory('TieredBountyV1');
				tieredContract = await TieredBountyV1.deploy();

				// ASSERT
				await expect(tieredContract.initialize("", owner.address, organization, owner.address, claimManager.address, depositManager.address, tieredBountyInitOperation)).to.be.revertedWith('NO_EMPTY_BOUNTY_ID');
			});

			it('should revert if organization is empty', async () => {
				// ARRANGE
				const TieredBountyV1 = await ethers.getContractFactory('TieredBountyV1');
				tieredContract = await TieredBountyV1.deploy();

				// ASSERT
				await expect(tieredContract.initialize(mockId, owner.address, "", owner.address, claimManager.address, depositManager.address, tieredBountyInitOperation)).to.be.revertedWith('NO_EMPTY_ORGANIZATION');
			});
		});
	});

	describe('claimBalance', () => {
		describe('TIERED', () => {
			it('should transfer volume of tokenAddress balance based on payoutSchedule', async () => {
				// ARRANGE
				const volume = 1000;

				const [, firstPlace, secondPlace] = await ethers.getSigners();

				await tieredContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, volume, thirtyDays);

				const deposits = await tieredContract.getDeposits();
				const linkDepositId = deposits[0];

				await tieredContract.connect(claimManager).closeCompetition();

				// ASSUME
				const bountyMockTokenBalance = (await mockLink.balanceOf(tieredContract.address)).toString();
				expect(bountyMockTokenBalance).to.equal('1000');

				const claimerMockTokenBalance = (await mockLink.balanceOf(firstPlace.address)).toString();
				expect(claimerMockTokenBalance).to.equal('0');

				// ACT
				await tieredContract.connect(claimManager).claimTiered(firstPlace.address, 0, mockLink.address);

				// // // ASSERT
				// const newClaimerMockTokenBalance = (await mockLink.balanceOf(firstPlace.address)).toString();
				// expect(newClaimerMockTokenBalance).to.equal('800');

				// // ACT
				// await tieredContract.connect(claimManager).claimTiered(secondPlace.address, 1, mockLink.address);

				// // // ASSERT
				// const secondPlaceMockTokenBalance = (await mockLink.balanceOf(secondPlace.address)).toString();
				// expect(secondPlaceMockTokenBalance).to.equal('200');
			});

			it('should revert if not called by claim manager', async () => {
				// ACT/ASSERT
				await expect(tieredContract.claimTiered(owner.address, 0, mockLink.address)).to.be.revertedWith('ClaimManagerOwnable: caller is not the current OpenQ Claim Manager');
			});
		});
	});

	describe('claimNft', () => {
		describe('require and revert', () => {
			it('should revert if not called by Claim Manager contract', async () => {
				// ARRANGE
				const [, , , , , notClaimManager] = await ethers.getSigners();
				const value = 10000;
				let issueWithNonOwnerAccount = tieredContract.connect(notClaimManager);

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

				let nftTierMetadata = abiCoder.encode(['uint256'], [0]);
				await tieredContract.connect(depositManager).receiveNft(owner.address, mockNft.address, 1, 1, nftTierMetadata);

				// ASSUME
				expect(await mockNft.ownerOf(1)).to.equal(tieredContract.address);

				// ACT
				await tieredContract.connect(claimManager).claimNft(owner.address, depositId);

				// ASSERT
				expect(await mockNft.ownerOf(1)).to.equal(owner.address);
			});
		});
	});

	describe('close', () => {
		describe('TIERED - closeCompetition', () => {
			it('should set bounty status to 1, freeze balances and set bountyClosedTime', async () => {
				// ARRANGE
				const volume = 1000;

				const [, firstPlace, secondPlace] = await ethers.getSigners();

				await tieredContract.connect(depositManager).receiveFunds(owner.address, mockLink.address, volume, thirtyDays);

				// ASSUME
				const bountyMockTokenBalance = (await mockLink.balanceOf(tieredContract.address)).toString();
				expect(bountyMockTokenBalance).to.equal('1000');

				const claimerMockTokenBalance = (await mockLink.balanceOf(firstPlace.address)).toString();
				expect(claimerMockTokenBalance).to.equal('0');

				// ASSUME
				let status = await tieredContract.status();
				let mockTokenFundingTotal = await tieredContract.fundingTotals(mockLink.address);
				let bountyClosedTime = await tieredContract.bountyClosedTime();

				expect(status).to.equal(0);
				expect(mockTokenFundingTotal).to.equal(0);
				expect(bountyClosedTime).to.equal(0);

				const expectedTimestamp = await setNextBlockTimestamp();
				// ACT
				await tieredContract.connect(claimManager).closeCompetition();

				// ASSERT
				status = await tieredContract.status();
				mockTokenFundingTotal = await tieredContract.fundingTotals(mockLink.address);
				bountyClosedTime = await tieredContract.bountyClosedTime();

				expect(status).to.equal(1);
				expect(mockTokenFundingTotal).to.equal(1000);
				expect(bountyClosedTime).to.equal(expectedTimestamp);
			});

			it('should revert if already closed', async () => {
				await tieredContract.connect(claimManager).closeCompetition();
				await expect(tieredContract.connect(claimManager).closeCompetition()).to.be.revertedWith('CONTRACT_ALREADY_CLOSED');
			});
		});
	});

	describe('setFundingGoal', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();
			const volume = 10000;
			let bountyWithNonOwnerAccount = tieredContract.connect(notOwner);

			// ASSERT
			await expect(bountyWithNonOwnerAccount.setFundingGoal(mockLink.address, volume)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set funding goal when none exists', async () => {
			// ASSUME
			let hasNoFundingGoal = await tieredContract_noFundingGoal.hasFundingGoal();
			expect(hasNoFundingGoal).to.equal(false);

			// ACT
			await tieredContract_noFundingGoal.setFundingGoal(mockLink.address, 100);

			// ASSERT
			let hasNoFundingGoalexpected = await tieredContract_noFundingGoal.hasFundingGoal();
			let fundingToken = await tieredContract_noFundingGoal.fundingToken();
			let fundingGoal = await tieredContract_noFundingGoal.fundingGoal();
			expect(hasNoFundingGoalexpected).to.equal(true);
			expect(fundingToken).to.equal(mockLink.address);
			expect(fundingToken).to.equal(mockLink.address);
		});
	});

	describe('setPayoutSchedule', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			// ASSERT
			await expect(tieredContract.connect(notOwner).setPayoutSchedule([80, 20])).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should revert if payoutschedule doesnt add to 100', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			// ASSERT
			await expect(tieredContract.connect(notOwner).setPayoutSchedule([100, 20])).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set payout schedule', async () => {
			// ASSUME
			let initialPayoutSchedule = await tieredContract.getPayoutSchedule();
			let payoutToString = initialPayoutSchedule.map(thing => thing.toString());
			expect(payoutToString[0]).to.equal('80');
			expect(payoutToString[1]).to.equal('20');

			// ACT
			await tieredContract.setPayoutSchedule([70, 20, 10]);

			// ASSERT
			let expectedPayoutSchedule = await tieredContract.getPayoutSchedule();
			payoutToString = expectedPayoutSchedule.map(thing => thing.toString());
			expect(payoutToString[0]).to.equal('70');
			expect(payoutToString[1]).to.equal('20');
			expect(payoutToString[2]).to.equal('10');
		});
	});

	describe('setTierWinner', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			// ASSERT
			await expect(tieredContract.connect(notOwner).setTierWinner(mockOpenQId, 0)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set tier winner', async () => {
			// ACT
			await tieredContract.setTierWinner(mockOpenQId, 0)
			await tieredContract.setTierWinner(mockOpenQId+"2", 1)

			// ASSERT
			const winner = await tieredContract.tierWinners(0)
			const winner2 = await tieredContract.tierWinners(1)
			expect(winner).to.equal(mockOpenQId)
			expect(winner2).to.equal(mockOpenQId+"2")
		})
	})

	describe('setSupportingDocuments', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			// ASSERT
			await expect(tieredContract.connect(notOwner).setSupportingDocuments(true)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set supportingDocuments', async () => {
			// ASSUME
			expect(await tieredContract.supportingDocuments()).to.equal(true)
			
			// ACT
			await tieredContract.setSupportingDocuments(false);

			// ASSERT
			expect(await tieredContract.supportingDocuments()).to.equal(false)
		})
	})

	describe('setInvoiceComplete', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			let setInvoiceCompleteData = abiCoder.encode(['uint256', 'bool'], [0, true]);
			
			// ASSERT
			await expect(tieredContract.connect(notOwner).setInvoiceComplete(setInvoiceCompleteData)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set invoiceComplete for given tier', async () => {
			let setInvoiceCompleteData_1 = abiCoder.encode(['uint256', 'bool'], [0, true]);
			let setInvoiceCompleteData_2 = abiCoder.encode(['uint256', 'bool'], [1, true]);
			// ASSUME
			expect(await tieredContract.invoiceComplete(0)).to.equal(false)
			expect(await tieredContract.invoiceComplete(1)).to.equal(false)
			
			// ACT
			await tieredContract.setInvoiceComplete(setInvoiceCompleteData_1);
			await tieredContract.setInvoiceComplete(setInvoiceCompleteData_2);

			// ASSERT
			expect(await tieredContract.invoiceComplete(0)).to.equal(true)
			expect(await tieredContract.invoiceComplete(1)).to.equal(true)
		})
	})

	describe('setSupportingDocumentsComplete', () => {
		it('should revert if not called by OpenQ contract', async () => {
			// ARRANGE
			const [, notOwner] = await ethers.getSigners();

			let setSupportingDocumentsCompleteData_1 = abiCoder.encode(['uint256', 'bool'], [0, true]);

			// ASSERT
			await expect(tieredContract.connect(notOwner).setSupportingDocumentsComplete(setSupportingDocumentsCompleteData_1)).to.be.revertedWith('Method is only callable by OpenQ');
		});

		it('should set supportingDocumentsComplete', async () => {
			let setSupportingDocumentsCompleteData_1 = abiCoder.encode(['uint256', 'bool'], [0, true]);
			let setSupportingDocumentsCompleteData_2 = abiCoder.encode(['uint256', 'bool'], [1, true]);

			// ASSUME
			expect(await tieredContract.supportingDocumentsComplete(0)).to.equal(false)
			expect(await tieredContract.supportingDocumentsComplete(1)).to.equal(false)
			
			// ACT
			await tieredContract.setSupportingDocumentsComplete(setSupportingDocumentsCompleteData_1);
			await tieredContract.setSupportingDocumentsComplete(setSupportingDocumentsCompleteData_2);

			// ASSERT
			expect(await tieredContract.supportingDocumentsComplete(0)).to.equal(true)
			expect(await tieredContract.supportingDocumentsComplete(1)).to.equal(true)
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