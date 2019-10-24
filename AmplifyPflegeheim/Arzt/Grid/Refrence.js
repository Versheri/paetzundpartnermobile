import React, { Component } from 'react';

import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { Block, theme } from 'galio-framework';
const { width } = Dimensions.get('screen');

export default class Refrence extends React.Component {
    state = {
      open: false,
    };

    Parts () {
      const { navigation } = this.props;
    const patientId = navigation.getParam('patientId')
    
        if (this.props.parts == "Leistungen") {
            return (
                <Provider>
                   <Portal>
                     <FAB.Group
                     style={styles.fab}
                       open={this.state.open}
                       icon={this.state.open ? 'today' : 'folder'}
                       actions={[
                         { icon: 'folder', label: 'Befunde', onPress: () => this.props.navigation.push('Befunde', {patientId: patientId} )},
                         { icon: 'folder', label: 'Scheine', onPress: () => this.props.navigation.push('Scheine', {patientId: patientId} )},
                         { icon: 'folder', label: 'PatientPage', onPress: () => this.props.navigation.push('PatientPage', {patientId: patientId} )},
                         { icon: 'folder', label: 'Planung', onPress: () => this.props.navigation.push('Planung', {patientId: patientId} )},
                       ]}
                       onStateChange={({ open }) => this.setState({ open })}
                       onPress={() => {
                         if (this.state.open) {
                           // do something if the speed dial is open
                         }
                       }}
                     />
                   </Portal>
                </Provider>
              );}
              if (this.props.parts == "Planung") {
                return (
                    <Provider>
                       <Portal>
                         <FAB.Group
                           open={this.state.open}
                           icon={this.state.open ? 'today' : 'folder'}
                           actions={[
                             { icon: 'folder', label: 'Befunde', onPress: () => this.props.navigation.push('Befunde', {patientId: patientId} )},
                             { icon: 'folder', label: 'Scheine', onPress: () => this.props.navigation.push('Scheine', {patientId: patientId} )},
                             { icon: 'folder', label: 'PatientPage', onPress: () => this.props.navigation.push('PatientPage', {patientId: patientId} )},
                             { icon: 'folder', label: 'Leistungen', onPress: () => this.props.navigation.push('Leistungen', {patientId: patientId} )},
                           ]}
                           onStateChange={({ open }) => this.setState({ open })}
                           onPress={() => {
                             if (this.state.open) {
                               // do something if the speed dial is open
                             }
                           }}
                         />
                       </Portal>
                    </Provider>
                  );}
                  if (this.props.parts == "PatientPage") {
                    return (
                        <Provider>
                           <Portal>
                             <FAB.Group
                               open={this.state.open}
                               icon={this.state.open ? 'today' : 'folder'}
                               actions={[
                                 { icon: 'folder', label: 'Befunde', onPress: () => this.props.navigation.push('Befunde', {patientId: patientId} )},
                                 { icon: 'folder', label: 'Scheine', onPress: () => this.props.navigation.push('Scheine', {patientId: patientId} )},
                                 { icon: 'folder', label: 'Leistungen', onPress: () => this.props.navigation.push('Leistungen', {patientId: patientId} )},
                                 { icon: 'folder', label: 'Planung', onPress: () => this.props.navigation.push('Planung', {patientId: patientId} )},
                               ]}
                               onStateChange={({ open }) => this.setState({ open })}
                               onPress={() => {
                                 if (this.state.open) {
                                   // do something if the speed dial is open
                                 }
                               }}
                             />
                           </Portal>
                        </Provider>
                      );}
                      if (this.props.parts == "Scheine") {
                        return (
                            <Provider>
                               <Portal>
                                 <FAB.Group
                                   open={this.state.open}
                                   icon={this.state.open ? 'today' : 'folder'}
                                   actions={[
                                     { icon: 'folder', label: 'Befunde', onPress: () => this.props.navigation.push('Befunde', {patientId: patientId} )},
                                     { icon: 'folder', label: 'Leistungen', onPress: () => this.props.navigation.push('Leistungen', {patientId: patientId} )},
                                     { icon: 'folder', label: 'PatientPage', onPress: () => this.props.navigation.push('PatientPage', {patientId: patientId} )},
                                     { icon: 'folder', label: 'Planung', onPress: () => this.props.navigation.push('Planung', {patientId: patientId} )},
                                   ]}
                                   onStateChange={({ open }) => this.setState({ open })}
                                   onPress={() => {
                                     if (this.state.open) {
                                       // do something if the speed dial is open
                                     }
                                   }}
                                 />
                               </Portal>
                            </Provider>
                          );}
                          if (this.props.parts == "Befunde") {
                            return (
                                <Provider>
                                   <Portal>
                                     <FAB.Group
                                       open={this.state.open}
                                       icon={this.state.open ? 'today' : 'folder'}
                                       actions={[
                                         { icon: 'folder', label: 'Leistungen', onPress: () => this.props.navigation.push('Leistungen', {patientId: patientId} )},
                                         { icon: 'folder', label: 'Scheine', onPress: () => this.props.navigation.push('Scheine', {patientId: patientId} )},
                                         { icon: 'folder', label: 'PatientPage', onPress: () => this.props.navigation.push('PatientPage', {patientId: patientId} )},
                                         { icon: 'folder', label: 'Planung', onPress: () => this.props.navigation.push('Planung', {patientId: patientId} )},
                                       ]}
                                       onStateChange={({ open }) => this.setState({ open })}
                                       onPress={() => {
                                         if (this.state.open) {
                                           // do something if the speed dial is open
                                         }
                                       }}
                                     />
                                   </Portal>
                                </Provider>
                              );}
      }
  
    render() {
      return (
          this.Parts()
      );
    }
  }

  const styles = StyleSheet.create({
    home: {
      width: width,   
      flex: 1, 
    },
    fab: {
      position: 'absolute',
      right: width/ 2.5,
      //bottom: 60,
    },
    fab2: {
      position: 'absolute',
      left: (width* 0.5),
      bottom: -50,
    },
    card: {
      position: 'absolute',
      alignItems: 'center',
      marginTop: 80,
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    contentBody: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    contentBody2: {
      justifyContent: 'center',
      alignItems: 'center',
      left: (width* 0.25)*0.75,
      marginBottom: 12,
      width: 150
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
  });