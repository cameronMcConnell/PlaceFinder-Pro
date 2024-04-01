import { StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import TypesList from './TypesList';
import Settings from './Settings';
import Header from './Header';

export default function App() {
  // State for handling error getting location.
  const [errorMsg, setErrorMsg] = useState("");

  // State for user settings.
  // Needs to be stored on user cache.
  const [location, setLocation] = useState({latitude: "-33.8670522", longitude: "151.1957362"});
  const [radius, setRadius] = useState(3000);
  const [measurement, setMeasurement] = useState("miles");

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

      // Get the user location and save coords.
      let locationData = await Location.getCurrentPositionAsync({});
      setLocation({latitude: locationData.coords.latitude, longitude: locationData.coords.longitude});
    })();
  }, []);

  // Header and Settings or TypeList components
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Header settings={settings}
        setSettings={setSettings}
        radius={radius}
        measurement={measurement}
      />
      {settings ?  
        <Settings 
        />
        :
        <TypesList location={location}
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
