import React from 'react';
import ReactDOM from 'react-dom';
import {PageHeader} from './PageHeader';
import {TwitterSearchControls} from './TwitterSearchControls';


export class TwitterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(formState){
  	alert(JSON.stringify(formState));
  }



  render() {

    return (
      <div>
      	<PageHeader pageHeader='Twitter stuff'  pageSubHeader="sandbox to mess around with Twitter's API" />
      	<TwitterSearchControls onSearch={this.handleSearch} />
      </div>
    );
  }
}