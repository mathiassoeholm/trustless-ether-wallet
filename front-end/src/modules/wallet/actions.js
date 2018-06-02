import walletActionTypes from './action-types';
import errorMessages from './error-messages';

const balanceUpdateFailed = error =>
	({
		type: walletActionTypes.BALANCE_UPDATE_FAILED,
		error,
	});

const updateBalance = balance =>
	({
		type: walletActionTypes.UPDATE_BALANCE,
		balance,
	});

const statusUpdate = (isFinished, errorMessage) =>
	({
		type: walletActionTypes.TRANSACTION_STATUS_UPDATE,
		status:
		{
			isFinished,
			errorMessage,
		},
	});

const invalidAmount = error =>
	({
		type: walletActionTypes.INVALID_AMOUNT_ERROR,
		error,
	});

const invalidReceiver = error =>
	({
		type: walletActionTypes.INVALID_RECEIVER_ERROR,
		error,
	});

const transactionFinished = () =>
	({
		type: walletActionTypes.TRANSACTION_FINISHED,
	});

const startTransaction = () =>
	({
		type: walletActionTypes.START_TRANSACTION,
	});

const changeAmount = amount =>
	({
		type: walletActionTypes.CHANGE_AMOUNT,
		amount,
	});

const changeReceiver = receiver =>
	({
		type: walletActionTypes.CHANGE_RECEIVER,
		receiver,
	});

export default {
	startTransaction,
	changeAmount,
	changeReceiver,
	balanceUpdateFailed,
	updateBalance,
	invalidAmount,
	invalidReceiver,
	statusUpdate,
	transactionFinished,
};