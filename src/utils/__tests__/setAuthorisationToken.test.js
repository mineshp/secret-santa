import setAuthorisationToken from '../setAuthorisationToken';

describe('Set fetch headers', () => {
    it('sets correct headers when valid token is passed', () => {
        expect(setAuthorisationToken('aTestToken')).toEqual({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer: aTestToken',
            credentials: 'same-origin'
        });
    });

    it('sets correct headers when no token is passed', () => {
        expect(setAuthorisationToken()).toEqual({
            Accept: 'application/json',
            'Content-Type': 'application/json'
        });
    });
});
