import React from 'react';
import {NasaApodPage} from './NasaApodPage';
import {NasaEarthImageSearch} from './NasaEarthImageSearch';

export class NasaPage extends React.Component {

    render(){
        
        return (
            <div>


                <h1>Nasa API</h1>
                <p>A react based UI to explore NASA's Open API</p>

                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#earth-page">Earth</a>
                    </li>
                    {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Dropdown</a>
                        <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Link 1</a>
                        <a className="dropdown-item" href="#">Link 2</a>
                        <a className="dropdown-item" href="#">Link 3</a>
                        </div>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#apod">APOD</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                </ul>


                {/*  Tab panes  */}
                <div className="tab-content">
                    <div className="tab-pane container active" id="earth-page">
                        <br/>
                        <NasaEarthImageSearch/>
                    </div>
                    <div className="tab-pane container fade" id="apod">
                        <br/>
                        <p>NASA's Astronomy Picture of the Day:</p>
                        <NasaApodPage />
                    </div>
                    {/* <div className="tab-pane container fade" id="menu2"></div> */}
                </div>



                {/* <NasaApod /> */}
            </div>
        );
    }
}