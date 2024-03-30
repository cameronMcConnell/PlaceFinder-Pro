import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { TYPES_NAME_OBJECTS } from './exports';
import { useState, useEffect } from 'react';
import TypesListButton from './TypesListButton';

const TypesList = ({location, radius, errorMsg}) => {
  // Render error page for not enabling location services.
  // For the main page.
  if (errorMsg) {
    Alert.alert('Enable Location Services', errorMsg);
    
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // List of TypesListButton components.
  return (
    <FlatList 
      data={TYPES_NAME_OBJECTS}
      renderItem={({item}) => (
        <TypesListButton key={item.type}
          location={location}
          radius={radius}
          type={item.type}
        />
      )}
    />
  );
}

export default TypesList;