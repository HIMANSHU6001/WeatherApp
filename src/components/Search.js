import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

const Search = (props) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    props.onSearchChange(searchData);
  }
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3c4b3fdf4fmshdef3ee79f787aefp16df4fjsn6258b963eb11',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  const loadOptions = (inputValue) => {
    return fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1&namePrefix=${inputValue}`, options)
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.country}`
            }
          })
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <nav className="navbar sticky-top " style={{backgroundColor:'#2b8c32'}}>
      <div className="container-fluid">
        <a className="navbar-brand text-white " href="#">WeatherNews</a>
        <div style={{width:'800px', margin:'auto'}}><AsyncPaginate
          placeholder="Search for cities"
          debounceTimeout={600}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        /></div>
      </div>
    </nav>

  )
}
export default Search;