import stubApi from '../modules/auth/api/stubApi';
import StubWalletProvider from '../modules/wallet/provider/stubProvider';
import EthereumWalletProvider from '../modules/wallet/provider/ethereumProvider';
import makeProtocol from '../modules/auth/protocol/protocol';
import utils from '../modules/auth/protocol/utils';

export default
{
	authApi: stubApi,
	WalletProvider: EthereumWalletProvider,
	MakeAuthProtocol: makeProtocol,
	slowKeyGenerator: utils.keyGenerator(2),
	fastKeyGenerator: utils.keyGenerator(2),
};
