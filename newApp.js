import React from 'react';
import { Image, TouchableWithoutFeedback, Keyboard, Text  } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { DataTable, Card, Avatar, Searchbar, HelperText, Button  } from 'react-native-paper';



import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';
import Amplify from '@aws-amplify/core';
import {Authenticator} from "aws-amplify-react-native"
import { withAuthenticator } from 'aws-amplify-react-native';
import awsconfig from './aws-exports';
import TestApp from './newAppsTest'

import Screens from './navigation/Screens';
import { Images, articles, argonTheme } from './constants';
import WithProvider from './WithProvider'
import NavbarParts from './AmplifyPflegeheim/Arzt/ArztComponents/Navigation/NavbarParts'

Amplify.configure(awsconfig);

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
    }
}
});


// cache App images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.iOSLogo,
  Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }
  
  render() {

    if(!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <GalioProvider theme={argonTheme}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Block flex>
          <Button style={{width: 130, left: 240, marginTop: 20}} onPress={this.props.SignOut}>Signout</Button>
          <NavbarParts SignOut={this.props.SignOut}></NavbarParts> 
           {/* <TestApp/> */}
          </Block>
          </TouchableWithoutFeedback>
        </GalioProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

}

export default withAuthenticator(App);
