/*global $*/
import * as React from 'react';
import Select from 'react-select';
import './Filter.css';


export default class Filter extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cities:this.props.cities,
      countries:this.props.countries,
      selectedCities: this.props.selectedCities,
      selectedCountries: this.props.selectedCountries,
    }
  }

  onCityChange(event, t){
    this.setState({selectedCities: event});
  }

  onCountryChange(event, t){
    this.setState({selectedCountries: event});
  }

  render() {
    let cities = [];

    this.props.cities.map(function(id, i){
      if(id["_id"] !== ""){
          cities.push({value: id["_id"], label:id["_id"] }
          )}
      });

    let countries = [];


    this.props.countries.map(function(id, i){
        if(id["_id"] !== ""){
          countries.push({value: id["_id"], label:id["_id"] }
          )}
        });

    return (
      <div className='filter'>
        <Select
          className='cities'
          onChange={this.onCityChange.bind(this)}
          options={cities}
          isMulti={true}
          closeMenuOnSelect={false}
          hideSelectedOptions={true}
        />
        <Select
            className="countries"
            onChange={this.onCountryChange.bind(this)}
            options={countries}
            isMulti={true}
            closeMenuOnSelect={false}
            hideSelectedOptions={true}
          />
          <div className="switch">
            <label>
              Cover Letter<br />
              <input type="checkbox"></input>
              <span className="lever"></span>
              Required
            </label>
          </div>
      </div>
    )
  }
}

Filter.defaultProps = {
    cities: [{"_id":'lmao', "count":0}, {"_id":'lmao2', "count":2}],
    countries: [{"_id":'Lmao', "count":3}, {"_id":'Lmao2', "count":4}],
}
