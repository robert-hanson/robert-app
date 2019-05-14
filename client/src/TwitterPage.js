import React from 'react';
import ReactDOM from 'react-dom';
import {PageHeader} from './PageHeader';
import {TwitterSearchControls} from './TwitterSearchControls';
import {TwitterResults} from './TwitterResults';


export class TwitterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(formState){


    fetch('/twitter/search/', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        queryString: formState.searchQuery
      }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(result => {
      debugger;
      this.setState({results: result});
    })
    .catch(function(err){
      console.error(err);
    });
  }



  render() {
    return (
      <div>
      	<PageHeader pageHeader='Twitter stuff'  pageSubHeader="sandbox to mess around with Twitter's API" />
      	<br/>
        <TwitterSearchControls onSearch={this.handleSearch} />
        <TwitterResults results={this.state.results}/>
      </div>
    );
  }
}