import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, StyleSheet, FlatList } from 'react-native';
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
import aws_exports from '../../../../../aws-exports'
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';

import gql from 'graphql-tag';
import { buildMutation } from 'aws-appsync';

const { width } = Dimensions.get('screen');

const initialState = {
    patient: "",
    Record: " ",
    image: [],
    audio: "",
    audio: File,
    displayimage: false,
    accessed: false,
    nav: '' ,
    patientId: "" ,
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
    Pflegeheim:"" ,
    pass:"",
    PflegeheimN:"",
    Distanz:[],
    Arzt:"",
    results:[],
    selectedDate:'',
    ListRecords:'',
     SessionList:'',
     Volgebehandlung:'',
     Volgebehandlung2:'',
     showVolgebehandlung:false,
};

export default class AddKette extends React.Component {

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
      var hour = new Date().getHours()
      var min = new Date().getMinutes()
      var time = hour + ":" + min
      
            this.setState({ SessionList: SessionList });
            this.setState({ ListRecords: time });
    } else {
      this.setState({ SessionList: SessionList });
      this.setState({ ListRecords: ListRecords });
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

const leistungsquery = await API.graphql(graphqlOperation(queries.listLeistungsKettes))
    this.setState({Kettendata: leistungsquery.data.listLeistungsKettes.items})
  
}

handleChange2 = event => {
  this.setState({ Kette: event.target.value });
  this.ListLeistungen().then(()=> this.setState({accessed: true}));
};

List() {
console.warn("in")
this.ListLeistungen()
.catch(err => console.warn("err",err))
.then(()=> this.setState({accessed: true}));
}

ListLeistungen = async () => {
    
  const behandlungsquery = await API.graphql(graphqlOperation(queries.listBehandlungens))

  var ListPatient = behandlungsquery.data.listBehandlungens.items.map((rest) => (
    rest.Kette.includes(this.state.Kette) ? (
     rest
     ): null
 ))

 ListPatient = ListPatient.filter( Boolean );
 this.setState({Behandlung: ListPatient})

 var ListPatient2 = behandlungsquery.data.listBehandlungens.items.map((rest) => (
  rest.Volgebehandlung == 'Volgebehandlung' ? (
    rest.name
    ): null
))

ListPatient2 = ListPatient2.filter( Boolean );

  if(behandlungsquery.data.listBehandlungens.items.map((rest) => (rest.Volgebehandlung)).includes('Volgebehandlung'))
  {
    this.setState({Volgebehandlung: ListPatient2})
    this.setState({Volgebehandlung2: 'Volgebehandlung'})
  }else {
    this.setState({Volgebehandlung: ''})
  }
  
  
  // if(this.state.Kette)
  // this.setState({Behandlungshow: true})
 const Abbrech = this.state.Behandlung.map((rest)=>(
   rest.name,
  rest.Kuerzel,
  rest.abrechnungsnummerprivat,
  rest.abrechnungsnummergesaetzlich,
   rest.Patient
 ))

  this.setState({inhalt: Abbrech})
  console.warn("state2", this.state.Kette)
  }


  AddToList (){
    if(this.state.Extra == "" || this.state.Extra == " " || this.state.Extra == null){
        null
    } else{
    var newArray = this.state.ExtraBehandlungen.slice();    
    newArray.push(this.state.Extra);   
    this.setState({ExtraBehandlungen : newArray})
    console.warn("hello value", this.state.ExtraBehandlungen)
    this.setState({ Extra: "" })
    }
  };

  Privat = async (value) => {
    
    var ListRecords = this.state.Kettendata.map((rest) => (
        value == 'Privat' && rest.Typ == 'Privat' ? (
          rest
          ): (
              null
          )
      ))

      ListRecords = ListRecords.filter( Boolean );

      this.setState({
        Kettendata:  ListRecords
      })

      this.setState({
        showfilteredkette:  true
      })

      this.setState({
        eintragLeistung:  false
      })
  }

  Gesetz = async (value) => {
    
    var ListRecords = this.state.Kettendata.map((rest) => (
        value == 'Gesetz' && rest.Typ == 'Gesetzlich' ? (
          rest
          ): (
              null
          )
      ))

      ListRecords = ListRecords.filter( Boolean );

      this.setState({
        Kettendata:  ListRecords
      })

      this.setState({
        showfilteredkette:  true
      })

      this.setState({
        eintragLeistung:  false
      })
  }

  ClearBehandlungen = async (value) => {
    
    var ListRecords = this.state.Behandlung.map((rest) => (
        rest.name.includes(value) ? (
            null
          ): (
              rest
          )
      ))

      ListRecords = ListRecords.filter( Boolean );

      this.setState({
        Behandlung:  ListRecords
      })

}

