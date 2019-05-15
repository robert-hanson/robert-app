import React from 'react';
import {TwitterSearchBar} from './TwitterSearchBar';

export class TwitterSearchControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchQuery: '',
      searchByOption: "user"
    };

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleSearchQueryChange(event) {
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleSearch(event){
    this.props.onSearch(this.state);
  }

  handleOptionChange(e){
    this.setState({
      searchByOption: e.target.value
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
                onChange={this.handleOptionChange}
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
                onChange={this.handleOptionChange}
                className="form-check-input"
              />
              Text
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


