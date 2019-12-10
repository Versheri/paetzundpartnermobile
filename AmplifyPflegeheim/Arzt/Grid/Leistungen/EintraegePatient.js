import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, StyleSheet, Image, TouchableOpacity, Alert, FlatList  } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import { API, Storage, Auth, graphqlOperation }  from "aws-amplify";
import aws_exports from '../../../../exports2'
import {createRecords} from '../../../graphql/mutations';
import { TextInput, HelperText, FAB, Button, IconButton, Headline, Dialog, Avatar, Card, Title, Paragraph, Portal, Provider } from 'react-native-paper';
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
import Icon from 'react-native-vector-icons/AntDesign';
import * as subscriptions from '../../../graphql/subscriptions';

const { width } = Dimensions.get('screen');


const initialState = {
    patient: "",
    Record: " ",
    image: [],
    audio: "",
    open: false,
    audio: File,
    isModalVisible: false
  };

export default class Eintrage extends React.Component {

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
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    const {  permissions } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasRecordPermission: permissions === 'granted' });

    const leistungsquery = await API.graphql(graphqlOperation(queries.listLeistungsKettes))
        this.setState({Kettendata: leistungsquery.data.listLeistungsKettes.items})
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

  addImageFinal = async () => {
    var pickerResult = this.state.imagemutation
            
    const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
    const access = 'image/jpeg';
    const imageData = await fetch(pickerResult.uri)
    const blobData = await imageData.blob()

    console.warn("4", blobData.type)
    console.warn("3", this.props.patientId)
    

  try{
    const visibility = "public";
    const {identityId} = Auth.currentCredentials()
    const filed = blobData;
    const filename = `/${visibility}/${this.props.patientId}/${Date.now()}-${imageName}`
  
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
        patient: this.props.patientId,
        Access: "none",
        abrechnungsnummerprivat: "-",
        abrechnungsnummergesaetzlich: "-",
        Leistungskette: "-",
    }
    const result = await API.graphql(graphqlOperation(createRecords, {input: record}))
    this.setState({ ...initialState })
  } catch(err) {
    console.warn('Error adding Record', err)
  }

  this.close();
  this.setState({ ...initialState })

  this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ bild: false });
  this.setState({ cam: false });
  this.setState({ close: false });

}

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

