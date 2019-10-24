import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, Image, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import * as Permissions from 'expo-permissions';
import {Button} from 'react-native-paper';
import { API, Storage, Auth, graphqlOperation }  from "aws-amplify";
import * as FileSystem from 'expo-file-system';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import * as mutations2 from '../../../../graphql/mutations2';
import { createRecords } from '../../../../graphql/mutations';
import aws_exports from '../../../../../aws-exports'
import { Dropdown } from 'react-native-material-dropdown';
import { Audio } from 'expo-av';
const { width } = Dimensions.get('screen');


export default class AddAudio extends React.Component {

    state = {
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
        pass: '',
        Pflegeheimes: [],
        PflegeheimN:'',
        today:'',
        month:'',
        yearh:'',
        selectedDate:'',
        Currentdate:'',
       Dates: [],
        hasCameraPermission: null,
    hasRecordPermission: null,
    hasRollPermission: null,
    halPlayRecordPermission: null,
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
    SessionList:  '',
    Sessions:[],
    ListRecords:[],
    RecordsList:[],
    Sessions:[],
    Trackings:[],
    Patienten:[],
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
                                 }

    
                                 
addAudio = async () => {

    const audioData = await this._recordInstance.getURI()
    const F1 = await FileSystem.getInfoAsync(this._recordInstance.getURI());
    const response = await fetch(F1.uri);
    const blob = await response.blob();
    console.warn("result1", F1)
    console.warn("result2", response)
    console.warn("result3", blob.type)
    
    var date = new Date().getDate()
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
       
        console.warn("Dates", Date.now(), date)
        console.warn("con", date + '/' + month + '/' + year)
    
    const blobData = blob
    const audioname = audioData.replace(/^.*[\\\/]/, '')
    // console.warn("blobdata", audioData)
    // console.warn("blobdata1", audioname)
    // console.warn("blobdata3", blobData)
    
    try{
     const visibility = "public";
     const {identityId} = Auth.currentCredentials()
     const filed = blobData;
     const filename = `/${visibility}/${this.state.patientId}/${Date.now()}-${audioname}`
    
     const uploadedFile = await Storage.put(filename, filed, {
       contentType: blob.type,
     })
    
     console.warn("uploadedFile", uploadedFile)
    
     const audio = {
       key: uploadedFile.key,
       bucket: 'amplifypflegeheimb4f4dd738df84d92a36c5595bc6d52f3-pflegeenv',
       region: aws_exports.aws_project_region
     }
     const file = {
       key: "-",
       bucket: "-",
       region: "-"
     }
     const record = {
       audio,
       file,
       patient: this.state.patientId,
       Access: "none",
       record: " ",
       abrechnungsnummerprivat: "-",
       abrechnungsnummergesaetzlich: "-",
       Leistungskette: "-",
       datum: this.state.selectedDate, 
       Session: this.state.SessionList, 
       SessionTime: this.state.ListRecords
     }
     const result = await API.graphql(graphqlOperation(createRecords, {input: record}))
     console.log( "success", result )
     this.setState({ results: result.data.createRecords.id });
    } catch(err) {
     console.warn('Error adding Record', err)
    }
    }
    
    handleChange = record => event => {
    this.setState({
      [record]: event.target.value,
    });
    };
    
    _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
    };
    
    onPress () {
      this.askForPermission()
      .then(() => this.stop() )
      .catch((err)=> console.warn('err14', err))
      .then(() => this.addAudio() )
      .catch((err)=> console.warn('err15', err))
      .then(()=> this.Tracking())
      .catch((err)=> console.warn('err12', err))
      this.setState({recording: false})
    
    }

    onPress2 () {
        this.setState({recording: true})

          this.askForPermission()
          .then(() => this.start() )
          .catch((err)=> console.warn('err13', err))

         
        
        }
    
    async askForPermission () {
    const permission = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    this.setState({hasPermission: permission.status === 'granted'})
    }
    
    timeRemaining () {
    let {endTime, lastTick} = this.state
    const minutesRemaining = Math.floor((endTime - lastTick) / 1000 / 60)
    const secondsRemaining = Math.round((endTime- lastTick)  / 1000 - minutesRemaining * 60)
    return {minutes: minutesRemaining, seconds: secondsRemaining}
    }
    
    recordingComplete () {
    console.log('recording complete')
    }
    
    stop () {
    this.setState({recording: false}, async () => {
      const x = await this._recordInstance.stopAndUnloadAsync()
      console.warn("meldung4", x)
      console.warn("meldung5", this._recordInstance)
      const imageData = await this._recordInstance.getURI()
      console.warn("meldung6", imageData)
    })
    }
    
    async start () {
    clearInterval(this._timer)
    const currentTime = new Date().getTime()
    const endTime = currentTime + this.state.duration
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      staysActiveInBackground: true,
    })
    
    const recordOptions = Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY;
     recordOptions.ios.outputFormat = Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC;
     recordOptions.ios.extension = '.mp4';
     recordOptions.android.outputFormat = Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4;
     recordOptions.android.extension = '.mp4';
    
    // android: {
      //     extension: '.mp4',
      //     outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      //     audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
      //     sampleRate: 44100,
      //     numberOfChannels: 2,
      //     bitRate: 128000,
      //   },
      //   ios: {
      //     extension: '.mp4',
      //     audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
      //     sampleRate: 44100,
      //     numberOfChannels: 2,
      //     bitRate: 128000,
      //     linearPCMBitDepth: 16,
      //     linearPCMIsBigEndian: false,
      //     linearPCMIsFloat: false,
      //   }, 
    const M = await this._recordInstance.prepareToRecordAsync(recordOptions)
    
    this.setState({
      recording: true,
      endTime,
      lastTick: currentTime
    }, async () => {
      try {
        const k = await this._recordInstance.startAsync()
        console.warn("meldung", k)
        console.warn("meldung2", this._recordInstance)
      } catch (error) {
        console.warn('error', error)
      }
    
      this._timer = setInterval(
        () => {
          const lastTick = new Date().getTime()
          if (lastTick > endTime) {
            this.recordingComplete()
          } else {
            this.setState({lastTick})
          }
        },
        1000
      )
    })
    console.warn("meldung2", M)
    
    }
    
    onRecordingStatusUpdate (status) {
    console.log('recording status', status)
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
                  
              } else if( this.state.pass == 'Praxis'){
                null
            
              } 
              }
      
  render() {

   // { icon: 'mic', label: this.state.recording ? "Audio Aufnahme Stoppen" : "Audio Aufnahme Starten", onPress: () => this.onPress()},


    return (
           <>
           <Block flex center style={styles.home}>
           {!this.state.recording &&
          <Button icon="mic" mode="outlined" style={styles.contentBody2} onPress={()=>this.onPress2()}>
          Audio Aufnahme Starten
            </Button>
           }
           
            {this.state.recording &&
            <Button icon="mic" mode="outlined" style={styles.contentBody2} onPress={()=>this.onPress()}>
          Audio Aufnahme Stoppen 
            </Button>
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
  });