import { StyleSheet, Text, View, FlatList } from 'react-native';

const DataList = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={({item}) => (
          <View key={item.vicinity}>
            {Object.entries(item).map(([key, value]) => (
              <Text key={key+value}>{key}: {value}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default DataList;