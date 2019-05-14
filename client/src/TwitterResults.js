import React from 'react';
import ReactDOM from 'react-dom';
import {Tweet} from './Tweet.js';

export class TwitterResults extends React.Component {

	generateTweetList(tweets){
		var returnDiv = [];
		for(let i=0; i < tweets.length; i++){
			returnDiv [i] = <Tweet key={tweets[i].id_str} status={tweets[i]} />;
		}
		return returnDiv;
	}

	render(){
		if (this.props.results){

			return(
				<div>{this.generateTweetList(this.props.results)}</div>
			);
		}
		else {
			return <div></div>;
		}
	}
}