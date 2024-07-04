import React,{ useRef, useState } from "react";
import { VITE_APP_GOOGLE_MAPS_API_KEY } from "../../Constant";

window.initMap = () => {};
const GoogleMapsInput = ({setStreet,setZip,setState,setCity}) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const [address, setAddress] = useState(street);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!scriptLoaded && typeof window !== "undefined") {
        const script = document.createElement('script');
        script.id = 'google-maps';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${VITE_APP_GOOGLE_MAPS_API_KEY}&loading=async&libraries=places&callback=initMap`;
        script.onload = () => setScriptLoaded(true);
        document.head.appendChild(script);
      }
    };

    const initializeAutoComplete = () => {
      const autoComplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        { types: ["address"] }
      );

      autoCompleteRef.current = autoComplete;

      autoComplete.addListener("place_changed", () => {
        const place = autoComplete.getPlace();
        const { street, city, state, zip } = extractAddressComponents(
          place.address_components
        );
        setStreet(street);
        setZip(zip);
        setState(state);
        setCity(city);
      });
    };

    const extractAddressComponents = (addressComponents) => {
      let street = "";
      let city = "";
      let state = "";
      let zip = "";

      addressComponents.forEach((component) => {
        if (component.types.includes("route")) {
          street = component?.long_name;
        } else if (component.types.includes("locality")) {
          city = component?.short_name;
        } else if (component.types.includes("administrative_area_level_1")) {
          state = component?.short_name;
        } else if (component.types.includes("postal_code")) {
          zip = component?.short_name;
        }
      });

      return { street, city, state, zip };
    };

    if (scriptLoaded && window.google) {
      initializeAutoComplete();
    } else {
      loadGoogleMapsScript();
    }
  }, [scriptLoaded]);

  return (
    <>
      <SimpleInput
        label="street"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        fullWidth
        error={Boolean(errorObj?.street)}
        helperText={errorObj?.street?.[0]}
        inputRef={inputRef}
      />
    </>
  );
};

export default GoogleMapsInput;