import React, { Component } from 'react';
import { AppRegistry, Text, Dimensions, ScrollView, View, StyleSheet } from 'react-native';
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
import SignIn from '../Navigation/SignIn'
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
import DatePicker from 'react-native-datepicker'

const { width } = Dimensions.get('screen');



export default class PatientTable extends React.Component {
    
  state = {
    Patient:[],
    Behandlung:[],
    Pflege: '', 
    Session:[],
    StandingSession:[],
    SessionList:  'Session1',
    Sessions:[],
    ListRecords:[],
    RecordsList:[],
    Pflegeheimes:[],
    Pflegeheim:'',
    showEintrag: true,
    Trackings:'',
  showLeistung: true,
  showPflegeheime: false,
  listRecordss:[],
  Distanz:[],
  Arzt:'',
  Arzts:[],
  Ziel:"",
  PflegeheimN:'',
  Arzte:[],
  Trackings:[],
  showrest:false,
  date: ''
  };

  
componentDidMount = async () => {

    const result3 = await API.graphql(graphqlOperation(queries.listArzts2))
    this.setState({
      Arzte:  result3.data.listArzts2.items
    }) 
    const result = await API.graphql(graphqlOperation(queries.listTrackings))
    this.setState({
      Trackings:  result.data.listTrackings.items
    }) 

    this.GetData()
    .catch((err)=> console.warn(err))
    .then(()=> this.CheckForremnants())
    .catch((err)=> console.warn(err))
  

    
   }

   showorigin(){
    this.setState({ showEintrag: false })
        this.setState({ showLeistung: false })
  }

   async CheckForremnants(){

    var day = new Date().getDate()
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Curr
  
    var Datev = year+ '-' + month + '-' + day

    console.warn('Heyoooo',this.state.Trackings.map((rest) => (!rest.Date.includes(Datev))), this.state.Trackings.map((rest) => (rest.Date.includes(Datev))))
  
      var ListTracks = this.state.Trackings.map((rest) => (
        rest.ArztId == this.state.Arzte.map((arzt)=>(arzt.id)) &&
        (rest.start == this.state.Pflegeheim ||  rest.end == this.state.Pflegeheim) &&
        (rest.Date == Datev) ? (
          rest
          ):
          (
            null
          )))
  
      ListTracks = ListTracks.filter( Boolean );

      if(ListTracks.map((rest) => (rest.Date.includes(Datev)))){
        this.setState({ showEintrag: true })
          this.setState({ showLeistung: true })
      } else {
        this.setState({ showEintrag: false })
          this.setState({ showLeistung: false })
      } 
  
      var HR = ListTracks.map((rest)=> ""+(new Date(rest.createdAt).getHours())+(new Date(rest.createdAt).getMinutes())); //Current Month
      var Usable = HR.map(Number)
      var MaximumValue= Math.max(...Usable)
      var HR2 = ListTracks.map((rest)=> (new Date(rest.createdAt).getHours())+(new Date(rest.createdAt).getMinutes())); //Current Month
  
      var Determinator = ListTracks.map((rest)=>(
       ( ""+(new Date(rest.createdAt).getHours())+(new Date(rest.createdAt).getMinutes())) == MaximumValue ?
        (rest) : null 
      ))
  
      Determinator = Determinator.filter( Boolean );

    if(Determinator.map((rest)=> rest.start) == this.state.Pflegeheim ){
      if(Determinator.map((rest)=> rest.end) == 
      this.state.Arzte.map((arzt)=>arzt.username)[0] ){
        console.warn('Zuhause1')
        this.setState({ showEintrag: true })
      this.setState({ showLeistung: true })
      this.setState({ pass: 'Zuhause' })
      } else{
        console.warn('Pflegeheim1') 
        this.setState({ showEintrag: true })
      this.setState({ showLeistung: true })
      this.setState({ showPflegeheime: false })
      this.setState({ PflegeheimN : Determinator.map((rest)=> rest.end)[0] })
      this.setState({ pass: 'Pflegeheim' })
      } 
    }

    if(Determinator.map((rest)=> rest.end) == this.state.Pflegeheim ){
      if(Determinator.map((rest)=> rest.start) == 
      this.state.Arzte.map((arzt)=>arzt.username)[0]){
        console.warn('Zuhause')
        this.setState({ showEintrag: true })
      this.setState({ showLeistung: true })
      this.setState({ pass: 'Zuhause' })
      } else {
        console.warn('Pflegeheim') 
        this.setState({ showEintrag: true })
      this.setState({ showLeistung: true })
      this.setState({ showPflegeheime: false })
      this.setState({ PflegeheimN : Determinator.map((rest)=> rest.start)[0] })
      this.setState({ pass: 'Pflegeheim' })
      }
  }

  
  }

