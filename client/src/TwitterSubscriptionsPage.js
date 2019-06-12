import React from 'react';
// import {SyncButton} from './buttons/SyncButton';
// import {Modal} from './Modal';

export class TwitterSubscriptionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
      screen_name: '',
      errorMessage: '',
      inEditMode: false
    };

    this.handleScreenNameChange = this.handleScreenNameChange.bind(this);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }


  componentDidMount(){
    // Call our fetch function below once the component mounts
    this.loadSubscriptions().catch(err => console.error(err));
    this.interval = setInterval(() => {
      console.log("loading subs..");
      this.loadSubscriptions().catch(err => console.error(err));
    }, 100000)
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadSubscriptions = async() => {
    const response = await fetch('/twitter/subscriptions');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message); 
    }
    this.setState({subscriptions: body});
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
            .then(()=>{}) // do nothing here and keeping as promise for now because async/await wasn't working...
            .catch(err => console.error(err));
      }
    }
    return unsubscribeFromUser;
  };

  toggleEditMode(){
    this.setState({inEditMode: !this.state.inEditMode});
  }

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

    // reload subscriptions
    await this.loadSubscriptions();
  };


  render() {
    var tableRows = [];
    tableRows = this.state.subscriptions.map(s => 
      <tr key={s.user.screen_name}>
        <td>{s.user.screen_name}</td>
        <td>{s.user.description}</td>
        {/* <td><SyncButton user={s.user}/></td> */}
        <td>
        {this.state.inEditMode  &&  
          <button className='btn btn-link' onClick={this.handleUnsubscribeClick(s.user.screen_name)}>Unsubscribe</button>
        }
          </td>
      </tr>
      );
      

    return (
      <div>
        <div className='col-sm-6 text-danger'>
          {this.state.errorMessage}
        </div>
        <br/>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Screen Name</th>
              <th>Description</th>
              {/* <th>Tweets Archived</th> */}
              <th>{/* place holder for delete button */}</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
        <hr/>
        
        {this.state.inEditMode ? (
          <div>
            <button class='btn btn-link'>Add User</button>
            <br/>
            {/* <button class='btn btn-primary'  onClick={this.toggleEditMode}>Save</button> */}
            <button class='btn btn-secondary float-right'  onClick={this.toggleEditMode}>Close</button>
          </div>
        ) : (
          <button class='btn btn-link float-right' onClick={this.toggleEditMode}>Edit Subscriptions</button>
        )}
        {/* <Modal show={true} onClose={() => {console.log('no');}}> content </Modal> */}
        {/* <button class='btn btn-link'>Add</button> */}
        {/* <button class='btn btn-link float-right'>Refresh</button>       */}
      </div>
    );
  }
}
