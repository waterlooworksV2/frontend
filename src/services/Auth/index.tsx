import axios from 'axios';
import { stringify } from 'query-string';

let baseURL = '';

baseURL = 'http://'+window.location.hostname+':3001/';

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
  return Promise.reject(error.response);
});

export default class JobService{

  static login = (email: String, password: String) => {
    return new Promise((resolve, reject) => {
      instance.post(baseURL + 'user/login/', {
        user: {
          email: email, 
          password: password
        }
      }).then(({data}) => {
        resolve(data.token);
      }).catch((err) => {
        reject(err)
      });
    });
  }
  
  static create = (name: String, email: String, password: String) => {
    return new Promise((resolve, reject) => {
      instance.post(baseURL + 'user/', {
        user: {
          name: name,
          email: email, 
          password: password
        }
      }).then(({data}) => {
        resolve(data);
      }).catch((err) => {
        reject(err)
      });
    });
  }
}