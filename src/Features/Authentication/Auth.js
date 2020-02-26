import decode from 'jwt-decode';

const getToken = () => localStorage.getItem('jwtToken');

const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('isLoggedIn');
};

const loggedIn = () => {
  const token = localStorage.getItem('jwtToken');

  const isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return true;
    }
  };

  return !!token && !isTokenExpired(token);
}

const setToken = (jwtToken) => {
  localStorage.setItem('jwtToken', jwtToken);
  localStorage.setItem('isLoggedIn', true);
};

const getMember = () => decode(getToken());

const setAuthorisationToken = (token) => {
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
};

export {
  getToken,
  loggedIn,
  logout,
  setToken,
  getMember,
  setAuthorisationToken
};
