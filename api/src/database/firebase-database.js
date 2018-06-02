import admin from 'firebase-admin';

export default
{
	createUser: ({ username, cipher, salt1, salt2, hashedAuthKey }) =>
		admin.firestore().collection('users').doc(username).set(
		{
			cipher,
			salt1,
			salt2,
			hashedAuthKey,
		}),

	getSalt1: username =>
		admin.firestore().collection('users').doc(username).get()
			.then(doc =>
			{
				if (doc.exists)
				{
					return doc.data().salt1;
				}
				else
				{
					throw new Error('User does not exist');
				}
			}),
};