   async Sessions (value) {

    var day = new Date(this.state.selectedDate).getDate()
      var month = new Date(this.state.selectedDate).getMonth() + 1; //Current Month
      var year = new Date(this.state.selectedDate).getFullYear(); //Current Year
      var date2 = year+ '-' + month + '-' + day
      var date = year+ '/' + month + '/' + day
      
  
  const results3 = await API.graphql(graphqlOperation(queries.listRecordss))
  
  var ListRecords = results3.data.listRecordss.items.map((rest) => (
    rest.patient == value ? (
      rest
      ): null
  ))
  
  ListRecords = ListRecords.filter( Boolean );
  
  var ListRecords2 = ListRecords.map((rest) => (
    rest.datum.includes(date2) && rest.Session==this.state.SessionList ? (
      rest.SessionTime
      ): null
  ))
  
  ListRecords2 = ListRecords2.filter( Boolean );
  
  var hour = new Date().getHours()
  var min = new Date().getMinutes()
  var time = hour + ":" + min
  
  console.warn('records2', ListRecords2)
  
  this.setState({
    Dates:  ListRecords.map((rest)=>(rest.datum))
  })
  
  this.setState({
    selectedDate: date
  })
  
  this.setState({
    Currentdate: date
  })
  
  if(ListRecords2[0]==null || ListRecords2[0]==' ' || ListRecords2[0]=='')
  {
    this.setState({
      ListRecords: ''
    })
  } else{
  this.setState({
    ListRecords: ListRecords2[0]
  })
  }
  
  if(ListRecords.map((rest) => (rest.datum.includes(date)))){
  //allow for select new session
  this.setState({
    Session:  true
  })
  } else{
  //set session = session1
  this.setState({
    Session:  false
  })
  }
  
    }

    both = async () => {
        
        API.graphql(graphqlOperation(queries.listArzts2))
        .then(()=> {
            if (this.state.ListRecords==null || this.state.ListRecords==""){
                var hour = new Date().getHours()
          var min = new Date().getMinutes()
          var time = hour + ":" + min
    
          this.setState({ListRecords: time})
            }
        })
        .then(()=> this.updateProfile())
        .catch((err)=> console.warn('err1', err))
        .then(()=> this.addRecord())
        .catch((err)=> console.warn('err12', err))
        .then(()=> this.Tracking())
        .catch((err)=> console.warn('err32', err))
        .then(()=> this.props.navigation.navigate('FolgeTermine', {Pflegeheim: this.state.Pflegeheim, Status: 'New'} ))
        
    
        }
    

