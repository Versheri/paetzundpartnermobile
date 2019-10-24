import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import AWS from 'aws-sdk'
import { API, graphqlOperation }  from "aws-amplify";
import * as queries from '../../../graphql/queries';
import * as mutations from '../../../graphql/mutations2';
import { TextInput, HelperText, Button } from 'react-native-paper';
import * as Textdata from '../../../../Textfile'
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import gql from 'graphql-tag';
import { buildMutation } from 'aws-appsync';
import DatePicker from 'react-native-datepicker'

const { width } = Dimensions.get('screen');


export default class AddPatient extends React.Component {

  state = {
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
    Praxis:'',
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
    sex: '',
    DateofBirth: ' ',
    date:'',
    Pflegeheim:""
};

constructor(props) {
  super(props);
  // create a ref to store the textInput DOM element
  this.textInput = React.createRef();
  this.focusTextInput = this.focusTextInput.bind(this);
}

componentDidMount = async () => {

  this.setState({Pflegeheim: this.props.navigation.state.params.Pflegeheim}) 

console.warn("client3", this.props.navigation.state.params.Pflegeheim)

this.getBetreuer();
this.ListPraxis();
this.ListPflegeheim();
this.ListArzt();
const result = await API.graphql(graphqlOperation(queries.listArzts))
const result1 = await API.graphql(graphqlOperation(queries.listPatients))
const result2 = await API.graphql(graphqlOperation(queries.listBetreuers))
const result3 = await API.graphql(graphqlOperation(queries.listPflegeheimGeschaeftsfuerungs))
const result4 = await API.graphql(graphqlOperation(queries.listPraxisGeschaeftsfuerungs))
const result5 = await API.graphql(graphqlOperation(queries.listAdministrators))
const result6 = await API.graphql(graphqlOperation(queries.listPflegeheimPDLs))


  const val = result.data.listArzts.items.map((rest, i) => (rest.username))
  const val1 = result1.data.listPatients.items.map((rest, i) => (rest.username))
  const val2 = result2.data.listBetreuers.items.map((rest, i) => (rest.username))
  const val3 = result3.data.listPflegeheimGeschaeftsfuerungs.items.map((rest, i) => (rest.username))
  const val4 = result4.data.listPraxisGeschaeftsfuerungs.items.map((rest, i) => (rest.username))
  const val5 = result5.data.listAdministrators.items.map((rest, i) => (rest.username))
  const val6 = result6.data.listPflegeheimPDLs.items.map((rest, i) => (rest.username))

  var userval = [];
  var fval = userval.concat(val, val1, val2, val3, val4, val5, val6); 
  this.setState({
    nutzer: fval
  })  

}

listNutzer = async () => {
this.setState({error: ""})
this.setState({error1: ""})
this.setState({error2: ""}) 
API.graphql(graphqlOperation(queries.listPflegeheimPDLs))
.then(() => {
this.check1()
})
.then(()=>{
  this.check2();
}).then(()=>{
  this.check3();
})
.then(()=>{
  this.finalPush();
  // console.log("check1", this.state.checkone, this.state.checktwo, this.state.checkthree)
})      
}

finalPush = async () =>  {
if ( this.state.checkone == true && this.state.checktwo == true && this.state.checkthree == true) {
// this.handleNext();
this.all();
} 
} 

check1 = () => {
const {nutzer} = this.state;
if ( this.state.username == null) {
return (this.setState({ error: "" }),
this.setState({ username: "" }),
this.setState({checkone: false}))
;} 
if ( this.state.username == "") {
return (this.setState({ error: Textdata.TextLabels.error }),
this.setState({ username: "" }),
this.setState({checkone: false}))
;} 
if ( nutzer.includes(this.state.username) ) {
  return (this.setState({ error: Textdata.TextLabels.error1 + "\n" + this.state.username+ "\n" + Textdata.TextLabels.error2 }),
  this.setState({checkone: false}))
  ;}
else  this.setState({checkone: true})
}

check2 = () => {
if ( this.state.mail == null ) {
  return (this.setState({ error1: "" }),
  this.setState({ mail: "" }),
  this.setState({checktwo: false}))
  ;} 
if ( this.state.mail == "" ) {
  return (this.setState({ error1: Textdata.TextLabels.error }),
    this.setState({ mail: "" }),
    this.setState({checktwo: false}))
    ;}
if ( !this.state.mail.includes("@" && ".") ) {
  return (this.setState({ error1: Textdata.TextLabels.error3 }),
          this.setState({checktwo: false}))
        ;}  
else  this.setState({checktwo: true})
}

check3 = () => {
if ( this.state.password == null ) {
  return (this.setState({ error2: "" }),
  this.setState({ password: "" }),
  this.setState({checkthree: false}))
  ;} 
if ( this.state.password == "" ) {
  return (this.setState({ error2: Textdata.TextLabels.error }),
    this.setState({ password: "" }),
    this.setState({checkthree: false}))
    ;}

    var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
if ( !format.test(this.state.password)) {
  return (this.setState({ error2: Textdata.TextLabels.error4}),
          this.setState({checkthree: false}))
        ;}  

   var letters = /([A-Z]+)/;
if ( !letters.test(this.state.password)) {
    return (this.setState({ error2: Textdata.TextLabels.error5}),
                  this.setState({checkthree: false}))
                ;}
    var numbers = /([1-9]+)/;
if ( !numbers.test(this.state.password)) {
    return (this.setState({ error2: Textdata.TextLabels.error6}),
                  this.setState({checkthree: false}))
                   ;}  
if ( this.state.password.length < 8 ) {
    return (this.setState({ error2: Textdata.TextLabels.error7}),
                    this.setState({checkthree: false}))
                              ;} 
                              
else this.setState({checkthree: true});
}

all = () => {
    this.CreateUser()
    .catch((err) => console.warn('err', err))
}

getBetreuer = () => {
API.graphql(graphqlOperation(queries.listBetreuers))
.then(data => this.setState({LBetreuer: data.data.listBetreuers.items}))
};
ListPraxis = () => {
API.graphql(graphqlOperation(queries.listPraxiss))
.then(data => this.setState({LPraxis: data.data.listPraxiss.items}))

};
ListPflegeheim = () => {
API.graphql(graphqlOperation(queries.listPflegeheims))
.then(data => this.setState({LPflegeheim: data.data.listPflegeheims.items}))

};
ListArzt = () => {
API.graphql(graphqlOperation(queries.listArzts2))
.then(data => this.setState({Arzt: data.data.listArzts2.items}))

};

handleChange = vorname => event => {
  this.setState({
    [vorname]: event.target.value,
  });
};
handleChange1 = event => {
  this.setState({ pflegeheim: event.target.value });
};
handleChange2 = event => {
  this.setState({ Arzt: event.target.value });
};
handleChange3 = event => {
  this.setState({ Betreuer: event.target.value });
};
handleChange4 = event => {
  this.setState({ Praxis: event.target.value });
};


triggerAddTripState = () => {
  this.setState({
    ...this.state,
    isEmptyState: false,
    isAddTripState: true
  })
}

triggerAddTripState2 = () => {
  this.setState({
    ...this.state,
    isAddTripState: false,
    isEmptyState: true
  })
}

AddUserToGroup = async () => {
  const { groupenName } = this.state;
  var params = {
    GroupName: 'Patient', 
    UserPoolId: 'eu-central-1_OEyQ7sJ8l', 
    Username: this.state.username,
   
  };
 
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
cognitoidentityserviceprovider.adminAddUserToGroup(params, (err, data) => {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data)       // successful response
});    
 }

