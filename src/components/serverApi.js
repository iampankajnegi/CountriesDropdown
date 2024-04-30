import axios from "axios"




export  const Countries = async()=>{

    try{

       let response = await axios.get("https://crio-location-selector.onrender.com/countries")

       return response

    }
    catch(error) { console.error('Error fetching countries:', error)};
}

export const CountryState = async(countryName)=>{

    try{

    let response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`)

    return response

    }
    catch(error) { console.error('Error fetching State:', error)};
}


export const StateCity = async(selectedCountry , stateName)=>{

    try{

     let response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${stateName}/cities`)

     return response

    }
    catch(error) { console.error('Error fetching Cities:', error)};
}