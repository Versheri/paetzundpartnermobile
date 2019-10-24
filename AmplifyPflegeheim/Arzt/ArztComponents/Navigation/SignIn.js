import { Auth } from "aws-amplify";
import { DataTable, Card, Avatar, Searchbar, HelperText, Button  } from 'react-native-paper';
import React from 'react'
import { View, Text } from 'react-native'
import { withAuthenticator } from 'aws-amplify-react-native'
import App from '../../../../App'

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
      <View>
        <Button onPress={signOut}>Sign Out</Button>
      </View>
    )
  }
  
  export default withAuthenticator(Signout)