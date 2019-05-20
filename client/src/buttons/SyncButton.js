import React from 'react';

export class SyncButton extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			inSync: false
		};
	}

	componentDidMount(){
		this.checkIfInSync()
		.then(isInSync => this.setState({inSync: isInSync}))
		.catch(err => console.error(err));
	};

	checkIfInSync = async() => {
		const url = `/twitter/subscriptions/user/${this.props.user.screen_name}/isInSync`;
	    const response = await fetch(url);
	    const body = await response.json();

	    if (response.status !== 200) {
	      throw Error(body.message); 
	    }
	    return body.isInSync;
	};

	handleSyncClick = async(e) => {
	    const url = `/twitter/users/${this.props.user.screen_name}/tweets/archive`;
	    const response = await fetch(url, 
	    {
	      method:'post',
	      headers: {'Content-Type': 'application/json'},
	    });
	    const body = await response.json();

	    if (body.error) {
	      alert(JSON.stringify(body.error));
	    }else{
	    	this.setState({inSync: true});
	    }
	}

	render(){
		if (this.state.inSync === true)
		{
			return (<button className='btn btn-secondary' disabled>Sync</button>);
		} else {
			return (<button className='btn btn-secondary' onClick={this.handleSyncClick}>Sync</button>);
		}
	};
}