ClearExtraBehandlungen = async (value) => {
    
    var ListRecords = this.state.ExtraBehandlungen.map((rest) => (
        rest.includes(value) ? (
            null
          ): (
              rest
          )
      ))

      ListRecords = ListRecords.filter( Boolean );

      this.setState({
        ExtraBehandlungen:  ListRecords
      })

}

toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible });
  };


  Batch(){
    // console.warn('Behand', this.state.Behandlung)
    // consoleBatch.warn('ExtraBehand', this.state.ExtraBehandlungen)
    const Kette = this.state.Kettendata.map((rest, i) => (rest.Name))
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
    
    if (this.state.Behandlung != "" && this.state.ExtraBehandlungen != "" ){
    
    const Behand = this.state.Behandlung.map((rest, i) => (
                                                              {record: rest.name, patient: this.state.patientId,
                                                                Access: "none", abrechnungsnummerprivat: rest.abrechnungsnummerprivat,
                                                                abrechnungsnummergesaetzlich: rest.abrechnungsnummergesaetzlich,
                                                                Leistungskette: Kette[0], file, audio,
                                                                datum: this.state.selectedDate, Session: this.state.SessionList, SessionTime: this.state.ListRecords}
                                                          ))
     var ExtraBehand = this.state.ExtraBehandlungen.map((behand, i) => (
                                                                      {record: behand, patient: this.state.patientId,
                                                                        Access: "none", abrechnungsnummerprivat: "-",
                                                                        abrechnungsnummergesaetzlich: "-",
                                                                        Leistungskette: Kette[0], file, audio,
                                                                        datum: this.state.selectedDate, Session: this.state.SessionList, SessionTime: this.state.ListRecords}
                                                                    ))
    
    var newArray = Behand.slice();    
            ExtraBehand.forEach(function(element) {newArray.push(element);});
    
    this.setState({ BatchKette: newArray });
    
    // console.warn('Behandsoo', Bond)
    // console.warn('Behandsoo2', Bass)
    console.warn('Behandsoo3', Behand)
    console.warn('muai')
    console.warn('muchos', newArray)
    } else if(this.state.Behandlung == "" && this.state.ExtraBehandlungen == ""){
    console.warn('welldone')
    } else if(this.state.Behandlung != "" && this.state.ExtraBehandlungen == ""){
    
    const Behand = [this.state.Behandlung.map((rest, i) => (
                                                              {record: rest.name, patient: this.state.patientId,
                                                                Access: "none", abrechnungsnummerprivat: rest.abrechnungsnummerprivat,
                                                                abrechnungsnummergesaetzlich: rest.abrechnungsnummergesaetzlich,
                                                                Leistungskette: Kette[0], file, audio,
                                                                datum: this.state.selectedDate, Session: this.state.SessionList, SessionTime: this.state.ListRecords}
                                                          ))]
      const Bass = Behand[0]
      const Bond = Bass[0]
    
      this.setState({ BatchKette: Bass });
      console.warn('Behandsoo', Bond)
      console.warn('Behandsoo2', Bass)
      console.warn('Behandsoo3', Behand)
    console.warn('well')
    } else if(this.state.Behandlung == "" && this.state.ExtraBehandlungen != ""){
    
    const Behand = [this.state.ExtraBehandlungen.map((behand, i) => (
      {record: behand, patient: this.state.patientId,
        Access: "none", abrechnungsnummerprivat: "-",
        abrechnungsnummergesaetzlich: "-",
        Leistungskette: Kette[0], file, audio,
        datum: this.state.selectedDate, Session: this.state.SessionList, SessionTime: this.state.ListRecords}
    ))]
    const Bass = Behand[0]
    const Bond = Bass[0]
    
    this.setState({ BatchKette: Bass });
    
    console.warn('Behandsoo', Bond)
    console.warn('Behandsoo2', Bass)
    console.warn('Behandsoo3', Behand)
    console.warn('done')
    }
    }

    BatchaddRecords = async () => {

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
    
    
      var rec ={
        record: "DEL", 
        patient: "DEL",
        Access: "DEL",
        abrechnungsnummerprivat: "DEL",
        abrechnungsnummergesaetzlich: "DEL",
        Leistungskette: "DEL",
         file, 
         audio,
         datum: "DEL",
         Session:"Session1",
         SessionTime:"11:00"
      }  
    
    var record2 = this.state.BatchKette;
    
    var record = [
    { record: 'max'},
    { record: 'carlos'},
    { record: 'jango'},
    ];
    
    console.warn('result', record)
    console.warn('result2', record2)
    
    const result = await API.graphql(graphqlOperation(mutations.createRecords2, {records: record2}))
    const result2 = await API.graphql(graphqlOperation(createRecords, {input: rec}))
    console.warn('result3', result.data.createRecords2.id)
    console.warn('result4', result.data.createRecords2.map((rest)=> rest.id))
    this.setState({results: result.data.createRecords2.map((rest)=> rest.id)})
   // this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId})
    }
    
    BatchProcess() {
    
    API.graphql(graphqlOperation(queries.listArzts2))
    .then(()=> this.Batch())
    .then(()=> this.BatchaddRecords())
    
    }

    both = async () => {

      console.warn("161912191", this.state.results)


      API.graphql(graphqlOperation(queries.listArzts2))
      .then(()=> this.Batch())
      .then(()=> this.BatchaddRecords())
      .catch((err)=> console.warn('err1', err))
      .then(()=> this.Tracking())
      .catch((err)=> console.warn('err12', err))
      .then(()=> this.EndCheck())
  
      }

    Tracking = async () => {
      const {results} = this.state;
      console.warn('hel')
      console.warn('Arzt', this.state.Arzt)
      const Arztu =this.state.Arzt.map((rest)=>( rest.username))
      console.warn('Arzt', Arztu)
      console.warn('pass', this.state.pass)

      console.warn("ressssss", this.state.results)
      
    
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
                     Leistung: '-',
                     ids: this.state.results}
                 ))
                 console.warn('Track', Track)

                 const Tracks = Track[0]
                 console.warn('Distanz', ListPatient, 'Zuhause', Tracks)
       
                 const result = await API.graphql(graphqlOperation(mutations2.createTracking, {input: Tracks}))
                
      
                 
                   
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
        console.warn('Distanz', ListPatient, 'Pflegeheim')

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
            Leistung: '-',
            ids: this.state.results }
        ))
        console.warn('Track', Track)

        const Tracks = Track[0]

        const result = await API.graphql(graphqlOperation(mutations2.createTracking, {input: Tracks}))
        console.log( "success", result )

          
      } else if( this.state.pass == 'Praxis'){
        
        
        this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId,
          client: this.props.navigation.state.params.client,
          Pflegeheim: this.state.Pflegeheim,
          PflegeheimN: this.state.PflegeheimN,
          pass: this.props.navigation.state.params.pass,
          selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords})
    
      } 
      
      }

      EndCheck(){
        console.warn('4me',this.state.Volgebehandlung)
        if(this.state.Volgebehandlung2 == 'Volgebehandlung'){
          console.warn('2me')
          this.setState({ showVolgebehandlung: true });

        } else {
          console.warn('3me')
          this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId,
            client: this.props.navigation.state.params.client,
            Pflegeheim: this.state.Pflegeheim,
            PflegeheimN: this.state.PflegeheimN,
            pass: this.props.navigation.state.params.pass,
            selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords,
            Leistungsname:this.state.Volgebehandlung})
        }
      }

      Finish(value){
        if(value == 'Ja'){
          this.props.navigation.push('AddVolgebehandlung', {patientId: this.props.navigation.state.params.patientId,
            client: this.props.navigation.state.params.client,
            Pflegeheim: this.state.Pflegeheim,
            PflegeheimN: this.state.PflegeheimN,
            pass: this.props.navigation.state.params.pass,
            selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords,
            Leistungsname:this.state.Volgebehandlung})

        } else {
          this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId,
            client: this.props.navigation.state.params.client,
            Pflegeheim: this.state.Pflegeheim,
            PflegeheimN: this.state.PflegeheimN,
            pass: this.props.navigation.state.params.pass,
            selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords,
            Leistungsname:this.state.Volgebehandlung})
        }
      }
      
  render() {
    const { Record, Extra, Kette, TypValue, patientId } = this.state;
            
    console.warn("Leistungen", this.state.Kettendata)
    console.warn("Leistungen", this.state.showVolgebehandlung)
        let Kettendatas = [
            ...this.state.Kettendata.map((rest, i) => (
              {
               value: ' ',
               value: rest.Name 
              }
            ))
          ];
          let TypVals = [
            {
             value: 'Dokumentation',
            }
        ];
    return (
           <>
           <Block flex center style={styles.home}>
           <>
           <Card.Content
            style={{ width: width, backgroundColor: '#FEFDFD'}}>
           {this.state.showVolgebehandlung == true?(
               <>
               <Text style={{alignSelf:'center'}} >Es gibt Volgebehandlungen willst du sie anlegen?</Text>
               <Button 
                mode="outlined" 
                style={styles.contentBody2} 
                onPress={() => this.Finish('Ja')}>
                Ja
                </Button>
                <Button  
                mode="outlined" 
                style={styles.contentBody2} 
                onPress={() => this.Finish('Nein')}>
                Nein
                </Button>
               </>):(null)
              }
              </Card.Content>

       <KeyboardAwareScrollView
            contentContainerStyle={{ width: width, backgroundColor: '#FEFDFD'}}
            scrollEnabled={true}
            enableResetScrollToCoords= {false}
            enableAutomaticScroll
            extraScrollHeight= {150}
            innerRef={ref => {
              this.scroll = ref
            }}
            keyboardDismissMode='on-drag'
            >
              
              {this.state.showVolgebehandlung == false?(
              <>
          {this.state.showfilteredkette == false?(
           <>
               <Button 
                icon="send" 
                mode="outlined" 
                style={styles.contentBody2} 
                onPress={() => this.Gesetz('Gesetz')}>
                GOZ-Leistungsketten
                </Button>
                <Button 
                icon="send" 
                mode="outlined" 
                style={styles.contentBody2} 
                onPress={() => this.Privat('Privat')}>
                Bema-Leistungsketten
                </Button>
              </>):(null)}

          {this.state.showfilteredkette &&
           <>
            <Dropdown
                label='Kette'
                value={Kette}
                style={{ width: 60 }}
                onChangeText={ (Kette) => { 
                                            this.setState({ Kette })
                                            this.List()
                                          } }
                data={Kettendatas}
                />
                {/* <Dropdown
                label='Typ'
                value={TypValue}
                style={{ width: 60 }}
                onChangeText={ (TypValue) => this.setState({ TypValue }) }
                data={TypVals}
                /> */}
  
                  <HelperText
                  type="error"
                  visible={false}
                  ></HelperText>
                
                <Headline style={{ alignSelf: 'center' }}>Leistungen</Headline>

                <View style={styles.parent}>

                { this.state.ExtraBehandlungen.map((behand, i) => ( 
                <FlatList
                data={[{key: behand}]}
                numColumns={2}
                horizontal={false}
                renderItem={({item}) => 
                                        <>
                                        <Card style={styles.child}>
                                          <Card.Content style={styles.container}>
                                                <>
                                                <Text>{item.key}</Text>
                                                <Icon 
                                              onPress={() => this.ClearExtraBehandlungen(item.key)} 
                                              name="close" 
                                              //style={{ left: 200 }}
                                              size={20}/>
                                                </> 
                                            </Card.Content>
                                            </Card>
                                        </>}
              >
              </FlatList>
                  ))}
  
                {this.state.Behandlung.map((rest, i) => (  
                  <FlatList
                  data={[{key: rest.name}]}
                  numColumns={2}
                  horizontal={false}
                  renderItem={({item}) => 
                                          <>
                                          <Card style={styles.child}>
                                            <Card.Content style={styles.container}>
                                                  <>
                                                  <Text>{item.key}</Text>
                                                  <Icon 
                                                onPress={() => this.ClearBehandlungen(item.key)} 
                                                name="close" 
                                                //style={{ left: 200 }}
                                                size={20}/>
                                                  </> 
                                              </Card.Content>
                                              </Card>
                                          </>}
                >

                </FlatList>
                  ))}
                  </View>

               <TextInput          
                style={{ backgroundColor: '#fafafa', alignSelf: 'center', borderRadius: 50, width: width * 0.9}}
                label="Eintrag"
                multiline
                mode='outlined'
                value= {Extra}
                onChangeText={ (Extra) => this.setState({ Extra }) }
                /> 
                <HelperText
            type="error"
            visible={false}/>
                <Button 
                icon="send" 
                mode="outlined" 
                style={styles.contentBody2} 
                onPress={() => this.AddToList()}
                >
                Hinzufügen
                </Button>

                <Button 
                icon="send" 
                mode="outlined" 
                style={styles.contentBody2} 
                onPress={() => this.both()}
                >
                Fertig
                </Button>
              </>
            }
            </>):(null)
              }
            </KeyboardAwareScrollView>
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