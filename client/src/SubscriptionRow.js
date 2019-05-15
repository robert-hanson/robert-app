import React from 'react';

export class SubscriptionRow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			subscription: {}
		};
	}
}




<tr key={s.user.screen_name}>
    <td>{s.user.screen_name}</td>
    <td>{s.user.description}</td>
    <td><button className='btn btn-link'>Unsubscribe</button></td>
</tr>