import React from 'react';
import ReactDOM from 'react-dom';


export class TwitterSearchControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchQuery: ''
    };

    this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearchQueryChange(event) {
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleSearch(event){
    this.props.onSearch(this.state);
  }

  render() {

    // Display a "Like" <button>
    return (
      <div>
        <div class="form-group">
          <label for="search">Search</label>
          <input type="text" class="form-control" name='searchQuery' value={this.state.searchQuery} onChange={this.handleSearchQueryChange}/>
        </div>

        <div class="checkbox text-right">
          <label><input id='archive' name='toArchive' type="checkbox" value='true'/>Archive Results</label>
        </div>
        <button class="btn btn-primary" onClick={this.handleSearch} >Search</button>
        <button class="btn btn-link" >View Subscriptions</button>
      </div>
    );
  }
}



console.log('we in here?');

ReactDOM.render(
  <TwitterSearchControls/>,
  document.getElementById('root')
);