CreateUser = async () => {
  const { username, password, mail, emailveri} = this.state;
  var params = {
      UserPoolId: 'eu-central-1_OEyQ7sJ8l', /* required */
      Username: username, /* required */
      DesiredDeliveryMediums: [
      
      /* more items */
      ],
      ForceAliasCreation: true || false,
      TemporaryPassword: password,
      UserAttributes: [
      {
          Name: 'email', /* required */
          Value: mail
          
      },
      /* more items */
      ],
      ValidationData: [
      {
          Name: 'email_verified', /* required */
          Value: emailveri
      },
      /* more items */
      ]
  };
  var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  cognitoidentityserviceprovider.adminCreateUser(params, (err, data) => {
      if (err) console.log(err, err.stack); // an error occurred
      else     {this.AddUserToGroup();
               this.CreatePatient()
              .then(() => this.props.navigation.push('Leistungen', {patientId: this.state.results} )) }     // successful response
  });    
}

CreatePatient = async() => {
  const { navigation } = this.props;
  const client = navigation.getParam('client');

const Arztname = this.state.Arzt.map((rest, i) => (rest.username))
const ArztPraxis = this.state.Arzt.map((rest, i) => (rest.Praxis))
this.setState({ open: false });

const result = await client.mutate(buildMutation(client,
  gql(mutations.createPatient2),{
    inputType: gql(mutations.CreatePatientInput),
    variables: {
      input: {
        Vorname: this.state.vorname,
        Nachname: this.state.nachname,
        username: this.state.username,
        Betreuer: this.state.Betreuer,
        Group: this.state.groupenName,
        Email: this.state.mail,
        Telefonnummer: this.state.telefonnummer,
        Strasse: this.state.strasse,
        Hausnr: this.state.hausnummer,
        Postleitzahl: this.state.postleitzahl,
        Ort: this.state.ort,
        Pflegeheim: this.state.Pflegeheim,
        Pflegestufe: this.state.pflegestufe,
        Zimmernummr: this.state.zimmernummer,
        Arzt: Arztname[0],
        Praxis: ArztPraxis[0],
        Zustand: "Aktiv",
        Formular: '1',
        sex: this.state.sex,
	      DateofBirth: this.state.date,
      }
    }
    },
    _variables => [ gql(queries.listPatients) ],
    'Patient'));
  console.log( "success", result )

console.log("Data", result.data.createPatient.id)
this.setState({ results: result.data.createPatient.id });
console.warn("result", this.state.results)
//.then(()=>{window.location = `/PatientFilter/${this.state.results.data.createPatient.id}`;})
}

