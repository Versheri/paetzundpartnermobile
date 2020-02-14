import React, { useState } from 'react';

import { Auth } from "aws-amplify"
import { View, Text } from 'react-native'
import { withAuthenticator } from 'aws-amplify-react-native'
import { DataTable, Card, Avatar, Searchbar, HelperText, Button  } from 'react-native-paper';

import Amplify from 'aws-amplify';
import {Authenticator, API, graphqlOperation } from "aws-amplify-react-native"
import AWS from 'aws-sdk'
import * as queries from './API/queries'
import * as queries2 from './API/queries2'
import appSyncConfig from "./aws-exports";
import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient, { defaultDataIdFromObject } from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import gql from "graphql-tag";
import { buildMutation } from 'aws-appsync';
import Group from './Group'
import Update from './Update'
import HomeScreen from './screens/HomeScreen'

//Navigation
import NavbarPartsAdmin from './AmplifyPflegeheim/Administrator/Navigation/NavbarParts'

Amplify.configure(appSyncConfig);

const client = new AWSAppSyncClient({
  url: appSyncConfig.aws_appsync_graphqlEndpoint,
  region: appSyncConfig.aws_appsync_region,
  auth: {
    type: appSyncConfig.aws_appsync_authenticationType,
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  offlineConfig: {
    keyPrefix: 'groupfilter'
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});



  export default class Signout  extends React.Component{
    state = { group: [],
      K: [],
    user:[],
    username:''
   }

    async componentDidMount() {
      this.Userdata()
      .then(()=>this.get())
      //.catch((err)=>console.log('Error', err))
  
    }

    async Userdata(){
      try {
        const session = await Auth.currentSession();
        const group = session.accessToken.payload["cognito:groups"]
        
        this.setState({ group })
        //console.log('group',group)
      } catch (err) {
        //console.log('error: ', err)
      }

      Auth.currentAuthenticatedUser({
        bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {//console.log("useru",user.username);
    const Me = user.username;
    //console.log("userup",Me)
    this.setState({username: Me})}
    )
    .catch(err => console.log(err));
    
    }

    async get () {

      if ( this.state.group == "Administrator" ) {
        console.log('hey1')
        const query = queries.listAdministrators
          const result = await client.query({
               query,
               fetchPolicy: 'network-only',
          });
      this.setState({K: result.data.listAdministrators.items})
      console.log('heyoo', result.data.listAdministrators.items)
      }
      if ( this.state.group == "Patient" ) {
        const query = queries2.listPatients2
          const result = await client.query({
               query,
               fetchPolicy: 'network-only',
          });
      this.setState({K: result.data.listPatients2.items})
      }
      if ( this.state.group == "PraxisAdministrator" ) {
        const query = queries2.listPraxisGeschaeftsfuerungs2
        const result = await client.query({
             query,
             fetchPolicy: 'network-only',
        });
    this.setState({K: result.data.listPraxisGeschaeftsfuerungs2.items})
      } 
      if ( this.state.group == "PflegeheimAdministrator" ) {
        const query = queries2.listPflegeheimGeschaeftsfuerungs2
        const result = await client.query({
             query,
             fetchPolicy: 'network-only',
        });
    this.setState({K: result.data.listPflegeheimGeschaeftsfuerungs2.items})
      } 
      if ( this.state.group == "Arzt" ) {
        const query = queries2.listArzts2
        const result = await client.query({
             query,
             fetchPolicy: 'network-only',
        });
    this.setState({K: result.data.listArzts2.items})
      } 
      if ( this.state.group == "Betreuer" ) {
        const query = queries2.listBetreuers2
        const result = await client.query({
             query,
             fetchPolicy: 'network-only',
        });
    this.setState({K: result.data.listBetreuers2.items})
      }
      if ( this.state.group == "PraxisMitarbeiter" ) {
        const query = queries2.listPraxisMitarbeiters2
        const result = await client.query({
             query,
             fetchPolicy: 'network-only',
        });
    this.setState({K: result.data.listPraxisMitarbeiters2.items})
      }
      if ( this.state.group == "PflegeheimPDL" ) {
        const query = queries2.listPflegeheimPDLs2
        const result = await client.query({
             query,
             fetchPolicy: 'network-only',
        });
    this.setState({K: result.data.listPflegeheimPDLs2.items})
      }  else return null;

    };
  
    render(){
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

     console.log("Formular", Formular)
     console.log("Formular2", this.state.username)
     console.log("IDdata", K)
     

     if ( Formular == "1" ) {
       console.log('hey')
      return (
        <ApolloProvider client={client}>
        <Rehydrated>
            <View flex={1}>
            <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
            {IDdata.map((rest, i) => (
                <Update client={client} updateId = {rest} group={this.state.group}/>
                ))}
            </View>
            </Rehydrated>
            </ApolloProvider>
      );}        
   if ( this.state.group == "Administrator" ) {
    console.log('hey2')
    return (
      <ApolloProvider client={client}>
      <Rehydrated>
          <View flex={1}>
          <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
            <NavbarPartsAdmin SignOut={this.props.SignOut}></NavbarPartsAdmin>  
          </View>
          </Rehydrated>
          </ApolloProvider>
    );} 
    if ( this.state.group == "Arzt" ) {
      return (
        <ApolloProvider client={client}>
        <Rehydrated>
            <View flex={1}>
            <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
            {/* <NavbarParts SignOut={this.props.SignOut}></NavbarParts>   */}
               {/* <HomeScreen/>   */}
            </View>
            </Rehydrated>
            </ApolloProvider>
      );} 
      if ( this.state.group == "PraxisMitarbeiter" ) {
        return (
          <ApolloProvider client={client}>
          <Rehydrated>
              <View flex={1}>
              <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
              {/* <NavbarParts SignOut={this.props.SignOut}></NavbarParts>   */}
                 {/* <HomeScreen/>   */}
              </View>
              </Rehydrated>
              </ApolloProvider>
        );} 
      if ( this.state.group == "Betreuer" ) {
          return (
            <ApolloProvider client={client}>
            <Rehydrated>
                <View flex={1}>
                <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
                {/* <NavbarParts SignOut={this.props.SignOut}></NavbarParts>   */}
                   {/* <HomeScreen/>   */}
                </View>
                </Rehydrated>
                </ApolloProvider>
          );} 
          if ( this.state.group == "Patient" ) {
              return (
                <ApolloProvider client={client}>
                <Rehydrated>
                    <View flex={1}>
                    <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
                    {/* <NavbarParts SignOut={this.props.SignOut}></NavbarParts>   */}
                       {/* <HomeScreen/>   */}
                    </View>
                    </Rehydrated>
                    </ApolloProvider>
              );}
          if ( this.state.group == "PflegeheimAdministrator" ) {
                return (
                  <ApolloProvider client={client}>
                  <Rehydrated>
                      <View flex={1}>
                      <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
                      {/* <NavbarParts SignOut={this.props.SignOut}></NavbarParts>   */}
                         {/* <HomeScreen/>   */}
                      </View>
                      </Rehydrated>
                      </ApolloProvider>
                );}
          if ( this.state.group == "PraxisAdministrator" ) {
                  return (
                    <ApolloProvider client={client}>
                    <Rehydrated>
                        <View flex={1}>
                        <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
                        {/* <NavbarParts SignOut={this.props.SignOut}></NavbarParts>   */}
                           {/* <HomeScreen/>   */}
                        </View>
                        </Rehydrated>
                        </ApolloProvider>
                  );}
          if ( this.state.group == "PflegeheimPDL" ) {
                    return (
                      <ApolloProvider client={client}>
                      <Rehydrated>
                          <View flex={1}>
                          <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
                          {/* <NavbarParts SignOut={this.props.SignOut}></NavbarParts>   */}
                             {/* <HomeScreen/>   */}
                          </View>

                          </Rehydrated>
                          </ApolloProvider>
                    );}  else return (
                    <ApolloProvider client={client}>
                      <Rehydrated>
                          <View flex={1}>
                          <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
                          <Group/>
                          </View>
                          </Rehydrated>
                          </ApolloProvider>)
    }
  }
  