import authentication from '../authentication';

describe('authentication reducer', () => {
    describe('REGISTER ACTIONS', () => {
        it('should handle initial state', () => {
            expect(authentication(undefined, {})).toEqual(
                {
                    isAuthenticated: false,
                    user: {
                        username: null
                    }
                }
            );
        });
    });

    describe('GET_USER ACTIONS', () => {
        it('should handle SUCCESS_GETTING_USER', () => {
            expect(authentication({}, {
                type: 'SUCCESS_GETTING_USER',
                user: {
                    username: 'testUser'
                }
            })).toEqual({
                notification: {
                    message: 'Successfully retrieved updated user',
                    level: 'success',
                    title: 'Success'
                },
                user: {
                    username: 'testUser'
                }
            });
        });

        it('should handle ERROR_GETTING_USER', () => {
            expect(authentication({}, {
                type: 'ERROR_GETTING_USER',
                error: 'Unable to get user testUser.'
            })).toEqual({
                notification: {
                    message: 'Unable to get user testUser.',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('LOGIN ACTIONS', () => {
        it('should handle SUCCESS_LOGIN', () => {
            expect(authentication({}, {
                type: 'SUCCESS_LOGIN',
                user: {
                    username: 'testUser'
                },
                token: 'asecrettokenonlyforyou'
            })).toEqual({
                notification: {
                    message: 'Successfully logged in with user testUser.',
                    level: 'success',
                    title: 'Success'
                },
                user: {
                    username: 'testUser'
                },
                token: 'asecrettokenonlyforyou'
            });
        });

        it('should handle ERROR_LOGIN', () => {
            expect(authentication({}, {
                type: 'ERROR_LOGIN',
                error: 'Error logging in'
            })).toEqual({
                notification: {
                    message: 'Error logging in',
                    level: 'error',
                    title: 'Error'
                },
                error: {
                    isError: true
                }
            });
        });
    });

    describe('SET_CURRENT_USER ACTIONS', () => {
        it('should handle SET_CURRENT_USER', () => {
            expect(authentication({}, {
                type: 'SET_CURRENT_USER',
                user: {
                    username: 'testUser'
                }
            })).toEqual({
                isAuthenticated: true,
                user: {
                    username: 'testUser'
                }
            });
        });
    });
});
