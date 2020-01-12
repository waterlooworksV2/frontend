import axios from 'axios';
import { stringify } from 'query-string';
import { setupCache } from 'axios-cache-adapter'
import {CreateListResponseType} from "../../components/contextModal";

const cache = setupCache({
  maxAge: 15 * 60 * 1000
})

let baseURL = '';

baseURL = 'http://'+window.location.hostname+':3001/';

var instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  adapter: cache.adapter,
});

instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && [400, 401, 404].indexOf(error.response.status)) {
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

class ListService {

  static getLists = (token: String, populate?: boolean) => {
    return new Promise((resolve, reject) => {
      instance.get(baseURL + `lists/`, {
        headers: {
          Authorization: `Token ${token}`
        },
        params: {
          populate
        }
      }).then(({data}) => {
        resolve(data);
      }).catch((err) => {
        reject(err)
      });
    });
  }

  static getListPreview = (token: String, listId: string | undefined, populate?: boolean) => {
    if(listId){
      return new Promise((resolve, reject) => {
        instance.get(baseURL + `lists/${listId}/preview`, {
          headers: {
            Authorization: `Token ${token}`
          },
          params: {
            populate
          }
        }).then(({data}) => {
          resolve(data);
        }).catch((err) => {
          reject(err)
        });
      });
    }
    return new Promise((resolve, reject) => reject({}))
  }

  static createNewList = (token: String, name: string, description: string) => {
    return new Promise((resolve, reject) => {
      instance.post(baseURL + `lists/`, {
        list: {
          name: name,
          description: description
        }
      }, {
        headers: {
          Authorization: `Token ${token}`
        }
      }).then(({data}) => {
        resolve(data as CreateListResponseType);
      }).catch((err) => {
        reject(err)
      });
    });
  }

  static addJobToList = (token: String, jobId: number, listId: String) => {
    return new Promise((resolve, reject) => {
      instance.post(baseURL + `lists/${listId}/${jobId}`, {}, {
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

  static removeJobFromList = (token: String, listId: String, jobId: number) => {
    return new Promise((resolve, reject) => {
      instance.delete(baseURL + `lists/${listId}/${jobId}`, {
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

  static deleteList = (token: String, listId: String) => {
    return new Promise((resolve, reject) => {
      instance.delete(baseURL + `lists/` + listId, {
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

export { JobService, AuthService, ListService }