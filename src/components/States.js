import React, { useEffect, useState } from 'react'
import { Countries,CountryState ,StateCity} from './serverApi'
import "./state.css"

const States = () => {
    const [countries , setCountry] = useState([])
    const [states , setStates] = useState([])
    const [cities , setCity] = useState([])
    const [selectedCountry , setSelectedCountry] = useState("")
    const [ selectedState, setSelectedState] = useState("")
    const [selectedCity , setSelectedCity] = useState("")



    let getCountry = async()=>{

        let responseCountry = await Countries()
        let countryData = responseCountry.data

          setCountry(countryData);
    }


    useEffect(()=>{
                 
       getCountry();

    })



    const handleCountryChange = async(e)=>{

        let countryName = e.target.value
         setSelectedCountry(countryName)
            
        let  responseState = await CountryState(countryName)
        let  data = responseState.data
               setStates(data)

               setSelectedState("")
               setSelectedCity("")
    }

    const handleStateChange = async(e)=>{
         
        let stateName = e.target.value

        setSelectedState(stateName)

        let responseCity = await StateCity(selectedCountry,stateName);

        let data = responseCity.data

        setCity(data)

        setSelectedCity("")

    }

    const handleCityChange = (e)=>{

         let cityName = e.target.value

         setSelectedCity(cityName)
    }


  
    return (
    <div>
                 
          <div className="selecte-country">
                  <h1>Select Location</h1>     
                  <div className="selecte-country-name">
             <div className="countries">
                <select value = {selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                    {countries.map((country)=>(
                          
                          <option  key ={country}    value={country}>
                                   
                                   {country}
                          </option>
                        
                    ))}
                </select>
             </div>

             <div className="states">
             <select value = {selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                    <option value="">Select State</option>
                    {states.map((countryState)=>(
                          
                          <option  key ={countryState}    value={countryState}>
                                   
                                   {countryState}
                          </option>
                        
                    ))}
                    </select>
             </div>


             <div className="cities">
             <select value={selectedCity} onChange={handleCityChange}  disabled ={!selectedState}>
                <option value="">Select City</option>
              {cities.map((city)=>(
                   
                   <option key={city} value={city}>
                    {city}
                   </option>
              ))}

             </select>
             
             </div>
            
            </div> 
</div>
    </div>
  )
}

export default States