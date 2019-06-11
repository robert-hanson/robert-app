import React from 'react';
import {TwitterSearchBar} from './TwitterSearchBar';

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

  handleSearchByOptionChange(e){
    this.setState({
      searchByOption: e.target.value
    });
  }

  handleSearchInOptionChange(e){
    this.setState({
      searchInOption: e.target.value
    });
  }

  render() {

    // Display a "Like" <button>
    return (
      <div>
        <div className='form-check-inline col-sm-12'>
          <label htmlFor="search">Search by:</label>
          <div className='form-check'>
            <label className="form-check-label">
              <input 
                type="radio" 
                name="optradio"
                value="user"
                checked={this.state.searchByOption === "user"} 
                onChange={this.handleSearchByOptionChange}
                className="form-check-input"
              />
              Username
            </label>
          </div>
          <div className='form-check'>
            <label className='form-check-label'>
              <input 
                type="radio" 
                name="optradio" 
                value="text"
                checked={this.state.searchByOption === "text"} 
                onChange={this.handleSearchByOptionChange}
                className="form-check-input"
              />
              Text
            </label>
          </div>
        </div>

         <div className='form-check-inline col-sm-12'>
          <label htmlFor="search">Search in:</label>
          <div className='form-check'>
            <label className="form-check-label">
              <input 
                type="radio" 
                name="searchInRadio"
                value="twitter"
                checked={this.state.searchInOption === "twitter"} 
                onChange={this.handleSearchInOptionChange}
                className="form-check-input"
              />
              Twitter
            </label>
          </div>
          <div className='form-check'>
            <label className='form-check-label'>
              <input 
                type="radio" 
                name="searchInRadio" 
                value="archive"
                checked={this.state.searchInOption === "archive"} 
                onChange={this.handleSearchInOptionChange}
                className="form-check-input"
              />
              Archives
            </label>
          </div>
        </div>

        <TwitterSearchBar 
          searchBy={this.state.searchByOption} 
          onChange={this.handleSearchQueryChange} 
          onSearch={this.handleSearch}
        />
    </div>
    );
  }
}


