import React from 'react'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, useMapEvent, Marker, Popup, useMap, LayersControl } from 'react-leaflet'
import { Icon } from 'leaflet';
import MarkerPin from './Images/MarkerPin.png'

export default function WeatherMap({ coords, location }) {
  const API_key = '3ac6885830c3f62db920516318dc24b4';

  function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom())
    })
    return null
  }

  function MyComponent() {
    const map = useMap();
    map.flyTo(coords, map.getZoom());

    return null
  }

  const customIcon = new Icon({
    iconUrl: MarkerPin,
    iconSize: [38, 38]
  })

  function MyMarker() {
    return (
      <Marker position={coords} icon={customIcon}>
        <Popup>
          {location}
        </Popup>
      </Marker>
    )
  }


  return (
    <div className='container' style={{ marginBottom: "400px" }}>

      <MapContainer center={coords} zoom={5}>
        <MyComponent />
        <TileLayer
          url={`https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name="Wind">
            <TileLayer url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_key}`} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Clouds">
            <TileLayer url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_key}`} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Precipitation">
            <TileLayer url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_key}`} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Temperature">
            <TileLayer url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_key}`} />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Pressure">
            <TileLayer url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${API_key}`} />
          </LayersControl.Overlay>
        </LayersControl>
        <SetViewOnClick />
        <MyMarker />
      </MapContainer>
    </div>
  )
}
