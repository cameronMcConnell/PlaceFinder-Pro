import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MEASUREMENT_KEYS } from './exports';

const Header = ({settings, setSettings, radius, measurement}) => {
  const changeSettings = () => {
    setSettings((prevSettings) => !prevSettings)
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={() => changeSettings()}>
        <FontAwesome name={settings ? "arrow-left": "gear"} size={24} color="white"/>
      </TouchableOpacity>
      <Text style={styles.text}>PlaceFinder-Pro</Text>
      <View style={styles.flex}>
        <View style={styles.center}>
          <Text style={styles.bold_underline}>Range:</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.bold}>
            {(radius * MEASUREMENT_KEYS[measurement][1]).toFixed(2)} {measurement}
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
    justifyContent: "center"
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
  bold_underline: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    textDecorationLine: "underline"
  }
});

export default Header;