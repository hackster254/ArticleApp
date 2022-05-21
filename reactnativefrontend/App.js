import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import Create from './components/Create';
import Home from './components/Home';
import HomePage from './components/HomePage';
import Details from './components/Details';
import Edit from './components/Edit';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



// create stack naviagator
const Stack = createStackNavigator()

function App() {
  return (
    // <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="HomePage" component={HomePage}/>
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name='Edit' component={Edit} />
      </Stack.Navigator>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      {/* <Home name={"hello"} /> */}
      {/* <HomePage /> */}
      {/* <Create /> */}
      </NavigationContainer>
      
    //{/* </View> */}
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
