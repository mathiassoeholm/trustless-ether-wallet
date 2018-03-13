import { connect } from 'react-redux';

import menuTypes from '../modules/flow/menuTypes';

const ActiveMenuTitle = ({activeMenu}) =>
{
	switch (activeMenu)
	{
		case menuTypes.CREATE_USER:
			return 'Create User';
		case menuTypes.LOGIN:
			return 'Login';
		case menuTypes.WALLET:
			return 'Wallet';
		default:
			throw new Error('Unknown menu type');
	}
};

const mapStateToProps = (state) =>
({
	activeMenu: state.flow.activeMenu
});

export default connect(mapStateToProps)(ActiveMenuTitle);
