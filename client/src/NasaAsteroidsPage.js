import React from 'react'

export class NasaAsteroidsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start_date: null,
            end_date: null,
            results: null
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleStartDateChange(event){
        this.setState({
            start_date: event.target.value
        });
    }

    handleEndDateChange(event){
        this.setState({
            end_date: event.target.value
        });
    }

    handleSearch = async(event) => {
        debugger;
        event.preventDefault();
        // date must be in format YYYY-MM-DD
        const start = this.getFormattedDate(this.state.start_date);
        const end = this.getFormattedDate(this.state.end_date);
        let url = `/nasa/asteroids/feed?start_date=${start}&end_date=${end}`;
        const response = await fetch(url);
        const body = await response.json();
    
        // client side exception handling
        if (response.status !== 200) {
          throw Error(body.message); 
        }

        this.setState({results: body});
    };

    render(){
        return(
            <div className='container'>
                {/* <h2>Asteroids</h2> */}
                <p>Search for asteroids</p>
                <form className='form-inline'>
                    <label for="start" className="mb-2 mr-sm-2">Start:</label>
                    <input type="date" className="form-control mb-2 mr-sm-2" id="start" onChange={this.handleStartDateChange} />
                    <label for="end" className="mb-2 mr-sm-2">End:</label>
                    <input type="date" className="form-control mb-2 mr-sm-2" id="end" onChange={this.handleEndDateChange}/>
                    <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSearch}>Submit</button>
                </form>
                <hr/>
                <div>{JSON.stringify(this.state.results)}</div>
            </div>
        );
    }


    /* returns datestrings in format (YYYY-MM-DD) */
     getFormattedDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = (date.getUTCDate()).toString().padStart(2, '0');
        // Logger.log(`Day: ${day}, Month: ${month}, Year:${year}`)
        const dateFormatted = `${year}-${month}-${day}`;
        return dateFormatted;
    }
}