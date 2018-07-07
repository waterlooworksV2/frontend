import * as React from 'react';
import './Pagination.css';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 20
    };
  }

  render() {
    var lis = []
    {if(this.state.currentPage != 1) {
      lis.push(<li key={this.state.currentPage-1} className="inactive">{this.state.currentPage-1}</li>)
    }}
    lis.push(<li key={this.state.currentPage} className="active">{this.state.currentPage}</li>)
    {if(this.state.currentPage < this.state.totalPages) {
      lis.push(<li key={this.state.currentPage+1} className="inactive">{this.state.currentPage+1}</li>)
    }}
    return (
      <ul className="pagination center-align" style={{"width":"100%"}}>
        {lis}
      </ul>
    );
  }
}
