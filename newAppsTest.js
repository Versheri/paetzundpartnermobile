import React, { Component } from 'react';

import {
  Text,
  View, 
  StyleSheet
} from 'react-native';

import SwipeGesture from './swipe-gesture'

export default class App extends Component {

  onSwipePerformed = (action) => {
    /// action : 'left' for left swipe
    /// action : 'right' for right swipe
    /// action : 'up' for up swipe
    /// action : 'down' for down swipe

    console.warn(action)
    
    switch(action){
      
      case 'left':{
        console.warn('left Swipe performed')
      }
       case 'right':{
        console.warn('right Swipe performed')
      }
       case 'up':{
        console.warn('up Swipe performed')
      }
       case 'down':{
        console.warn('down Swipe performed')
      }
       default : {
       console.warn('Undeteceted action')
       }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SwipeGesture gestureStyle={styles.swipesGestureContainer} 
            onSwipePerformed={this.onSwipePerformed}>
          <Text onPress={()=>console.warn('horn')}>This is react native swipe gesture</Text>
          <Text>Used to detect the user swipes and function accordingly</Text>
        </SwipeGesture>
      </View>
    );
  }
}

const styles= StyleSheet.create({
 container:{
  height:'100%',
  width:'100%',
  alignSelf:'center',
  alignItems: 'center'
 },
 swipesGestureContainer:{
  height:'100%',
  width:'100%'
 },
})
