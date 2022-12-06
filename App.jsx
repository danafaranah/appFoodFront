import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/Navigation";
import { StatusBar } from "react-native";
import { NavigationDrawer } from "./src/navigation/NavigationDrawer";
import  axios  from "axios";

axios.defaults.baseURL="http:10.8.110.92:4000" ,{/*ipconfig*/}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={"light-content"} />
      {/* <Navigation /> */}
      <NavigationDrawer/>
    </NavigationContainer>
  );
};

