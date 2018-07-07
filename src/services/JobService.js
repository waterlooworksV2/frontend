import axios from 'axios';
import { stringify } from 'query-string';

export const baseURL = 'http://localhost:9000/v1/';

var instance = axios.create({
  baseURL: baseURL,
  timeout: 1000
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && [400, 401, 404].indexOf(error.response.status)) {
    const token = '';
    if (error.response.status === 401 && token !== null) {
      // AuthService.logout();
    }
    return Promise.reject(error);
  }
  if (error.response && error.response.data && error.response.data.message)
    console.log({ message: 'Request failed: ' + error.response.data.message});
  else if (error.message)
    console.log({ message: 'Request failed: ' + error.message});
  else
    console.log({ message: 'Request failed' });
  /* tslint:disable-next-line */
  return { then: function() {} };
});

export default class JobService{
  static getPreviewJobID = (id) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + 'preview/' + id).then(({data}) => {
        resolve(data);
      });
    });
  }

  static getFullJobID = (id) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + 'full/' + id).then(({data}) => {
        resolve(data);
      });
    });
  }

  static search = (query) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + 'job/search/?' + stringify({q: query})).then(({data}) => {
        resolve(data);
      });
    });
  }

  static getJobIDs = (query) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + 'id/search/?' + stringify({q: query})).then(({data}) => {
        resolve(data);
      });
    });
  }
}
// axios.get('/job', )
