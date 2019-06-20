import React from 'react';
import {NasaApod} from './NasaApod';
import {NasaEarthImageSearch} from './NasaEarthImageSearch';

export class NasaPage extends React.Component {

    render(){
        
        return (
            <div>
                <h1>Nasa API</h1>
                <p>NASA's Astronomy Picture of the Day:</p>
                <NasaApod />
                <NasaEarthImageSearch/>
            </div>
        );
    }
}