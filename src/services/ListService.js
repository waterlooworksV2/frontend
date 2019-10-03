import axios from 'axios';
import { stringify } from 'query-string';

let baseURL = '';
console.log(process.env)
if(!process.env.REACT_APP_LOCAL){
  baseURL = 'https://backend.'+window.location.hostname+'/v1/list/';
}else{
  baseURL = 'http://'+window.location.hostname+':9000/v1/list/';
}

console.log(baseURL)
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
  return { then: function() {} };
});

export default class ListService{
  static getListForUser = (id) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + 'user/' + id).then(({data}) => {
        resolve(data);
      });
    });
  }

  static addJobToList = (id, jobids) => {
    return new Promise((resolve, reject) => {
      instance.patch(baseURL + 'add/' + id, {jobids: jobids}).then(({data}) => {
        resolve(data);
      });
    });
  }

  static search = (query) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + 'job/search/?' + stringify(query)).then(({data}) => {
        resolve(data);
      });
    });
  }

  static getJobIDs = (query) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + 'id/search/?' + stringify(query)).then(({data}) => {
        resolve(data);
      });
    });
  }

  static filters = (query) => {
      return new Promise((resolve, reject) => {
          instance.get(baseURL + 'filter/' + String(query)).then(({data}) => {
              resolve(data);
          });
      });
  }

  static getList = (id, page) => {
      return new Promise((resolve, reject) => {
          instance.get(baseURL + 'list/' + String(id) + "?" + stringify(page)).then(({data}) => {
              resolve(data);
          });
      });
  }
}
