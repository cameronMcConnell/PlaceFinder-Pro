import { StyleSheet, Text, View, FlatList, TouchableOpacity, Linking, Platform, Alert } from 'react-native';
import { Rating } from "react-native-ratings";

const DataList = ({data, measurement}) => {
  
  // Open location on google maps.
  const openMap = (lat, lng, address) => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${address}@${latLng}`,
      android: `${scheme}${latLng}(${address})`
    });
          
    Linking.openURL(url).catch((err) => {
      Alert.alert("Error opening link", err);
    });
  }
  
  // Choose correct element to display based on key value.
  const getElement = (key, value) => {
    switch (key) {
      case "name":
        return <Text style={[styles.text, styles.bold]} key={key+value}>{value}</Text>
      case "vicinity":
        return (
          <TouchableOpacity key={key+value} onPress={() => openMap(value.lat, value.lng, value.address)}>
            <Text style={[styles.text, styles.url]}>{value.address}</Text>
          </TouchableOpacity>
        );
      case "distance":
        return <Text style={styles.text} key={key+value}>{value} {measurement}</Text>
      case "rating":
        return (
          <View style={styles.flex} key={key+value}>
            <Rating
              readonly={true}
              imageSize={20}
              startingValue={value}
            />
          </View>
        );
    }
  }

  return (
    <View style={styles.container}>
      {data.length ?
        <FlatList 
          data={data}
          renderItem={({item}) => (
            <View style={styles.border} key={item.vicinity}>
              {Object.entries(item).map(([key, value]) => (
                getElement(key, value)
              ))}
            </View>
          )}
        /> 
        :
        <View style={styles.center}>
          <Text style={styles.text}>No nearby locations.</Text>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    textAlign: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  border: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    margin: 5,
    rowGap: 5
  },
  row: {
    flexDirection: "row"
  },
  url: {
    color: "rgb(10,132,255)",
    textDecorationLine: "underline"
  },
  center: {
    padding: 5,
    margin: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default DataList;