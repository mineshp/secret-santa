import decode from 'jwt-decode';

export default class Auth {
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            return false;
        } catch (err) {
            return true;
        }
    }

    setToken(jwtToken) {
        console.log(`jwtToken ${jwtToken}`);
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('isLoggedIn', true);
    }

    getToken() {
        return localStorage.getItem('jwtToken');
    }

    logout() {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('isLoggedIn');
    }

    getUser() {
        return decode(this.getToken());
    }
}
