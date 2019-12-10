import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import { TextInput, HelperText, FAB, Button, IconButton, Headline, Dialog, Avatar, Card, Title, Paragraph, Portal, Provider } from 'react-native-paper';
import { API, Storage, Auth, graphqlOperation }  from "aws-amplify";
import * as FileSystem from 'expo-file-system';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import * as mutations2 from '../../../../graphql/mutations2';
import { createRecords } from '../../../../graphql/mutations';
import aws_exports from '../../../../../exports2'
import * as ImagePicker from 'expo-image-picker';

import gql from 'graphql-tag';
import { buildMutation } from 'aws-appsync';
import { Dropdown } from 'react-native-material-dropdown';

const { width } = Dimensions.get('screen');


const initialState = {
  patient: "",
  Record: "  ",
  image: [],
  audio: "",
  audio: File,
  displayimage: false,
  accessed: false,
  nav: '' ,
  patientId: "",
  Pflegeheim:"" ,
  pass:"",
  PflegeheimN:"",
  Distanz:[],
  Arzt:"",
  selectedDate:'',
  ListRecords:'',
  SessionList:''
};

export default class AddEintrag extends React.Component {

  state = {
    ...initialState,
 };

 async  componentDidMount() {

    const { navigation } = this.props;
    const patientId = navigation.getParam('patientId')
    const Pflegeheim = navigation.getParam('Pflegeheim')
    const pass = navigation.getParam('pass')
    const PflegeheimN = navigation.getParam('PflegeheimN')
    const selectedDate = navigation.getParam('selectedDate')
    const SessionList = navigation.getParam('SessionList')
    const ListRecords = navigation.getParam('ListRecords')

    if (ListRecords==null || ListRecords==" " || ListRecords=='' ){
      console.warn('1')
      var hour = new Date().getHours()
      var min = new Date().getMinutes()
      var time = hour + ":" + min
      
            this.setState({ SessionList: SessionList });
            this.setState({ ListRecords: time });
            console.warn('time', time)
    } else {
      console.warn('2')
      this.setState({ SessionList: SessionList });
      this.setState({ ListRecords: ListRecords });
      console.warn('time', ListRecords)
    }

      const day = new Date(selectedDate).getDate()
      var month = new Date(selectedDate).getMonth() + 1; //Current Month
     var year = new Date(selectedDate).getFullYear(); //Current Year

    var combined = year+ '-' + month + '-' + day
    this.setState({ selectedDate: combined });

    this.setState({ Pflegeheim: Pflegeheim });
    this.setState({ pass: pass });
    this.setState({ PflegeheimN: PflegeheimN });
    this.setState({ patientId: patientId });

    const results = await API.graphql(graphqlOperation(queries.listDistanzens))
    this.setState({
      Distanz:  results.data.listDistanzens.items
    })

    const data = await API.graphql(graphqlOperation(queries.listArzts2))
    //console.log('result', result)
    this.setState({Arzt: data.data.listArzts2.items})

    }


  addRecord = async () => {
    const client = this.props.navigation.getParam('client')
    console.warn(client)
    const file = {
      key: "-",
      bucket: "-",
      region: "-"
    }
    const audio = {
      key: "-",
      bucket: "-",
      region: "-"
    }

    var date = new Date().getDate()
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
   
    console.warn("Dates", Date.now(), date)
    console.warn("con", year+ '-' + month + '-' + date)
    
      // const result = await client.mutate(buildMutation(client,
      //   gql(mutations2.createRecords),{
      //     inputType: gql(mutations2.CreateRecordsInput),
      //     variables: {
      //       input: {
      //         record: this.state.Record,
      //         file,
      //         audio,
      //         patient: this.state.patientId,
      //         Access: "none",
      //         abrechnungsnummerprivat: "-",
      //         abrechnungsnummergesaetzlich: "-",
      //         Leistungskette: "-",
      //         datum: this.state.selectedDate, 
      //         Session: this.state.SessionList, 
      //         SessionTime: this.state.ListRecords
      //       }
      //     }
      //     },
      //     _variables => [ gql(queries.listRecordss) ],
      //     'Records'));
      //   console.log( "success", result )
      // console.log("Data", result.data.createRecords.id)
      // this.setState({ results: result.data.createRecords.id });

      var record = {
        record: this.state.Record,
         file,
         audio,
         patient: this.state.patientId,
         Access: "none",
         abrechnungsnummerprivat: "-",
         abrechnungsnummergesaetzlich: "-",
         Leistungskette: "-",
         datum: this.state.selectedDate, 
         Session: this.state.SessionList, 
         SessionTime: this.state.ListRecords
    }
    const result = await API.graphql(graphqlOperation(createRecords, {input: record}))
    this.setState({ results: result.data.createRecords.id });
      

    }

