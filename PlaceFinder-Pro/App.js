import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import TypesList from './TypesList';
import * as Location from 'expo-location';

export default function App() {
  // State for handling error getting location.
  const [errorMsg, setErrorMsg] = useState("");

  // State for user settings.
  // Needs to be stored on user cache.
  const [location, setLocation] = useState({latitude: "-33.8670522", longitude: "151.1957362"});
  const [radius, setRadius] = useState(3000);

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
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Header</Text>
      <TypesList location={location}
        radius={radius}
        errorMsg={errorMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
