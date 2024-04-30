import React, { useEffect, useState } from 'react';
import { Countries, CountryState, StateCity } from './serverApi';
import './state.css';

const CitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countryError, setCountryError] = useState(null);
  const [stateError, setStateError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await Countries();
        const countryData = response.data;
        setCountries(countryData);
      } catch (error) {
        setCountryError('Error fetching countries');
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    setStateError(null); // Reset state error on country change

    try {
      const response = await CountryState(countryName);
      const stateData = response.data;
      setStates(stateData);
    } catch (error) {
      setStateError('Error fetching states');
    }
  };

  const handleStateChange = async (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    

    try {
      const response = await StateCity(selectedCountry, stateName);
      const cityData = response.data;
      setCities(cityData);
    } catch (error) {
        setCities(error)
    }
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
  };

  return (
    <div>
      {countryError && <div>Error fetching countries: {countryError}</div>}
      {stateError && <div>Error fetching states: {stateError}</div>}
      <div className="select-country">
        <h1>Select Location</h1>
        <div className="select-country-name">
          <div className="countries">
            <select value={selectedCountry} onChange={handleCountryChange}>
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="states">
            <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="cities">
            <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
        Selected Location: {selectedCity && selectedCity}, {selectedState && selectedState},{' '}
        {selectedCountry && selectedCountry}
      </div>
    </div>
  );
};

export default CitySelector;
