import axios from 'axios';
import config from '../config';

const handleError = (err) => {
  console.log(err);
  throw err;
};

const get = (url, headers) => axios.get(`${config.API_URL}${url}`, headers).catch(handleError);

const post = (url, body, headers) => axios.post(`${config.API_URL}${url}`, body, headers).catch(handleError);

const put = (url, body, headers) => axios.put(`${config.API_URL}${url}`, body, headers).catch(handleError);

const del = (url, headers) => axios.delete(`${config.API_URL}${url}`, headers).catch(handleError);

// const del = (url, body, headers) => axios.delete(`${config.API_URL}${url}`, { data: body }, headers).catch(handleError);

export default {
  get,
  post,
  put,
  delete: del
};