    Tracking = async () => {
        console.warn('hel')
        const Arztu =this.state.Patient.Arzt
        console.warn('Arzt', Arztu)
        console.warn('pass', this.state.pass)
        
      
        if( this.state.pass == 'Zuhause'){
          var dates = new Date().getDate()
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
  
          var Arztid = this.state.Arzts.map((rest)=>( rest.id))
          var date = this.state.date == '' || this.state.date == ' ' || this.state.date == null?(
           year+ '-' + month + '-' + dates
          ):(this.state.date)
          var Praxis = this.state.Arzts.map((rest)=>( rest.Praxis))

          console.warn('Trackmain1', Arztid)
          console.warn('Trackmain2', Praxis)
  
          var ListPatient = this.state.Distanz.map((rest) => (
            (rest.Start.includes(Arztu) || rest.Ende.includes(Arztu))
            &&
           ( rest.Start.includes(this.state.Pflegeheim) || rest.Ende.includes(this.state.Pflegeheim) )? (
             rest
             ): null
         ))
        
         ListPatient = ListPatient.filter( Boolean );

         var Hour = new Date().getHours();
         var Minutes = new Date().getMinutes();

         if((Hour>= 18 && Minutes>=1) || (Hour<8 && Minutes>=0)){
           var Distanzo = Number(ListPatient.map((rest, i) => (rest.Distanz)))+1
           var Distanz = Distanzo.toString()
         } else {
           var Distanzo = ListPatient.map((rest, i) => (rest.Distanz))
         var Distanz = Distanzo[0]
         console.warn('Hello', Distanzo, Distanz)
         }

         console.warn('Trackmain3', ListPatient, date)
  
         var Track = ListPatient.map((rest)=>({ArztId: Arztid[0], PatientId: this.state.Patient.id,
                      Date: date, 
                      Session: this.state.SessionList, 
                      SessionTime: this.state.ListRecords, Number: "1",
                       Praxis: Praxis[0],
                       distanz: Distanz, end: rest.Ende, start: rest.Start,
                       Leistung: '-',
                       ids: [this.state.Behandlung.id]}))

                   console.warn('Trackmain', Track)
  
                   const Tracks = Track[0]
         
                   const result = await API.graphql(graphqlOperation(mutations2.createTracking, {input: Tracks}))
                  
        
                   
                     
        } else if( this.state.pass == 'Pflegeheim'){
          
          var dates = new Date().getDate()
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
  
          var Arztid = this.state.Arzts.map((rest)=>( rest.id))
          var date = this.state.date == '' || this.state.date == ' ' || this.state.date == null?(
             year+ '-' + month + '-' + dates
            ):(this.state.date)
          var Praxis = this.state.Arzts.map((rest)=>( rest.Praxis))
  
          var ListPatient = this.state.Distanz.map((rest) => (
            (rest.Start.includes(this.state.PflegeheimN) || rest.Ende.includes(this.state.PflegeheimN))
            &&
           ( rest.Start.includes(this.state.Pflegeheim) || rest.Ende.includes(this.state.Pflegeheim) )? (
             rest
             ): null
         ))
        
         ListPatient = ListPatient.filter( Boolean );
          console.warn('Distanz', ListPatient)

          console.warn('Trackmain3', ListPatient, date)

          var Hour = new Date().getHours();
          var Minutes = new Date().getMinutes();

          if((Hour>= 18 && Minutes>=1) || (Hour<8 && Minutes>=0)){
            var Distanzo = Number(ListPatient.map((rest, i) => (rest.Distanz)))+1
            var Distanz = Distanzo.toString()
          } else {
            var Distanzo = ListPatient.map((rest, i) => (rest.Distanz))
         var Distanz = Distanzo[0]
         console.warn('Hello', Distanzo, Distanz)
          }

          console.warn('E', this.state.Patient.id, Arztid[0], this.state.SessionList, this.state.ListRecords,
          Praxis[0], this.state.Behandlung)
  
          var Track = ListPatient.map((rest)=>({ArztId: Arztid[0], PatientId: this.state.Patient.id,
            Date: date, 
            Session: this.state.SessionList, 
            SessionTime: this.state.ListRecords, Number: "1",
              Praxis: Praxis[0],
              distanz: Distanz, end: rest.Ende, start: rest.Start,
              Leistung: '-',
              ids: [this.state.Behandlung] }))

              console.warn('T', Track)

              const Tracks = Track[0]

          console.warn('Track', Track)
  
         const result = await API.graphql(graphqlOperation(mutations2.createTracking, {input: Tracks}))
          console.log( "success", result )
  
            
        } else if( this.state.pass == 'Praxis'){
          null
      
        } 
        
        }

