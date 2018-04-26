import each from 'jest-each';
import utils from './utils';

import simpleProtocol from './simpleProtocol';
import stubApi from '../api/stubApi';

each(
	[
		['Simple Protocol', simpleProtocol],
	]).describe('%s', (protocolName, chosenProtocol) =>
{
	let protocol;
	const testKeyGenerator = utils.keyGenerator(1);

	beforeEach(() =>
	{
		protocol = chosenProtocol(testKeyGenerator, stubApi);
	});

	it('creates a user', async () =>
	{
		await protocol.createUser({ username: 'kurt' }, 'start123', {});
		expect(stubApi.getState().username).toEqual('kurt');
	});

	it('creates and stores secret', async () =>
	{
		await protocol.createUser({ username: 'kurt' }, 'start123', { username: 'kurt' });
		const result = await protocol.login('kurt', 'start123');

		expect(result.username).toEqual('kurt');
	});

	it('updates progress correctly when logging in', async () =>
	{
		let previousProgress = 0;

		const progressCallback = (p) =>
		{
			expect(p).toBeGreaterThanOrEqual(previousProgress);
			previousProgress = p;
		};

		await protocol.createUser({ username: 'kurt' }, 'start123', {}, progressCallback);

		expect(previousProgress).toEqual(1);

		previousProgress = 0;

		await protocol.login('kurt', 'start123', progressCallback);

		expect(previousProgress).toEqual(1);
	});

	it('encrypts secret correctly and stores on api when creating', async () =>
	{
		const username = 'bob';

		const secret =
		{
			username,
		};

		const password = 'password';

		await protocol.createUser({ username }, password, secret);

		const { salt } = stubApi.getState();
		const key = await testKeyGenerator(password, salt);

		const decryptedCipher = utils.decryptAES(stubApi.getState().cipher, key);
		const decryptedSecret = JSON.parse(decryptedCipher);
		expect(decryptedSecret).toEqual(secret);
	});

	it('fails to login if wrong password supplied', async () =>
	{
		await protocol.createUser({ username: 'bob' }, 'bob', {});

		let error;

		try
		{
			await protocol.login('bob', 'alice');
		}
		catch (err)
		{
			error = err;
		}

		expect(error).not.toBeNull();
	});
});
