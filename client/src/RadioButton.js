// import React from 'react';
// import ReactDOM from 'react-dom';

// export class Tweet extends React.Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			isSelected: this.props.checked ? this.prop.checked : false
// 		};

// 		this.handleOptionChange = this.handleOptionChange.bind(this);
// 	}

// 	handleOptionChange(){
// 		this.setState({
// 		    selectedOption: changeEvent.target.value
// 		});
// 	}

// 	render(){
// 		return (
//             <label className="radio-inline">
//               <input type="radio" 
//               	name="optradio"
//                 type="radio"  
//                 value="user"
//                 checked={this.state.isSelected === "user"} 
//                 onChange={this.handleOptionChange}
//               />
//               By Username
//             </label>
// 		);
// 	}
// }