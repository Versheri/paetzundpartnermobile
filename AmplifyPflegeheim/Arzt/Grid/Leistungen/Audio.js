//React
import React, { Component } from 'react';
//Amplify
import { Storage } from 'aws-amplify';
import { Text, ScrollView, Image, Dimensions, Modal, View, TouchableHighlight, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Block, theme } from 'galio-framework';
import * as Permissions from 'expo-permissions';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
const { width } = Dimensions.get('screen');


export default class Audios extends React.Component {
    
    state = {
        s3image: [],
        open: false,
        audio: '',
        modalVisible: false,
        play: true,
        pause: false,
      };

      constructor (props) {
        super(props)
        this.audiofile = null;
        this.MySound = new Audio.Sound()
      }

      async componentWillMount() {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false
        });
        
        this.getSound()
      }

  async getSound() {
    console.warn("fffffffff", this.props.a)
     Storage.get(this.props.a)
          .then(result => {
            const source = result
            this.LoadSound(source)
           })
           .catch(err => console.warn("err1", err))

        }

        async LoadSound(source) {
          let uris = { 
            name: "333",
            uri : source
        }
        try {
         //this.MySound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
         const aud = await this.MySound.loadAsync({uri: uris.uri});
                    //await this.MySound.playAsync();

          console.warn("success", aud)
          console.warn("success", source)
        } catch (error) {
          console.warn("error 55", error)
          // An error occurred!
        }      
        }
      
        handlePlaySound = async () => {
          this.setState({ play: false });
          this.setState({ pause: true });
          try {;
            await this.MySound.playAsync();
          } catch (error) {
            console.warn("ERROR", error);
          }
        };

        handlePauseSound = async () => {
          this.setState({ play: true });
          this.setState({ pause: false });
          try {;
            await this.MySound.pauseAsync();
          } catch (error) {
            console.warn("ERROR", error);
          }
        };


        render() {
        
          return (
            <>
            {this.state.play &&
            <Text onPress={() => this.handlePlaySound()} >play</Text>
            }
            {this.state.pause &&
            <Text onPress={() => this.handlePauseSound()} >pause</Text>
            }
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


