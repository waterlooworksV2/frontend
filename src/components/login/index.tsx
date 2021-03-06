import React, { useState, useContext } from 'react';
import './index.scss';

import { AuthService } from '../../services/API'
import { TokenSetStore } from '../../App'
import LoadingSpinner from "../loadingSpinner";


function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [createOrNotLogin, setCreateOrNotLogin] = useState(false);

  const dispatch = useContext(TokenSetStore);

  function handleClick(event: any) {
    event.preventDefault();
    if(createOrNotLogin){
      AuthService.create(name, email, password).then((data) => {
        // @ts-ignore
        dispatch({type: 'update', token: data.user.token});
      }).catch((err) => {
        // @ts-ignore
        dispatch({type: 'error', token: err});
      });  
    } else {
      AuthService.login(email, password).then((token) => {
        // @ts-ignore
        dispatch({type: 'update', token: token});
      }).catch((err) => {
        // @ts-ignore
        dispatch({type: 'error', token: err});
      });
    }
    
  }
  
  return (
    <div className="CreateAccount">
      <form onSubmit={() => setFormSubmitted(true)} className="flex-outer">
        {createOrNotLogin ? <label>
          Name:
          <input value={name} type="text" name="name" onChange={(event) => setName(event.target.value)}/>
        </label>: <></>}
        <label>
          Email:
          <input value={email} type="email" name="email" onChange={(event) => setEmail(event.target.value)}/>
        </label>
        <label>
          Password:
          <input value={password} type="password" name="password" onChange={(event) => setPassword(event.target.value)}/>
        </label>
        <div className="flex-inner">
          {
            formSubmitted ?
              <LoadingSpinner />
              : <input type="submit" value="Submit" onClick={handleClick} />
          }
          <button
            type="button"
            className="link-button"
            onClick={() => setCreateOrNotLogin(!createOrNotLogin)} >
            {
              createOrNotLogin ?
                "or Login" :
                "or Create Account"
            }
          </button>
        </div>
      </form>
    </div>
  );

  
}

export default Login;
