import React, { Component } from 'react';
import { Dimensions, ScrollView, View, StyleSheet, TouchableHighlight, FlatList, Image } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import Refrence from '../Refrence';
import Icon from 'react-native-vector-icons/AntDesign';
import ListEintraege from './ListEintraege';
import { TextInput, Text, HelperText, FAB, DataTable, Button, IconButton, Headline, Dialog, Avatar, Card, Title, Paragraph, Portal, Provider } from 'react-native-paper';
import { API, Storage, Auth, graphqlOperation }  from "aws-amplify";
import aws_exports from '../../../../aws-exports'
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Audio } from 'expo-av';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import * as FileSystem from 'expo-file-system';
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import * as mutations2 from '../../../graphql/mutations2';
import { createRecords } from '../../../graphql/mutations';
import * as subscriptions from '../../../graphql/subscriptions';
import CalendarStrip from './Strip'
import TouchableWipe from './TouchableWipe'

import gql from 'graphql-tag';
import { buildMutation } from 'aws-appsync';
import Swipeable from 'react-native-swipeable';


const { width } = Dimensions.get('screen');

const initialState = {
  patient: "",
  Record: " ",
  image: [],
  audio: "",
  open: false,
  audio: File,
  isModalVisible: false,
  showEintrag: true,
  showLeistung: true,
  showPflegeheime: false,
  pass: 'Praxis',
  Pflegeheimes: [],
  PflegeheimN:'',
  today:'',
  month:'',
  yearh:'',
  selectedDate:'2019/09/18',
  Currentdate:'',
 Dates: []
};

export default class Leistungen extends React.Component {

