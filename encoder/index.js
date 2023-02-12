const atomicEncode = (hasFundingGoal, fundingGoalTokenAddress, fundingGoalVolume, invoiceRequired, kycRequired, supportingDocumentsRequired, issuerExternalUserId, alternativeName, alternativeLogo) => {
	let abiCoder = new ethers.utils.AbiCoder;
	const initializationSchema = ['bool', 'address', 'uint256' , 'bool' , 'bool', 'bool' , 'string', 'string' , 'string'];
	const initializationData = [hasFundingGoal, fundingGoalTokenAddress, fundingGoalVolume, invoiceRequired, kycRequired, supportingDocumentsRequired, issuerExternalUserId, alternativeName, alternativeLogo];
	console.log(abiCoder.encode(initializationSchema, initializationData));
	return abiCoder.encode(initializationSchema, initializationData);
};

const ongoingEncode = (payoutTokenAddress, payoutVolume, hasFundingGoal, fundingToken, fundingGoal, invoiceRequired, kycRequired, supportingDocumentsRequired, issuerExternalUserId, alternativeName, alternativeLogo) => {
	let abiCoder = new ethers.utils.AbiCoder;
	const initializationSchema = ['address', 'uint256', 'bool', 'address', 'uint256', 'bool', 'bool', 'bool', 'string', 'string', 'string'];
	const initializationData = [payoutTokenAddress, payoutVolume, hasFundingGoal, fundingToken, fundingGoal, invoiceRequired, kycRequired, supportingDocumentsRequired, issuerExternalUserId, alternativeName, alternativeLogo];
	return abiCoder.encode(initializationSchema, initializationData);
};

const tieredPercentageEncode = (payoutSchedule, hasFundingGoal, fundingToken, fundingGoal, invoiceRequired, kycRequired, supportingDocumentsRequired, issuerExternalUserId, alternativeName, alternativeLogo) => {
	let abiCoder = new ethers.utils.AbiCoder;
	
	const parsedPayoutSchedule = payoutSchedule.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '').split(',').map(el => parseInt(el));

	const initializationSchema = ['uint256[]', 'bool', 'address', 'uint256', 'bool', 'bool', 'bool', 'string', 'string', 'string'];
	const initializationData = [parsedPayoutSchedule, hasFundingGoal, fundingToken, fundingGoal, invoiceRequired, kycRequired, supportingDocumentsRequired, issuerExternalUserId, alternativeName, alternativeLogo];
	return abiCoder.encode(initializationSchema, initializationData);
};

const tieredFixedEncode = (payoutSchedule, payoutTokenAddress, invoiceRequired, kycRequired, supportingDocumentsRequired, issuerExternalUserId, alternativeName, alternativeLogo) => {
	let abiCoder = new ethers.utils.AbiCoder;

	const parsedPayoutSchedule = payoutSchedule.replaceAll('"', '').replaceAll('[', '').replaceAll(']', '').split(',').map(el => parseInt(el));

	const initializationSchema = ['uint256[]', 'address', 'bool', 'bool', 'bool', 'string', 'string', 'string'];
	const initializationData = [parsedPayoutSchedule, payoutTokenAddress, invoiceRequired, kycRequired, supportingDocumentsRequired, issuerExternalUserId, alternativeName, alternativeLogo];
	return abiCoder.encode(initializationSchema, initializationData);
};

const Encoder = { atomicEncode, ongoingEncode, tieredPercentageEncode, tieredFixedEncode };

module.exports = Encoder;

