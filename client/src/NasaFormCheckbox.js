import React from 'react';

export class NasaFormCheckbox extends React.Component {

    render(){

        return (
            <div className="form-check mr-2">
                <label className="form-check-label mr-sm-2">
                <input  className="form-check-input" 
                            type="checkbox" 
                            onChange={this.props.onChange} 
                            defaultChecked={this.props.default}
                    /> Detailed
                </label>
            </div>
        );
    }
}