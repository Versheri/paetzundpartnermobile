import { Auth } from "aws-amplify";
import { DataTable, Card, Avatar, Searchbar, HelperText, Button, Portal, Provider  } from 'react-native-paper';
import React from 'react'
import { View, Text } from 'react-native'
import { withAuthenticator } from 'aws-amplify-react-native'

import Amplify from '@aws-amplify/core';
import {Authenticator} from "aws-amplify-react-native"
import awsconfig from './aws-exports';

import Screens from './navigation/Screens';
import NewApp from './newApp'
import { Images, articles, argonTheme } from './constants';
import NavbarParts from './AmplifyPflegeheim/Arzt/ArztComponents/Navigation/NavbarParts'
import AWS from 'aws-sdk'


// retrieve temporary AWS credentials and sign requests

AWS.config.update({ region: 'eu-central-1' });



AWS.config.update({ 
accessKeyId: "AKIAXYA4IHKA5W7MRDNZ",
  secretAccessKey: "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", 
region: 'eu-central-1',

});

const myAppConfig = {
  // ...
  "aws_appsync_graphqlEndpoint": "https://7k4rildyrnhdvaaie662fe2k3i.appsync-api.eu-central-1.amazonaws.com/graphql",
    "aws_appsync_region": "eu-central-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
  // ...
}

Amplify.configure(myAppConfig);

Amplify.configure({
  Auth: {
      // REQUIRED - Amazon Cognito Identity Pool ID
      IdentityPoolId: 'eu-central-1:c63bc297-37a3-4713-83f3-bad6dc87f51c', 
      // REQUIRED - Amazon Cognito Region
      region: 'eu-central-1', 
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'eu-central-1_OEyQ7sJ8l',
      // OPTIONAL - Amazon Cognito Web Client ID
      userPoolWebClientId: '4dfl25snf8h3pkcmsdtn11phgo', 
  },
  Storage: {
    AWSS3: {
        bucket: 'paetzundpartnerweb9354bec955244b78aab125970c0808fc', //REQUIRED -  Amazon S3 bucket
        region: 'eu-central-1', //OPTIONAL -  Amazon service region
    },
    Analytics:{
      disabled:true
    }
}
});


function Signout(props) {
  console.warn('Bobo: ', Auth.currentAuthenticatedUser())
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