import React from 'react';

export class SearchButton extends React.Component {

     render(){
          return (
             <button type="submit" 
                     className="btn btn-sm btn-primary my-auto" 
                     onClick={this.props.onClick}>Search
             </button>  
                );
	};
}