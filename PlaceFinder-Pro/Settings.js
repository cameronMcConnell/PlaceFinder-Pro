import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { MEASUREMENT_KEYS, STORAGE_KEY } from './exports';
import storage from "./storage";

const Settings = ({location, radius, setRadius, measurement, setMeasurement}) => {
  const pageHeight = Dimensions.get("window").height;

  // Uses storage to save data to local cache.
  const saveSettings = (data) => {
    storage.save({
      key: STORAGE_KEY, // Note: Do not use underscore("_") in key!
      data: data,
  
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null
    })
    .catch((err) => {
      console.log(err);
    })
  } 
  
  return (
    <View style={[styles.background, {height: pageHeight}]}>
      <View style={styles.container}>
        <Text style={[styles.text, styles.bold]}>Location:</Text>
        <Text style={styles.text}>{location}</Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.text, styles.bold]}>Radius:</Text>
        <Slider 
          value={radius}
          onValueChange={(newRadius) => setRadius(newRadius)}
          step={1}
          minimumValue={1}
          maximumValue={50000}
        />
        <Text style={styles.text}>{(radius * MEASUREMENT_KEYS[measurement][1]).toFixed(2)} {measurement}</Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.text, styles.bold]}>Measurement:</Text>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, measurement === "miles" ? styles.highlight: ""]} onPress={() => setMeasurement("miles")}>
            <Text>Miles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, measurement === "kilometers" ? styles.highlight: ""]} onPress={() => setMeasurement("kilometers")}>
            <Text>Kilometers</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={[styles.text, styles.bold]}>Save Settings:</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => saveSettings({radius: radius, measurement: measurement})}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%", 
    backgroundColor: "white", 
    justifyContent: "center"
  },
  container: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5
  },
  text: {
    textAlign: "center",
    fontSize: 18
  },
  row: {
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10
  },
  bold: {
    fontWeight: "bold"
  },
  highlight: {
    backgroundColor: "rgba(236, 236, 236, 1)"
  }
})

export default Settings;