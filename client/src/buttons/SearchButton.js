import React from 'react';

export class SearchButton extends React.Component {

     render(){

        let css = "btn btn-primary my-auto";
        if (this.props.small === true){
            css += "btn-sm";    
        }


        return (
             <button type="submit" 
                     className={css} 
                     onClick={this.props.onClick}>Search
             </button>  
        );
     };
}