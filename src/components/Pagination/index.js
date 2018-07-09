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

  onClickPage(pageNo) {
    this.setState({currentPage: pageNo})
    this.props.onClickPage(pageNo);
  }

  render() {
    var lis = []
    {if(this.state.currentPage > 1) {
      lis.push(<a href="#!" key={this.state.currentPage-1}><li onClick={() => this.onClickPage(this.state.currentPage-1)} className="inactive">{this.state.currentPage-1}</li></a>)
    }}
    lis.push(<a href="#!" key={this.state.currentPage}><li className="active">{this.state.currentPage}</li></a>)
    {if(this.state.currentPage < this.state.totalPages) {
      lis.push(<a href="#!" key={this.state.currentPage+1}><li onClick={() => this.onClickPage(this.state.currentPage+1)} className="inactive">{this.state.currentPage+1}</li></a>)
    }}
    return (
      <ul className="pagination center-align" style={{"width":"100%"}}>
        {lis}
      </ul>
    );
  }
}
