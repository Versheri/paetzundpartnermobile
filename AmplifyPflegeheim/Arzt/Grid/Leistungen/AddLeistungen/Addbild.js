import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, Image, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { TextInput, HelperText, FAB, Button, IconButton, Headline, Dialog, Avatar, Card, Title, Paragraph, Portal, Provider } from 'react-native-paper';
import { API, Storage, Auth, graphqlOperation }  from "aws-amplify";
import * as FileSystem from 'expo-file-system';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import * as mutations2 from '../../../../graphql/mutations2';
import { createRecords } from '../../../../graphql/mutations';
import aws_exports from '../../../../../exports2'
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-material-dropdown';

const { width } = Dimensions.get('screen');

const initialState = {
    patient: "",
    Record: "  ",
    image: [],
    audio: "",
    audio: File,
    hasCameraPermission: null,
    hasRollPermission: null,
    type: Camera.Constants.Type.back,
    showimage: [],
    imagemutation: [],
    displayimage: false,
    accessed: false,
    nav: '' ,
    patientId: "",
    Pflegeheim:"" ,
    pass:"",
    PflegeheimN:"",
    Distanz:[],
    Arzt:"" ,
    results:'',
    selectedDate: '',
    ListRecords:'',
    SessionList:'',
}

export default class AddBild extends React.Component {

    state = {
        ...initialState,
     };

    async  componentDidMount() {

      // const user = await Auth.currentAuthenticatedUser()
      //    this.setState({user}) 
      //    console.warn('user', user)

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
      
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
      patientId != null?(
        this._pickImage()
      ):(null)
      }

      addImageFinal = async () => {
        var pickerResult = this.state.imagemutation
                
        const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
        const access = 'image/jpeg';
        const imageData = await fetch(pickerResult.uri)
        const blobData = await imageData.blob()

        var date = new Date().getDate()
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
   
    console.warn("Dates", Date.now(), date)
    console.warn("con", year+ '-' + month + '-' + date)
        
        console.warn("4", blobData.type)
        console.warn("3", this.state.patientId)
        
        
        try{
        const visibility = "public";
        const {identityId} = Auth.currentCredentials()
        const filed = blobData;
        const filename = `/${visibility}/${this.state.patientId}/${Date.now()}-${imageName}`
        
        const uploadedFile = await Storage.put(filename, filed, {
          contentType: blobData.type,
        
        })
        
        console.warn("uploadedFile", uploadedFile)
        
        const file = {
          key: uploadedFile.key,
          bucket: 'amplifypflegeheimb4f4dd738df84d92a36c5595bc6d52f3-pflegeenv',
          region: aws_exports.aws_project_region
        }
        
        console.warn("6", file)
        
        const audio = {
          key: "-",
          bucket: "-",
          region: "-"
        }
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
        } catch(err) {
        console.warn('Error adding Record', err)
        }
        
        }

    _pickImage = async () => {
        this.setState({ showimage: [] });
        const {
          status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPerm === 'granted') {
          let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            mediaTypes: 'Images',
          });
          this.addImage(pickerResult) 
          .catch(err => console.log("error",err));
        }
        
        };

        addImage = async (pickerResult) => {
        
            const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
            const access = 'image/jpeg';
            const imageData = await fetch(pickerResult.uri)
            
            const blobData = await imageData.blob()
            
            console.warn("worked", imageData.url)
            
            this.setState({ showimage: imageData.url });
            this.setState({ displayimage: true });
            this.setState({ imagemutation: pickerResult });
            
            }

            both = async () => {
              API.graphql(graphqlOperation(queries.listArzts2))
              .then(()=> this.addImageFinal())
              .catch((err)=> console.warn('err1', err))
              .then(()=> this.Tracking())
              .catch((err)=> console.warn('err12', err))
              .then(()=> {this.setState({ ...initialState })
              this.setState({ imagemutation: [] })
              this.setState({ showimage: [] })})
          
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
                         console.warn('Track', Track)
        
                         const Tracks = Track[0]

                         console.warn('Tracks', Tracks)
               
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
                      <Image source={{uri:this.state.showimage}} style={{ width: 50, height: 50, alignSelf: 'center'}}/>
          <HelperText
          type="error"
          visible={false}/>
          <Button icon="image" mode="outlined" style={styles.contentBody2} onPress={this.both}>
              Eintragen
              </Button>
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