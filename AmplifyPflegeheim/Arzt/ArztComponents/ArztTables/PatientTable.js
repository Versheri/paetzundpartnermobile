import React, { Component } from 'react';
import { AppRegistry, Text, Dimensions, ScrollView, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import { DataTable, Card, Avatar, Searchbar, HelperText, Button  } from 'react-native-paper';
import { API, graphqlOperation }  from "aws-amplify";
import {Auth, Hub} from "aws-amplify"
import * as queries from '../../../graphql/queries';
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
import AppSyncConfig from "../../../../exports2";
import gql from 'graphql-tag';
import { buildMutation } from 'aws-appsync';
import aws_config from '../../../../exports2'
import TouchableSwipe from 'react-native-touchable-swipe'

const { width } = Dimensions.get('screen');

const client = new AWSAppSyncClient({
  url: 'https://eadhqhsttnhuzkf2ouptrzulda.appsync-api.eu-central-1.amazonaws.com/graphql',
  region: aws_config.aws_appsync_region,
  auth: {
    type: "AMAZON_COGNITO_USER_POOLS",
    credentials: () => Auth.currentCredentials(),
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken()
  },
  complexObjectsCredentials: () => Auth.currentCredentials()
});


export default class PatientTable extends React.Component {
    
  state = {
    InitialState: [],
    Fullist: [],
    originState: [],
    ListPatient: [],
    user: [],
    firstQuery: '',
    searchopen: false,
    range1: 0,
    range2: 4,
    currentPage: 1,
    NumberofPages: Number,
    disabledbackward: false,
    disabledforward: false,
    filteropen: false,
    nutzername: '',
    Vorname: '',
    Nachname: '',
    Email: '',
    Pflegeheim: '',
    chips: [],
    filters: false,
    DateofBirth: '',
    Pflegeheimes: [],
    Pflegeunit:'',
    Startstate:'',
    Zerostate: '',
    Table: false,
    actualTable: false,
  };

  
componentDidMount = async () => {
   this.GetUser()
   .catch(err => console.warn("err1", err))
   .then(() => this.GetArzt()
   .then(() => this.FilterPflegeheimPatients())
   .catch(err => console.warn("err2", err)))
   .catch(err => console.warn("err2", err))
   .then(() => {
     if(Date('2019-09-16T09:42:10.137Z') - Date('2019-09-16T09:41:51.694Z')  < 0){ 
     console.warn("1")
   }else{
    console.warn("2", Date('2019-09-16T09:42:10.137Z'))}})

    const fal = '2019-09-16T09:42:10.137Z'
    const ges ='2019-09-16T09:41:51.694Z'

   const dates = Math.abs(new Date(fal));
   const dates2 = Math.abs(new Date('2011/02/07 15:13:06') - new Date('2010/05/07 15:13:06'));
   const dates3 = Math.abs(new Date(fal.replace(/-/g,'/')) - new Date(ges.replace(/-/g,'/')));

    console.warn("jhg",dates, "sd", dates2, "eff", dates3)


    const subscription = API.graphql(
    graphqlOperation(subscriptions.onCreatePatient)
    ).subscribe({
        next: (PatientData) => this.GetArzt2()
    });
  }

  FilterPflegeheimPatients = async () => {

    var ListPatient = this.state.InitialState.map((rest) => (
      rest.Pflegeheim == 'St.Caritas' ? (
        rest
        ):
        (
          null
        )))

    ListPatient = ListPatient.filter( Boolean );

    var List = this.state.Pflegeheimes.map((rest) => (rest.Name))

    this.setState({
      Pflegeunit:  List
    })

    console.warn('jungoss', ListPatient.map((rest) => (rest.Pflegeheim)))
    console.warn('jack', List)
    console.warn('jacks', this.state.Pflegeheimes)
    
   }

   EndFilter = async (value) => {

    console.warn('valooos', value)

    var ListPatient = this.state.Zerostate.map((rest) => (
      rest.Pflegeheim == value ? (
        rest
        ):
        (
          null
        )))

    ListPatient = ListPatient.filter( Boolean );

    this.setState({ Pflegeheim: value })

    this.setState({
      InitialState:  ListPatient
    })

    this.setState({
      ListPatient:  ListPatient.slice(0, 4)
    })

    this.setState({
      Table:  true
    })

    this.setState({
      actualTable:  true
    })

    this.setState({
      NumberofPages:  Math.ceil(ListPatient.length/4)
    })
    console.warn("1", this.state.NumberofPages)
    console.warn("2", ListPatient.length)
    
   }

  GetArzt = async (event) => {
    // const { navigation } = this.props;
    // const username = navigation.getParam('username')
 
    const result = await API.graphql(graphqlOperation(queries.listPatients))
    this.setState({
      Fullist:  result.data.listPatients.items
    })
    const results = await API.graphql(graphqlOperation(queries.listPflegeheims))

    var ListPatient = this.state.Fullist.map((rest) => (
      rest.Arzt == this.state.user.username ? (
        rest
        ):
        (
          null
        )))

    ListPatient = ListPatient.filter( Boolean );

    this.setState({
      Zerostate:  ListPatient
    })
    
    this.setState({
      Pflegeheimes:  results.data.listPflegeheims.items
    })
      
      //console.warn("result",username)
      //console.error("result",this.state.ListPatient)
    }

    GetArzt2 = async (event) => {
      // const { navigation } = this.props;
      // const username = navigation.getParam('username')
   
      const result = await API.graphql(graphqlOperation(queries.listPatients))
      this.setState({
        Fullist:  result.data.listPatients.items
      })
      const results = await API.graphql(graphqlOperation(queries.listPflegeheims))
  
      var ListPatient = this.state.Fullist.map((rest) => (
        rest.Arzt == this.state.user.username ? (
          rest
          ):
          (
            null
          )))
  
      ListPatient = ListPatient.filter( Boolean );
  
      this.setState({
        Zerostate:  ListPatient
      })
  
      this.setState({
        Pflegeheimes:  results.data.listPflegeheims.items
      })
        
      this.FilterPflegeheimPatients();
      this.EndFilter();
      }

  GetUser = async (event) => {
    const user = await Auth.currentAuthenticatedUser()
         this.setState({user}) 
         console.warn('user', user)
    }
  

  SearchFunktion = async (value) => {
  const Query = value.toLocaleLowerCase()
  console.log("event", value)

  this.setState({
    originState:  this.state.InitialState
  })

  var ListPatient = this.state.InitialState.map((rest) => (
    rest.username.toLocaleLowerCase().includes(Query) ||  rest.Vorname.toLocaleLowerCase().includes(Query) ||
    rest.Nachname.toLocaleLowerCase().includes(Query) ||  rest.Email.toLocaleLowerCase().includes(Query) ? (
      rest
      ):
      (
        null
      )))

  ListPatient = ListPatient.filter( Boolean );

  console.log("InitialState", this.state.InitialState)
  console.warn("Result", ListPatient)

  if( Query== "" || Query== " " || Query == null){
    this.setState({
      ListPatient:  this.state.originState
    })
  } else {
    this.setState({
      ListPatient:  ListPatient
    })
  }
  

  }

  toggleModal = () => {
    this.setState({ filteropen: !this.state.filteropen });
  };

  NewPflege = async (event) => {

    this.setState({
      Table:  false
    })
  
    this.setState({ actualTable: false })
    }

  Reset = async (event) => {
  
    var ListPatient = this.state.Fullist.map((rest) => (
      rest.Arzt == this.state.user.username ? (
        rest
        ):
        (
          null
        )))

    ListPatient = ListPatient.filter( Boolean );

    this.setState({
      InitialState:  ListPatient
    })

    this.setState({
        ListPatient:  ListPatient.slice(0, 4)
      })
    
      this.setState({
        NumberofPages:  Math.ceil(ListPatient.length/4)
      })
      
      //console.warn("result",username)
      //console.error("result",this.state.ListPatient)
    }

  resetFilter () {
    this.setState({
      Pflegeheim:  ''
    })
    this.setState({
      nutzername:  ''
    })
    this.setState({
      Vorname:  ''
    })
    this.setState({
      Nachname:  ''
    })
    this.setState({
      DateofBirth:  ''
    })
    this.setState({
      Email:  ''
    })
    this.setState({
      filters:  false
    })
    this.Reset();
  }

  FilterFunktion = async () => {
    this.setState({ filteropen: !this.state.filteropen });
    var two = this.state.nutzername.toLocaleLowerCase()
    var three = this.state.Vorname.toLocaleLowerCase()
    var four = this.state.Nachname.toLocaleLowerCase()
    var five = this.state.Email.toLocaleLowerCase()
    var six = this.state.DateofBirth.toLocaleLowerCase()

    var QueryList = this.state.InitialState;
    
    var ListPatient = this.state.InitialState.map((rest) => (
       rest.username.toLocaleLowerCase().includes(two) &&  rest.Vorname.toLocaleLowerCase().includes(three) &&
      rest.Nachname.toLocaleLowerCase().includes(four) &&  rest.Email.toLocaleLowerCase().includes(five)
      &&  rest.DateofBirth.toLocaleLowerCase().includes(six) ? (
        rest
        ):
        (
          null
        )))

        ListPatient = ListPatient.filter( Boolean );

        console.warn("values", ListPatient)

        this.setState({
          ListPatient:  ListPatient
        })

        this.setState({
          filters:  true
        })

        this.setState({
          NumberofPages:  Math.ceil(ListPatient.length/4)
        })
    
  }

  PaginationPlus = async () => {
    console.warn('range', this.state.range1 )
    console.warn('range2', this.state.InitialState.length )
    if( this.state.range1 + 4 > this.state.InitialState.length){
      this.setState({
        disabledforward:  true
      })
    } else if( this.state.NumberofPages == 1){
      this.setState({
        disabledforward:  true
      })
    } else {
    const one = this.state.range1 + 4;
    const two = this.state.range2 + 4;

    var QueryList = this.state.InitialState;
    var page = this.state.currentPage;

     this.setState({
       ListPatient:  QueryList.slice(one, two)
     })

     this.setState({
      disabledforward:  false
    })

    this.setState({
      currentPage:  page + 1
    })

    this.setState({
      disabledbackward:  false
    })

     this.setState({
      range1:  one
    })

    this.setState({
      range2:  two
    })
  }

    // console.warn("result", this.state.ListPatient.slice(0, 4))
    // console.warn("result3", QueryList.slice(one, two))
    // console.warn("result2", this.state.NumberofPages)
    // console.warn("result2", this.state.currentPage)
  }

  PaginationMinus = async () => {
    if( this.state.range1 - 4 < 0){
      this.setState({
        disabledbackward:  true
      })
    } else if( this.state.NumberofPages == 1){
      this.setState({
        disabledbackward:  true
      })
    } else {
    const one = this.state.range1 - 4;
    const two = this.state.range2 - 4;

    var QueryList = this.state.InitialState;
    var page = this.state.currentPage;

     this.setState({
       ListPatient:  QueryList.slice(one, two)
     })

     this.setState({
      range1:  one
    })

    this.setState({
      disabledbackward:  false
    })

    this.setState({
      currentPage:  page - 1
    })

    this.setState({
      disabledforward:  false
    })

    this.setState({
      range2:  two
    })
  }
  }
  

  render() {
    const { navigation } = this.props;
    const { firstQuery, searchopen, Pflegeheim, DateofBirth, nutzername, Vorname, Nachname, Email } = this.state;
    
    // const subscription = API.graphql(
    //   graphqlOperation(subscriptions.onCreatePatient)
    //   ).subscribe({
    //       next: (PatientData) => this.GetArzt()
    //   });

    let Nutzernamen = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.username 
        }
      ))
    ];

    let Geburte = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.DateofBirth 
        }
      ))
    ];

    let Vornamen = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.Vorname 
        }
      ))
    ];

    let Nachnamen = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.Nachname 
        }
      ))
    ];

    let Emails = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.Email 
        }
      ))
    ];
    console.warn('kkk', this.state.Pflegeheimes)
    console.warn('kkk2', this.state.Pflegeheimes.map((rest, i) => (rest.Name)))

    let Pflegeunits = [
      ...this.state.Pflegeheimes.map((rest, i) => (
        {
         value: rest.Pflegeheimid,
         label:rest.Name,
        }
      ))
    ];


    return (
           <>
           <Block flex center style={styles.home}>
           <ApolloProvider client={client}>
           <Rehydrated>
           <ScrollView contentContainerStyle={styles.articles}>
          
           {!this.state.actualTable &&
           <>
           <Dropdown
              label='Pflegeheim'
              value={Pflegeheim}
              style={{ width: 60 }}
              onChangeText={ (Pflegeheim) => {console.warn('valooos2', Pflegeheim);this.EndFilter(Pflegeheim)} }
              data={Pflegeunits}
              />
          </>
           }
          

          {this.state.Table &&
          <>
           <Modal 
        isVisible={this.state.filteropen}
        backdropOpacity = {0.7}
        coverSreen={false}>
           <View style={styles.content}>
              <Text style={styles.contentTitle}>FILTER</Text>

              <Dropdown
              label='Nutzername'
              value={nutzername}
              style={{ width: 60 }}
              onChangeText={ (nutzername) => this.setState({ nutzername }) }
              data={Nutzernamen}
              />

              <Dropdown
              label='Vorname'
              value={Vorname}
              style={{ width: 60 }}
              onChangeText={ (Vorname) => this.setState({ Vorname }) }
              data={Vornamen}
              />

              <Dropdown
              label='Nachname'
              value={Nachname}
              style={{ width: 60 }}
              onChangeText={ (Nachname) => this.setState({ Nachname }) }
              data={Nachnamen}
              />

             <Dropdown
              label='Geburtsdatum'
              value={DateofBirth}
              style={{ width: 60 }}
              onChangeText={ (DateofBirth) => this.setState({ DateofBirth }) }
              data={Geburte}
              />

              <Dropdown
              label='Email'
              value={Email}
              style={{ width: 60 }}
              onChangeText={ (Email) => this.setState({ Email }) }
              data={Emails}
              />  

              <Button onPress={this.FilterFunktion}>Fertig</Button>
              <Button onPress={this.toggleModal}>Abbrechen</Button>
            </View>
        </Modal>

           <Card>
                <Card.Title title="Patienten" subtitle="Patienten" left={(props) => <Avatar.Icon {...props} icon="person" />} />
                <Card.Content>
       {searchopen &&
       <>
       <Searchbar
        placeholder="Search"
        onChangeText={(query) => { this.setState({ firstQuery: query });
      this.SearchFunktion(firstQuery) }}
        value={firstQuery}
      />
      <Icon 
              onPress={() => {this.setState({ searchopen: false })
                              this.SuchFunktion(" ")}}  
              name="close" 
              style={{ left: 140}}
              size={30}/>
              </>
      }
                <ScrollView>

           <DataTable>

        <DataTable.Header>
          {!searchopen&&
          <>
             <Icon 
              onPress={() => this.props.navigation.push('AddPatient', { client: client, Pflegeheim: this.state.Pflegeheim })} 
              name="adduser" 
              size={30}/>
              <Icon 
              onPress={() => this.setState({ searchopen: true })} 
              name="search1" 
              style={{ left: 20}}
              size={30}/>
              <Icon 
              onPress={() => this.setState({ filteropen: true })} 
              name="filter" 
              style={{ left: 40}}
              size={30}/>
              {this.state.filters &&
              <>
              <Icon 
              onPress={() => this.resetFilter()} 
              name="close" 
              style={{ left: 60}}
              size={30}/>
              </>
              }
              </>
          }
        </DataTable.Header>

        <DataTable.Header>
          <DataTable.Title>Nutzername</DataTable.Title>
          <DataTable.Title>Vorname</DataTable.Title>
          <DataTable.Title>Nachname</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Zustand</DataTable.Title>
        </DataTable.Header>
        {this.state.ListPatient.map((rest, i) => (
        <DataTable.Row>
          <DataTable.Cell 
          onPress = {() => this.props.navigation.push('Leistungen', {patientId: rest.id, client: client, Pflegeheim: this.state.Pflegeheim} )}
          >{rest.username}</DataTable.Cell>
          <DataTable.Cell
          onPress = {() => this.props.navigation.push('Leistungen', {patientId: rest.id, client: client, Pflegeheim: this.state.Pflegeheim} )}
          >{rest.Vorname}</DataTable.Cell>
          <DataTable.Cell
          onPress = {() => this.props.navigation.push('Leistungen', {patientId: rest.id, client: client, Pflegeheim: this.state.Pflegeheim} )}
          >{rest.Nachname}</DataTable.Cell>
          <DataTable.Cell
          onPress = {() => this.props.navigation.push('Leistungen', {patientId: rest.id, client: client, Pflegeheim: this.state.Pflegeheim} )}
          >{rest.Email}</DataTable.Cell>
          <DataTable.Cell
          onPress = {() => this.props.navigation.push('Leistungen', {patientId: rest.id, client: client, Pflegeheim: this.state.Pflegeheim} )}
          >{rest.Zustand}</DataTable.Cell>
        </DataTable.Row>
        ))}
        
        <HelperText
          type="error"
          visible={false}
        ></HelperText>

        <DataTable.Header>
        <DataTable.Title></DataTable.Title>
          <DataTable.Title>
              <Icon 
              onPress={() => this.PaginationMinus()} 
              name="left" 
              style={{ left: 0, color: this.state.disabledbackward && '#bdbdbd' || !this.state.disabledbackward && '#212121'}}
              size={15}/>
              <Text
              style={{ left: 5}}>
              Page {this.state.currentPage}-{this.state.NumberofPages} of {this.state.NumberofPages}</Text>
              <Icon 
              onPress={() => this.PaginationPlus()} 
              name="right" 
              style={{ left: 10, color: this.state.disabledforward && '#bdbdbd' || !this.state.disabledforward && '#212121'}}
              size={15}/>
              </DataTable.Title>
          {/* <DataTable.Title>Nutzername</DataTable.Title>
          <DataTable.Title>Vorname</DataTable.Title>
          <DataTable.Title>Nachname</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Zustand</DataTable.Title> */}
        </DataTable.Header>

      </DataTable>

      </ScrollView> 
                </Card.Content>
                <Card.Actions>
                <Button onPress={ this.NewPflege }>Andres Pflegeheim Wählen</Button>
                </Card.Actions>
            </Card>
            </>
          }

            </ScrollView>
            </Rehydrated>
            </ApolloProvider>
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
      padding: 22,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
  });