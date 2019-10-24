import { Auth } from "aws-amplify";
import { DataTable, Card, Avatar, Searchbar, HelperText, Button, Portal, Provider  } from 'react-native-paper';
import React from 'react'
import { View, Text } from 'react-native'
import { withAuthenticator } from 'aws-amplify-react-native'

import Analytics from '@aws-amplify/analytics';
import Amplify from '@aws-amplify/core';
import {Authenticator} from "aws-amplify-react-native"
import awsconfig from './aws-exports';

import Screens from './navigation/Screens';
import NewApp from './newApp'
import { Images, articles, argonTheme } from './constants';
import NavbarParts from './AmplifyPflegeheim/Arzt/ArztComponents/Navigation/NavbarParts'
import AWS from 'aws-sdk'

Amplify.configure(awsconfig);

// retrieve temporary AWS credentials and sign requests

AWS.config.update({ region: 'eu-central-1' });



AWS.config.update({ 
accessKeyId: "AKIAXYA4IHKAQGOACKND",
  secretAccessKey: "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", 
region: 'eu-central-1',

});

const myAppConfig = {
  // ...
  'aws_appsync_graphqlEndpoint': 'https://7k4rildyrnhdvaaie662fe2k3i.appsync-api.eu-central-1.amazonaws.com/graphql',
  'aws_appsync_region': 'eu-central-1',
  "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  // ...
}

Amplify.configure(myAppConfig);

function Signout(props) {
    function signOut() {
      Auth.signOut()
        .then(() => {
          props.onStateChange('signedOut', null);
        })
        .catch(err => {
          console.log('err: ', err)
        })
    }
    
    return (
      <>
        <NewApp SignOut={signOut}/>
      </>
    )
  }
  
  export default withAuthenticator(Signout);