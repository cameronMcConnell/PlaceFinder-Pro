import { StyleSheet, Text, View, Dimensions } from 'react-native';

const Settings = () => {
  const pageHeight = Dimensions.get("window").height;
  
  return (
    <View style={{height: pageHeight, width: "100%", backgroundColor: 'white'}}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({

})

export default Settings;