import React from "react";
import { Easing, Animated, Text } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { withAuthenticator } from 'aws-amplify-react-native'
import { Auth } from "aws-amplify";

// screens
import PatientTable from "../Patienten/PatientTable";
import AddPatient from "../Patienten/AddPatient";
import PatientPage from "../Patienten/PatientPage";

import * as Textfile from "../../../Textfile"

// component folder
import Navbar from "./Navbar";
import DrawerItem from "../../../components/DrawerItem";
import Header from "../../../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const PatientTableStack = createStackNavigator(
  {
    PatientTable: {
      screen: PatientTable,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="PatientTable" style={{height: 50}} navigation={navigation}/>
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const AddPatientStack = createStackNavigator(
  {
    AddPatient: {
      screen: AddPatient,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="AddPatient" style={{height: 50}} navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const PatientPagesStack = createStackNavigator(
  {
    PatientPage: {
      screen: PatientPage,
      navigationOptions: ({ navigation }) => ({
        header: <Header search style={{height: 15}} point={2} title="PatientPage" navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);


//Appstack

const AppStack = createDrawerNavigator(
  {
    PatientTable: {
      screen: PatientTableStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
         null
        )
      })
    },
    AddPatients: {
      screen: AddPatientStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    PatientPages: {
      screen: PatientPagesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
  },
  Navbar
);

const AppContainer = createAppContainer(AppStack);



export default (AppContainer);
