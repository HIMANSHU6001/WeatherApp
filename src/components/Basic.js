import React from 'react';
import Clouds from "./icons/cloudy.png";
import Windy from "./icons/windy.png";
import Humidity from "./icons/water-drop.png";
import Mountain from "./icons/mountain.png";
import Rain from "./icons/rainy.png";
import Thunderstorm from "./icons/storm.png";
import Snow from "./icons/snow.png";
import Clear from "./icons/sun.png";
// green ='#79dc4a'
const Basic = (props) => {
    const capitalize = (st) => {
        var list = st.split(" ");
        st = '';
        list.forEach(element => {
            st += element[0].toUpperCase() + element.slice(1) + " "
        });
        return st
    }

    const getWeather = (weather) => {
        if (weather === 'Clouds') {
            return Clouds
        } else if (weather === 'Rain'){
            return Rain
        }
        else if (weather === 'Thunderstorm'){
            return Thunderstorm
        }
        else if (weather === 'Snow'){
            return Snow
        }
        else {
            return Clear
        }
    }

    const convertTimestamptoTime = (unixTimestamp) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const dateFormat = new Date(unixTimestamp);
        if (dateFormat.getHours() >= 12) {
            return `${days[dateFormat.getDay()]} | ${(dateFormat.getHours() - 12).toString().padStart(2, '0')}:${dateFormat.getMinutes().toString().padStart(2, '0')} PM`
        } else {
            return `${days[dateFormat.getDay()]} | ${dateFormat.getHours().toString().padStart(2, '0')}:${dateFormat.getMinutes().toString().padStart(2, '0')} AM`
        }
    }

    const getAqi = (aqi) => {
        if (aqi <= 2) {
            return (
                <div className='row py-2 px-0 mx-auto mt-2' style={{ fontSize: '24px' }}>
                    <div className="col text-white px-0">AQI</div>
                    <div className='col px-0 justify-content-end d-flex' style={{ color: '#79dc4a' }}>{aqi} - {aqi === 1 ? "Good" : "Fair"}</div>
                </div>
            )
        }
        else if (aqi === 3) {
            return (

                <div className='row py-2 px-0 mx-auto mt-2' style={{ fontSize: '24px' }}>
                    <div className="col text-white px-0">AQI</div>
                    <div className='col px-0 text-warning justify-content-end d-flex'>{aqi} - Moderate </div>
                </div>
            )
        }
        else if (aqi <= 5) {
            return (
                <div className='row py-2 px-0 mx-auto mt-2' style={{ fontSize: '24px' }}>
                    <div className="col text-white px-0">AQI</div>
                    <div className='col px-0 text-danger justify-content-end d-flex'>{aqi} - {aqi === 5 ? "Very Poor" : "Poor"} </div>
                </div>
            )
        }
    }


    return (
        <div>
            <div className='row bg-black bg-opacity-25 rounded-5 text-white p-4'>
                <div className='col '>
                    {props.location}
                    <p className='fs-1' style={{ color: '#79dc4a' }} >{Math.round(props.currentWeather.main.temp - 273)}°C</p>
                    {capitalize(props.currentWeather.weather[0].description)}
                    <p className='text-white-50 ' style={{ fontSize: '12px' }}>{convertTimestamptoTime(props.currentWeather.dt)}</p>
                </div>
                <div className='col m-auto'>
                    <img src={getWeather(props.currentWeather.weather[0].main)} alt={`${props.currentWeather.weather[0].main}`} style={{ width: '90px' }} />
                </div>
                <hr className='mx-auto  ' style={{ width: '95%' }} />

                <div className='row py-2 px-0 mx-auto ' style={{ fontSize: '18px' }}>
                    <div className="col-8 px-0"> <img src={Windy} alt="Windy" className='py-2' style={{ width: '20px', marginRight: '20px' }} />Wind Speed</div>
                    <div className='col px-0 justify-content-end d-flex ' style={{ color: '#79dc4a', marginRight: '30px' }}>{(props.currentWeather.wind.speed * 2.236936).toFixed(1)}mph</div>
                </div>
                <div className='row py-2 px-0 mx-auto' style={{ fontSize: '18px' }}>
                    <div className="col-8 px-0"> <img src={Humidity} alt="Humidity" className='py-2' style={{ width: '20px', marginRight: '20px' }} />Humidity</div>
                    <div className='col px-0 justify-content-end d-flex ' style={{ color: '#79dc4a', marginRight: '30px' }}>{props.currentWeather.main.humidity}%</div>
                </div>
                <div className='row py-2 px-0 mx-auto' style={{ fontSize: '18px' }}>
                    <div className="col-8 px-0"> <img src={Mountain} alt="Altitude" className='py-2' style={{ width: '20px', marginRight: '20px' }} />Altitude</div>
                    <div className='col px-0 justify-content-end d-flex' style={{ color: '#79dc4a', marginRight: '30px' }}>{props.currentWeather.main.sea_level}m</div>
                </div>
            </div>

            <div className='row bg-black bg-opacity-25 rounded-5 text-white p-4 my-2'>
                <div className='fs-2 mb-4 px-0' style={{ color: '#79dc4a' }}>
                    Air Quality
                    {getAqi(props.airQuality.list[0].main.aqi)}
                    <hr className='mx-auto  '  />
                    <div className='row py-2 px-0 mx-auto' style={{ fontSize: '16px' }}>
                        <div className="col-8 text-white px-0">Carbon monoxide</div>
                        <div className='col px-0 justify-content-end d-flex' style={{ color: '#79dc4a' }}>{(props.airQuality.list[0].components.co).toFixed(1)} μg/m3</div>
                    </div>
                    <div className='row py-2 px-0 mx-auto' style={{ fontSize: '16px' }}>
                        <div className="col-8 text-white px-0">Sulphur dioxide</div>
                        <div className='col px-0 justify-content-end d-flex' style={{ color: '#79dc4a' }}>{(props.airQuality.list[0].components.so2).toFixed(1)} μg/m3</div>
                    </div>
                    <div className='row py-2 px-0 mx-auto' style={{ fontSize: '16px' }}>
                        <div className="col-8 text-white px-0">Nitrogen dioxide</div>
                        <div className='col px-0 justify-content-end d-flex' style={{ color: '#79dc4a' }}>{(props.airQuality.list[0].components.no2).toFixed(1)} μg/m3</div>
                    </div>
                    <div className='row py-2 px-0 mx-auto' style={{ fontSize: '16px' }}>
                        <div className="col-8 text-white px-0">Ozone</div>
                        <div className='col px-0 justify-content-end d-flex' style={{ color: '#79dc4a' }}>{(props.airQuality.list[0].components.o3).toFixed(1)} μg/m3</div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Basic;