    updateProfile(){
        var dates = new Date().getDate()
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
  
          var date =  year+ '-' + month + '-' + dates

            const k ={
              id: this.state.Behandlung.id,
              Leistungsname: this.state.Behandlung.Leistungsname,
              Name: this.state.Behandlung.Name,
              abrechnungsnummerprivat: this.state.Behandlung.abrechnungsnummerprivat,
              abrechnungsnummergesaetzlich: this.state.Behandlung.abrechnungsnummergesaetzlich,
              Leistungskette: this.state.Behandlung.Leistungskette,
              Status: "Geschlossen",
              patientId: this.state.Behandlung.patientId,
              arztId: this.state.Behandlung.arztId,
              datum: date,
              Session: this.state.Behandlung.Session,
              SessionTime: this.state.Behandlung.SessionTime,
              }
              API.graphql(graphqlOperation(mutations2.updateOffeneVolgebehandlung, {input: k}))
              .catch(err => console.warn("err",err))
              //.then(()=> this.GetPatient())
        }


        addRecord = async () => {

            var dates = new Date().getDate()
          var month = new Date().getMonth() + 1; //Current Month
          var year = new Date().getFullYear(); //Current Year
  
          var date = this.state.date == '' || this.state.date == ' ' || this.state.date == null?(
             year+ '-' + month + '-' + dates
            ):(this.state.date)            

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

              var Track = {
                record: this.state.Behandlung.Name,
                file,
                audio,
                patient: this.state.Behandlung.patientId,
                Access: "none",
                abrechnungsnummerprivat: this.state.Behandlung.abrechnungsnummerprivat,
                abrechnungsnummergesaetzlich: this.state.Behandlung.abrechnungsnummergesaetzlich,
                Leistungskette: "-",
                datum: date, 
                Session: this.state.SessionList, 
                SessionTime: this.state.ListRecords
              }

             console.warn('Track', Track)

             const Tracks = Track
   
             const result = await API.graphql(graphqlOperation(mutations2.createRecords, {input: Tracks}))
             console.log( "success", result )
             console.log("Data", result.data.createRecords.id)
             this.setState({ Behandlung: result.data.createRecords.id });
        
            }

   GetData = async () => {

    const { navigation } = this.props;
    const patientId = navigation.getParam('patientId');
    const id = navigation.getParam('id');
    const Pflegeheim = navigation.getParam('Pflegeheim');

    this.setState({
        Pflegeheim:  Pflegeheim
      })

    const results4 = await API.graphql(graphqlOperation(queries.listDistanzens))
    this.setState({
      Distanz:  results4.data.listDistanzens.items
    })

    const data = await API.graphql(graphqlOperation(queries.listArzts2))
    //console.log('result', result)
    this.setState({Arzts: data.data.listArzts2.items})

    const input = {
      id: patientId
    };


    const results1 = await API.graphql(graphqlOperation(queries.listPflegeheims))

    var ListRecords6 = results1.data.listPflegeheims.items.map((rest) => (
        rest.Name == Pflegeheim ? (
          null
          ): (rest)
      ))
      
      ListRecords6 = ListRecords6.filter( Boolean );
      
          this.setState({
            Pflegeheimes:  ListRecords6
          })

  
    const result = await API.graphql(graphqlOperation(queries.getPatient, input))

    const input2 = {
        id: id
      };
    
      const result2 = await API.graphql(graphqlOperation(queries.getOffeneVolgebehandlung, input2))
  
      this.setState({Patient: result.data.getPatient})
      this.setState({Behandlung: result2.data.getOffeneVolgebehandlung})

      const results3 = await API.graphql(graphqlOperation(queries.listRecordss))
      var ListRecords = results3.data.listRecordss.items.map((rest) => (
    rest.patient == result.data.getPatient.id ? (
      rest
      ): null
  ))
  
  ListRecords = ListRecords.filter( Boolean );
  
  this.setState({ RecordsList: ListRecords })

  this.SessionChange(this.state.SessionList)

    }

