import React from 'react';
import {SyncButton} from './buttons/SyncButton';

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
      throw Error(body.message); 
    }
    return body;
  };

  handleScreenNameChange(e) {
    this.setState({
      screen_name: e.target.value
    })
  };

  handleUnsubscribeClick(screenName) {
    const unsubscribeFromUser = async(e) =>{
      const url = `/twitter/subscriptions/user/${screenName}`;
      const response = await fetch(url, 
      {
        method:'delete'
      });
      const errorList = await response.json();
      if (errorList.length > 0){
        alert('There was a problem. User could not be unsubscribed from')
      }else{
            this.loadSubscriptions()
            .then(subscriptions => this.setState({subscriptions: subscriptions}))
            .catch(err => console.error(err));
      }
    }
    return unsubscribeFromUser;
  };


  handleAddButtonClick = async(e) => {
    const url = '/twitter/subscriptions/user';
    const response = await fetch(url, 
    {
      method:'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({screen_name: this.state.screen_name})
    });
    const body = await response.json();
debugger;
    if (body.error) {
      // pass a function to map
      const errMsgs = body.error.map(x => <p>{x.message}</p>);

      this.setState({errorMessage: errMsgs});
    } else if(body.previouslySubscribed === true){
        this.setState({errorMessage: 'User is already subscribed to'});
    } else {
        alert(`Successfully subscibed to ${body.user.screen_name}!`);
        this.setState({
          screenName: ''
        });   
    }

    this.loadSubscriptions()
      .then(subscriptions => this.setState({subscriptions: subscriptions}))
      .catch(err => console.error(err));
  };


  render() {
    var tableRows = [];
    tableRows = this.state.subscriptions.map(s => 
      <tr key={s.user.screen_name}>
        <td>{s.user.screen_name}</td>
        <td>{s.user.description}</td>
        <td><SyncButton user={s.user}/></td>
        <td><button className='btn btn-link' onClick={this.handleUnsubscribeClick(s.user.screen_name)}>Unsubscribe</button></td>
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
              <th>{/* place holder for sync button */}</th>
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
