import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  View,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Images, argonTheme } from "../../../../constants";
import { HeaderHeight } from "../../../../constants/utils";
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {Auth, Hub} from "aws-amplify"
import { API, graphqlOperation }  from "aws-amplify";
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations';
import { TextInput, HelperText, Button } from 'react-native-paper';
import * as Textdata from '../../../../Textfile'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AWS from 'aws-sdk'

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

const initialState = {
  
    showEdit: false,
    username: "",
    groupenName: "Patient",
    password: '',
    mail: "",
    emailveri: "True",
    vorname:'',
    nachname:'',
    telefonnummer:'',
    strasse:'',
    hausnummer:'',
    postleitzahl:'',
    ort:'',
    pflegeheim:'',
    pflegestufe:'',
    zimmernummer:'',
    Patient:[],
    praxis:'',
    Formular:'1',
    betreuer:'',
    LBetreuer:[],
    LPraxis:[],
    nutzer:[],
    LPflegeheim: [],
    error:"",
    error1:"",
    error2:"",
    checkone:false,
    checktwo:false,
    checkthree:false,
    activeStep: 0,
    skipped: new Set(),
    
};

class PatientPage extends React.Component {

  state = {
    ...initialState,
    patients:[],
    patients2:[],
    patientId:'',
    Patient: [],
};

componentDidMount = async () => {
  API.graphql(graphqlOperation(queries.listArzts2))
  .then(()=>this.nav())
  .catch(err => console.warn("err",err))
  .then(()=>this.GetPatient())
  .catch(err => console.warn("err2",err))
     
}

nav(){

  const { navigation } = this.props;
  const patientId = navigation.getParam('patientId');
  console.warn('navigation', this.props.navigation)
  this.setState({patientId: patientId})

}

updateProfile(value){
const k ={
    id: this.props.navigation.state.params.patientId,
    username: this.state.nutzername || this.state.patients.username,
    Vorname: this.state.vorname || this.state.patients.Vorname,
    Nachname: this.state.nachname || this.state.patients.Nachname,
    Telefonnummer: this.state.telefonnummer || this.state.patients.Telefonnummer,
    Email: this.state.email || this.state.patients.Email,
    Praxis: this.state.praxis || this.state.patients.Praxis,
    Strasse: this.state.strasse || this.state.patients.Strasse,
    Hausnr: this.state.hausnummer || this.state.patients.Hausnr,
    Ort: this.state.ort || this.state.patients.Ort,
    Postleitzahl: this.state.postleitzahl || this.state.patients.Postleitzahl,
  }
  API.graphql(graphqlOperation(mutations.updatePatient, {input: k}))
  .catch(err => console.warn("err",err))
  .then(()=> this.setState({...initialState}))
  .then(()=> this.GetPatient())
  // window.location.reload()
}

  GetPatient = async (event) => {
    console.warn('idsss', this.state.patientId)
    const input = {
      id: this.state.patientId
    };
  
    const result = await API.graphql(graphqlOperation(queries.getPatient, input))
  
      this.setState({Patient: result.data.getPatient})

      this.setState({patients: result.data.getPatient})

    }

  render() {
    let { strasse, patients, hausnummer, postleitzahl, ort, telefonnummer, praxis, nutzername, vorname, nachname, mail } = this.state;
    console.warn('patientid', this.state.patientId)
    console.warn("gt", patients)

    return (
      <Block flex style={styles.profile}>
        <Block flex>
              <KeyboardAwareScrollView
               //contentContainerStyle={styles.container}
               contentContainerStyle={{ maxWidth: width, backgroundColor: '#FEFDFD'}}
               scrollEnabled={true}
               enableResetScrollToCoords= {false}
               enableAutomaticScroll
               innerRef={ref => {
                 this.scroll = ref
               }}
               keyboardDismissMode='on-drag'
               >
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
           placeholder={this.state.patients.Vorname}
           value={vorname}
           onChangeText={ (vorname) => this.setState({ vorname }) }
            />
            <HelperText
             visible={true}
           >Vorname</HelperText>
            <TextInput         
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={this.state.patients.Nachname}
            value={nachname}
           onChangeText={ (nachname) => this.setState({ nachname }) }
            />
            <HelperText
             visible={true}
           >Nachname</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={this.state.patients.Telefonnummer}
            value={telefonnummer}
           onChangeText={ (telefonnummer) => this.setState({ telefonnummer }) }
            />
            <HelperText
             visible={true}
           >Telefonnummer</HelperText>
           <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={this.state.patients.Email}
            value={mail}
           onChangeText={ (mail) => this.setState({ mail }) }
            />
            <HelperText
             visible={true}
           >Email</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={this.state.patients.Strasse}
            value={strasse}
           onChangeText={ (strasse) => this.setState({ strasse }) }
            />
            <HelperText
             visible={true}
           >Strasse</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={this.state.patients.Hausnr}
            value={hausnummer}
           onChangeText={ (hausnummer) => this.setState({ hausnummer }) }
            /> 
            <HelperText
             visible={true}
           >Hausnummer</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={this.state.patients.Postleitzahl}
            value={postleitzahl}
           onChangeText={ (postleitzahl) => this.setState({ postleitzahl }) }
            /> 
            <HelperText
             visible={true}
           >Postleitzahl</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={this.state.patients.Ort}
            value={ort}
           onChangeText={ (ort) => this.setState({ ort }) }
            /> 
            <HelperText
             visible={true}
           >Ort</HelperText>
           
           {/* pflegeheim
          betreuer
          pflegestufe
          praxis
          arzt
          zimmernummer
          etagen
          zustand */}
           <View style={styles.container}>
   
       <Button mode="contained" style={{ width: 100}} onPress={()=>{this.updateProfile(patients)}}>
       Fertig
       </Button>
       <HelperText
             visible={true}
           ></HelperText>
           <HelperText
             visible={true}
           ></HelperText>
       </View>
          </KeyboardAwareScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    borderRadius:60,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 45
  },
});

export default PatientPage;
