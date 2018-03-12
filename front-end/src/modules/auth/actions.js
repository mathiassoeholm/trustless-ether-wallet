import t from './actionTypes';
import protocol from './protocol';

function progressUpdate(progress, message)
{
	return (
	{
		type: t.PROGRESS_UPDATE,
		status:
		{
			progress,
			message
		}
	});
}

function loginAttemptFinished(errorMessage = undefined)
{
	return (
	{
		type: t.LOGIN_ATTEMPT_FINISHED,
		errorMessage
	});
}

function createUser(password)
{
	return (dispatch, getState) =>
	{
		const user = getState().auth.user;

		const progressCallback = (p, m) =>
		{
			dispatch(progressUpdate(p, m));
		};

		protocol.createUser(user, password, progressCallback)
		.then((result) =>
		{
			dispatch(loginAttemptFinished());

			dispatch(
			{
				type: t.LOG_IN,
				user: result.user
			});

			console.log('created user');
		})
		.catch((error) =>
		{
			dispatch(loginAttemptFinished(error));			
			
			console.log('error: ' + error);
		});
	};
}

function login(password)
{
	return (dispatch, getState) =>
	{
		const username = getState().auth.user.username;

		const progressCallback = (p, m) =>
		{
			dispatch(progressUpdate(p, m));
		};

		protocol.login(username, password, progressCallback)
		.then((result) =>
		{
			dispatch(loginAttemptFinished());			

			dispatch(
			{
				type: t.LOG_IN,
				user: 
				{
					username
				}
			});
		})
		.catch((error) =>
		{
			dispatch(loginAttemptFinished(error));			
			
			console.log('error: ' + error);
		});
	};
}

function logout()
{
	return {
		type: t.LOG_OUT
	};
}

function changeUsername(username)
{
	return (dispatch) =>
	{
		dispatch(
		{
			type: t.CHANGE_USERNAME,
			username
		});
	};
}

export default
{
	createUser,
	login,
	logout,
	changeUsername
};
