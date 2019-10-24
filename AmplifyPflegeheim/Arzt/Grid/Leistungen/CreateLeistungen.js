import React, { Component } from 'react';
import { AppRegistry, Text, Dimensions, ScrollView, View, Image, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import { DataTable, Card, Avatar, Searchbar, HelperText, Button, List, Title  } from 'react-native-paper';
import { API, graphqlOperation }  from "aws-amplify";
import {Auth, Hub} from "aws-amplify"
import * as queries from '../../../graphql/queries';
import * as mutations2 from '../../../graphql/mutations2';
import * as mutations from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import { ToggleButton } from 'react-native-paper';
import SegmentedControlTab from "react-native-segmented-control-tab";

import AWSAppSyncClient, { buildSubscription } from 'aws-appsync';
import { ApolloProvider } from "react-apollo";
import { Rehydrated, graphqlMutation } from "aws-appsync-react";
import AppSyncConfig from "../../../../aws-exports";
import gql from 'graphql-tag';
import { buildMutation } from 'aws-appsync';
import aws_config from '../../../../aws-exports'
import TouchableSwipe from 'react-native-touchable-swipe'
import { Storage } from 'aws-amplify';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('screen');



export default class PatientTable extends React.Component {
    
  state = {
    InitialState: [],
    Fullist: [],
    ListRecords: [],
    firstQuery: '',
    searchopen: false,
    range1: 0,
    range2: 4,
    currentPage: 1,
    NumberofPages: Number,
    disabledbackward: false,
    disabledforward: false,
    filteropen: false,
    datum: '',
    Eintrag: '',
    Leistungskette: '',
    chips: [],
    filters: false,
    today:'',
    month:'',
    yearh:'',
    selectedDate:'2019/09/15',
    Currentdate:'2019-09-12',
    Dates: [],
    patientId: "", 
    client: [],  
    Pflege: '', 
    Session:[],
    StandingSession:[],
    SessionList:  'Session1',
    Sessions:[],
    ListRecords:[],
    RecordsList:[],
    Sessions:[],
    Pflegeheim:'',
    PflegeheimN:'',
    pass:'',
    selectedDate:'',
    recordsid:'',
    Records:[],
    s3image: [],
        open: false,
        audio: '',
        modalVisible: false,
        play: true,
        pause: false,
        show: false,
        tip:''
  };

  constructor (props) {
    super(props)
    this.audiofile = null;
    this.MySound = new Audio.Sound()
  }
  
componentDidMount = async () => {

  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false
  });

  const { navigation } = this.props;
const patientId = navigation.getParam('patientId');
const Pflegeheim = navigation.getParam('Pflegeheim');
const client = navigation.getParam('client');
const pass = navigation.getParam('pass');
const PflegeheimN = navigation.getParam('PflegeheimN');
const selectedDate = navigation.getParam('selectedDate')
      const SessionList = navigation.getParam('SessionList')
      const ListRecords = navigation.getParam('ListRecords')
      const recordsid = navigation.getParam('recordsid')
      const tip = navigation.getParam('tip')
      

      if (pass != null){
        this.setState({ showEintrag: true })
        this.setState({ showLeistung: true })
        this.setState({ PflegeheimN: PflegeheimN });
        this.setState({ pass: pass });
      
        }

        this.setState({ tip: tip });
      
      console.warn('selectedDatefff', selectedDate, ListRecords)
      console.warn('nav', navigation)
      
      this.setState({ patientId: patientId });
      this.setState({ Pflege: Pflegeheim });
      this.setState({ client: client });
      this.setState({ recordsid: recordsid });
      this.setState({ selectedDate: selectedDate });
              this.setState({ SessionList: SessionList });
              this.setState({ ListRecords: ListRecords });

      const input2 = {
        id: recordsid
      };
    
      const result2 = await API.graphql(graphqlOperation(queries.getRecords, input2))
      this.setState({Records: result2.data.getRecords})
      

      if(result2.data.getRecords.audio.key!='-'){

        this.getSound(result2.data.getRecords.audio.key)
        
      
      } else if(result2.data.getRecords.file.key!='-' && result2.data.getRecords.record == '' || result2.data.getRecords.record == ' ' || result2.data.getRecords.record == null){
        this.getSound2(result2.data.getRecords.file.key)
      } else if(result2.data.getRecords.file.key!='-' && (result2.data.getRecords.record != '' || result2.data.getRecords.record != ' ' || result2.data.getRecords.record != null)){
        this.getSound2(result2.data.getRecords.file.key)
      }

      this.setState({show: true})

      this.check()

    
   }

   check () {
     const{Records, client}=this.state;

     console.warn('bebo',this.state.PflegeheimN, this.state.pass)


    if(this.state.Records.audio.key!='-'){
      console.warn('audio')

      return(
        <Card.Content style={{width: width}}>
        {this.state.play &&
            <Button onPress={() => this.handlePlaySound()} >play</Button>
            }
            {this.state.pause &&
            <Button onPress={() => this.handlePauseSound()} >pause</Button>
            }
         <List.Item
             title={Records.zahn}
             description="zahn"
         />
         {Records.abrechnungsnummerprivat!="-" && Records.abrechnungsnummergesaetzlich!="-"?(
         <><List.Item
             title={Records.abrechnungsnummerprivat}
             description="abrechnungsnummerprivat"
         />
         <List.Item
             title={Records.abrechnungsnummergesaetzlich}
             description="abrechnungsnummergesätzlich"
         /></>
         ):(null)}
         <List.Item
             title={Records.datum}
             description="Erstellt am"
         />

         <Button mode='outlined' style={{alignSelf:'center'}} onPress= {() =>  this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords, tip: this.state.tip})}>Zurück</Button>
         </Card.Content>
      )

    } else if(this.state.Records.file.key!='-' && this.state.Records.record == '' || this.state.Records.record == ' ' || this.state.Records.record == null){
      console.warn('image')

      return(
        <Card.Content style={{width: width}}>
         <Image 
              onPress={ () =>  {this.props.navigation.push('Imageshown')}}
              source={{uri:this.state.image}} 
              style={{ width: 300, height: 300}}/>
         <List.Item
             title={Records.zahn}
             description="zahn"
         />
         {Records.abrechnungsnummerprivat!="-" && Records.abrechnungsnummergesaetzlich!="-"?(
         <><List.Item
             title={Records.abrechnungsnummerprivat}
             description="abrechnungsnummerprivat"
         />
         <List.Item
             title={Records.abrechnungsnummergesaetzlich}
             description="abrechnungsnummergesätzlich"
         /></>
         ):(null)}
         <List.Item
             title={Records.datum}
             description="Erstellt am"
         />

         <Button mode='outlined' style={{alignSelf:'center'}} onPress= {() =>  this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords, tip: this.state.tip})}>Zurück</Button>
         </Card.Content>
      )
    } else if(this.state.Records.file.key!='-' && (this.state.Records.record != '' || this.state.Records.record != ' ' || this.state.Records.record != null)){
      console.warn('image and record')

      return(
        <Card.Content style={{width: width}}>
         <Image 
              onPress={ () =>  {this.props.navigation.push('Imageshown')}}
              source={{uri:this.state.image}} 
              style={{ width: 300, height: 300}}/>
        <List.Item
             title={Records.record}
             description="Eintrag"
         />
         <List.Item
             title={Records.zahn}
             description="zahn"
         />
         {Records.abrechnungsnummerprivat!="-" && Records.abrechnungsnummergesaetzlich!="-"?(
         <><List.Item
             title={Records.abrechnungsnummerprivat}
             description="abrechnungsnummerprivat"
         />
         <List.Item
             title={Records.abrechnungsnummergesaetzlich}
             description="abrechnungsnummergesätzlich"
         /></>
         ):(null)}
         <List.Item
             title={Records.datum}
             description="Erstellt am"
         />

         <Button mode='outlined' style={{alignSelf:'center'}} onPress= {() =>  this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords, tip: this.state.tip})}>Zurück</Button>
         </Card.Content>
      )
    } else {
      console.warn('record')

      return(
        <Card.Content style={{width: width}}>
        <List.Item
             title={Records.record}
             description="Eintrag"
         />
         <List.Item
             title={Records.zahn}
             description="zahn"
         />
         {Records.abrechnungsnummerprivat!="-" && Records.abrechnungsnummergesaetzlich!="-"?(
         <><List.Item
             title={Records.abrechnungsnummerprivat}
             description="abrechnungsnummerprivat"
         />
         <List.Item
             title={Records.abrechnungsnummergesaetzlich}
             description="abrechnungsnummergesätzlich"
         /></>
         ):(null)}
         <List.Item
             title={Records.datum}
             description="Erstellt am"
         />

         <Button mode='outlined' style={{alignSelf:'center'}} onPress= {() =>  this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords, tip: this.state.tip})}>Zurück</Button>
         </Card.Content>
      )
    }
   }

   async getSound(value) {
     Storage.get(value)
          .then(result => {
            const source = result
            this.LoadSound(source)
           })
           .catch(err => console.warn("err1", err))

        }

    async getSound2(value) {
          Storage.get(value)
          .then(result =>{ console.log("Storageb");
           const Me = result;
           this.setState({image: Me})
           //console.log("geb", Me)
          
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
    const { Behandlung, SessionList, PflegeheimN } = this.state;

    return (
           <>
           <Block flex center style={styles.home}>
           <ScrollView contentContainerStyle={styles.content}>

           {this.state.show==true && this.check()}
          
            </ScrollView>
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
    content: {
      backgroundColor: 'white',
      width: width,
      alignItems: 'center'
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
  });