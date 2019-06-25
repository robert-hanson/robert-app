import React from 'react';

export class NasaEarthAssets extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            assets: []
        };
    }

    componentDidMount = async()=> {
        await this.loadAssets();
    }

    loadAssets = async() => {
        let url = `/nasa/earth/assets?lat=${this.props.lat}&lon=${this.props.lon}&begin=1978-01-01`;
        const response = await fetch(url);
        const body = await response.json();
    
        // client side exception handling
        if (response.status !== 200) {
          throw Error(body.message); 
        }

        this.setState({
            assets: this.sortAssets(body)
        });
    }

	getAssetRows(){
        return this.state.assets.map( 
            asset => 
                <tr>
                    <td>{asset.id}</td>
                    <td>{asset.date}</td>
                </tr>
        );
    }
    

    sortAssets(assets){
        // callback used to sort
         function compareAssets(a, b){
            if (a.date > b.date){
                return 1;
            } else if (b.date > a.date){
                return -1;
            } else {
                return 0;
            }
         }

         const sortedAssets = [...assets].sort(compareAssets);
        return sortedAssets;
    }


    render(){

        return (
            <div>
                <h3>Assets</h3>
                <table className='table'>
                    <thead>
                        <th>id</th>
                        <th>date</th>
                    </thead>
                    <tbody>
                        {this.getAssetRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}