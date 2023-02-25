const { ethers } = require('hardhat');
const path = require('path');
const tieredPercentage_NoFundingGoal = require('./tieredPercentage_NoFundingGoal');

require('dotenv').config({
	path: path.resolve(__dirname, '../../.env.contracts'),
});

async function deployOpenQ() {
	const OpenQ = await ethers.getContractFactory('OpenQV1');

	let abiCoder = new ethers.utils.AbiCoder();
	const openQ = await OpenQ.attach(process.env.OPENQ_PROXY_ADDRESS);

	///---------ATOMIC --------///
	const initializationSchema = ['uint256', 'bool'];
	const initializationData = [1, true];
	
	const atomic_SupportingDocumentsComplete = abiCoder.encode(
		initializationSchema,
		initializationData
	);

	const id = (Math.random(1) * 100).toString();
	await openQ.mintBounty(id, 'MDEyOk9yZ2FuaXphdGlvbjc3NDAyNTM4', tieredPercentage_NoFundingGoal);

	const txn = await openQ.setSupportingDocumentsComplete(
		id,
		atomic_SupportingDocumentsComplete
	);
	const receipt = await txn.wait();
	const InvoiceCompleteSetEvent = receipt.events.find(
		(eventObj) => eventObj.event === 'InvoiceCompleteSet'
	);
	console.log(InvoiceCompleteSetEvent);
}

async function main() {
	await deployOpenQ();
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

module.exports = deployOpenQ;