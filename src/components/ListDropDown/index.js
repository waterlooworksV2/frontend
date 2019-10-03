/*global $*/

import * as React from 'react';
import './ListDropDown.css';

import ListService from '../../services/ListService.js'

export default class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lists: [{'Name':''}],
      jobId: -1
    }
  }

  getList(id) {
    ListService.getListForUser(id).then(data => this.setState({lists: data['lists']}));
  }

  addToList(e, listIndex){
    this.dontBubbleUpClick(e)
    console.log(this.state, listIndex);
    const listId = this.state.lists[listIndex].ListId;
    console.log(listId)
    ListService.addJobToList(listIndex, [this.state.jobId]).then(data => console.log(data));
    console.log(listIndex, this.state.jobId)
  }

  dontBubbleUpClick(e){
    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
  }

  componentDidMount(){
    this.getList(-1);
    this.setState({jobId: this.props.jobId})
    $(this.props.trigger).dropdown({ alignment: 'right'});
  }

  render() {
    return (
      <div className='dropdowns'>
        <ul id={'dropdown' + this.props.class} class='dropdown-content' style={ {"backgroundColor": this.props.hue} }>
          {this.state.lists.map((id, i) => <li key={this.props.class + i}><a href="#!" style={ {"color": "white"} } onClick={(e) => this.addToList(e, i)}>{this.state.lists[i]['Name']}</a></li>)}
        </ul>
      </div>
    );
  }
}
