import React, { Component } from 'react';
import axios from "axios";
import TopSpot from './topspot';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topspots: []
    };
  }
  componentWillMount() {
    axios
      // .. the .get function. Here we pass the URL of our external service.
      .get('https://origin-top-spots-api.herokuapp.com/api/topspots')
      // Here the first fulfill callback is setup.
      // This callback simply takes an HTTP response and returns the data property..
      .then(response => response.data)
      // .. to the second fulfill callback, which uses React's this.setState
      // function to merge the provided object (which uses ES6 shorthand)
      // with the current object assigned to this.state (which you assigned 
      // in your constructor!)
      .then(topspots => this.setState({ topspots }), () => console.log(this.state.topspots));
  }
  render() {
    return (
      <div className='App'>
        <div className="container-fluid">
          <div className="jumbotron">
            <h1 className="card-title text-left">San Diego Top Spots</h1>
            <p className="card-text text-left">A list of the top 30 places to see in San Diego, California.</p>
          </div>
          {this.state.topspots.map((topspot, index) => (
              <TopSpot
                key={topspot.id}
                name={topspot.name}
                description={topspot.description}
                location={topspot.location} />
          ))}
        </div>
      </div>

    );

  }
}

export default App;