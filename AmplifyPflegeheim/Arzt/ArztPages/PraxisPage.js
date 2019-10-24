import React, { Component } from 'react';
import { ScrollView, Button, View, StyleSheet, Dimensions } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Text } from "galio-framework";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { API, graphqlOperation }  from "aws-amplify";


const { width } = Dimensions.get('screen');

export default class PraxisPage extends React.Component {
  state = {
    praxiss: [],
    arzt: []
  }
  
  async componentDidMount() {
    try {
      const apiData = await API.graphql(graphqlOperation(queries.listPraxiss))

      this.setState({ praxiss: apiData.data.listPraxiss.items })

      const data = await API.graphql(graphqlOperation(queries.listArzts2))
    //console.log('result', result)
    this.setState({arzt: data.data.listArzts2.items})
    
    } catch (err) {
      console.warn('error: ', err)
    }
  };
  
  render() {
    const { classes } = this.props;
    const { praxiss, arzt } = this.state;
    console.warn('fghfg: ', praxiss)
    console.warn('gg: ', arzt)
    return (
           <> 
           <Block flex center style={styles.home}>
                  <Block>
                  {praxiss.map(praxis => (   
                    arzt.map(rest => ( 
                
                      praxis.Name == rest.Praxis ? (
                        <>
                    <Text bold size={28} color="#32325D" style={{ alignSelf: 'center' }}>
                     { praxis.Name }
                    </Text>
                    <Text size={16} color="#32325D" style={{ alignSelf: 'center' }}>
                     { 'mail:'+ ' '+praxis.Email }
                    </Text>
                    <Text size={16} color="#32325D" style={{ alignSelf: 'center' }}>
                     {'Tel:'+ ' ' + praxis.Telefonnummer} 
                    </Text>
                    <Text size={8} color="#32325D" style={{ alignSelf: 'center' }}>
                     {praxis.Strasse+ ' ' +praxis.HausNr+ ' '+praxis.Postleitzahl+ ' '+praxis.Ort}
                    </Text>
                    </>
                    ):(null)
                      ))))}
                  </Block>
            </Block>
           </>
    );
    
  }
}
  
const styles = StyleSheet.create({
    home: {
      width: width,
      marginTop: 50    
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
  });
