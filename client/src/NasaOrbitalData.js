import React from 'react';

export class NasaOrbitalData extends React.Component {

    render(){
        debugger;
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


// "orbital_data": {
//     "orbit_id": "12",
//     "orbit_determination_date": "2017-04-06 09:18:13",
//     "first_observation_date": "1994-10-09",
//     "last_observation_date": "1994-10-27",
//     "data_arc_in_days": 18,
//     "observations_used": 27,
//     "orbit_uncertainty": "7",
//     "minimum_orbit_intersection": ".260198",
//     "jupiter_tisserand_invariant": "3.177",
//     "epoch_osculation": "2458600.5",
//     "eccentricity": ".5267311176088368",
//     "semi_major_axis": "2.63115523824529",
//     "inclination": "7.01725043161831",
//     "ascending_node_longitude": "200.9095563635586",
//     "orbital_period": "1558.899562680662",
//     "perihelion_distance": "1.245243899002003",
//     "perihelion_argument": "119.2787798944603",
//     "aphelion_distance": "4.017066577488577",
//     "perihelion_time": "2458938.901357101078",
//     "mean_anomaly": "281.8522530425884",
//     "mean_motion": ".230932132267039",
//     "equinox": "J2000",
//     "orbit_class": {
//         "orbit_class_type": "AMO",
//         "orbit_class_description": "Near-Earth asteroid orbits similar to that of 1221 Amor",
//         "orbit_class_range": "1.017 AU < q (perihelion) < 1.3 AU"
//     }
// }