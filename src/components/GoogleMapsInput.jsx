import { InputBase } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

const GoogleMapsInput = () => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const loaded = useRef(false);
    const [address, setAddress] = useState("");


    console.log("address",address)
    function loadScript(src, position, id, callback) {
        if (!position) {
            return;
        }
    
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('id', id);
    
        script.onload = callback;
    
        script.src = src;
        position.appendChild(script);
    }
    
    useEffect(() => {
        const onLoad = () => {
            const options = {
                fields: ["address_components", "formatted_address", "icon", "name"],
                componentRestrictions: {country: "US"},
                types: ["address"],
                strictBounds: false,
            };
            autoCompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                options
            );
            autoCompleteRef.current.addListener("place_changed", async function () {
                const place = await autoCompleteRef.current.getPlace();
                console.log("place",place)
            });
        };
    
        if (typeof window !== 'undefined' && !loaded.current) {
            if (!document.querySelector('#google-maps')) {
                loadScript(
                    `https://maps.googleapis.com/maps/api/js?key=AIzaSyCCTnCWau5V8mLi_PmDkxsKV2nKs1LbuW4&libraries=places&callback=initMap`,
                    document.querySelector('head'),
                    'google-maps',
                    onLoad
                );
            }
    
            loaded.current = true;
        }
    }, []);
    function extractLocationInfo(fullAddress) {
      let city = '';
      let state = '';
      let zipCode = '';
      let country = '';
  
      const addressParts = fullAddress.split(',').map(part => part.trim());
      const addressLength = addressParts.length;
  
      country = addressParts[addressLength - 1];
  
      if (addressLength > 1 && addressParts[addressLength - 2].match(/^\d{5}(?:[-\s]\d{4})?$/)) {
          zipCode = addressParts[addressLength - 2];
          addressParts.pop(); 
          state = addressParts[addressLength - 3];
          addressParts.pop();
      } else {
          state = addressParts[addressLength - 2];
      }
        city = addressParts.slice(0, addressLength - 2).join(', ');
  
      return {
          city: city,
          state: state,
          zipCode: zipCode,
          country: country
      };
  }
  
  // Example usage:
  const address1 = ['Bellevue', 'NE', 'USA'];
  const address2 = ['3750 Wailea Drive', 'Bakersfield', 'CA', 'USA'];
  const address4 = ["Lahore Zoo", "Shahrah-e-Quaid-e-Azam", "Jinnah Town", "Lahore", "Pakistan"];
  const address3 = ['The Bay Club, a Hilton Grand Vacations Club', 'Waikōloa Beach Drive', 'Waikoloa Village', 'HI','98765', 'USA'];
  
  console.log(extractLocationInfo(address1.join(', ')));
  console.log(extractLocationInfo(address2.join(', ')));
  console.log(extractLocationInfo(address3.join(', ')));
  console.log(extractLocationInfo(address4.join(', ')));
  
  
    
  return (
    <>
     <InputBase
              onChange={(e) =>
                setAddress(e.target.value)
              }
              type="text"
              required
              sx={{
                ml: 1,
                flex: 1,
                "&::placeholder": {
                  color: "#628979",
                },
              }}
              placeholder="Enter Property Address"
              inputProps={{
                "aria-label": "Enter Property Address",
              }}
              inputRef={inputRef}
            />
    </>
  )
}

export default GoogleMapsInput
