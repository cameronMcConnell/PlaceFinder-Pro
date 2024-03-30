import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { API_KEY } from './exports';
import { useState } from 'react';

const TypesListButton = ({location, radius, type}) => {

  // State for api request data.
  const [data, setData] = useState(null);

  // State for handling error from request.
  const [errorMsg, setErrorMsg] = useState("");

  // State for awaiting data or loading.
  const [loading, setLoading] = useState(false);

  // Set used to get specific key value pairs.
  const dataKeySet = new Set([
    "name", "price_level", "rating",
    "website", "vicinity"
  ]);

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

    return newData;
  }

  // Performs nearby search api call.
  const nearbySearch = async (location, radius, type) => {
    // Hack to close the menu on second button press.
    if (data !== null) {
      setData(null);
      return;
    }

    // Begin to load the data.
    setLoading(true);

    // Format url.
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    const params = `?location=${location.latitude}%2C${location.longitude}&radius=${radius}&type=${type}&key=${API_KEY}`;
    
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
    <View>
      <Button 
        onPress={() => nearbySearch(location, radius, type)}
        title={type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      />
      {loading ? <Text>Loading</Text> : ""}
      {errorMsg ? <Text>{errorMsg}</Text> : ""}
      {data ? <Text>{JSON.stringify(data)}</Text>: ""}
    </View>
  );
}

export default TypesListButton;