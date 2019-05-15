import React from 'react';

export class TwitterSearchBar extends React.Component {


	render(){
		var icon = this.props.searchBy === 'user' ? '@' : 'Text';

		return (
			<div className="input-group col-sm-6 pl-0">
				<div className='input-group-prepend'>
					<span className="input-group-text" id="basic-addon1">{icon}</span>
				</div>
    			<input type="text" 
    				className="form-control" 
    				aria-describedby="basic-addon1" 
    				onChange={this.props.onChange}
    			/>
    			<div className="input-group-append">
					<button className="btn btn-primary" onClick={this.props.onSearch}>Search</button> 
				</div>
			</div>
		);
	}
}



          