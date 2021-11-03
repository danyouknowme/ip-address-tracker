import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="title">
          <div className="bg">
            <span>IP Address Tracker</span>
            <form className="inputIp">
              <input type="text" placeholder="Search for any IP address or domain"/>
              <div className="submit">{">"}</div>
            </form>
          </div>
        </div>
        <div className="map">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={20}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
