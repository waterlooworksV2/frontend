import React, {useContext, useState, useEffect, FormEvent} from 'react';
import {Link, useLocation, useHistory} from 'react-router-dom';
import './index.scss';

import { TokenSetStore } from '../../App'

import logo from '../../assets/icons/logo.svg';
import search_icon from '../../assets/icons/search.svg';

interface NavbarProp {
  onSubmitSearch: (searchString: string, e?: FormEvent<HTMLFormElement>) => void;
}

function Navbar({
  onSubmitSearch,
}: NavbarProp) {
  const [active, setActive] = useState(0);
  const [searchText, setSearchText] = useState('');
  const dispatch = useContext(TokenSetStore);
  const location = useLocation();
  const history = useHistory();
  
  const searchBar = location.pathname === "/search"
  const search = new URLSearchParams(window.location.search);

  const nav:any = {
    "/lists": 1,
  }

  if(active !== nav[window.location.pathname]){
    setActive(nav[window.location.pathname])
  }
  
  useEffect(
    () => {
      if( 
          search 
          && search.has("search") 
          && search.get("search") !== searchText 
      ){
        // @ts-ignore
        setSearchText(search.get("search"))
        onSubmitSearch(search.get("search") as string)
      }
    }, []);
  
  useEffect(
    () => {
      if( 
          search 
          && search.has("search") 
          && search.get("search") !== searchText 
      ){
        search.set("search", searchText)
        history.push(`?${search.toString()}`)
      }
    }, [searchText]);


  return (
    <div className="navbar">
      <nav className="navbar">
        <div className="left">
          <Link to="/" onClick={()=>{
            setActive(0);
            setSearchText('');
          }}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="right">
          <Link className={active === 1?"active":""} to="/lists" onClick={()=>setActive(1)}>Lists</Link>
          <p onClick={() => {
            //@ts-ignore
            dispatch({type: 'update', token: ''});
          }}>Logout</p>
          {
            searchBar ?
            <div className="searchbar">
              <form onSubmit={(e) => onSubmitSearch(searchText, e)}>
                <input 
                  type="search" 
                  id="wwsearch" 
                  name="search"
                  value={searchText}
                  // @ts-ignore
                  onChange={(e) => setSearchText(e.target.value)}
                  required
                />
              </form>
            </div>
            :
            <div className="searchIcon">
              <Link to="/search?search=">
                <img src={search_icon} alt="search" />
              </Link>
            </div>
          }
        </div>
      </nav>
    </div>
  );

};

export default Navbar;