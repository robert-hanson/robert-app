
import React from 'react';
import ReactDOM from 'react-dom';

console.log('loaded twitter search controls...');

class TwitterSearchControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    // Display a "Like" <button>
    return (
      <button onClick={() => this.setState({ liked: true })}>
        disLike
      </button>
    );
  }
}

ReactDOM.render(
	<TwitterSearchControls/>,
	document.getElementById('root')
);






