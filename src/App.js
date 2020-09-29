import React, { Component, useState } from "react";
import "./App.css";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class Map extends Component {
  constructor() {
    super();
    this.state = {
      stations: [],
      selected: null
    };
  }

  async componentDidMount() {
    const url = "https://api.tel-aviv.gov.il/parking/stations";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    let stations = data.map(st => {
      return (
        <Marker
          key={st.AhuzotCode}
          position={{
            lat: parseFloat(st.GPSLattitude),
            lng: parseFloat(st.GPSLongitude)
          }}
          onClick={() => {
            this.setState({ selected: st });
          }}
          icon={{
            url: "https://image.flaticon.com/icons/png/128/3448/3448628.png",
            scaledSize: new window.google.maps.Size(55, 55)
          }}
        ></Marker>
      );
    });
    console.log(stations);
    this.setState({ stations: stations });
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 32.0853, lng: 34.781769 }} // Tel aviv cor
      >
        {this.state.stations}

        {this.state.selected && (
          <InfoWindow
            position={{
              lat: parseFloat(this.state.selected.GPSLattitude),
              lng: parseFloat(this.state.selected.GPSLongitude)
            }}
            onCloseClick={() =>{
              this.setState({ selected: null });
            }}
          > 
          <div style={{direction: "RTL"}}>
            <h2 >{this.state.selected.Address}</h2>
            <p> 
            {this.state.selected.DaytimeFee}
            </p>
            <p>
            {this.state.selected.FeeComments} 
            </p>
          </div>
        </InfoWindow>)} 
      </GoogleMap>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

class App extends Component {
  // state = {
  //   width: "100vw",
  //   height: "100vh"
  // };

  render() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
          libraries=geometry,drawing,places&key=AIzaSyAayUGZzRY9b3sUXSfNf_XfqH1jOIjeR2g`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    );
  }
}

export default App;
