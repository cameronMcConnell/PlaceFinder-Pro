import { StyleSheet, SafeAreaView } from 'react-native';
import { API_KEY, STORAGE_KEY } from './exports';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import TypesList from './TypesList';
import Settings from './Settings';
import storage from './storage';
import Header from './Header';

export default function App() {
  
  // State for handling error getting location.
  const [errorMsg, setErrorMsg] = useState("");

  // State for user settings.
  // Needs to be stored on user cache.
  const [coordinates, setCoordinates] = useState({});
  const [location, setLocation] = useState("");
  const [measurement, setMeasurement] = useState("miles");
  const [radius, setRadius] = useState(3000);

  // State for opening the settings menu.
  const [settings, setSettings] = useState(false);

  // Gets user location on init.
  useEffect(() => {
    (async () => {
      
      // Check user device if location access is allowed.
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg(
          "Permission to access location was denied. \
          Please enable location services in your settings and \
          restart PlaceFinder-Pro."
        );
        return;
      }

      // Get the user coordinates and save them.
      const locationData = await Location.getCurrentPositionAsync({});
      setCoordinates({latitude: locationData.coords.latitude, longitude: locationData.coords.longitude});

      // Load state data if it has been stored previously.
      storage.load({
        key: STORAGE_KEY
      })
      .then((ret) => {
        setRadius(ret.radius);
        setMeasurement(ret.measurement);
      })
      .catch((err) => {
        if (err.name === "NotFoundError") {
          storage.save({
            key: STORAGE_KEY, // Note: Do not use underscore("_") in key!
            data: {radius, measurement},
        
            // if expires not specified, the defaultExpires will be applied instead.
            // if set to null, then it will never expire.
            expires: null
          })
          .catch((err) => {
            console.log(err);
          })
        }
      });
      
      // Get the user location string from coordinates.
      try 
      {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationData.coords.latitude},${locationData.coords.longitude}&key=${API_KEY}`);
        const json = await response.json();
        
        const parseString = json.plus_code.compound_code.split(",");
        const city = parseString[0].split(" ").slice(1).toString().replace(",", " ");
        let extraData = [];
      
        for (let i = 1; i < parseString.length; i++) {
          extraData.push(parseString[i].trim());
        }
    
        setLocation(`${city}, ${extraData.join(", ")}`);
      }
      catch (err) 
      {
        // Implement some error handling here.
        return;
      }  
    })();
  }, []);

  // Header and Settings or TypeList components.
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Header settings={settings}
        setSettings={setSettings}
        radius={radius}
        measurement={measurement}
      />
      {settings ?  
        <Settings location={location}
          radius={radius}
          setRadius={setRadius}
          measurement={measurement}
          setMeasurement={setMeasurement}
        />
        :
        <TypesList coordinates={coordinates}
          radius={radius}
          errorMsg={errorMsg}
          measurement={measurement}
        />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3b74ba',
    flex: 1
  },
});
