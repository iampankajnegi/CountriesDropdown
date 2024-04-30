import React, { useEffect, useState } from 'react';
import { Countries, CountryState, StateCity } from './serverApi';
import './state.css';

const States = () => {
  const [countries, setCountry] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCity] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [countryError, setCountryError] = useState(null);
  const [stateError, setStateError] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const responseCountry = await Countries();
        const countryData = responseCountry.data;
        setCountry(countryData);
      } catch (error) {
        setCountryError('Error fetching countries');
      }
    };

    getCountry();
  }, []);

  const handleCountryChange = async (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);
    setStates([]);
    setSelectedState('');
    setSelectedCity('');

    try {
      const responseState = await CountryState(countryName);
      const data = responseState.data;
      setStates(data);
    } catch (error) {
      setStateError('Error fetching states');
    }
  };

  const handleStateChange = async (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity('');

    try {
      const responseCity = await StateCity(selectedCountry, stateName);
      const data = responseCity.data;
      setCity(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
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
      <div className="selecte-country">
        <h1>Select Location</h1>
        <div className="selecte-country-name">
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
              {states.map((countryState) => (
                <option key={countryState} value={countryState}>
                  {countryState}
                </option>
              ))}
            </select>
          </div>

          <div className="cities">
            <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
              <option value="">Select Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default States;
