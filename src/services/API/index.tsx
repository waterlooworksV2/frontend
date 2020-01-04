import axios from 'axios';
import {useContext} from "react";
import { stringify } from 'query-string';

import { TokenSetStore } from '../../App'


let baseURL = '';

baseURL = 'http://'+window.location.hostname+':3001/';

var instance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && [400, 401, 404].indexOf(error.response.status)) {
    const dispatch = useContext(TokenSetStore);
    // @ts-ignore
    dispatch({type: 'update', token: ''});
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

class JobService{

  static getJob = (token: String, jobId: number) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + `jobs/full/${jobId}`, {
          headers: { 
            Authorization: `Token ${token}` 
          }
      }).then(({data}) => {
        resolve(data);
      }).catch((err) => {
        reject(err)
      });
    });
  }

  static getPreview = (token: String, jobId: number) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + `jobs/${jobId}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      }).then(({data}) => {
        resolve(data);
      }).catch((err) => {
        reject(err)
      });
    });
  }

  static search = (token: String, searchString: String, page: number) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + `ids?` + stringify({
        q: searchString,
        page: page
      }), {
        headers: {
          Authorization: `Token ${token}`
        }
      }).then(({data}) => {
        resolve(data);
      }).catch((err) => {
        reject(err)
      });
    });
  }

}

class AuthService{

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

export { JobService, AuthService }