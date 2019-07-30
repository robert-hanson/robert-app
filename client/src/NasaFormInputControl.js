import React from 'react'

export class NasaFormInputControl extends React.Component {
    
    render(){
        const isValid = typeof(this.props.valid) === 'boolean' ? this.props.valid : true; //default to true
        let inputCss = `form-control mb-2 mr-sm-2`;
        if (!isValid){
            inputCss += " border border-danger";
        }

        return(
            <div className='form-group'>
                <label for={this.props.id}  className="mr-sm-2">{this.props.label}</label>
                <input  type="number" 
                        className={inputCss} 
                        id={this.props.id} 
                        onChange={this.props.onChange}
                        required={this.props.required ? true : false } 
                />
            </div>
        );
    }
}