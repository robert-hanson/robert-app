import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NasaDatePicker } from './NasaDatePicker';
import { NasaFormCheckbox } from './NasaFormCheckbox';
import { SearchButton } from './buttons/SearchButton';

export class NasaNeoFeedSearchControls extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start_date: null,
            end_date: null,
            detailed: true
        };

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleDetailedChange = this.handleDetailedChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleStartDateChange(date){
        this.setState({
            start_date: date
        });
    }

    handleEndDateChange(date){
        this.setState({
            end_date: date
        });
    }

    handleDetailedChange(){
        this.setState({
            detailed: !this.state.detailed //toggle
        });
    }

    handleSearch(event){
        event.preventDefault();
        this.props.onSearch(this.state);
    }


    render(){

        return (
            <div className='card card-body bg-light'>
                <form className='form-inline'>
                    <NasaDatePicker label={"Start"} onChange={this.handleStartDateChange}/>
                    <NasaDatePicker label={"End"} onChange={this.handleEndDateChange}/>
                    <NasaFormCheckbox default={this.state.detailed} onChange={this.handleDetailedChange}/>
                    <SearchButton onClick={this.handleSearch} />
                </form>
            </div>
        );
    }
}