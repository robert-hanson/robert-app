import React from 'react';
import ReactDOM from 'react-dom';

export class PageHeader extends React.Component {
	
	render() {
	    return (
	    	<div>
		        <h2>{this.props.pageHeader}</h2>
		        <p>{this.props.pageSubHeader}</p>
		    </div>
	      );
	};
}