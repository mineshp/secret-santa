/* eslint-disable import/first */
jest.mock('../../Container/Authentication/Auth');
import Auth from '../../Container/Authentication/Auth';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../authentication';
// import { mockRegisterUser, mockLoginDetails, mockLoginUser, mockUser } from '../../helpers/test/testData/authenticationData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json'
    }
});

describe('User authentication', () => {
    describe('Login User', () => {
        const getToken = jest.fn();
        Auth.mockImplementation(() => ({ getToken }));

        const mockLoginUserFailureApiResponse = {
            message: `Unable to login with username ${mockLoginUser().user.username}.`
        };

        it('should dispatch an action for SUCCESS_LOGIN when calling successLogin to confirm user logged in', () => {
            const { user, token } = mockLoginUser();
            const expectedAction = {
                type: 'SUCCESS_LOGIN',
                user: {
                    username: user.username
                },
                token
            };

            expect(actions.successLogin(mockLoginUser())).toEqual(expectedAction);
        });

        it('should dispatch an action for ERROR_LOGIN when calling errorLogin to notify the user we were unable to login', () => {
            const expectedAction = {
                type: 'ERROR_LOGIN',
                error: mockLoginUserFailureApiResponse.message
            };

            expect(actions.errorLogin(mockLoginUserFailureApiResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful loginUser call via the store, dispatches the SUCCESS_LOGIN action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(mockLoginUser()))));

            const store = mockStore({ authentication: [] });
            const { user, token } = mockLoginUser();
            const expectedActions = [
                {
                    type: 'SET_CURRENT_USER',
                    user: {
                        username: user.username
                    }
                },
                {
                    type: 'SUCCESS_LOGIN',
                    user: {
                        username: user.username
                    },
                    token
                }
            ];

            return store.dispatch(actions.loginUser(mockLoginDetails())).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('an unsuccessful loginUser call via the store, dispatches the ERROR_LOGIN action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockLoginUserFailureApiResponse))));

            const store = mockStore({ authentication: [] });

            const expectedAction = [
                {
                    type: 'ERROR_LOGIN',
                    error: mockLoginUserFailureApiResponse.message
                }
            ];

            return store.dispatch(actions.loginUser(mockLoginDetails())).then(() => {
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Profiles to be Displayed', () => {
        const getToken = jest.fn();
        Auth.mockImplementation(() => ({ getToken }));

        const mockProfilesToBeDisplayedFailureApiResponse = {
            message: 'Unable to set profiles to display.'
        };

        it('should dispatch an action for SUCCESS_SETTING_PROFILES when calling successSettingProfilesToDisplay to set profiles for logged in user', () => {
            const expectedAction = {
                type: 'SUCCESS_SETTING_PROFILES',
                profilesToDisplay: ['PROFILE_X', 'PROFILE_Y']
            };

            expect(actions.successSettingProfilesToDisplay(['PROFILE_X', 'PROFILE_Y'])).toEqual(expectedAction);
        });

        it('should dispatch an action for ERROR_SETTING_PROFILES when calling errorSettingProfilesToDisplay to notify of error setting profiles to display for logged in user', () => {
            const expectedAction = {
                type: 'ERROR_SETTING_PROFILES',
                error: mockProfilesToBeDisplayedFailureApiResponse.message
            };

            expect(actions.errorSettingProfilesToDisplay(mockProfilesToBeDisplayedFailureApiResponse.message))
                .toEqual(expectedAction);
        });

        it('a successful setProfilesToDisplay call via the store, dispatches the SUCCESS_SETTING_PROFILES action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(['PROFILE_X', 'PROFILE_Y']))));

            const store = mockStore({ authentication: [] });
            const expectedActions = {
                type: 'SUCCESS_SETTING_PROFILES',
                profilesToDisplay: ['PROFILE_X', 'PROFILE_Y']
            };

            return store.dispatch(actions.setProfilesToDisplay(['PROFILE_X', 'PROFILE_Y'], '123456')).then(() => {
                expect(store.getActions()[0]).toEqual(expectedActions);
            });
        });

        it('an unsuccessful setProfilesToDisplay call via the store, dispatches the ERROR_SETTING_PROFILES action', async () => {
            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockProfilesToBeDisplayedFailureApiResponse))));

            const store = mockStore({ authentication: [] });

            const expectedAction = [
                {
                    type: 'ERROR_SETTING_PROFILES',
                    error: mockProfilesToBeDisplayedFailureApiResponse.message
                }
            ];

            return store.dispatch(actions.setProfilesToDisplay(['PROFILE_X', 'PROFILE_Y'], mockUser())).then(() => {
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Set Current User', () => {
        it('should dispatch an action for SET_CURRENT_USER when calling setCurrentUser', () => {
            const { user } = mockLoginUser();
            const expectedAction = {
                type: 'SET_CURRENT_USER',
                user: {
                    username: user.username
                }
            };

            expect(actions.setCurrentUser(user)).toEqual(expectedAction);
        });
    });

    describe('Get User', () => {
        it('should return a user object for a valid user', () => {
            const { user } = mockLoginUser();

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(200, null, JSON.stringify(user))));

            const store = mockStore({ authentication: [] });

            const expectedAction = [{
                type: 'SUCCESS_GETTING_USER',
                user
            }];

            return store.dispatch(actions.getUser(user.username)).then(() => {
                expect(store.getActions()).toEqual(expectedAction);
            });
        });

        it('should return an error when user is unknown', () => {
            const mockGetUserFailureApiResponse = {
                message: 'Unable to get user unknownUser.'
            };

            window.fetch = jest.fn().mockImplementation(() =>
                Promise.resolve(mockResponse(500, null, JSON.stringify(mockGetUserFailureApiResponse))));

            const store = mockStore({ authentication: [] });

            const expectedAction = [{
                type: 'ERROR_GETTING_USER',
                error: mockGetUserFailureApiResponse.message
            }];

            return store.dispatch(actions.getUser('unknownUser')).then(() => {
                expect(store.getActions()).toEqual(expectedAction);
            });
        });
    });

    describe('Logout User', () => {
        it('should dispatch an action for SET_CURRENT_USER when calling setCurrentUser', () => {
            const store = mockStore({ authentication: [] });
            const expectedActions = [{
                type: 'SET_CURRENT_USER',
                user: {}
            }];

            store.dispatch(actions.logout());
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