  state = {
    ...initialState,
    hasCameraPermission: null,
    hasRecordPermission: null,
    hasRollPermission: null,
    hasRecordPermission: null,
    halPlayRecordPermission: null,
    type: Camera.Constants.Type.back,
    eintrag: false,
    eintragmitcam: false,
    eintragbild: false,
    eintragLeistung: false,
    bild: false,
    cam: false,
    duration: 1000 * 60 * 3,
    recording: false,
    close: false,
    showimage: [],
    imagemutation: [],
    displayimage: false,
    Records: [],
    AudioKe: [],
    BildKe: [],
    Kettendata: [],
    showfilteredkette: false,
    Behandlung: [],
    ExtraBehandlungen: [],
    Extra: "",
    TypValue: [],
    Kette: " ",
    accessed: false,
    Behandlungshow: false,
    entry: "",
    datatype: "",
    imageke: [],
    audioke: [],
    inhalt:[],
    Audioske:[],
    nav: '' ,
    BatchKette: [], 
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
    Trackings:[],
    Patienten:[],
    Arzte:[],
    set1A:'',
    set1B:'',
    set2A:'',
    set2B:'',
    set3A:'',
    set3B:'',
    set4A:'',
    set4B:'',
    count1A:'',
    count1B:'',
    count2A:'',
    count2B:'',
    count3A:'',
    count3B:'',
    count4A:'',
    count4B:'',
 };

constructor (props) {
super(props)
this.audiofile = null;
this._recordInstance = new Audio.Recording()
this._recordInstance.setOnRecordingStatusUpdate(() => {
this.onRecordingStatusUpdate()
})
}

async  componentDidMount() {

  var date = new Date().getDate()
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
   
    console.warn("Dates5", Date.now(), date)
    console.warn("con", date + '/' + month + '/' + year)

    this.setState({selectedDate: year + '/' + month + '/' + date })

  const { navigation } = this.props;
const patientId = navigation.getParam('patientId');
const Pflegeheim = navigation.getParam('Pflegeheim');
const client = navigation.getParam('client');
const pass = navigation.getParam('pass');
const PflegeheimN = navigation.getParam('PflegeheimN');
const selectedDate = navigation.getParam('selectedDate')
      const SessionList = navigation.getParam('SessionList')
      const ListRecords = navigation.getParam('ListRecords')

      const tip = navigation.getParam('tip')


console.warn('Helmut', patientId, Pflegeheim, pass, PflegeheimN, selectedDate)


console.warn('nav', navigation)

this.setState({ patientId: patientId });
this.setState({ Pflege: Pflegeheim });
this.setState({ client: client });

const result2 = await API.graphql(graphqlOperation(queries.listPatients))
this.setState({
  Patienten:  result2.data.listPatients.items
})  
    const result3 = await API.graphql(graphqlOperation(queries.listArzts2))
    this.setState({
      Arzte:  result3.data.listArzts2.items
    }) 
    const result = await API.graphql(graphqlOperation(queries.listTrackings))
    this.setState({
      Trackings:  result.data.listTrackings.items
    }) 

const results = await API.graphql(graphqlOperation(queries.listPflegeheims))

const results3 = await API.graphql(graphqlOperation(queries.listRecordss))

var ListRecords6 = results.data.listPflegeheims.items.map((rest) => (
  rest.Name == Pflegeheim ? (
    null
    ): (rest)
))

ListRecords6 = ListRecords6.filter( Boolean );

    this.setState({
      Pflegeheimes:  ListRecords6
    })  

    if (pass != null){
      this.setState({ showEintrag: true })
      this.setState({ showLeistung: true })
      this.setState({ PflegeheimN: PflegeheimN });
      this.setState({ pass: pass });
      if(pass == 'Zuhause'){
        this.setState({ pass: 'Zuhause' })
      } else{
        this.setState({ pass: 'Pflegeheim' })
      }
    
      } else{this.CheckForremnants()
        .catch((err)=> console.warn('ERROR', err))}



    

    if(tip=="newrun"){
      this.setState({ selectedDate: selectedDate });
      this.setState({ ListRecords: ListRecords });
      this.Sessions2(patientId);
    } else if (ListRecords!=null && selectedDate.includes('-')){
        console.warn('1')
        var day = selectedDate.replace('-', '/')
    var month = day.replace('-', '/') //Current Month

    console.warn('2', selectedDate.replace('-', '/'))
                this.setState({ selectedDate: month });
              this.setState({ SessionList: SessionList });
              this.setState({ ListRecords: ListRecords });
              this.Sessions2(patientId);
      }  else {
        this.Sessions(patientId);
        console.warn('2')
      }

   

// permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
const {  permissions } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
this.setState({ hasRecordPermission: permissions === 'granted' });

const leistungsquery = await API.graphql(graphqlOperation(queries.listLeistungsKettes))
    this.setState({Kettendata: leistungsquery.data.listLeistungsKettes.items})

}

async CheckForremnants(){
  var day = new Date().getDate()
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Curr

  var Datev = year+ '-' + month + '-' + day

    var ListTracks = this.state.Trackings.map((rest) => (
      rest.ArztId == this.state.Arzte.map((arzt)=>(arzt.id)) &&
      (rest.start == this.state.Pflege ||  rest.end == this.state.Pflege) &&
      (rest.Date == Datev) ? (
        rest
        ):
        (
          null
        )))

    ListTracks = ListTracks.filter( Boolean );

    console.warn('Yeeehaaaa', ListTracks, month)

    var HR = ListTracks.map((rest)=> ""+(new Date(rest.createdAt).getHours())+(new Date(rest.createdAt).getMinutes())); //Current Month
    var Usable = HR.map(Number)
    var MaximumValue= Math.max(...Usable)
    var HR2 = ListTracks.map((rest)=> (new Date(rest.createdAt).getHours())+(new Date(rest.createdAt).getMinutes())); //Current Month
    console.warn('Yeeehaaaa2', MaximumValue, Usable)
    var Determinator = ListTracks.map((rest)=>(
     ( ""+(new Date(rest.createdAt).getHours())+(new Date(rest.createdAt).getMinutes())) == MaximumValue ?
      (rest) : null 
    ))

    Determinator = Determinator.filter( Boolean );

    if(Determinator.map((rest)=> rest.start) == this.state.Pflege ){
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

    if(Determinator.map((rest)=> rest.end) == this.state.Pflege ){
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

showorigin(){
  this.setState({ showEintrag: false })
      this.setState({ showLeistung: false })
}

async Sessions2 (value) {
  var day = new Date().getDate()
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var date = year+ '/' + month + '/' + day
    var date2 = year+ '-' + month + '-' + day

    const results3 = await API.graphql(graphqlOperation(queries.listRecordss))

    var ListPatient = this.state.Patienten.map((rest) => (
      rest.Arzt == this.state.Arzte.map((arzt)=>(arzt.username)) &&
      rest.Pflegeheim == this.state.Pflege ? (
        rest
        ):
        (
          null
        )))

    ListPatient = ListPatient.filter( Boolean );
    this.setState({
      Patienten: ListPatient 
    })  
    console.warn('4 ', ListPatient)

    var ListTracks = this.state.Trackings.map((rest) => (
      rest.ArztId == this.state.Arzte.map((arzt)=>(arzt.id)) &&
      (rest.start == this.state.Pflege ||  rest.end == this.state.Pflege) &&
      (rest.Date == date2) ? (
        rest
        ):
        (
          null
        ))) 

    ListTracks = ListTracks.filter( Boolean );

    console.warn('88' , ListTracks, this.state.Trackings)

    console.warn('89' , this.state.Arzte, this.state.Pflege)

    console.warn('89' , date)

    const Newval2 = ListTracks.map((rest)=> ({PatientId: rest.PatientId,
                     distanz: rest.distanz}))
                     console.warn('89' , Newval2)

  const Newval = ListTracks.map((rest)=> (rest.PatientId))
  console.warn('90' , Newval)
    
    var filteredArr = Newval2.reduce((acc, current) => {
      const x = acc.find(item => (item.PatientId === current.PatientId) && (item.distanz === current.distanz));
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  
    const check = filteredArr.map((rest)=>rest.distanz)

    var check1 = check.includes('7810')?('7810'):(null)
    console.warn('chec1', check1, check)

  if(check1=='7810'){
      console.warn('1a')
  var set1A= filteredArr.map((rest)=>rest.distanz.includes('7810'))
  this.setState({set1A: '7810' })
  var count1A=filteredArr.map((rest)=>rest.distanz=='7810'?(rest):null)
  count1A = count1A.filter( Boolean );
  this.setState({count1A: count1A.length })
  }

  var check2 = check.includes('7811')?('7811'):(null)
  
  if(check2=='7811'){
      console.warn('2a')
  var set1B= filteredArr.map((rest)=>rest.distanz.includes('7811'))
  this.setState({set1B: '7811' })
  var count1B=filteredArr.map((rest)=>rest.distanz=='7811'?(rest):null)
  count1B = count1B.filter( Boolean );
  this.setState({count1B: count1B.length })
  }
  
  var check3 = check.includes('7820')?('7820'):(null)
  
  if(check3=='7820'){
      console.warn('3a')
  var set2A= filteredArr.map((rest)=>rest.distanz.includes('7820'))
  this.setState({set2A: '7820' })
  var count2A=filteredArr.map((rest)=>rest.distanz=='7820'?(rest):null)
  count2A = count2A.filter( Boolean );
  this.setState({count2A: count2A.length })
  }

  var check4 = check.includes('7821')?('7821'):(null)
  
  if(check4=='7821'){
      console.warn('4a')
  var set2B= filteredArr.map((rest)=>rest.distanz.includes('7821'))
  this.setState({set2B: '7821' })
  var count2B=filteredArr.map((rest)=>rest.distanz=='7821'?(rest):null)
  count2B = count2B.filter( Boolean );
  this.setState({count2B: count2B.length })
  }

  var check5 = check.includes('7830')?('7830'):(null)
  
  if(check5=='7830'){
      console.warn('5a')
  var set3A= filteredArr.map((rest)=>rest.distanz.includes('7830'))
  this.setState({set3A: '7830' })
  var count3A=filteredArr.map((rest)=>rest.distanz=='7830'?(rest):null)
  count3A = count3A.filter( Boolean );
  this.setState({count3A: count3A.length })
  }

  var check6 = check.includes('7831')?('7831'):(null)
  
  if(check6=='7831'){
      console.warn('6a')
  var set3B= filteredArr.map((rest)=>rest.distanz.includes('7831'))
  this.setState({set3B: '7831' })
  var count3B=filteredArr.map((rest)=>rest.distanz=='7831'?(rest):null)
  count3B = count3B.filter( Boolean );
  this.setState({count3B: count3B.length })
  }

  const check7 = check.includes('7840')?('7840'):(null)

  console.warn('chec7', check7, check, filteredArr)
  
  if(check7=='7840'){
      console.warn('7a')
  var set4A= filteredArr.map((rest)=>rest.distanz.includes('7840'))
  this.setState({set4A: '7840' })
  var count4A=filteredArr.map((rest)=>rest.distanz=='7840'?(rest):null)
  count4A = count4A.filter( Boolean );
  this.setState({count4A: count4A.length })
  }

  console.warn('Check', check, Newval2, Newval)

  var check8 = check.includes('7841')?('7841'):(null)
  
  if(check8=='7841'){
      console.warn('8a')
  var set4B= filteredArr.map((rest)=>rest.distanz.includes('7841'))
  this.setState({set4B: '7841' })
  var count4B=filteredArr.map((rest)=>rest.distanz=='7841'?(rest):null)
  count4B = count4B.filter( Boolean );
  this.setState({count4B: count4B.length })
  console.warn('hehe',count4B.length)
  }

  console.warn('5 ',  count4B)
  console.warn('6 ', Newval)
  console.warn('7 ', filteredArr)
  console.warn('10 ', filteredArr.length)
  console.warn('8 ', Newval.filter((item,index) => Newval.indexOf(item) === index))
  console.warn('9 ', Newval.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []))
     

var ListRecords = results3.data.listRecordss.items.map((rest) => (
  rest.patient == value ? (
    rest
    ): null
))

ListRecords = ListRecords.filter( Boolean );

var ListRecords5 = ListRecords.map((rest) => (
  rest.patient != 'DEL' ? (
    rest
    ): null
))

ListRecords5 = ListRecords5.filter( Boolean );


var ListRecords2 = ListRecords.map((rest) => (
  rest.datum.includes(date) && rest.Session==this.state.SessionList ? (
    rest.SessionTime
    ): null
))

ListRecords2 = ListRecords2.filter( Boolean );

var hour = new Date().getHours()
var min = new Date().getMinutes()
var time = hour + ":" + min

console.warn('records2', time)

console.warn('DATUM', ListRecords5.map((rest)=>(rest.datum)), date, this.state.SessionList)

this.setState({
  Dates:  ListRecords5.map((rest)=>(rest.datum))
})

this.setState({
  Currentdate: date
})


this.setState({
  RecordsList: ListRecords
})


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


async Sessions (value) {
  var day = new Date(this.state.selectedDate).getDate()
    var month = new Date(this.state.selectedDate).getMonth() + 1; //Current Month
    var year = new Date(this.state.selectedDate).getFullYear(); //Current Year
    var date2 = year+ '-' + month + '-' + day
    var date = year+ '/' + month + '/' + day

    // console.warn('1 ', result)
    // console.warn('2 ', result2)
    // console.warn('3 ', result3)

    var ListPatient = this.state.Patienten.map((rest) => (
      rest.Arzt == this.state.Arzte.map((arzt)=>(arzt.username)) &&
      rest.Pflegeheim == this.state.Pflege ? (
        rest
        ):
        (
          null
        )))

    ListPatient = ListPatient.filter( Boolean );
    this.setState({
      Patienten: ListPatient 
    })  
    console.warn('4 ', ListPatient)

    var ListTracks = this.state.Trackings.map((rest) => (
      rest.ArztId == this.state.Arzte.map((arzt)=>(arzt.id)) &&
      (rest.start == this.state.Pflege ||  rest.end == this.state.Pflege) &&
      (rest.Date == date2) ? (
        rest
        ):
        (
          null
        ))) 

    ListTracks = ListTracks.filter( Boolean );

    console.warn('88' , ListTracks, this.state.Trackings)

    console.warn('89' , this.state.Arzte, this.state.Pflege)

    console.warn('89' , date)

    const Newval2 = ListTracks.map((rest)=> ({PatientId: rest.PatientId,
                     distanz: rest.distanz}))
                     console.warn('89' , Newval2)

  const Newval = ListTracks.map((rest)=> (rest.PatientId))
  console.warn('900000000000' , Newval)
    
    var filteredArr = Newval2.reduce((acc, current) => {
      const x = acc.find(item => (item.PatientId === current.PatientId) && (item.distanz === current.distanz));
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  
    const check = filteredArr.map((rest)=>rest.distanz)

    var check1 = check.includes('7810')?('7810'):(null)

    console.warn('chec1', check1, check)

  if(check1=='7810'){
      console.warn('1a')
  var set1A= filteredArr.map((rest)=>rest.distanz.includes('7810'))
  this.setState({set1A: '7810' })
  var count1A=filteredArr.map((rest)=>rest.distanz=='7810'?(rest):null)
  count1A = count1A.filter( Boolean );
  this.setState({count1A: count1A.length })
  }

  var check2 = check.includes('7811')?('7811'):(null)
  
  if(check2=='7811'){
      console.warn('2a')
  var set1B= filteredArr.map((rest)=>rest.distanz.includes('7811'))
  this.setState({set1B: '7811' })
  var count1B=filteredArr.map((rest)=>rest.distanz=='7811'?(rest):null)
  count1B = count1B.filter( Boolean );
  this.setState({count1B: count1B.length })
  }
  
  var check3 = check.includes('7820')?('7820'):(null)
  
  if(check3=='7820'){
      console.warn('3a')
  var set2A= filteredArr.map((rest)=>rest.distanz.includes('7820'))
  this.setState({set2A: '7820' })
  var count2A=filteredArr.map((rest)=>rest.distanz=='7820'?(rest):null)
  count2A = count2A.filter( Boolean );
  this.setState({count2A: count2A.length })
  }

  var check4 = check.includes('7821')?('7821'):(null)
  
  if(check4=='7821'){
      console.warn('4a')
  var set2B= filteredArr.map((rest)=>rest.distanz.includes('7821'))
  this.setState({set2B: '7821' })
  var count2B=filteredArr.map((rest)=>rest.distanz=='7821'?(rest):null)
  count2B = count2B.filter( Boolean );
  this.setState({count2B: count2B.length })
  }

  var check5 = check.includes('7830')?('7830'):(null)
  
  if(check5=='7830'){
      console.warn('5a')
  var set3A= filteredArr.map((rest)=>rest.distanz.includes('7830'))
  this.setState({set3A: '7830' })
  var count3A=filteredArr.map((rest)=>rest.distanz=='7830'?(rest):null)
  count3A = count3A.filter( Boolean );
  this.setState({count3A: count3A.length })
  }

  var check6 = check.includes('7831')?('7831'):(null)
  
  if(check6=='7831'){
      console.warn('6a')
  var set3B= filteredArr.map((rest)=>rest.distanz.includes('7831'))
  this.setState({set3B: '7831' })
  var count3B=filteredArr.map((rest)=>rest.distanz=='7831'?(rest):null)
  count3B = count3B.filter( Boolean );
  this.setState({count3B: count3B.length })
  }

  const check7 = check.includes('7840')?('7840'):(null)

  console.warn('chec7', check7, check, filteredArr)
  
  if(check7=='7840'){
      console.warn('7a')
  var set4A= filteredArr.map((rest)=>rest.distanz.includes('7840'))
  this.setState({set4A: '7840' })
  var count4A=filteredArr.map((rest)=>rest.distanz=='7840'?(rest):null)
  count4A = count4A.filter( Boolean );
  this.setState({count4A: count4A.length })
  }

  console.warn('Check', check, Newval2, Newval)

  var check8 = check.includes('7841')?('7841'):(null)
  
  if(check8=='7841'){
      console.warn('8a')
  var set4B= filteredArr.map((rest)=>rest.distanz.includes('7841'))
  this.setState({set4B: '7841' })
  var count4B=filteredArr.map((rest)=>rest.distanz=='7841'?(rest):null)
  count4B = count4B.filter( Boolean );
  this.setState({count4B: count4B.length })
  console.warn('hehe',count4B.length)
  }

  console.warn('5 ',  count4B)
  console.warn('6 ', Newval)
  console.warn('7 ', filteredArr)
  console.warn('10 ', filteredArr.length)
  console.warn('8 ', Newval.filter((item,index) => Newval.indexOf(item) === index))
  console.warn('9 ', Newval.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []))
    

   

const results3 = await API.graphql(graphqlOperation(queries.listRecordss))

var ListRecords = results3.data.listRecordss.items.map((rest) => (
  rest.patient == value ? (
    rest
    ): null
))

ListRecords = ListRecords.filter( Boolean );

var ListRecords5 = ListRecords.map((rest) => (
  rest.patient != 'DEL' ? (
    rest
    ): null
))

ListRecords5 = ListRecords5.filter( Boolean )

var ListRecords2 = this.state.Trackings.map((rest) => (
  rest.Date.includes(date2) && rest.Session==this.state.SessionList &&
  rest.ArztId ==   this.state.Arzte.map((arzt)=>(arzt.id)) &&
            (rest.start == this.state.Pflege ||  rest.end == this.state.Pflege) ? (
    rest.SessionTime
    ): null
))

ListRecords2 = ListRecords2.filter( Boolean );

var hour = new Date().getHours()
var min = new Date().getMinutes()
var time = hour + ":" + min

console.warn('records2', ListRecords2)

this.setState({
  Dates:  ListRecords5.map((rest)=>(rest.datum))
})

this.setState({
  selectedDate: date
})

this.setState({
  Currentdate: date
})

this.setState({
  RecordsList: ListRecords
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

AddAbbrechnung = (e) => {
if ( this.state.AudioKe != "-" && this.state.AudioKe != "" ) {
  this.setState({ datatype: "audioke" })
  ;} 
if ( this.state.BildKe != "-" && this.state.Records.record != null) {
  this.setState({ datatype: "imageke/doku" })
  ;} 
if ( this.state.BildKe  != "-" && this.state.BildKe != "") {
  this.setState({ datatype: "imageke/doku" })
  ;} 
if ( this.state.Records.record != null) {
  this.setState({ datatype: "doku" });
}
const Ketteninhalt = this.state.inhalt

const k = {
  Typ: this.state.TypValue,
  Eintrag: this.state.Records.record,
  Kette: this.state.Kette,
  patient: this.state.Records.patient,
  arzt: this.state.Records.arzt,
  createdAt: this.state.Records.createdAt,
  filetype: this.state.datatype,
  Ketteninhalt,
  bild: this.state.Records.file,
  audioke: this.state.Records.audioke,
}
API.graphql(graphqlOperation(mutations.createAbbrechnung, {input: k}))
.catch(err => console.log(err))

}

Start = (value) => {
  console.warn('hhh', value)
  this.setState({ pass: value })
  
  if (value == 'Zuhause'){
  this.setState({ showEintrag: true })
  this.setState({ showLeistung: true })

  } else if(value == 'Pflegeheim'){
    this.setState({ showEintrag: true })
  this.setState({ showLeistung: false })
  this.setState({ showPflegeheime: true })

  } else if(value == 'Praxis'){
  this.setState({ showEintrag: true })
  this.setState({ showLeistung: true })
  this.setState({ pass: 'Praxis' })

  } else {
    this.setState({ showEintrag: true })
  this.setState({ showLeistung: true })
  this.setState({ showPflegeheime: false })
  this.setState({ pass: 'Pflegeheim' })

  }
  
  };

  SessionChange = (value) => {
    console.warn('currentvalue')
    this.setState({ SessionList: value })
    this.setState({ Session: true })
    this.SessionTimeChange(value)
    };

    SessionTimeChange = (value) => {
      var day = new Date(this.state.selectedDate).getDate()
      var month = new Date(this.state.selectedDate).getMonth() + 1; //Current Month
      var year = new Date(this.state.selectedDate).getFullYear();
    var date = year+ '-' + month + '-' + day

    var ListPatient = this.state.Patienten.map((rest) => (
      rest.Arzt == this.state.Arzte.map((arzt)=>(arzt.username)) &&
      rest.Pflegeheim == this.state.Pflege ? (
        rest
        ):
        (
          null
        )))

    ListPatient = ListPatient.filter( Boolean );
    this.setState({
      Patienten: ListPatient 
    })  
    console.warn('4 ', ListPatient)

    var ListTracks = this.state.Trackings.map((rest) => (
      rest.ArztId == this.state.Arzte.map((arzt)=>(arzt.id)) &&
      (rest.start == this.state.Pflege ||  rest.end == this.state.Pflege) &&
      (rest.Date == date) ? (
        rest
        ):
        (
          null
        ))) 

    ListTracks = ListTracks.filter( Boolean );

    console.warn('88' , ListTracks, this.state.Trackings)

    console.warn('89' , this.state.Arzte, this.state.Pflege)

    console.warn('89' , date)

    const Newval2 = ListTracks.map((rest)=> ({PatientId: rest.PatientId,
                     distanz: rest.distanz}))
                     console.warn('89' , Newval2)

  const Newval = ListTracks.map((rest)=> (rest.PatientId))
  console.warn('90' , Newval)
    
    var filteredArr = Newval2.reduce((acc, current) => {
      const x = acc.find(item => (item.PatientId === current.PatientId) && (item.distanz === current.distanz));
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  
    const check = filteredArr.map((rest)=>rest.distanz)

    var check1 = check.includes('7810')?('7810'):(null)
    console.warn('chec1', check1, check)

  if(check1=='7810'){
      console.warn('1a')
  var set1A= filteredArr.map((rest)=>rest.distanz.includes('7810'))
  this.setState({set1A: '7810' })
  var count1A=filteredArr.map((rest)=>rest.distanz=='7810'?(rest):null)
  count1A = count1A.filter( Boolean );
  this.setState({count1A: count1A.length })
  }

  var check2 = check.includes('7811')?('7811'):(null)
  
  if(check2=='7811'){
      console.warn('2a')
  var set1B= filteredArr.map((rest)=>rest.distanz.includes('7811'))
  this.setState({set1B: '7811' })
  var count1B=filteredArr.map((rest)=>rest.distanz=='7811'?(rest):null)
  count1B = count1B.filter( Boolean );
  this.setState({count1B: count1B.length })
  }
  
  var check3 = check.includes('7820')?('7820'):(null)
  
  if(check3=='7820'){
      console.warn('3a')
  var set2A= filteredArr.map((rest)=>rest.distanz.includes('7820'))
  this.setState({set2A: '7820' })
  var count2A=filteredArr.map((rest)=>rest.distanz=='7820'?(rest):null)
  count2A = count2A.filter( Boolean );
  this.setState({count2A: count2A.length })
  }

  var check4 = check.includes('7821')?('7821'):(null)
  
  if(check4=='7821'){
      console.warn('4a')
  var set2B= filteredArr.map((rest)=>rest.distanz.includes('7821'))
  this.setState({set2B: '7821' })
  var count2B=filteredArr.map((rest)=>rest.distanz=='7821'?(rest):null)
  count2B = count2B.filter( Boolean );
  this.setState({count2B: count2B.length })
  }

  var check5 = check.includes('7830')?('7830'):(null)
  
  if(check5=='7830'){
      console.warn('5a')
  var set3A= filteredArr.map((rest)=>rest.distanz.includes('7830'))
  this.setState({set3A: '7830' })
  var count3A=filteredArr.map((rest)=>rest.distanz=='7830'?(rest):null)
  count3A = count3A.filter( Boolean );
  this.setState({count3A: count3A.length })
  }

  var check6 = check.includes('7831')?('7831'):(null)
  
  if(check6=='7831'){
      console.warn('6a')
  var set3B= filteredArr.map((rest)=>rest.distanz.includes('7831'))
  this.setState({set3B: '7831' })
  var count3B=filteredArr.map((rest)=>rest.distanz=='7831'?(rest):null)
  count3B = count3B.filter( Boolean );
  this.setState({count3B: count3B.length })
  }

  const check7 = check.includes('7840')?('7840'):(null)

  console.warn('chec7', check7, check, filteredArr)
  
  if(check7=='7840'){
      console.warn('7a')
  var set4A= filteredArr.map((rest)=>rest.distanz.includes('7840'))
  this.setState({set4A: '7840' })
  var count4A=filteredArr.map((rest)=>rest.distanz=='7840'?(rest):null)
  count4A = count4A.filter( Boolean );
  this.setState({count4A: count4A.length })
  }

  console.warn('Check', check, Newval2, Newval)

  var check8 = check.includes('7841')?('7841'):(null)
  
  if(check8=='7841'){
      console.warn('8a')
  var set4B= filteredArr.map((rest)=>rest.distanz.includes('7841'))
  this.setState({set4B: '7841' })
  var count4B=filteredArr.map((rest)=>rest.distanz=='7841'?(rest):null)
  count4B = count4B.filter( Boolean );
  this.setState({count4B: count4B.length })
  console.warn('hehe',count4B.length)
  }

  console.warn('5 ',  count4B)
  console.warn('6 ', Newval)
  console.warn('7 ', filteredArr)
  console.warn('10 ', filteredArr.length)
  console.warn('8 ', Newval.filter((item,index) => Newval.indexOf(item) === index))
  console.warn('9 ', Newval.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []))
    


      var ListRecords2 = this.state.Trackings.map((rest) => (
        rest.Date.includes(date) && rest.Session==this.state.SessionList &&
        rest.ArztId ==   this.state.Arzte.map((arzt)=>(arzt.id)) &&
                  (rest.start == this.state.Pflege ||  rest.end == this.state.Pflege) ? (
          rest.SessionTime
          ): null
      ))

      ListRecords2 = ListRecords2.filter( Boolean );

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

    toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
      };

    SessionTimeChange2 = (value) => {
      this.setState({set1A: ''})
      this.setState({set1B: ''})
      this.setState({set2A: ''})
      this.setState({set2B: ''})
      this.setState({set3A: ''})
      this.setState({set3B: ''})
      this.setState({set4A: ''})
      this.setState({set4B: ''})
      
      const {Trackings} = this.state;
      var day = new Date(value).getDate()
      var month = new Date(value).getMonth() + 1; //Current Month
      var year = new Date(value).getFullYear();
    var date = year+ '-' + month + '-' + day


    var ListPatient = this.state.Patienten.map((rest) => (
      rest.Arzt == this.state.Arzte.map((arzt)=>(arzt.username)) &&
      rest.Pflegeheim == this.state.Pflege ? (
        rest
        ):
        (
          null
        )))

    ListPatient = ListPatient.filter( Boolean );
    this.setState({
      Patienten: ListPatient 
    })  
    console.warn('4 ', ListPatient)

    var ListTracks = Trackings.map((rest) => (
      rest.ArztId == this.state.Arzte.map((arzt)=>(arzt.id)) &&
      (rest.start == this.state.Pflege ||  rest.end == this.state.Pflege) &&
      (rest.Date == date) ? (
        rest
        ):
        (
          null
        ))) 

    ListTracks = ListTracks.filter( Boolean );

    console.warn('88' , ListTracks, this.state.Trackings)

    console.warn('89' , this.state.Arzte, this.state.Pflege)

    console.warn('89' , date)

    const Newval2 = ListTracks.map((rest)=> ({PatientId: rest.PatientId,
                     distanz: rest.distanz}))
                     console.warn('89' , Newval2)

  const Newval = ListTracks.map((rest)=> (rest.PatientId))
  console.warn('90' , Newval)
    
    var filteredArr = Newval2.reduce((acc, current) => {
      const x = acc.find(item => (item.PatientId === current.PatientId) && (item.distanz === current.distanz));
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

  
    const check = filteredArr.map((rest)=>rest.distanz)

    var check1 = check.includes('7810')?('7810'):(null)
    console.warn('chec1', check1, check)

  if(check1=='7810'){
      console.warn('1a')
  var set1A= filteredArr.map((rest)=>rest.distanz.includes('7810'))
  this.setState({set1A: '7810' })
  var count1A=filteredArr.map((rest)=>rest.distanz=='7810'?(rest):null)
  count1A = count1A.filter( Boolean );
  this.setState({count1A: count1A.length })
  }

  var check2 = check.includes('7811')?('7811'):(null)
  
  if(check2=='7811'){
      console.warn('2a')
  var set1B= filteredArr.map((rest)=>rest.distanz.includes('7811'))
  this.setState({set1B: '7811' })
  var count1B=filteredArr.map((rest)=>rest.distanz=='7811'?(rest):null)
  count1B = count1B.filter( Boolean );
  this.setState({count1B: count1B.length })
  }
  
  var check3 = check.includes('7820')?('7820'):(null)
  
  if(check3=='7820'){
      console.warn('3a')
  var set2A= filteredArr.map((rest)=>rest.distanz.includes('7820'))
  this.setState({set2A: '7820' })
  var count2A=filteredArr.map((rest)=>rest.distanz=='7820'?(rest):null)
  count2A = count2A.filter( Boolean );
  this.setState({count2A: count2A.length })
  }

  var check4 = check.includes('7821')?('7821'):(null)
  
  if(check4=='7821'){
      console.warn('4a')
  var set2B= filteredArr.map((rest)=>rest.distanz.includes('7821'))
  this.setState({set2B: '7821' })
  var count2B=filteredArr.map((rest)=>rest.distanz=='7821'?(rest):null)
  count2B = count2B.filter( Boolean );
  this.setState({count2B: count2B.length })
  }

  var check5 = check.includes('7830')?('7830'):(null)
  
  if(check5=='7830'){
      console.warn('5a')
  var set3A= filteredArr.map((rest)=>rest.distanz.includes('7830'))
  this.setState({set3A: '7830' })
  var count3A=filteredArr.map((rest)=>rest.distanz=='7830'?(rest):null)
  count3A = count3A.filter( Boolean );
  this.setState({count3A: count3A.length })
  }

  var check6 = check.includes('7831')?('7831'):(null)
  
  if(check6=='7831'){
      console.warn('6a')
  var set3B= filteredArr.map((rest)=>rest.distanz.includes('7831'))
  this.setState({set3B: '7831' })
  var count3B=filteredArr.map((rest)=>rest.distanz=='7831'?(rest):null)
  count3B = count3B.filter( Boolean );
  this.setState({count3B: count3B.length })
  }

  const check7 = check.includes('7840')?('7840'):(null)

  console.warn('chec7', check7, check, filteredArr)
  
  if(check7=='7840'){
      console.warn('7a')
  var set4A= filteredArr.map((rest)=>rest.distanz.includes('7840'))
  this.setState({set4A: '7840' })
  var count4A=filteredArr.map((rest)=>rest.distanz=='7840'?(rest):null)
  count4A = count4A.filter( Boolean );
  this.setState({count4A: count4A.length })
  }

  console.warn('Check', check, Newval2, Newval)

  var check8 = check.includes('7841')?('7841'):(null)
  
  if(check8=='7841'){
      console.warn('8a')
  var set4B= filteredArr.map((rest)=>rest.distanz.includes('7841'))
  this.setState({set4B: '7841' })
  var count4B=filteredArr.map((rest)=>rest.distanz=='7841'?(rest):null)
  count4B = count4B.filter( Boolean );
  this.setState({count4B: count4B.length })
  console.warn('hehe',count4B.length)
  }

  console.warn('5 ',  count4B)
  console.warn('6 ', Newval)
  console.warn('7 ', filteredArr)
  console.warn('10 ', filteredArr.length)
  console.warn('8 ', Newval.filter((item,index) => Newval.indexOf(item) === index))
  console.warn('9 ', Newval.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []))
    


  var ListRecords2 = this.state.Trackings.map((rest) => (
    rest.Date.includes(date) && rest.Session==this.state.SessionList &&
    rest.ArztId ==   this.state.Arzte.map((arzt)=>(arzt.id)) &&
    (rest.start == this.state.Pflege ||  rest.end == this.state.Pflege) ? (
      rest.SessionTime
      ): null
  ))

  ListRecords2 = ListRecords2.filter( Boolean );

      console.warn('records2', ListRecords2)

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

    SwipeDate(value){

      var day = new Date(this.state.selectedDate).getDate()
    var month = new Date(this.state.selectedDate).getMonth() + 1; //Current Month
    var year = new Date(this.state.selectedDate).getFullYear(); //Current Year
    

    if (value == 'Right'){
      const actualday = day - 1
      var date = year+ '/' + month + '/' + actualday
      const mo = new Date(date)
      var day2 = new Date(mo).getDate()
    var month2 = new Date(mo).getMonth() + 1; //Current Month
    var year2 = new Date(mo).getFullYear();
    var date2 = year2+ '/' + month2 + '/' + day2
    console.warn('Date', date2)
    this.setState({selectedDate: date2})
    this.SessionTimeChange2(date2)

    } else if(value == 'Left'){
      const actualday = day + 1
      var date = year+ '/' + month + '/' + actualday
      const mo = new Date(date)
      var day2 = new Date(mo).getDate()
    var month2 = new Date(mo).getMonth() + 1; //Current Month
    var year2 = new Date(mo).getFullYear();
    var date2 = year2+ '/' + month2 + '/' + day2
    console.warn('Date', date2)
    this.setState({selectedDate: date2})
    this.SessionTimeChange2(date2)

    }

    }

    onSwipePerformed = (action) => {
      /// action : 'left' for left swipe
      /// action : 'right' for right swipe
      /// action : 'up' for up swipe
      /// action : 'down' for down swipe
  
      //console.warn('Action',action)
      
      if (action == "left"){

        this.SwipeDate('Left')

      }else if (action == "right"){

        this.SwipeDate('Right')

      } else {
        null
      }
    }

      
  render() {
    console.warn('SESS', this.state.Pflege)

    console.warn('SETS', this.state.set1A, this.state.set1B,
                         this.state.set2A, this.state.set2B,
                         this.state.set3A, this.state.set3B,
                         this.state.set4A, this.state.set4B)


    const { Record, SessionList, PflegeheimN, Extra, Kette, TypValue, patientId, client } = this.state;

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


    return (
           <>
           <Block flex center style={styles.home}>

           {!this.state.showEintrag &&
           <>
           <Text>Woher kommst du?</Text>
           <Button onPress = {() => this.Start('Zuhause')}>von Zuhause</Button>
           <Button onPress = {() => this.Start('Pflegeheim')}>vom Pflegeheim</Button>
           <Button onPress = {() => this.Start('Praxis')}>Bin in der Praxis</Button>
           </>
           }

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
          

           {this.state.showLeistung &&
            <>
            {this.state.pass=="Pflegeheim" &&
            <Button onPress={()=>this.showorigin()}>Du kommst aus {this.state.PflegeheimN} (Ändern)</Button>
            }
            {this.state.pass=="Zuhause" &&
            <Button onPress={()=>this.showorigin()}>Du kommst von Zuhause (Ändern)</Button>
            }
            {this.state.pass=='Praxis' &&
            <Button onPress={()=>this.showorigin()}>Du bist in der Praxis (Ändern)</Button>
            }
            <Card.Content style={{backgroundColor: '#ffffff', width: width}}>
                <Title style={{ alignSelf: 'right' }}>{this.state.SessionList+ " " + this.state.ListRecords}</Title>
                {this.state.Session && <><Button 
                                         style={{ alignSelf: 'right' }}
                                         onPress={ () => this.setState({ Session: false })}>
                                           Session Ändern</Button></>}

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


              <Card.Content style={{backgroundColor: '#ffffff', width: width}}>
              <CalendarStrip
                    isChinese = {false}
                    showWeekNumber
                    showChineseLunar = {false}
                    selectedDate={
                      this.state.selectedDate
                    }
                    onPressDate={(date) => {
                      this.setState({ selectedDate: date });
                      this.SessionTimeChange2(date)
                    }}
                    onPressGoToday={(today) => {
                      this.setState({ selectedDate: today });
                      this.SessionTimeChange2(today)
                      console.warn('today', today)
                    }}
                    onSwipeDown={() => {
                      //alert('onSwipeDown');
                    }}
                    markedDate={this.state.Dates}
                    weekStartsOn={0} // 0,1,2,3,4,5,6 for S M T W T F S, defaults to 0
                  />
                  <DataTable.Header>
                  <DataTable.Title >{"Zahn"}</DataTable.Title>
                  <DataTable.Title style={{ right: 28}}>Eintrag</DataTable.Title>
                </DataTable.Header>
              </Card.Content>

           <ScrollView sytle={{flex: 1, width: width}}>
           <Card onPress = {() => (null)} sytle={{flex: 1, width: width}}>
              <ScrollView sytle={{flex: 1, width: width}}>
              <TouchableWipe gestureStyle={styles.swipesGestureContainer} 
            onSwipePerformed={this.onSwipePerformed}>
              <Card.Content sytle={{flex: 1, width: width}}>
              
                  <ListEintraege parts="Leistungen" selectedDate={this.state.selectedDate} pass={this.state.pass} ListRecords={this.state.ListRecords} patientId={patientId} PflegeheimN={this.state.PflegeheimN} navigation = {this.props.navigation} />
                 
        </Card.Content>

        <Card.Actions style={{alignItems:'center'}}>
                <>
           {/* counts */}

           {
            this.state.set1A == '7810' &&
            <Text style={{ width: 60, alignSelf: 'center' }}>{this.state.set1A+ '(' + this.state.count1A + ')'}</Text>
          }
          {
            this.state.set1B == '7811' &&
            <Text style={{ width: 60, alignSelf: 'center' }}>{this.state.set1B+ '(' + this.state.count1B + ')'}</Text>
          }

           {
            this.state.set2A == '7820' &&
            <Text style={{ width: 60, alignSelf: 'center' }}>{this.state.set2A+ '(' + this.state.count2A + ')'}</Text>
          }
          {
            this.state.set2B == '7821' &&
            <Text style={{ width: 60, alignSelf: 'center' }}>{this.state.set2B+ '(' + this.state.count2B + ')'}</Text>
          }

           {
            this.state.set3A == '7830' &&
            <Text style={{ width: 60, alignSelf: 'center' }}>{this.state.set3A+ '(' + this.state.count3A + ')'}</Text>
          }
          {
            this.state.set3B == '7831' &&
            <Text style={{ width: 60, alignSelf: 'center' }}>{this.state.set3B+ '(' + this.state.count3B + ')'}</Text>
          }

           {
             this.state.set4A == '7840' &&
             <Text style={{ width: 60, alignSelf: 'center' }}>{this.state.set4A+ '(' + this.state.count4A + ')'}</Text>
           }
           {
             this.state.set4B == '7841' &&
             <Text style={{ width: 60, alignSelf: 'center' }}>{this.state.set4B+ '(' + this.state.count4B + ')'}</Text>
           }

           {/* counts */}
           </>
                </Card.Actions>

        </TouchableWipe>

               
                </ScrollView>
            </Card>
            </ScrollView>

            

            <Provider>
           <Portal>
            <FAB.Group
                               open={this.state.isModalVisible}
                               icon={this.state.isModalVisible ? 'remove' : 'add'}
                               actions={[
                                 { icon: 'send', label: 'Eintrag', onPress: () =>  this.props.navigation.push('AddEintrag', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords}) },
                                 { icon: 'list', label: 'Leistungskette', onPress: () => this.props.navigation.push('AddKette', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})},
                                 { icon: 'mic', label: "Audio Aufnahme", onPress: () => this.props.navigation.push('AddAudio', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})},
                                 { icon: 'image', label: 'Gallery', onPress: () => this.props.navigation.push('AddBild', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})},
                                // { icon: 'image', label: 'Gallery mit Eintrag', onPress: () => this.showEintragGallary()},
                                 { icon: 'camera', label: 'Camera', onPress: () => this.props.navigation.push('AddCamera', {patientId: this.props.navigation.state.params.patientId, client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.state.PflegeheimN, pass: this.state.pass, selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})},
                                 //{ icon: 'camera', label: 'Camera mit Eintrag', onPress: () => this.showEintragCam()},
                               ]}
                               onStateChange={({ open }) => this.setState({ open })}
                               onPress={() => this.toggleModal()}
                             />


{/* <FAB.Group
                               open={this.state.isModalVisible}
                               icon={this.state.isModalVisible ? 'remove' : 'add'}
                               actions={[
                                 { icon: 'send', label: 'Eintrag', onPress: () => this.showEintrag()},
                                 { icon: 'list', label: 'Leistungskette', onPress: () => this.showLeistungskette()},
                                 { icon: 'mic', label: this.state.recording ? "Audio Aufnahme Stoppen" : "Audio Aufnahme Starten", onPress: () => this.onPress()},
                                 { icon: 'image', label: 'Gallery', onPress: () => this._pickImage()},
                                // { icon: 'image', label: 'Gallery mit Eintrag', onPress: () => this.showEintragGallary()},
                                 { icon: 'camera', label: 'Camera', onPress: () => this._pickImagecam()},
                                 //{ icon: 'camera', label: 'Camera mit Eintrag', onPress: () => this.showEintragCam()},
                               ]}
                               onStateChange={({ open }) => this.setState({ open })}
                               onPress={() => this.toggleModal()}
                             /> */}
             </Portal>
             </Provider>
             </>
               }

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
    fab: {
      position: 'absolute',
      right: width * 0.9,
    },
    fab2: {
      position: 'absolute',
      left: width/2.3,
      bottom: -50,
    },
    card: {
      position: 'absolute',
      alignItems: 'center',
      marginTop: 80,
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    swipesGestureContainer:{
      height:'100%',
      width:'100%'
     },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    contentBody: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    parent: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
  child: {
      flexBasis: '50%',
      justifyContent: 'center',
      alignItems: 'center'
  },
    contentBody2: {
      justifyContent: 'center',
      alignItems: 'center',
      left: width /3.4,
      marginBottom: 12,
      width: 150
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
  });