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
import {
  Slider,
  TouchableHighlight,
} from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

const ICON_RECORD_BUTTON = new Icon(require('../../../../../assets/images/record_button.png'), 70, 119);
const ICON_RECORDING = new Icon(require('../../../../../assets/images/record_icon.png'), 20, 14);


const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFF8ED';
const LIVE_COLOR = '#FF0000';
const DISABLED_OPACITY = 0.5;


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

     constructor(props) {
      super(props);
      this.recording = null;
      this.sound = null;
      this.isSeeking = false;
      this.shouldPlayAtEndOfSeek = false;
      this.state = {
        haveRecordingPermissions: false,
        isLoading: false,
        isPlaybackAllowed: false,
        muted: false,
        soundPosition: null,
        soundDuration: null,
        recordingDuration: null,
        shouldPlay: false,
        isPlaying: false,
        isRecording: false,
        fontLoaded: false,
        shouldCorrectPitch: true,
        volume: 1.0,
        rate: 1.0,
      };
      this.recordingSettings = JSON.parse(JSON.stringify( Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY));
       // // UNCOMMENT THIS TO TEST maxFileSize:
      // this.recordingSettings.android['maxFileSize'] = 12000;
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

      this._askForPermissions();
                                 }

   
  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
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

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    this.recordingSettings.ios.outputFormat = Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC;
     this.recordingSettings.ios.extension = '.mp4';
     this.recordingSettings.android.outputFormat = Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4;
     this.recordingSettings.android.extension = '.mp4';
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());


    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    console.warn(`FILE INFO: ${JSON.stringify(info)}`);


    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound, status } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });

    this.both();
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };



  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration != null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

    
                                 
addAudio = async () => {

    const audioData = await this.recording.getURI()
    const F1 = await FileSystem.getInfoAsync(this.recording.getURI());
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
    
    
    

            both = async () => {
              API.graphql(graphqlOperation(queries.listArzts2))
              .then(()=> this.addAudio())
              .catch((err)=> console.warn('err12', err))
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

            <View style={styles.recordingDataContainer}>
            <Text>
              {this.state.isRecording ? ' ' : ''}
            </Text>
            <View style={styles.recordingDataRowContainer}>
              <Image
                style={[styles.image, { opacity: this.state.isRecording ? 1.0 : 0.0 }]}
                source={ICON_RECORDING.module}
              />
              <Text style={[styles.recordingTimestamp]}>
                {this._getRecordingTimestamp()}
              </Text>
            </View>
            </View>


            {!this.state.recording &&
           <Button icon="mic" mode="outlined" style={styles.contentBody2} 
           onPress={this._onRecordPressed}
           disabled={this.state.isLoading}>
           Audio Aufnahme Starten
             </Button>
            }
           
             {this.state.recording &&
             <Button icon="mic" mode="outlined" style={styles.contentBody2} 
             onPress={this._onRecordPressed}
             disabled={this.state.isLoading}>
           Audio Aufnahme Stoppen 
             </Button>
             }
            </Block>
            </>
     );
    
  }
}
  
const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
    minHeight: DEVICE_HEIGHT,
    maxHeight: DEVICE_HEIGHT,
  },
  noPermissionsText: {
    textAlign: 'center',
  },
  wrapper: {},
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: DEVICE_HEIGHT / 2.0,
    maxHeight: DEVICE_HEIGHT / 2.0,
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_RECORD_BUTTON.height,
    maxHeight: ICON_RECORD_BUTTON.height,
  },
  recordingDataContainer: {
    alignItems: 'center',
    marginTop:20,
  },
  recordingDataRowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: ICON_RECORDING.height,
    maxHeight: ICON_RECORDING.height,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  liveText: {
    color: LIVE_COLOR,
  },
  recordingTimestamp: {
    paddingLeft: 20,
  },
  playbackTimestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  image: {
    backgroundColor: BACKGROUND_COLOR,
  },
  textButton: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 10,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: 5
  },
  buttonsContainerBottomRow: {
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
  },
  rateSlider: {
    width: DEVICE_WIDTH / 2.0,
  },
    home: {
      width: width,    
    },
    articles: {
      width: width - theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE,
    },
    contentBody2: {
     marginTop:40
    },
  });