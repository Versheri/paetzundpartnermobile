import React from 'react';

import Update from './update';

import * as queries from './AmplifyPflegeheim/graphql/queries'
import { API, graphqlOperation }  from "aws-amplify";
import { Image, TouchableWithoutFeedback, Keyboard, Text  } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { DataTable, Card, Avatar, Searchbar, HelperText, Button  } from 'react-native-paper';

import Auth from '@aws-amplify/auth';

import Screens from './navigation/Screens';
import { Images, articles, argonTheme } from './constants';
import NavbarParts from './AmplifyPflegeheim/Arzt/ArztComponents/Navigation/NavbarParts'



class WithProvider extends React.Component {
    

    state = { group: [],
              K: [],
              user:[] }
  
    async componentDidMount() {
      try {
        const session = await Auth.currentSession();
        const group = session.accessToken.payload["cognito:groups"]
        
        this.setState({ group })
        console.log(group)
      } catch (err) {
        console.log('error: ', err)
      }

      Auth.currentAuthenticatedUser({
        bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {//console.log("useru",user.username);
    const Me = user.username;
    //console.log("userup",Me)
    this.setState({username: Me})}
    )
    .catch(err => console.log(err));
      this.get();
    } 

    get = () => {
      if ( this.state.group == "Patient" ) {
        API.graphql(graphqlOperation(queries.listPatients))
      .then(data => this.setState({K: data.data.listPatients.items}))
      }
      if ( this.state.group == "PraxisAdministrator" ) {
        API.graphql(graphqlOperation(queries.listPraxisGeschaeftsfuerungs))
      .then(data => this.setState({K: data.data.listPraxisGeschaeftsfuerungs.items}))
      } 
      if ( this.state.group == "PflegeheimAdministrator" ) {
        API.graphql(graphqlOperation(queries.listPflegeheimGeschaeftsfuerungs))
      .then(data => this.setState({K: data.data.listPflegeheimGeschaeftsfuerungs.items}))
      } 
      if ( this.state.group == "Arzt" ) {
        API.graphql(graphqlOperation(queries.listArzts))
      .then(data => this.setState({K: data.data.listArzts.items}))
      } 
      if ( this.state.group == "Betreuer" ) {
        API.graphql(graphqlOperation(queries.listBetreuers))
      .then(data => this.setState({K: data.data.listBetreuers.items}))
      }
      if ( this.state.group == "PflegeheimPDL" ) {
        API.graphql(graphqlOperation(queries.listPflegeheimPDLs))
      .then(data => this.setState({K: data.data.listPflegeheimPDLs.items}))
      }  else return null;

      console.log("bdata", this.state.K)

    };

    handleSignOut = async () => {
      try {
  
     await Auth.signOut();
      } catch(err) {
        console.error('Error signinout user', err);
      }
  
    }
  
    
    render() {
      const {K} = this.state

      var Formular = K.map((rest, i) => (
        rest.username == this.state.username ? (
         rest.Formular
         ): null
     ))

     Formular = Formular.filter( Boolean );

     var IDdata = K.map((rest, i) => (
        rest.username == this.state.username ? (
         rest
         ): null
     ))

     IDdata = IDdata.filter( Boolean );

     console.log("bdata", IDdata)
      
      if ( Formular == "1" ) {
        return (
                <>
                  {IDdata.map((rest, i) => (
                  <Update updateId = {rest.username == this.state.username ? (
                    rest.id
                    ): null} group={this.state.group}/>
                  ))}
                </>
        );}        
     if ( this.state.group == "Administrator" ) {
      return (
              <>
                
              </>
      );} 
      if ( this.state.group == "Arzt" ) {
        return (
                <>
                   <NavbarParts SignOut={this.props.SignOut}></NavbarParts>  
                </>
        );} 
        if ( this.state.group == "Betreuer" ) {
            return (
                    <>
                      
                    </>
            );} 
            if ( this.state.group == "Patient" ) {
                return (
                        <>
                         
                        </>
                );}
            if ( this.state.group == "PflegeheimAdministrator" ) {
                  return (
                          <>
                           
                          </>
                  );}
            if ( this.state.group == "PraxisAdministrator" ) {
                    return (
                            <>
                              
                            </>
                    );}
            if ( this.state.group == "PflegeheimPDL" ) {
                      return (
                              <>
                                
                              </>
                      );}  else return (null)
        
        }
        }
       
  
  
  export default WithProvider;