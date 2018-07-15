import * as React from 'react';
import querystring from 'querystring';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(isNaN(this.props.currentPage)) {
      this.setState({currentPage: 1});
    }
    else if(this.props.currentPage !== this.state.currentPage) {
      this.setState({currentPage: this.props.currentPage})
    }
  }

  componentWillMount() {
    if(this.props.query !== '') {
      this.setState({search: this.props.query});
      this.props.onSearch(this.props.query);
    }
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.search);
  }

  render() {
    return (
      <form className="row" name="sear" id="sear" onSubmit={this.handleSubmit}>
        <div className="searchbar center-align col s11" style={{"width":"100%"}}>
          <input id="searc" type="search" value={this.state.search} onChange={this.handleChange} required/>
          <label htmlFor="searc">Search here</label>
        </div>
      </form>
    );
  }
}
