import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TYPES_NAME_OBJECTS } from './exports';
import TypesListButton from './TypesListButton';

const TypesList = ({location, radius, errorMsg, measurement}) => {
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
    <View style={styles.container}>
      <FlatList 
        data={TYPES_NAME_OBJECTS}
        renderItem={({item}) => (
          <TypesListButton key={item.type}
            location={location}
            radius={radius}
            type={item.type}
            measurement={measurement}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    flex: 1
  },
});

export default TypesList;