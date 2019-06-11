import React from 'react';

export class Tweet extends React.Component {


	render(){
		return (
			<div>
			<div className={this.props.status.retweeted_status ? "bg-light row" : "row"}>
				<div className='col-sm-2 text-center'>
					<img src={this.props.status.user.profile_image_url_https} alt='profile img'/>
					<div className='text-center'>{this.props.status.user.screen_name}</div>
				</div>
				<div className='col-sm-8'> 
					<div>{this.props.status.full_text}</div>
					<div>
						<div>{this.props.status.retweet_count} retweets</div>
						<div>{this.props.status.favorite_count} favorites</div>
					</div>
				</div>
				<div className='col-sm-2'>
					{this.props.status.created_at}
				</div>
			</div>
			<hr/>
			</div>
		);
	}
}