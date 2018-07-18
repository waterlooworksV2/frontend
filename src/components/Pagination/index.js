import * as React from 'react';
import './Pagination.css';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage
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

  componentDidUpdate(prevProps){
    if(this.props.currentPage !== prevProps.currentPage) {
      this.setState({currentPage: this.props.currentPage})
    }
  }

  render() {
    if(this.props.render !== false) {
      var lis = []
      if (this.state.currentPage > 2) {
        lis.push(<a href="#" key={".1"}><li onClick={() => this.onClickPage(1)} className="inactive">1</li></a>);
      }
      if (this.state.currentPage >= 4) {
        lis.push(<a href="#" key={"...1"}><li className="inactive">....</li></a>);
      }
      if(this.state.currentPage > 1) {
        lis.push(<a href="#" key={this.state.currentPage-1}><li onClick={() => this.onClickPage(this.state.currentPage-1)} className="inactive">{this.state.currentPage-1}</li></a>)
      }
      lis.push(<a href="#" key={this.state.currentPage}><li className="active">{this.state.currentPage}</li></a>)
      if(this.state.currentPage+1 < this.props.totalPages) {
        lis.push(<a href="#" key={this.state.currentPage+1}><li onClick={() => this.onClickPage(this.state.currentPage+1)} className="inactive">{this.state.currentPage+1}</li></a>)
      }
      if(this.state.currentPage + 2 < this.props.totalPages) {
        lis.push(<a href="#" key={"...2"}><li className="inactive">....</li></a>);
      }
      if(this.state.currentPage != this.props.totalPages) {
        lis.push(<a href="#" key={this.props.totalPages}><li onClick={() => this.onClickPage(this.props.totalPages)} className="inactive">{this.props.totalPages}</li></a>);
      }

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
