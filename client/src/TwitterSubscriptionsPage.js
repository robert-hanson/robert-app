import React from 'react';

export class TwitterSubscriptionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: []
    };

    // this.handleSearch = this.handleSearch.bind(this);
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

  render() {
    var tableRows = [];
    tableRows = this.state.subscriptions.map(s => 
      <tr>
        <td>{s.user.screen_name}</td>
        <td>{s.user.description}</td>
      </tr>
      );

    return (
      <div>

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">@</span>
          </div>
          <input type="text" class="form-control" placeholder="username" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <table className='table table-hover'>
          <tr>
            <th>Screen Name</th>
            <th>Description</th>
          </tr>
          {tableRows}
        </table>
        <hr/>
        <div className='text-center'>
          <button className='btn btn-primary'>Add</button>
        </div>
      </div>
    );
  }
}
