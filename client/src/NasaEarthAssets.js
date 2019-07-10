import React from 'react';
// import { NasaEarthAsset } from './NasaEarthAsset';

export class NasaEarthAssets extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            assets: [],
            selectedAsset: null
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

        // create jsx element for each asset returned
        const sortedAssets = this.sortAssets(body);


        this.setState({
            assets: sortedAssets
        });
    }

    handleSelectionChange(asset, event){
        debugger;
        this.setState({selectedAsset: asset});
        this.props.onSelection(asset);
    }

	getAssetRows(){
        return this.state.assets.map( 
            asset => 
                <tr 
                    onClick={this.handleSelectionChange.bind(this, asset)}
                    className={this.state.selectedAsset && this.state.selectedAsset.id === asset.id && "table-primary"}
                >
                    {/* <td>{asset.id}</td> */}
                    <td >
                        {
                            new Date(asset.date).toLocaleDateString("en-US", 
                            {
                                month: "2-digit", 
                                day:"2-digit",
                                year: "numeric"
                            })
                        }
                    </td>
                </tr>
        );
    }
    

    sortAssets(assets){
        debugger;
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

    getAssetsJsx(){
        return(
            <div>
                {this.state.assets[0]}
            </div>
        );
    }

    render(){

        return (


                <table className='table table-hover table-striped  table-sm text-center'>
                    <thead className='thead-light'>
                        <th>Images</th>
                        {/* <th>date</th> */}
                    </thead>
                    <tbody>
                        {this.getAssetRows()}
                    </tbody>
                </table>
                

        );
    }
}