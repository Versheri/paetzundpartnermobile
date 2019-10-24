import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, Button, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import Refrence from '../Refrence';
const { width } = Dimensions.get('screen');


export default class Planung extends React.Component {
      
  render() {
    return (
           <>
           <Block flex center style={styles.home}>
           <Text>Planung</Text> 
           </Block>
           </>
    );
    
  }
}
  
const styles = StyleSheet.create({
    home: {
      width: width,    
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
  });