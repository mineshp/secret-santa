const validUrl = require('valid-url');

const isUrl = (url) => {
  if (validUrl.isUri(url)) {
    return {
      valid: true,
      url,
    };
  }
  if (url.startsWith('www.')) {
    return {
      valid: true,
      url: 'http://'.concat(url),
    };
  }
  return {
    valid: false,
  };
};

module.exports = { isUrl };
