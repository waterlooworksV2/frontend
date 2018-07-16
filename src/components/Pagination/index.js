import * as React from 'react';
import './Pagination.css';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
      totalPages: 400
    };
  }

  onClickPage(pageNo) {
    this.setState({currentPage: pageNo})
    this.props.onClickPage(pageNo);
  }

  componentDidMount() {
    if(isNaN(this.props.currentPage)) {
      this.setState({currentPage: 1});
    }
    else if(this.props.currentPage !== this.state.currentPage) {
      this.setState({currentPage: this.props.currentPage})
    }
  }

  render() {
    if(this.props.render !== false) {
      var lis = []
      {if(this.state.currentPage > 1) {
        lis.push(<a href="#" key={this.state.currentPage-1}><li onClick={() => this.onClickPage(this.state.currentPage-1)} className="inactive">{this.state.currentPage-1}</li></a>)
      }}
      lis.push(<a href="#" key={this.state.currentPage}><li className="active">{this.state.currentPage}</li></a>)
      {if(this.state.currentPage < this.state.totalPages) {
        lis.push(<a href="#" key={this.state.currentPage+1}><li onClick={() => this.onClickPage(this.state.currentPage+1)} className="inactive">{this.state.currentPage+1}</li></a>)
      }}
      return (
        <ul className="pagination center-align" style={{"width":"100%"}}>
          {lis}
        </ul>
      );
    }
    else {
      return <div />
    }
  }
}
