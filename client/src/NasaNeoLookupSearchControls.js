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

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleIdChange(id){
        this.setState({
            id: id
        });
    }

    handleSearch(event){
        event.preventDefault();
        this.props.onSearch(this.state);
    }


    render(){

        return (
            <form className='form-inline'>
                <NasaFormInputControl label={"Id:"} onChange={this.handleIdChange} id={"id"}  />
                <SearchButton onClick={this.handleSearch} />
            </form>
        );
    }
}