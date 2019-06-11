import React from 'react';
import {TwitterSearchControls} from './TwitterSearchControls';
import {TwitterResults} from './TwitterResults';


export class TwitterSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(formState){
    const url = formState.searchInOption === 'twitter' ? '/twitter/search/'  : 'twitter/searchArchive/';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        queryString: formState.searchQuery,
        searchBy: formState.searchByOption
      }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(result => result.json())
    .then(result => {
      this.setState({results: result});
    })
    .catch(function(err){
      console.error(err);
    });

  }


  render() {
    return (
      <div>
      	<TwitterSearchControls onSearch={this.handleSearch} />
      	<br/>
      	<TwitterResults results={this.state.results}/>
      </div>
    );
  }
}