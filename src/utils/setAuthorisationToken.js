export default function setAuthorisationToken(token) {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    if (token) {
        const tokenHeader = Object.assign({}, headers, {
            Authorization: `Bearer ${token}`,
            credentials: 'same-origin'
        });

        return tokenHeader;
    }
    delete headers.Authorization;

    const nonTokenHeader = Object.assign({}, headers);
    return nonTokenHeader;
}
