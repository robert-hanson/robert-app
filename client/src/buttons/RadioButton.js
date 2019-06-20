import React from 'react';

export class RadioButton extends React.Component {

	render(){
		return (
            <div className='form-check'>
                <label className='form-check-label'>
                    <input 
                        type="radio" 
                        name={this.props.radioName} 
                        value={this.props.value}
                        checked={this.props.isSelected} 
                        onChange={this.props.onChange}
                        className="form-check-input"
                    />
                    {this.props.text}
                </label>
            </div>

		);
	}
}


