const initialState = {
    isAuthenticated: false,
    user: {
        memberName: null
    }
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
    case 'SUCCESS_LOGIN':
        return Object.assign({}, state, {
            notification: {
                message: `Successfully logged in with user ${action.user.memberName}.`,
                level: 'success',
                title: 'Success'
            },
            user: action.user,
            token: action.token
        });

    case 'ERROR_LOGIN':
        return Object.assign({}, state, {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            error: {
                isError: true
            }
        });

    case 'SUCCESS_GETTING_USER':
        return Object.assign({}, state, {
            notification: {
                message: 'Successfully retrieved updated user',
                level: 'success',
                title: 'Success'
            },
            user: action.user
        });

    case 'ERROR_GETTING_USER':
        return Object.assign({}, state, {
            notification: {
                message: action.error,
                level: 'error',
                title: 'Error'
            },
            error: {
                isError: true
            }
        });


    case 'SET_CURRENT_USER':
        return Object.assign({}, state, {
            isAuthenticated: Object.keys(action.user).length !== 0,
            user: action.user
        });

    default:
        return state;
    }
};

export default authentication;
