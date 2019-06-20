import React from 'react';
import {TwitterSearchBar} from './TwitterSearchBar';
import {RadioButtonGroup} from './buttons/RadioButtonGroup';

export class TwitterSearchControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchQuery: '',
      searchByOption: "user",
      searchInOption: "twitter",
    };

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchByOptionChange = this.handleSearchByOptionChange.bind(this);
    this.handleSearchInOptionChange = this.handleSearchInOptionChange.bind(this);
  }

  handleSearchQueryChange(event) {
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleSearch(event){
    this.props.onSearch(this.state);
  }

  handleSearchByOptionChange(optionVal){
    debugger;
    this.setState({
      searchByOption: optionVal
    });
  }

  handleSearchInOptionChange(optionVal){
    this.setState({
      searchInOption: optionVal
    });
  }

  render() {

    // create radio button objects
    const searchByOptions = [
      {text: "Username", value: "user"},
      {text: "Text", value: "text"}
    ];

    const searchInOptions = [
      {text: "Twitter", value: "twitter"},
      {text: "Archives", value: "archive"}
    ];


    return (
      <div>
        {/* Search By options (username, text) */}
        <RadioButtonGroup 
          labelText={"Search By:"}
          options={searchByOptions}
          onOptionChange={this.handleSearchByOptionChange}
          defaultValue={this.state.searchByOption}
        />
        {/* Search In options (twitter, archive) */}        
        <RadioButtonGroup 
          labelText={"Search In:"}
          options={searchInOptions}
          onOptionChange={this.handleSearchInOptionChange}
          defaultValue={this.state.searchInOption}
        />
        <TwitterSearchBar 
          searchBy={this.state.searchByOption} 
          onChange={this.handleSearchQueryChange} 
          onSearch={this.handleSearch}
        />
    </div>
    );
  }
}


