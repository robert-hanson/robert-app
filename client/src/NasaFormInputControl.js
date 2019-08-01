import React from 'react'

export class NasaFormInputControl extends React.Component {
    
    render(){
        const isValid = typeof(this.props.valid) === 'boolean' ? this.props.valid : true; //default to true
        let inputCss = `form-control mr-sm-2 form-control-sm`;
        if (!isValid){
            inputCss += " border border-danger";
        }

        const isRequired = this.props.isRequired === true;

        return(
            <div className='form-group'>
                <label for={this.props.id}  className={"mr-sm-2"}>{this.props.label}</label>
                <input  type={this.props.type} 
                        className={inputCss} 
                        id={this.props.id} 
                        onChange={this.props.onChange}
                        required={isRequired} 
                />
            </div>
        );
    }
}