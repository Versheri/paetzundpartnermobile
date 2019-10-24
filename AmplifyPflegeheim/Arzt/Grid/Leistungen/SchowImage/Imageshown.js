import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, Image, Button, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import { Avatar } from 'react-native-paper';
const { width } = Dimensions.get('screen');


export default class Imageshown extends React.Component {
      
  render() {
      const { navigation } = this.props;
     const urls = navigation.getParam('uri');
     const patientId = navigation.getParam('patientId');
      console.warn("kat",this.props.navigation)
    return (
           <>
           <Image 
              onPress={ () =>  {this.props.navigation.push('Leistungen')}}
              source={{uri:urls}} 
              style={{ width: 400, height: 400, marginTop: 50, alignSelf: 'center'}}/>
           <Text onPress={ () =>  {this.props.navigation.push('Leistungen', {patientId: patientId})}}>Zurück</Text>
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