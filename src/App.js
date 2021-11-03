import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";
import { useState } from "react";
import IconArrow from "./images/icon-arrow.svg";
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
  const [position, setPosition] = useState({
    latitude: 34.0536,
    longitude: -118.084,
  });
  const [ipAddress, setIpAddress] = useState("");
  const apiKey = process.env.REACT_APP_IP_API_KEY;

  const generateData = async () => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`
      )
      .then((response) => {
        axios
          .get(`http://ip-api.com/json/${ipAddress}?fields=zip,lat,lon`)
          .then((response2) => {
            setData({
              ip: response.data.ip,
              location: {
                region: response.data.location.region,
                country: response.data.location.country,
                postcode: response2.data.zip,
              },
              timezone: response.data.location.timezone,
              isp: response.data.isp,
            });
            setPosition({
              latitude: response2.data.lat,
              longitude: response2.data.lon,
            });
          })
          .catch((error) => alert("Please enter a valid IP address."));
      })
      .catch((err) => alert("Please enter a valid IP address."));
  };

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
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
                <img src={IconArrow} alt="icon-arrow" />
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
                <span className="value">
                  {data.location.region +
                    ", " +
                    data.location.country +
                    " " +
                    data.location.postcode}
                </span>
              </div>
              <span className="line"></span>
              <div>
                <span className="topic">TIMEZONE</span>
                <span className="value">{"UTC " + data.timezone}</span>
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
          <MapContainer
            center={[position.latitude, position.longitude]}
            zoom={14}
          >
            <ChangeView
              center={[position.latitude, position.longitude]}
              zoom={14}
            />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[position.latitude, position.longitude]}>
              <Popup>
                <strong>{data.isp}</strong> <br /> {data.ip}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
