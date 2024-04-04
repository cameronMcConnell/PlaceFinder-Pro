import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MEASUREMENT_KEYS } from './exports';
import DataList from './DataList';
import { useState } from 'react';
import { API_KEY } from './api';

const TypesListButton = ({coordinates, radius, type, measurement}) => {

  // State for api request data.
  const [data, setData] = useState(null);

  // State for handling error from request.
  const [errorMsg, setErrorMsg] = useState("");

  // State for awaiting data or loading.
  const [loading, setLoading] = useState(false);

  // Set used to get specific key value pairs.
  const dataKeySet = new Set([
    "name", "rating", 
    "vicinity", "geometry"
  ]);

  // Helper function for getDistance and Haversine Formula.
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  }

  // Get the distance from user lat and long to place lat and long.
  const getDistance = (data) => {
    const lat1 = toRadians(parseFloat(coordinates.latitude));
    const long1 = toRadians(parseFloat(coordinates.longitude));

    for (let i = 0; i < data.length; i++) {
      const lat2 = toRadians(data[i]["geometry"]["location"]["lat"]);
      const long2 = toRadians(data[i]["geometry"]["location"]["lng"]);

      // Haversine Formula.
      const distance = (
        Math.acos(Math.sin(lat1)*Math.sin(lat2)+
        Math.cos(lat1)*Math.cos(lat2)*Math.cos(long2-long1))*
        MEASUREMENT_KEYS[measurement][2]
      ).toFixed(2);

      // Add the distance to data
      data[i]["vicinity"] = {
        address: data[i]["vicinity"], 
        lat: data[i]["geometry"]["location"]["lat"],
        lng: data[i]["geometry"]["location"]["lng"]
      };

      delete data[i]["geometry"];
      data[i]["distance"] = distance;
    }
  }

  // Get only the needed key value pairs for each object.
  const formatData = (data) => {
    let newData = [];
    
    for (const obj of data.results) {
      let newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        if (dataKeySet.has(key)) {
          newObj[key] = value;
        }
      }
      newData.push(newObj);
    }

    // Get distance and sort data by it.
    getDistance(newData);
    newData.sort((a, b) => a.distance - b.distance);

    return newData;
  }

  // Performs nearby search api call.
  const nearbySearch = async (coordinates, radius, type) => {
    // Hack to close the menu on second button press.
    if (data !== null) {
      setData(null);
      return;
    }

    // Begin to load the data.
    setLoading(true);

    // Format url.
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    const params = `?location=${coordinates.latitude}%2C${coordinates.longitude}&radius=${radius}&type=${type}&key=${API_KEY}`;
    
    let responseJson;

    // Fetch data.
    try 
    {
      const response = await fetch(url + params);
      responseJson = await response.json();
    } 
    catch (err) 
    {
      // Render error component.
      setErrorMsg(err);
      setLoading(false);
      return;
    } 
    finally 
    {
      // Display the data.
      setLoading(false);
      setData([...formatData(responseJson)]);
    }
  }

  // Display button and data in FlatList.
  // Error message if request is not successful.
  // If data.results is empty, display no results.
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => nearbySearch(coordinates, radius, type)} >
        <Text style={styles.text}>{type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
      </TouchableOpacity>
      {loading ? 
        <View style={styles.center}>
          <ActivityIndicator /> 
        </View>
        : ""}
      {errorMsg ?
        <View style={styles.center}> 
          <Text>{errorMsg}</Text>
        </View> : ""}
      {data ? 
        <DataList 
          data={data} 
          measurement={measurement} 
        />: ""}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
  button: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 5
  }
});


export default TypesListButton;