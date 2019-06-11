import React from 'react';
import {PageHeader} from './PageHeader';
import {TwitterSearchPage} from './TwitterSearchPage';
import {TwitterSubscriptionsPage} from './TwitterSubscriptionsPage';



export class TwitterPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     results: ''
  //   };

  // }





  render() {
    return (
      <div>
      	{/* common header */}
      	<PageHeader pageHeader='Title index'  pageSubHeader="sandbox to mess around with Twitter's API" />
        
      	{/* dynamically show content */}
        <ul className="nav nav-tabs">
		  <li className="nav-item">
		    <a className="nav-link active" data-toggle="tab" href="#searchTweetsPane">Search</a>
		  </li>
		  <li className="nav-item">
		    <a className="nav-link" data-toggle="tab" href="#subscriptionsPane">Subscriptions</a>
		  </li>
		  {/* <li className="nav-item">
		    <a className="nav-link" data-toggle="tab" href="#archivedPane">Archived</a>
		  </li> */}
		</ul>
		<br/>

		{/* Tab panes */}
		<div className="tab-content">

			{/* search tweets via Twitter APi */}
			<div className="tab-pane container active" id="searchTweetsPane">
				<TwitterSearchPage />
			</div>

			{/* view user subscriptions */}
			<div className="tab-pane container fade" id="subscriptionsPane">
			 	<TwitterSubscriptionsPage />
			</div>

			{/* search archived/saved tweets */}
			<div className="tab-pane container fade" id="archivedPane">
				<p>Archived tweet place holder...</p>
			</div>
		</div>


      </div>
    );
  }
}