focusTextInput() {
  // Explicitly focus the text input using the raw DOM API
  // Note: we're accessing "current" to get the DOM node
  this.textInput.current.focus();
}

      
  render() {

    let { username, password, mail, vorname, nachname, telefonnummer, strasse, hausnummer,
      postleitzahl, ort, sex, Betreuer, LBetreuer, LPflegeheim, pflegeheim, pflegestufe, zimmernummer, Arzt, Praxis, betreuer, } = this.state;
      
      let pflegestufen = [ 
        {
        value: '1',
      },
      {
        value: '2',
      },
      {
        value: '3',
      },
      {
        value: '4',
      },
      {
        value: '5',
      }
    ];

    let Sex = [ 
      {
      value: 'Männlich',
    },
    {
      value: 'Weiblich',
    },
  ];

      const Arztname = Arzt.map((rest, i) => (rest.username))
      const ArztPraxis = Arzt.map((rest, i) => (rest.Praxis))

      let Betreuerd = [
        ...LBetreuer.map((rest, i) => (
          {
           value: rest.username 
          }
        ))
      ];

    return (
           <>
           <Block flex center style={styles.home}>
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
        ref={this.textInput}
        style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Nutzername'
        error= {this.state.error && this.scroll.props.scrollToPosition(0, 0) && this.focusTextInput()}
        value={username}
        onChangeText={ (username) => this.setState({ username }) }
         />
         <HelperText
          type="error"
          visible={this.state.error}
        >{this.state.error}</HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Email'
        error= {this.state.error1}
        value={mail}
        onChangeText={ (mail) => this.setState({ mail }) }
         />
         <HelperText
          type="error"
          visible={this.state.error1}
        >{this.state.error}</HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Passwort'
        error= {this.state.error2}
        value={password}
        onChangeText={ (password) => this.setState({ password }) }
         />
         <HelperText
          type="error"
          visible={this.state.error2}
        >{this.state.error}</HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Vorname'
        value={vorname}
        onChangeText={ (vorname) => this.setState({ vorname }) }
         />
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <TextInput         
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Nachname'
        value={nachname}
        onChangeText={ (nachname) => this.setState({ nachname }) }
         />
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
        <Dropdown
        label='Sex'
        value={sex}
        onChangeText={ (sex) => this.setState({ sex }) }
        data={Sex}
         />
         <HelperText
          type="error"
          visible={false}
        ></HelperText>


         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Telefonnummer'
        value={telefonnummer}
        onChangeText={ (telefonnummer) => this.setState({ telefonnummer }) }
         />
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Strasse'
        value={strasse}
        onChangeText={ (strasse) => this.setState({ strasse }) }
         />
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Hausnummer'
        value={hausnummer}
        onChangeText={ (hausnummer) => this.setState({ hausnummer }) }
         /> 
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Postleitzahl'
        value={postleitzahl}
        onChangeText={ (postleitzahl) => this.setState({ postleitzahl }) }
         /> 
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Ort'
        value={ort}
        onChangeText={ (ort) => this.setState({ ort }) }
         /> 
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
        <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        disabled
        label={this.state.Pflegeheim}
         /> 
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
          <Dropdown
        label='Pflegestufe'
        value={pflegestufe}
        onChangeText={ (pflegestufe) => this.setState({ pflegestufe }) }
        data={pflegestufen}
         />
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label='Zimmernummer'
        value={zimmernummer}
        onChangeText={ (zimmernummer) => this.setState({ zimmernummer }) }
         /> 
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <TextInput         
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label={Arztname}
        disabled
         /> 
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <TextInput          
         style={{ backgroundColor: '#fafafa', borderRadius: 50, width: width }}
        label={ArztPraxis}
        disabled
         /> 
         <HelperText
          type="error"
          visible={false}
        ></HelperText>
         <Dropdown
        label='Betreuer'
        value={Betreuer}
        onChangeText={ (Betreuer) => this.setState({ Betreuer }) }
        data={Betreuerd}
         />
         <HelperText
          type="error"
          visible={false}
        ></HelperText>

     <DatePicker
        style={{ backgroundColor: '#fafafa', width: width }}
        date={this.state.date}
        mode="date"
        placeholder="Geburtsdatum"
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
          type="error"
          visible={false}
        ></HelperText>
        <View style={styles.container}>
     <Button mode="contained" style={{ width: 200}} onPress={() => this.props.navigation.push('PatientTable')}>
    Abbrechen
    </Button>

    <Button mode="contained" style={{ width: 200}} onPress={this.listNutzer}>
    Fertig
    </Button>
    </View>
       </KeyboardAwareScrollView>
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
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  });