    Start = (value) => {
        console.warn('hhh', value)
        this.setState({ pass: value })
        
        if (value == 'Zuhause'){
        this.setState({ showEintrag: true })
        this.setState({ showLeistung: true })
        this.setState({ Ziel: 'Zuhause' })
        
      
        } else if(value == 'Pflegeheim'){
          this.setState({ showEintrag: true })
        this.setState({ showLeistung: false })
        this.setState({ showPflegeheime: true })
        this.setState({ Ziel: 'Pflegeheim' })
      
        } else if(value == 'Praxis'){
        this.setState({ showEintrag: true })
        this.setState({ showLeistung: true })
        this.setState({ Ziel: 'Praxis' })
        this.setState({ pass: 'Praxis' })
      
        } else {
          this.setState({ showEintrag: true })
        this.setState({ showLeistung: true })
        this.setState({ showPflegeheime: false })
        this.setState({ pass: 'Pflegeheim' })
        
      
        }
        };

        SessionChange = (value) => {
            this.setState({ SessionList: value })
            this.setState({ Session: true })
            this.SessionTimeChange(value)
            };
        
            SessionTimeChange = (value) => {
              var day = new Date().getDate()
              var month = new Date().getMonth()+1; //Current Month
              var year = new Date().getFullYear();
            var date = year+ '-' + month + '-' + day


            console.warn('records4', this.state.RecordsList)
        
              var ListRecords = this.state.RecordsList.map((rest) => (
                rest.patient == this.state.Patient.id ? (
                  rest
                  ): null
              ))
        
              ListRecords = ListRecords.filter( Boolean );
              console.warn('records5', ListRecords)

              console.warn('records6', ListRecords.map((rest) => (rest.datum)), date)
        
              var ListRecords2 = ListRecords.map((rest) => (
                rest.datum==date && rest.Session==value ? (
                  rest.SessionTime
                  ): null
              ))
        
              ListRecords2 = ListRecords2.filter( Boolean );
              console.warn('records3', ListRecords2)
        
              console.warn('records2', ListRecords2[0])
        
              if(ListRecords2[0]==null || ListRecords2[0]==' ' || ListRecords2[0]=='')
        {
          this.setState({
            ListRecords: ''
          })
        } else{
        this.setState({
          ListRecords: ListRecords2[0]
        })
        }
            }

