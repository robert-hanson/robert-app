import React from 'react';

export class TwitterSubscriptionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      screen_name: '',
      errorMessage: ''
    };

    this.handleScreenNameChange = this.handleScreenNameChange.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }


  componentDidMount(){
    // Call our fetch function below once the component mounts
    this.loadSubscriptions()
      .then(subscriptions => this.setState({subscriptions: subscriptions}))
      .catch(err => console.error(err));
  };


  loadSubscriptions = async() => {
    const response = await fetch('/twitter/subscriptions');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  handleScreenNameChange(e) {
    debugger;
    this.setState({
      screen_name: e.target.value
    })
  };

  handleAddButtonClick = async(e) => {
    const url = `/twitter/subscriptions/user/${this.state.screen_name}`;
    const response = await fetch(url, {});
    const body = await response.json();

    if (body.error) {
      this.setState({errorMessage: 'Something went wrong. User was not subscribed to.'});
    } else if(body.previouslySubscribed){
      this.setState({errorMessage: 'User is already subscribed to'});
    } else {
      alert('User was successfully subscribed to.');

      this.setState({
        subscriptions: this.state.subscriptions.push(body.user)
      });
    }
  };

  render() {
    var tableRows = [];
    tableRows = this.state.subscriptions.map(s => 
      <tr key={s.user.screen_name}>
        <td>{s.user.screen_name}</td>
        <td>{s.user.description}</td>
        <td><button className='btn btn-link'>Delete</button></td>
      </tr>
      );

    return (
      <div>
        <div className="input-group col-sm-6">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">@</span>
          </div>
          <input 
            type="text" 
            className="form-control" 
            placeholder="" 
            aria-label="Username" 
            aria-describedby="basic-addon1"
            value={this.state.screen_name}
            onChange={this.handleScreenNameChange}
          />
          <button className='btn btn-primary' onClick={this.handleAddButtonClick}>Add User</button>
        </div>
        <div className='col-sm-6 text-danger'>
          {this.state.errorMessage}
        </div>
        <br/>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Screen Name</th>
              <th>Description</th>
              <th>{/* place holder for delete button */}</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
        <hr/>
      </div>
    );
  }
}
