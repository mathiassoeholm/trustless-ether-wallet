import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import DefaultWalletActions from '../../modules/wallet/actions';

const styles = theme =>
	({
		root:
		{
			padding: theme.spacing.unit,
		},
	});

const SendCurrency = ({
	classes,
	amount,
	onAmountChanged,
	receiver,
	onReceiverChanged,
	onClickedSubmit,
}) =>
	(
		<Paper className={classes.root}>
			<Typography variant="headline">Send Ethereum</Typography>

			<TextField
				id="amountField"
				label="Amount"
				margin="normal"
				type="number"
				value={amount}
				onChange={onAmountChanged}
			/>
			<br />
			<TextField
				id="receiverField"
				label="Receiver"
				margin="normal"
				value={receiver}
				onChange={onReceiverChanged}
			/>
			<br />
			<Button id="submitButton" variant="raised" color="primary" onClick={onClickedSubmit}>
				Perform Transaction
			</Button>
		</Paper>
	);

SendCurrency.propTypes =
{
	classes: PropTypes.object.isRequired,
	amount: PropTypes.number.isRequired,
	onAmountChanged: PropTypes.func.isRequired,
	receiver: PropTypes.string.isRequired,
	onReceiverChanged: PropTypes.func.isRequired,
	onClickedSubmit: PropTypes.func.isRequired,
};

export default (WalletActions) =>
{
	const walletActions = WalletActions ? WalletActions() : DefaultWalletActions();

	const mapStateToProps = state =>
		({
			amount: state.wallet.amount ? state.wallet.amount : 0,
			receiver: state.wallet.receiver ? state.wallet.receiver : '',
		});

	const mapDispatchToProps = dispatch =>
		({
			onAmountChanged: event => dispatch(walletActions.changeAmount(event.target.value)),
			onReceiverChanged: event => dispatch(walletActions.changeReceiver(event.target.value)),
			onClickedSubmit: () => dispatch(walletActions.performTransaction()),
		});

	return withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SendCurrency));
};
