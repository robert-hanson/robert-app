import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class NasaDatePicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: null
        };

        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date){
        this.setState({
            date: date
        }, this.props.onChange(date));
    }



    render(){

        return (
            <div className='form-group mr-2'>
                <label className="my-auto mr-sm-2">{this.props.label}:</label>
                <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                />
            </div>
        );
    }
}