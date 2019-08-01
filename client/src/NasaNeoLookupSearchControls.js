import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { SearchButton } from './buttons/SearchButton';
import { NasaFormInputControl } from './NasaFormInputControl';

export class NasaNeoLookupSearchControls extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: null
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
    }

    handleIdChange(event){
        this.setState({
            id: event.target.value
        });
    }

    handleSearch(event){
        event.preventDefault();
        this.props.onSearch(this.state.id);
    }


    render(){

        return (
            <div className="card card-body bg-light">
                <form className='form-inline'>
                    <NasaFormInputControl onChange={this.handleIdChange} label={"Id:"} id={"id"}  />
                    <SearchButton onClick={this.handleSearch} />
                </form>
            </div>
        );
    }
}