import React from 'react';
import {RadioButton} from './RadioButton';

export class RadioButtonGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedValue: this.props.defaultValue
        };

        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(e){
        debugger;
        this.setState({ selectedValue: e.target.value },()=>{ 
            this.props.onOptionChange(this.state.selectedValue) 
        });

      }

    render() {
        var radioButtons = this.props.options.map(option => {
            return <RadioButton 
                        name={this.props.name} 
                        isSelected={this.state.selectedValue === option.value} 
                        value={option.value}
                        onChange={this.handleOptionChange} 
                        text={option.text}
                    />;
        });
        return (
            <div className='form-check-inline col-sm-12'>
                <label htmlFor="search">{this.props.labelText}</label>
                {radioButtons}
            </div>
        );

    }
}