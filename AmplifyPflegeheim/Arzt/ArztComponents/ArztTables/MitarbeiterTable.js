import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, StyleSheet } from 'react-native';
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

const { width } = Dimensions.get('screen');


export default class MitarbeiterTable extends React.Component {
    
  state = {
    InitialState: [],
    Fullist: [],
    originState: [],
    ListArzt: [],
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
    Praxis: '',
    chips: [],
    filters: false,
    CurrentArzt: []
  };

  
componentDidMount = async () => {
   this.GetUser()
   .catch(err => console.warn("err1", err))
   .then(() => this.GetArzt()
   .catch(err => console.warn("err2", err)))
   .catch(err => console.warn("err2", err))

   const subscription = API.graphql(
    graphqlOperation(subscriptions.onCreateArzt)
    ).subscribe({
        next: (ArztData) => this.GetArzt()
    });
  }

  GetArzt = async (event) => {
    // const { navigation } = this.props;
    // const username = navigation.getParam('username')
 
    const result = await API.graphql(graphqlOperation(queries.listArzts))
    this.setState({
      Fullist:  result.data.listArzts.items
    })

    const result2 = await API.graphql(graphqlOperation(queries.listArzts2))
    this.setState({
      CurrentArzt:  result2.data.listArzts2.items
    })

    var Arztnow = this.state.CurrentArzt.map((rest) => (rest.username))

    console.warn("1", this.state.CurrentArzt)
    console.warn("2", Arztnow)

    var ListArzt = this.state.Fullist.map((rest) => (
      rest.username != Arztnow ? (
        rest
        ):
        (
          null
        )))

    ListArzt = ListArzt.filter( Boolean );

    this.setState({
      InitialState:  ListArzt
    })

    this.setState({
        ListArzt:  ListArzt.slice(0, 4)
      })
    
      this.setState({
        NumberofPages:  Math.ceil(ListArzt.length/4)
      })
      console.warn("1", this.state.NumberofPages)
      console.warn("2", ListArzt.length)
      
      //console.warn("result",username)
      //console.error("result",this.state.ListArzt)
    }

  GetUser = async (event) => {
    const user = await Auth.currentAuthenticatedUser()
         this.setState({user}) 
    }
  

  SearchFunktion = async (value) => {
  const Query = value.toLocaleLowerCase()
  console.log("event", value)

  this.setState({
    originState:  this.state.InitialState
  })

  var ListArzt = this.state.InitialState.map((rest) => (
    rest.username.toLocaleLowerCase().includes(Query) ||  rest.Vorname.toLocaleLowerCase().includes(Query) ||
    rest.Nachname.toLocaleLowerCase().includes(Query) ||  rest.Email.toLocaleLowerCase().includes(Query) ? (
      rest
      ):
      (
        null
      )))

  ListArzt = ListArzt.filter( Boolean );

  console.log("InitialState", this.state.InitialState)
  console.warn("Result", ListArzt)

  if( Query== "" || Query== " " || Query == null){
    this.setState({
      ListArzt:  this.state.originState
    })
  } else {
    this.setState({
      ListArzt:  ListArzt
    })
  }
  

  }

  toggleModal = () => {
    this.setState({ filteropen: !this.state.filteropen });
  };

  Reset = async (event) => {

    var Arztnow = this.state.CurrentArzt.map((rest) => (rest.username))
  
    var ListArzt = this.state.Fullist.map((rest) => (
      rest.username != Arztnow ? (
        rest
        ):
        (
          null
        )))
    //Note
    ListArzt = ListArzt.filter( Boolean );

    this.setState({
      InitialState:  ListArzt
    })

    this.setState({
        ListArzt:  ListArzt.slice(0, 4)
      })
    
      this.setState({
        NumberofPages:  Math.ceil(ListArzt.length/4)
      })
      
      //console.warn("result",username)
      //console.error("result",this.state.ListArzt)
    }

  resetFilter () {
    this.setState({
      Praxis:  ''
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
      Email:  ''
    })
    this.setState({
      filters:  false
    })
    this.Reset();
  }

  FilterFunktion = async () => {
    this.setState({ filteropen: !this.state.filteropen });
    var one = this.state.Praxis.toLocaleLowerCase()
    var two = this.state.nutzername.toLocaleLowerCase()
    var three = this.state.Vorname.toLocaleLowerCase()
    var four = this.state.Nachname.toLocaleLowerCase()
    var five = this.state.Email.toLocaleLowerCase()

    var QueryList = this.state.InitialState;
    
    var ListArzt = this.state.InitialState.map((rest) => (
      rest.Praxis.toLocaleLowerCase().includes(one) && rest.username.toLocaleLowerCase().includes(two) &&  rest.Vorname.toLocaleLowerCase().includes(three) &&
      rest.Nachname.toLocaleLowerCase().includes(four) &&  rest.Email.toLocaleLowerCase().includes(five) ? (
        rest
        ):
        (
          null
        )))

        ListArzt = ListArzt.filter( Boolean );

        console.warn("values", ListArzt)

        this.setState({
          ListArzt:  ListArzt
        })

        this.setState({
          filters:  true
        })

        this.setState({
          NumberofPages:  Math.ceil(ListArzt.length/4)
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
       ListArzt:  QueryList.slice(one, two)
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

    // console.warn("result", this.state.ListArzt.slice(0, 4))
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
       ListArzt:  QueryList.slice(one, two)
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
    const { firstQuery, searchopen, Praxis, nutzername, Vorname, Nachname, Email } = this.state;
    
    // const subscription = API.graphql(
    //   graphqlOperation(subscriptions.onCreateArzt)
    //   ).subscribe({
    //       next: (ArztData) => this.GetArzt()
    //   });

    let Praxise = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.Praxis 
        }
      ))
    ];

    let Nutzernamen = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.username 
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

    return (
           <>
           <Block flex center style={styles.home}>
           <ScrollView contentContainerStyle={styles.articles}>
           <Modal 
        isVisible={this.state.filteropen}
        backdropOpacity = {0.7}
        coverSreen={false}>
           <View style={styles.content}>
              <Text style={styles.contentTitle}>FILTER</Text>

              <Dropdown
              label='Praxis'
              value={Praxis}
              style={{ width: 60 }}
              onChangeText={ (Praxis) => this.setState({ Praxis }) }
              data={Praxise}
              />

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
                <Card.Title title="Arzten" subtitle="Arzten" left={(props) => <Avatar.Icon {...props} icon="person" />} />
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
        {this.state.ListArzt.map((rest, i) => (
        <DataTable.Row>
          <DataTable.Cell>{rest.username}</DataTable.Cell>
          <DataTable.Cell>{rest.Vorname}</DataTable.Cell>
          <DataTable.Cell>{rest.Nachname}</DataTable.Cell>
          <DataTable.Cell>{rest.Email}</DataTable.Cell>
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
                </Card.Actions>
            </Card>

            </ScrollView>
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