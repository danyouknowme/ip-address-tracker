import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { useState } from "react";
import "./App.scss";

const App = () => {
  const [data, setData] = useState({
    ip: "192.212.174.101",
    location: {
      region: "Brooklyn",
      country: "NY",
      postcode: "10001",
    },
    timezone: "-05:00",
    isp: "SpaceX Starlink",
  });
  const apiKey = process.env.REACT_APP_IP_API_KEY;
  const [ipAddress, setIpAddress] = useState("");

  const generateData = async () => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`
      )
      .then((response) => {
        setData({
          ip: response.data.ip,
          location: {
            region: response.data.location.region,
            country: response.data.location.country,
            postcode: response.data.as.asn,
          },
          timezone: response.data.location.timezone,
          isp: response.data.isp,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="title">
          <div className="bg">
            <span className="head-text">IP Address Tracker</span>
            <form className="inputIp">
              <input
                type="text"
                placeholder="Search for any IP address or domain"
                onChange={(e) => setIpAddress(e.target.value)}
              />
              <div className="submit" onClick={generateData}>
                {">"}
              </div>
            </form>
            <div className="content">
              <div>
                <span className="topic">IP ADDRESS</span>
                <span className="value">{data.ip}</span>
              </div>
              <span className="line"></span>
              <div>
                <span className="topic">LOCATION</span>
                <span className="value">{data.location.region + ", " + data.location.country + " " + data.location.postcode}</span>
              </div>
              <span className="line"></span>
              <div>
                <span className="topic">TIMEZONE</span>
                <span className="value">{data.timezone}</span>
              </div>
              <span className="line"></span>
              <div>
                <span className="topic">ISP</span>
                <span className="value">{data.isp}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="map">
          <MapContainer center={[51.505, -0.09]} zoom={20}>
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
