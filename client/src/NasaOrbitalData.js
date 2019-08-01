import React from 'react';

export class NasaOrbitalData extends React.Component {

    render(){
        const data = this.props.data;

        return ( 
            <div id='orbital-data'>
                {data &&
                    <div>
                        <h4 >Orbital Data</h4>
                        <div className='row'>
                            <div className='col-md-6'>
                                <dl>
                                    <dt>Orbit Id</dt>
                                    <dd>{data.orbit_id}</dd>

                                    <dt>Determination Date</dt>
                                    <dd>{data.orbit_determination_date}</dd>

                                    <dt>First Observation Date</dt>
                                    <dd>{data.first_observation_date}</dd>

                                    <dt>Last Observation Date</dt>
                                    <dd>{data.last_observation_date}</dd>

                                    <dt>Data Arc In Days</dt>
                                    <dd>{data.data_arc_in_days}</dd>

                                    <dt>Observations Used</dt>
                                    <dd>{data.observations_used}</dd>

                                    <dt>Orbit Uncertainty</dt>
                                    <dd>{data.orbit_uncertainty}</dd>

                                    <dt>Min. Orbit Intersection</dt>
                                    <dd>{data.minimum_orbit_intersection}</dd>

                                    <dt>Jupiter Tisserand Invariant</dt>
                                    <dd>{data.jupiter_tisserand_invariant}</dd>


                                </dl>
                            </div>
                            <div className='col-md-6'> {/* TODO do this GRID better */}
                            <dt>Epoch Osculation</dt>
                                    <dd>{data.epoch_osculation}</dd>

                                    <dt>Eccentricity</dt>
                                    <dd>{data.eccentricity}</dd>
                                    <dt>Semi Major Axis</dt>
                                    <dd>{data.semi_major_axis}</dd>
                                    <dt>Inclination</dt>
                                    <dd>{data.inclination}</dd>
                                    <dt>Ascending Node Longitude</dt>
                                    <dd>{data.ascending_node_longitude}</dd>
                                    <dt>Orbital Period</dt>
                                    <dd>{data.orbital_period}</dd>
                                    <dt>Perihelion Distance</dt>
                                    <dd>{data.perihelion_distance}</dd>
                                    <dt>Aphelion Distance</dt>
                                    <dd>{data.aphelion_distance}</dd>
                                    <dt>Perihelion Time</dt>
                                    <dd>{data.perihelion_time}</dd>
                                    <dt>Mean Anomaly</dt>
                                    <dd>{data.mean_anomaly}</dd>
                                    <dt>Mean Motino</dt>
                                    <dd>{data.mean_motion}</dd>
                                    <dt>Equinox</dt>
                                    <dd>{data.equinox}</dd>
                            </div>
                        </div>
                        <div classNamd='row'>
                            <dl>
                                <h5>Oribit Class</h5>
                                <dt>Type</dt>
                                <dd>{data.orbit_class.orbit_class_type}</dd>
                                <dt>Description</dt>
                                <dd>{data.orbit_class.orbit_class_description}</dd>
                                <dt>Range</dt>
                                <dd>{data.orbit_class.orbit_class_range}</dd>
                            </dl>
                        </div>
                    </div>
                }
            </div>
        );
    }
}