  render() {
    const { Patient, Behandlung, SessionList, PflegeheimN } = this.state;

    //console.warn('data', this.props.navigation.state.params.Ziel)

    console.warn(Patient)
    console.warn(Behandlung)
    console.warn(this.state.Pflegeheimes)

    let Pflegeunits = [
        ...this.state.Pflegeheimes.map((rest, i) => (
          {
           value: rest.Name
          }
        ))
      ];
  

    let Sessions = [
        {
         value: 'Session1',
        },
        {
          value: 'Session2',
         },
         {
          value: 'Session3',
         },
         {
          value: 'Session4',
         },
         {
          value: 'Session5',
         },
         {
          value: 'Session6',
         },
         {
          value: 'Session7',
         },
         {
          value: 'Session8',
         },
         {
          value: 'Session9',
         },
         {
          value: 'Session10',
         },
    ];
    
    // const subscription = API.graphql(
    //   graphqlOperation(subscriptions.onCreatePatient)
    //   ).subscribe({
    //       next: (PatientData) => this.GetArzt()
    //   });

    return (
           <>
           <Block flex center style={styles.home}>
           <ScrollView contentContainerStyle={styles.content}>

           {!this.state.showEintrag &&
           <>
           <Text>Woher kommst du?</Text>
           <Button onPress = {() => this.Start('Zuhause')}>von Zuhause</Button>
           <Button onPress = {() => this.Start('Pflegeheim')}>vom Pflegeheim</Button>
           <Button onPress = {() => this.Start('Praxis')}>Bin in der Praxis</Button>
           </>
           }

         

           {this.state.showEintrag &&
           <>

{this.state.showPflegeheime &&
           <>
           <ScrollView contentContainerStyle={styles.articles}>
           <Text style={{ alignSelf: 'center' }}>Welches Pflegeheim?</Text>
           <Dropdown
              label='Pflegeheim'
              value={PflegeheimN}
              style={{ width: 60 }}
              onChangeText={ (PflegeheimN) => this.setState({ PflegeheimN }) }
              data={Pflegeunits}
              />

          <Button  onPress={() => this.Start('Nothing')}>Fertig</Button>
          </ScrollView>
          </>
           }

{!this.state.showPflegeheime &&
    <>
           <Card.Content style={{width: width}}>

           {this.state.pass=="Pflegeheim" &&
            <Button onPress={()=>this.showorigin()}>Du kommst aus {this.state.PflegeheimN} (Ändern)</Button>
            }
            {this.state.pass=="Zuhause" &&
            <Button onPress={()=>this.showorigin()}>Du kommst von Zuhause (Ändern)</Button>
            }
            {this.state.pass=='Praxis' &&
            <Button onPress={()=>this.showorigin()}>Du bist in der Praxis (Ändern)</Button>
            }


           {this.state.showLeistung &&
            <>
                <Title style={{ alignSelf: 'right' }}>{this.state.SessionList+ " " + this.state.ListRecords}</Title>
                {this.state.Session && <><Button 
                                         style={{ alignSelf: 'right' }}
                                         onPress={ () => this.setState({ Session: false })}>
                                           Session Ändern</Button></>}
             
          </>}

          

          {!this.state.Session &&
           <>
            
           <Dropdown
              label='Session'
              value={SessionList}
              style={{ width: 60 }}
              onChangeText={ (SessionList) => this.SessionChange(SessionList) }
              data={Sessions}
              />
          </>
           }

           
           </Card.Content>

           <Card.Content style={{width: width}}>
           <List.Item
                title={Patient.Vorname + " " + Patient.Nachname}
                description="Patient"
            />
            <List.Item
                title={Behandlung.Name}
                description="Folge Behandlung"
            />
            {Behandlung.abrechnungsnummerprivat!="-" && Behandlung.abrechnungsnummergesaetzlich!="-"?(
            <><List.Item
                title={Behandlung.abrechnungsnummerprivat}
                description="abrechnungsnummerprivat"
            />
            <List.Item
                title={Behandlung.abrechnungsnummergesaetzlich}
                description="abrechnungsnummergesätzlich"
            /></>
            ):(null)}
            <List.Item
                title={Behandlung.datum}
                description="Erstellt am"
            />

         <DatePicker
        style={{ backgroundColor: '#fafafa', width: width }}
        date={this.state.date}
        mode="date"
        placeholder="Datum"
        format="YYYY-MM-DD"
        confirmBtnText="Fertig"
        iconSource = {null}
        cancelBtnText=""
        customStyles={{
          dateInput: {
            marginLeft: 36,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderTopWidth: 0,
            width: width
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />

      <HelperText
          type="info"
          visible={true}
        >Wenn du das feld leer lässt wir das datum von heute genommen</HelperText>

            <Button mode='outlined' style={{alignSelf:'center'}} onPress={()=>this.both()}>Fertig</Button>
            </Card.Content>
            </>}

            </>
           }
          
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