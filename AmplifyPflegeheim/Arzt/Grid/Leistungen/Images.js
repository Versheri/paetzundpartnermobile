//React
import React, { Component } from 'react';
//Amplify
import { Storage } from 'aws-amplify';
import { Text, ScrollView, Image, Modal, View, ImageBackground , TouchableOpacity, StyleSheet } from 'react-native';

export default class Images extends React.Component

{
    
    state = {
        s3image: [],
        open: false,
        image: [],
        modalVisible: false,
      };

  //openModal  

  setModalVisible() {
    this.setState({modalVisible: true});
  }

  componentDidMount() {
    Storage.get(this.props.p)
          .then(result =>{ console.log("Storageb");
           const Me = result;
           this.setState({image: Me})
           //console.log("geb", Me)
          
          })
          .catch(err => console.log(err))
        }


        render() {
          const { navigation } = this.props;
          const patientId = navigation.getParam('patientId');
        
          return (
              <>
              <Image 
              onPress={ () =>  {this.props.navigation.push('Imageshown')}}
              source={{uri:this.state.image}} 
              style={{ width: 50, height: 50}}/>
            </>
          );
        }
}


