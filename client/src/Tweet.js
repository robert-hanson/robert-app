import React from 'react';
import ReactDOM from 'react-dom';

export class Tweet extends React.Component {


	render(){
		return (
			<div>
			<div className='row'>
				<div className='col-sm-1'>{this.props.status.user.screen_name}</div>
				<div className='col-sm-10'>{this.props.status.text}</div>
			</div>
			<hr/>
			</div>
		);
	}
}