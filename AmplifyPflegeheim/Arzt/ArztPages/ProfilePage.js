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

import { Images, argonTheme } from "../../../constants";
import { HeaderHeight } from "../../../constants/utils";
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {Auth, Hub} from "aws-amplify"
import { API, graphqlOperation }  from "aws-amplify";
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { TextInput, HelperText, Button } from 'react-native-paper';
import * as Textdata from '../../../Textfile'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AWS from 'aws-sdk'

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class ProfilePage extends React.Component {

  state = {
    Arzt: [],
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
    Arzt:[],
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
    patients:[]
};

componentDidMount = async () => {
  this.GetArzt();
    const data = await API.graphql(graphqlOperation(queries.listArzts2))
    //console.log('result', result)
    this.setState({patients: data.data.listArzts2.items})

    console.warn("gg", this.state.patients)
}

updateProfile(){
const k =patients.map((rest)=>( {
    id: this.props.arztid,
    username: this.state.nutzername || this.state.rest.username,
    Vorname: this.state.vorname || this.state.rest.Vorname,
    Nachname: this.state.nachname || this.state.rest.Nachname,
    Telefonnummer: this.state.telefonnummer || this.state.rest.Telefonnummer,
    Email: this.state.email || this.state.rest.Email,
    Praxis: this.state.praxis || this.state.rest.Praxis,
    Strasse: this.state.strasse || this.state.rest.Strasse,
    Hausnr: this.state.hausnummer || this.state.rest.Hausnr,
    Ort: this.state.ort || this.state.rest.Ort,
    Postleitzahl: this.state.postleitzahl || this.state.rest.Postleitzahl,
  }))
  API.graphql(graphqlOperation(mutations.updateArzt, {input: k}))
  .catch(err => console.log(err))
  .then(()=> this.props.hideData())
  .then(()=> this.props.GetArzt())
  // window.location.reload()
}

  GetArzt = async (event) => {
 
    const result = await API.graphql(graphqlOperation(queries.listArzts2))
    this.setState({
      Arzt:  result.data.listArzts2.items
    })

    }

  showData(){
    this.setState({
      showEdit:  true
    })
  }

  hideData(){
    this.setState({
      showEdit:  false
    })
  }

  render() {
    let { strasse, patients, hausnummer, postleitzahl, ort, telefonnummer, praxis, nutzername, vorname, nachname, mail } = this.state;
    console.warn("gt", patients)
    console.warn("gf", this.state.patients)

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              {this.state.Arzt.map((rest)=>(
              <Block flex style={styles.profileCard}>
                {!this.state.showEdit &&
                <>
                <Block middle style={styles.avatarContainer}>

                  <Avatar.Text style={styles.avatar} label={rest.username.charAt(0).toUpperCase()} />

                </Block>
                <Block style={styles.info}>
                  <Block row space="between">
                    
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {rest.Vorname + ' ' + rest.Nachname}
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    {rest.username}
                    </Text>
                  </Block>

                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>

                  <Block middle>
                  <Icon 
                    onPress={() => this.showData()}  
                    name="edit" 
                    size={30}/>
                  </Block>
                </Block>
                </>
                }
                {this.state.showEdit &&
              <>
              {patients.map((rest)=>(
              <KeyboardAwareScrollView
               //contentContainerStyle={styles.container}
               contentContainerStyle={{ maxWidth: width, backgroundColor: '#FEFDFD'}}
               scrollEnabled={true}
               enableResetScrollToCoords= {false}
               enableAutomaticScroll
               extraScrollHeight = {150}
               innerRef={ref => {
                 this.scroll = ref
               }}
               keyboardDismissMode='on-drag'
               >
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
           placeholder={rest.Vorname}
           value={vorname}
           onChangeText={ (vorname) => this.setState({ vorname }) }
            />
            <HelperText
             visible={true}
           >Vorname</HelperText>
            <TextInput         
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={rest.Nachname}
            value={nachname}
           onChangeText={ (nachname) => this.setState({ nachname }) }
            />
            <HelperText
             visible={true}
           >Nachname</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={rest.Telefonnummer}
            value={telefonnummer}
           onChangeText={ (telefonnummer) => this.setState({ telefonnummer }) }
            />
            <HelperText
             visible={true}
           >Telefonnummer</HelperText>
           <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={rest.Email}
            value={mail}
           onChangeText={ (mail) => this.setState({ mail }) }
            />
            <HelperText
             visible={true}
           >Email</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={rest.Strasse}
            value={strasse}
           onChangeText={ (strasse) => this.setState({ strasse }) }
            />
            <HelperText
             visible={true}
           >Strasse</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={rest.Hausnr}
            value={hausnummer}
           onChangeText={ (hausnummer) => this.setState({ hausnummer }) }
            /> 
            <HelperText
             visible={true}
           >Hausnummer</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={rest.Postleitzahl}
            value={postleitzahl}
           onChangeText={ (postleitzahl) => this.setState({ postleitzahl }) }
            /> 
            <HelperText
             visible={true}
           >Postleitzahl</HelperText>
            <TextInput          
            style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
            placeholder={rest.Ort}
            value={ort}
           onChangeText={ (ort) => this.setState({ ort }) }
            /> 
            <HelperText
             visible={true}
           >Ort</HelperText>
           <View style={styles.container}>
        <Button mode="contained" style={{ width: 100}} onPress={() => this.hideData()}>
       Abbrechen
       </Button>
   
       <Button mode="contained" style={{ width: 100}} onPress={this.updateProfile}>
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
              ))}
              </>
                }
              </Block>
              ))}
            </ScrollView>
          </ImageBackground>
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

export default ProfilePage;
