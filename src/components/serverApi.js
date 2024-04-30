import axios from "axios"




export  const Countries = async()=>{

       let response = await axios.get("https://crio-location-selector.onrender.com/countries")

       return response
}

export const CountryState = async(countryName)=>{

    let response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`)

    return response
}


export const StateCity = async(selectedCountry , stateName)=>{

     let response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateName}/cities`)

     return response
}