    both = async () => {
      API.graphql(graphqlOperation(queries.listArzts2))
      .then(()=> this.addRecord())
      .catch((err)=> console.warn('err1', err))
      .then(()=> this.Tracking())
  
      }

      Tracking = async () => {
        console.warn('hel')
        console.warn('Arzt', this.state.Arzt)
        console.warn('pass', this.state.pass)
        const Arztu =this.state.Arzt.map((rest)=>( rest.username))
        console.warn('Arzt', Arztu)
        console.warn('pass', this.state.pass)
        
      
        if( this.state.pass == 'Zuhause'){
          var dates = new Date().getDate()
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
  
          var Arztid = this.state.Arzt.map((rest)=>( rest.id))
          var date = dates + '/' + month + '/' + year
          var Praxis = this.state.Arzt.map((rest)=>( rest.Praxis))
  
          var ListPatient = this.state.Distanz.map((rest) => (
            (rest.Start.includes(Arztu) || rest.Ende.includes(Arztu))
            &&
           ( rest.Start.includes(this.state.Pflegeheim) || rest.Ende.includes(this.state.Pflegeheim) )? (
             rest
             ): null
         ))
        
         ListPatient = ListPatient.filter( Boolean );
          console.warn('Distanz', ListPatient)

          var Hour = new Date().getHours();
          var Minutes = new Date().getMinutes();

          if((Hour>= 20 && Minutes>=1) || (Hour<8 && Minutes>=0)){
            var Distanzo = Number(ListPatient.map((rest, i) => (rest.Distanz)))+1
            var Distanz = Distanzo.toString()
          } else {
            var Distanzo = ListPatient.map((rest, i) => (rest.Distanz))
         var Distanz = Distanzo[0]
         console.warn('Hello', Distanzo, Distanz)
          }
  
         var Track = ListPatient.map((rest, i) => (
                     {ArztId: Arztid[0], PatientId: this.state.patientId,
                      Date: this.state.selectedDate, 
                      Session: this.state.SessionList, 
                      SessionTime: this.state.ListRecords, Number: "1",
                       Praxis: Praxis[0],
                       distanz: Distanz, end: rest.Ende, start: rest.Start,
                       Leistung: this.state.results,
                       ids: [this.state.results]}
                   ))
                   console.warn('Track', Track[0])
  
                   const Tracks = Track[0]
         
                   const result = await API.graphql(graphqlOperation(mutations2.createTracking, {input: Tracks}))
                   console.log( "success", result )
        
                   this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId,
                                                             client: this.props.navigation.state.params.client,
                                                             Pflegeheim: this.state.Pflegeheim,
                                                             PflegeheimN: this.state.PflegeheimN,
                                                             pass: this.props.navigation.state.params.pass,
                                                             selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})
                     
        } else if( this.state.pass == 'Pflegeheim'){
          const {PflegeheimN} = this.state;
          
          var dates = new Date().getDate()
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
  
          var Arztid = this.state.Arzt.map((rest)=>( rest.id))
          var date = dates + '/' + month + '/' + year
          var Praxis = this.state.Arzt.map((rest)=>( rest.Praxis))
  
          var ListPatient = this.state.Distanz.map((rest) => (
            (rest.Start.includes(PflegeheimN) || rest.Ende.includes(PflegeheimN))
            &&
           ( rest.Start.includes(this.state.Pflegeheim) || rest.Ende.includes(this.state.Pflegeheim) )? (
             rest
             ): null
         ))
        
         ListPatient = ListPatient.filter( Boolean );
          console.warn('Distanz', ListPatient)

          var Hour = new Date().getHours();
          var Minutes = new Date().getMinutes();

          if((Hour>= 20 && Minutes>=1) || (Hour<8 && Minutes>=0)){
            var Distanzo = Number(ListPatient.map((rest, i) => (rest.Distanz)))+1
            var Distanz = Distanzo.toString()
          } else {
            var Distanzo = ListPatient.map((rest, i) => (rest.Distanz))
         var Distanz = Distanzo[0]
         console.warn('Hello', Distanzo, Distanz)
          }
  
          var Track = ListPatient.map((rest, i) => (
            {ArztId: Arztid[0], PatientId: this.state.patientId,
              Date: this.state.selectedDate, 
                Session: this.state.SessionList, 
                SessionTime: this.state.ListRecords, Number: "1",
              Praxis: Praxis[0],
              distanz: Distanz, end: rest.Ende, start: rest.Start,
              Leistung: this.state.results,
              ids: [this.state.results]}
          ))
          console.warn('Track', Track)

          const Tracks = Track[0]
  
          const result = await API.graphql(graphqlOperation(mutations2.createTracking, {input: Tracks}))
          console.log( "success", result )
  
          this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId,
            client: this.props.navigation.state.params.client,
            Pflegeheim: this.state.Pflegeheim,
            PflegeheimN: this.state.PflegeheimN,
            pass: this.props.navigation.state.params.pass,
          selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})
            
        }
        else if( this.state.pass == 'PraxisKomm'){

          var dates = new Date().getDate()
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
  
          var Arztid = this.state.Arzt.map((rest)=>( rest.id))
          var date = dates + '/' + month + '/' + year
          var Praxis = this.state.Arzt.map((rest)=>( rest.Praxis))
  
          var ListPatient = this.state.Distanz.map((rest) => (
            (rest.Start.includes(PflegeheimN) || rest.Ende.includes(PflegeheimN))
            &&
           ( rest.Start.includes(Praxis) || rest.Ende.includes(Praxis) )? (
             rest
             ): null
         ))
        
         ListPatient = ListPatient.filter( Boolean );
          console.warn('Distanz', ListPatient)

          var Hour = new Date().getHours();
    var Minutes = new Date().getMinutes();

    if((Hour>= 20 && Minutes>=1) || (Hour<8 && Minutes>=0)){
      var Distanzo = Number(ListPatient.map((rest, i) => (rest.Distanz)))+1
      var Distanz = Distanzo.toString()
    } else {
      var Distanzo = ListPatient.map((rest, i) => (rest.Distanz))
   var Distanz = Distanzo[0]
   console.warn('Hello', Distanzo, Distanz)
    }
  
          var Track = ListPatient.map((rest, i) => (
            {ArztId: Arztid[0], PatientId: this.state.patientId,
              Date: this.state.selectedDate, 
                Session: this.state.SessionList, 
                SessionTime: this.state.ListRecords, Number: "1",
              Praxis: Praxis[0],
              distanz: Distanz, end: rest.Ende, start: rest.Start,
              Leistung: this.state.results,
              ids: [this.state.results]}
          ))
          console.warn('Track', Track)
          const Tracks = Track[0]
  
          const result = await API.graphql(graphqlOperation(mutations2.createTracking, {input: Tracks}))
          console.log( "success", result )
  
          this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId,
            client: this.props.navigation.state.params.client,
            Pflegeheim: this.state.Pflegeheim,
            PflegeheimN: this.state.PflegeheimN,
            pass: this.props.navigation.state.params.pass,
            selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})
            
        }
         else if( this.state.pass == 'Praxis'){
          
          
          this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId,
            client: this.props.navigation.state.params.client,
            Pflegeheim: this.state.Pflegeheim,
            PflegeheimN: this.state.PflegeheimN,
            pass: this.props.navigation.state.params.pass,
            selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})
      
        } 
        
        }
      
  render() {

    console.warn(this.state.Arzt)
    return (
           <>
           <Block flex center style={styles.home}>
           <>
           <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width}}
            label="Eintrag"
            multiline
            mode='outlined'
            value= {this.state.Record}
            onChangeText={ (Record) => this.setState({ Record }) }
            /> 
            <HelperText
          type="error"
          visible={false}/>
             <Button icon="send" mode="outlined" style={styles.contentBody2} onPress={this.both}>
              Eintragen </Button>
              </>
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
  });