/*global $*/
import * as React from 'react';
import './Filter.css';

import JobService from '../../services/JobService.js'
import Card from "../Card";


export default class Filter extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cities:[],
      countries:[],
      blur:'blur'
    }
  }

  componentDidUpdate(nextProps, nextState){
    console.log(nextProps);
      $('select').formSelect({classes:'sssss'});
  }


  render() {
    // if(this.props.render !== false){
        let cities = [];

        this.props.cities.map(function(id, i){
          if(id["_id"] !== ""){
              cities.push(
                  <option selected key={id["_id"]} id={id["_id"]} value={id["_id"]}>
                      {id["_id"]}-
                      {id["count"]}
                  </option>
              )}
          });



        let countries = [];


        this.props.countries.map(function(id, i){
            if(id["_id"] !== ""){
              countries.push(
                  <option selected key={id["_id"]} id={id["_id"]} value={id["_id"]}>
                      {id["_id"]}-
                      {id["count"]}
                  </option>
              )}
            });



        return (
            <div className="filter row">
                {/*<a id='cities-btn' className={`dropdown-trigger btn`} href='#' data-target='cities'>Cities</a>*/}
                <div className="input-field col s12">
                    <select multiple>
                        <option value="" disabled selected key={"choose option"}>Cities</option>
                      {cities}
                    </select>
                </div>
                <div className="input-field col s12">
                    <select multiple>
                        <option value="" disabled selected key={"choose option"}>Countries</option>
                        {countries}
                    </select>
                </div>
            </div>

        )
    // }
    // else{
    //
    //     return (<div>
    //         <a id='cities-btn' className={`dropdown-trigger btn`} href='#' data-target='cities'>Cities</a>
    //         <ul id='cities' className={`dropdown-content`}>
    //         </ul>
    //         <a id='countries-btn' className={`dropdown-trigger btn`} href='#' data-target='countries'>Countries</a>
    //         <ul id='countries' className={`${this.state.blur} dropdown-content`}>
    //         </ul>
    //     </div>)
    // }
  }
}

Filter.defaultProps = {
    cities: ['lmao', 'lmao2'],
    countries: ['Lmao', 'Lmao2'],
}