addAudio = async () => {

  const audioData = await this._recordInstance.getURI()
  const F1 = await FileSystem.getInfoAsync(this._recordInstance.getURI());
    const response = await fetch(F1.uri);
    const blob = await response.blob();
    console.warn("result1", F1)
    console.warn("result2", response)
    console.warn("result3", blob.type)

    const blobData = blob
    const audioname = audioData.replace(/^.*[\\\/]/, '')
    // console.warn("blobdata", audioData)
    // console.warn("blobdata1", audioname)
    // console.warn("blobdata3", blobData)

   try{
     const visibility = "public";
     const {identityId} = Auth.currentCredentials()
     const filed = blobData;
     const filename = `/${visibility}/${this.props.patientId}/${Date.now()}-${audioname}`
  
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
       patient: this.props.patientId,
       Access: "none",
       abrechnungsnummerprivat: "-",
       abrechnungsnummergesaetzlich: "-",
       Leistungskette: "-",
     }
     const result = await API.graphql(graphqlOperation(createRecords, {input: record}))
     console.log( "success", result )
   } catch(err) {
     console.error('Error adding Record', err)
   }

   this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ bild: false });
  this.setState({ cam: false });
  this.setState({ close: false });
}

  handleChange = record => event => {
    this.setState({
      [record]: event.target.value,
    });
  };

  _pickImagecam = async () => {
    this.setState({ showimage: [] });
    this.showEintragCam();
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const {
        status: cameraPerm
      } = await Permissions.askAsync(Permissions.CAMERA);
    if (cameraRollPerm === 'granted' && cameraPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'Images',
        base64: true,
      });
      this.addImage(pickerResult)
      .catch(err => console.log("error",err));
    }

  };

  _pickImage = async () => {
    this.setState({ showimage: [] });
    this.showEintragGallary();
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
    if (this.state.recording) {
      this.askForPermission()
      .then(() => this.stop() )
      .then(() => this.addAudio() )
      .then(() => {this._recordInstance.setOnRecordingStatusUpdate(null);
        this._recordInstance = null;
      } )
      .then(() => {this._recordInstance = new Audio.Recording();
        this._recordInstance.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);} )
      .then(() => this.setState({recording: false}) )
    } else {
      this.askForPermission()
      .then(() => this.start() )
    }
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
      this.setState({recording: true})
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

  _pickImagecameintrag = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const {
        status: cameraPerm
      } = await Permissions.askAsync(Permissions.CAMERA);
    if (cameraRollPerm === 'granted' && cameraPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'Images',
        base64: true,
      });
      this.addImageAndRecord(pickerResult)
      .catch(err => console.log("error",err));
    }

  };

  _pickImageeintrag = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'Images',
      });
      this.addImageAndRecord(pickerResult) 
      .catch(err => console.log("error",err));
    }

  };

  checkone = async () => {
    if (this.state.Record == "" || this.state.Record == " " || this.state.Record == null) {
      Alert.alert(
        "Text Eintrag zuerst",
        "Erstmal das Textfeld ausfüllen",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else {
      this._pickImagecameintrag()
    }
  };

  checktwo = async () => {
    if (this.state.Record == "" || this.state.Record == " " || this.state.Record == null) {
      Alert.alert(
        "Text Eintrag zuerst",
        "Erstmal das Textfeld ausfüllen",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    else {
      this._pickImageeintrag()
    }
  };

  addImageAndRecord = async (pickerResult) => {
            
      const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
      const access = 'image/jpeg';
      const imageData = await fetch(pickerResult.uri)
      const blobData = await imageData.blob()
  
      console.warn("4", blobData.type)
      console.warn("3", this.props.patientId)
  
    

        const visibility = "public";
        const {identityId} = Auth.currentCredentials()
        const filed = blobData;
        const filename = `/${visibility}/${this.props.patientId}/${Date.now()}-${imageName}`
      
        const uploadedFile = await Storage.put(filename, filed, {
          contentType: blobData.type,
    
        })
        
        const file = {
          key: uploadedFile.key,
          bucket: 'amplifypflegeheimb4f4dd738df84d92a36c5595bc6d52f3-pflegeenv',
          region: aws_exports.aws_project_region
        }
    
    const audio = {
      key: "-",
      bucket: "-",
      region: "-"
    }
    const records = {
      record: this.state.Record,
      file,
      audio,
      patient: this.props.patientId,
      Access: "none",
      abrechnungsnummerprivat: "-",
      abrechnungsnummergesaetzlich: "-",
      Leistungskette: "-",
    }

  
    const result = await API.graphql(graphqlOperation(createRecords, {input: records}))
    this.setState({ ...initialState })
      console.log( "success", result )

      this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ bild: false });
  this.setState({ cam: false });
  this.setState({ close: false });
}

addRecord = async () => {
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

    var record = {
            record: this.state.Record,
            file,
            audio,
            patient: this.props.patientId,
            Access: "none",
            abrechnungsnummerprivat: "-",
            abrechnungsnummergesaetzlich: "-",
            Leistungskette: "-",
      }
       const result = await API.graphql(graphqlOperation(createRecords, {input: record}))
      //.then(() => this.triggerAddTripState())
      console.log("Data", result.data.createRecords.id)
      this.setState({ results: result.data.createRecords.id });
      this.setState({ ...initialState })
      //window.location.reload(`/PatientFilter/${this.props.patientId}`) 
      this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ bild: false });
  this.setState({ cam: false });
  this.setState({ close: false });

}

toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible });
};

showEintrag = () => {
  this.setState({ eintrag: true });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ bild: false });
  this.setState({ cam: false });
  this.setState({ eintragLeistung: false });
  this.setState({ close: true });
  this.setState({ showfilteredkette:  false });
  this.toggleModal();
}

showEintragCam = () => {
  this.setState({ eintrag: false });
  this.setState({ eintragmitcam: true });
  this.setState({ eintragbild: false });
  this.setState({ bild: false });
  this.setState({ cam: false });
  this.setState({ eintragLeistung: false });
  this.setState({ close: true });
  this.setState({ showfilteredkette:  false });
  this.toggleModal();
}

showEintragGallary = () => {
  this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: true });
  this.setState({ bild: false });
  this.setState({ eintragLeistung: false });
  this.setState({ cam: false });
  this.setState({ close: true });
  this.setState({ showfilteredkette:  false });
  this.toggleModal();
}

showLeistungskette = () => {
  this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ eintragLeistung: true });
  this.setState({ bild: false });
  this.setState({ cam: false });
  this.setState({ close: true });
  this.setState({ showfilteredkette:  false });
  this.toggleModal();
}

showGallary = () => {
  this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ eintragLeistung: false });
  this.setState({ bild: true });
  this.setState({ cam: false });
  this.setState({ close: true });
  this.setState({ showfilteredkette:  false });
  this.toggleModal();
}

showCam = () => {
  this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ eintragLeistung: false });
  this.setState({ bild: false });
  this.setState({ cam: true });
  this.setState({ close: true });
  this.setState({ showfilteredkette:  false });
  this.toggleModal();
}

