import React, { Component } from 'react';
import { Text, ScrollView, Button, View, StyleSheet, Dimensions } from 'react-native';
import { Block, theme } from 'galio-framework';


const { width } = Dimensions.get('screen');

export default class MitarbeiterPage extends React.Component {
      
  render() {
    return (
           <> 
           <Block flex center style={styles.home}>
               <Text>MitarbeiterPage</Text> 
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
