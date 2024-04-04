import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MEASUREMENT_KEYS } from './exports';

const Header = ({settings, setSettings, radius, measurement, bgColor}) => {
  const changeSettings = () => {
    setSettings((prevSettings) => !prevSettings)
  }

  return (
    <View style={[styles.header, {backgroundColor: bgColor}]}>
      <TouchableOpacity style={styles.button} onPress={() => changeSettings()}>
        <FontAwesome name={settings ? "arrow-left": "gear"} size={24} color="white"/>
      </TouchableOpacity>
      <Text style={styles.text}>PlaceFinder-Pro</Text>
      <View style={styles.flex}>
        <View style={styles.center}>
          <Text style={[styles.bold, styles.underline]}>
            {measurement[0].toUpperCase() + measurement.slice(1)}:
          </Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.bold}>
            {(radius * MEASUREMENT_KEYS[measurement][1]).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#3b74ba",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  button: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: 'white'
  },
  flex: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bold: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  underline: {
    textDecorationLine: "underline"
  }
});

export default Header;