close = () => {
  this.setState({ eintrag: false });
  this.setState({ eintragmitcam: false });
  this.setState({ eintragbild: false });
  this.setState({ eintragLeistung: false });
  this.setState({ bild: false });
  this.setState({ cam: false });
  this.setState({ showfilteredkette:  false });
  this.setState({ close: false });
}

Batch(){
  // console.warn('Behand', this.state.Behandlung)
  // console.warn('ExtraBehand', this.state.ExtraBehandlungen)
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

  if (this.state.Behandlung != "" && this.state.ExtraBehandlungen != "" ){

    const Behand = this.state.Behandlung.map((rest, i) => (
                                                              {record: rest.name, patient: this.props.patientId,
                                                                Access: "none", abrechnungsnummerprivat: rest.abrechnungsnummerprivat,
                                                                abrechnungsnummergesaetzlich: rest.abrechnungsnummergesaetzlich,
                                                                Leistungskette: Kette[0], file, audio}
                                                          ))
     var ExtraBehand = this.state.ExtraBehandlungen.map((behand, i) => (
                                                                      {record: behand, patient: this.props.patientId,
                                                                        Access: "none", abrechnungsnummerprivat: "-",
                                                                        abrechnungsnummergesaetzlich: "-",
                                                                        Leistungskette: Kette[0], file, audio}
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
                                                              {record: rest.name, patient: this.props.patientId,
                                                                Access: "none", abrechnungsnummerprivat: rest.abrechnungsnummerprivat,
                                                                abrechnungsnummergesaetzlich: rest.abrechnungsnummergesaetzlich,
                                                                Leistungskette: Kette[0], file, audio}
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
      {record: behand, patient: this.props.patientId,
        Access: "none", abrechnungsnummerprivat: "-",
        abrechnungsnummergesaetzlich: "-",
        Leistungskette: Kette[0], file, audio}
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

  var record2 = this.state.BatchKette;
   
  var record = [
    { record: 'max'},
    { record: 'carlos'},
    { record: 'jango'},
    ];

    console.warn('result', record)
    console.warn('result2', record2)

   const result = await API.graphql(graphqlOperation(mutations.createRecords2, {records: record2}))

}

BatchProcess() {
  
  API.graphql(graphqlOperation(queries.listArzts2))
    .then(()=> this.Batch())
   .then(()=> this.BatchaddRecords())
   .catch((err)=> console.warn(err))
   .then(()=>{ this.setState({ BatchKette: "" });
               this.setState({ Behandlung: [] });
               this.setState({ ExtraBehandlungen: [] });})
  
}
      
  render() {
      const { Record, Extra, Kette, TypValue } = this.state;
            console.warn("1", this.state.Kette)
            console.warn("1", this.state.Kettendata)
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
           <Provider>
           <Portal>
        {/* <FAB
          style={styles.fab}
          small = {false}
          icon="add"
          onPress={this.toggleModal}
        /> */}


               <FAB.Group
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
                             />
        </Portal>
        <Portal>


      {this.state.close &&
      <>
       <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={{ maxWidth: width, backgroundColor: '#FEFDFD'}}
            scrollEnabled={true}
            enableAutomaticScroll
            enableResetScrollToCoords= {false}
            keyboardDismissMode='on-drag'
            >

           {this.state.eintragLeistung &&
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
              </>
            }  

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
                onPress={() => this.BatchProcess()}
                >
                Fertig
                </Button>
              </>
            }


         {this.state.eintrag &&
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
             <Button icon="send" mode="outlined" style={styles.contentBody2} onPress={this.addRecord}>
              Eintragen
              </Button>
              </>
            }
            
           {this.state.eintragbild &&
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
                      <Image source={{uri:this.state.showimage}} style={{ width: 50, height: 50, left: width /2.3,}}/>
          <HelperText
          type="error"
          visible={false}/>
          <Button icon="image" mode="outlined" style={styles.contentBody2} onPress={this.addImageFinal}>
              Eintragen
              </Button>
              </>
            } 

            {this.state.eintragmitcam &&
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
          <Image source={{uri:this.state.showimage}} style={{ width: 50, height: 50, left: width /2.3,}}/>
          <HelperText
          type="error"
          visible={false}/>
                       <Button icon="camera" mode="outlined" style={styles.contentBody2} onPress={this.addImageFinal}>
              Eintragen
              </Button>
              </>
            } 
            <FAB
              style={styles.fab2}
              small
              icon="close"
              onPress={this.close}
             />
            </KeyboardAwareScrollView>
             </>
            }

           </Portal>
           </Provider>
           </>
    );
    
  }
}
  
const styles = StyleSheet.create({
    home: {
      width: width,   
      flex: 1, 
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