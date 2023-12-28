import React from 'react';
import Clouds from "./icons/cloudy.png";
import Rain from "./icons/rainy.png";
import Thunderstorm from "./icons/storm.png";
import Snow from "./icons/snow.png";
import Clear from "./icons/sun.png";

const Mid = (props) => {

    const  convertTimestamptoTime = (unixTimestamp) => {
        const dateFormat = new Date(unixTimestamp * 1000);
        if (dateFormat.getHours() >= 12 ){
            return `${(dateFormat.getHours()-12).toString().padStart(2,'0')}:${dateFormat.getMinutes().toString().padStart(2,'0')} PM`
        } else {
            return `${dateFormat.getHours().toString().padStart(2,'0')}:${dateFormat.getMinutes().toString().padStart(2,'0')} AM`
        }
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

    const getDay = (unixTimestamp) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        const dateFormat = new Date(unixTimestamp * 1000);
        return `${days[dateFormat.getDay()]}`
        
    }

    const getMiles = (meters) => {
        return (meters*0.000621371192).toFixed(1);
   }

   const getPressure = (pressure) => {
    return (pressure * 0.0145).toFixed(1);
   } 

    return (
        <div>
            <div className='row bg-black mx-1 bg-opacity-25 rounded-5 text-white px-2 py-4 '>
                <p className='fs-3  ' style={{ color: '#79dc4a' }} >6-Day Forecast</p>
                <hr className='mx-auto  ' style={{ width: '95%' }} />

                <div className='row my-2 mx-auto' style={{ fontSize: '15px' }}>
                    <div className="col px-0"> <img alt="weather"  src={getWeather(props.forecast.list[8].weather[0].main)} style={{ width: '25px', marginRight: '10px' }} /><span className='fs-5'>{Math.round(props.forecast.list[8].main.temp - 273)}</span>°C</div>
                    <div className="col text-center my-auto px-0">{props.forecast.list[8].weather[0].main}</div>
                    <div className="col text-center text-white-50 my-auto px-0">{getDay(props.forecast.list[1].dt)}</div>
                </div>
                <div className='row my-2 mx-auto' style={{ fontSize: '15px' }}>
                    <div className="col px-0"> <img alt="weather"  src={getWeather(props.forecast.list[11].weather[0].main)} style={{ width: '25px', marginRight: '10px' }} /><span className='fs-5'>{Math.round(props.forecast.list[15].main.temp - 273)}</span>°C</div>
                    <div className="col text-center my-auto px-0">{props.forecast.list[11].weather[0].main}</div>
                    <div className="col text-center text-white-50 my-auto px-0">{getDay(props.forecast.list[11].dt)}</div>
                </div>
                <div className='row my-2 mx-auto' style={{ fontSize: '15px' }}>
                    <div className="col px-0"> <img alt="weather"  src={getWeather(props.forecast.list[20].weather[0].main)} style={{ width: '25px', marginRight: '10px' }} /><span className='fs-5'>{Math.round(props.forecast.list[20].main.temp - 273)}</span>°C</div>
                    <div className="col text-center my-auto px-0">{props.forecast.list[20].weather[0].main}</div>
                    <div className="col text-center text-white-50 my-auto px-0">{getDay(props.forecast.list[20].dt)}</div>
                </div>
                <div className='row my-2 mx-auto' style={{ fontSize: '15px' }}>
                    <div className="col px-0"> <img alt="weather"  src={getWeather(props.forecast.list[25].weather[0].main)} style={{ width: '25px', marginRight: '10px' }} /><span className='fs-5'>{Math.round(props.forecast.list[30].main.temp - 273)}</span>°C</div>
                    <div className="col text-center my-auto px-0">{props.forecast.list[25].weather[0].main}</div>
                    <div className="col text-center text-white-50 my-auto px-0">{getDay(props.forecast.list[25].dt)}</div>
                </div>
                <div className='row my-2 mx-auto' style={{ fontSize: '15px' }}>
                    <div className="col px-0"> <img alt="weather"  src={getWeather(props.forecast.list[30].weather[0].main)} style={{ width: '25px', marginRight: '10px' }} /><span className='fs-5'>{Math.round(props.forecast.list[37].main.temp - 273)}</span>°C</div>
                    <div className="col text-center my-auto px-0">{props.forecast.list[30].weather[0].main}</div>
                    <div className="col text-center text-white-50 my-auto px-0">{getDay(props.forecast.list[30].dt)}</div>
                </div>
                <div className='row my-2 mx-auto' style={{ fontSize: '15px' }}>
                    <div className="col px-0"> <img alt="weather"  src={getWeather(props.forecast.list[37].weather[0].main)} style={{ width: '25px', marginRight: '10px' }} /><span className='fs-5'>{Math.round(props.forecast.list[37].main.temp - 273)}</span>°C</div>
                    <div className="col text-center my-auto px-0">{props.forecast.list[37].weather[0].main}</div>
                    <div className="col text-center text-white-50 my-auto px-0">{getDay(props.forecast.list[37].dt)}</div>
                </div>
            </div>

            <div className='row bg-black mx-1 mt-4 bg-opacity-25 rounded-5 text-white px-2 py-4'>
                <p className='fs-3 ' style={{ color: '#79dc4a' }} >Sun & Moon</p>
                <hr className='mx-auto  ' style={{ width: '95%' }} />
                <div className="row ">
                    <div className='row mx-auto '>
                        <div className="col text-center ">{convertTimestamptoTime(props.currentWeather.sys.sunrise)}
                            <p className='text-white-50 '>Sunrise</p></div>
                        <div className="col text-center ">{convertTimestamptoTime(props.currentWeather.sys.sunset)}
                            <p className='text-white-50 '>Sunset</p></div>
                    </div>
                    <div className='row my-3 mx-auto '>
                        <div className="col px-0">
                            <div className="col text-center " style={{ fontSize: '12px' }}>Visibility
                                <p style={{ color: '#79dc4a',fontSize: '16px' }}>{getMiles(props.currentWeather.visibility)}mi</p></div>
                        </div>
                        <div className="col px-0">
                            <div className="col text-center " style={{ fontSize: '12px' }}>Pressure
                                <p style={{ color: '#79dc4a',fontSize: '16px' }}>{getPressure(props.currentWeather.main.pressure)}pi</p></div>
                        </div>
                        {/* <div className="col px-0">
                            <div className="col text-center " style={{ fontSize: '12px' }}>Dew Point
                                <p style={{ color: '#79dc4a',fontSize: '16px' }}>60</p></div>
                        </div> */}
                        {/* <div className="col px-0">
                            <div className="col text-center " style={{ fontSize: '12px' }}>Rain Days
                                <p style={{ color: '#79dc4a',fontSize: '16px' }}>21</p></div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mid;

