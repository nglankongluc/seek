import React from 'react';
import Homepage from './Homepage.js';
import ProgressBoard from './ProgressBoard.js';
import 'fomantic-ui-css/semantic.css';
import './HomePage.css';
import './JobDescription.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page_view: "homepage"
    };
  }

  render() {
      return (
          this.state.current_page_view === "homepage" ? <Homepage/> : <ProgressBoard/>
      );
  }
  
}

export default App;
