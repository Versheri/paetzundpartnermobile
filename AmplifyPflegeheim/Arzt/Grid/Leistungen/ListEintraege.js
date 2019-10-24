import React, { Component } from 'react';
import { AppRegistry, Text, Dimensions, ScrollView, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/AntDesign';
import { DataTable, Searchbar, Button, HelperText } from 'react-native-paper';
import { API, graphqlOperation }  from "aws-amplify";
import * as queries from '../../../graphql/queries';
import * as subscriptions from '../../../graphql/subscriptions';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import Images from './Images';
import Audios from './Audio';

import gql from 'graphql-tag';
import { buildMutation } from 'aws-appsync';
import CalendarStrip from './Strip'
import { List } from 'react-native-elements';


const { width } = Dimensions.get('screen');


export default class ListEintraege extends React.Component {
  

    state = {
        InitialState: [],
        Fullist: [],
        ListRecords: [],
        firstQuery: '',
        searchopen: false,
        range1: 0,
        range2: 4,
        currentPage: 1,
        NumberofPages: Number,
        disabledbackward: false,
        disabledforward: false,
        filteropen: false,
        datum: '',
        Eintrag: '',
        Leistungskette: '',
        chips: [],
        filters: false,
        today:'',
        month:'',
        yearh:'',
        selectedDate:'2019/09/15',
        Currentdate:'2019-09-12',
        Dates: [],
        patientId: "", 
    client: [],  
    Pflege: '', 
    Session:[],
    StandingSession:[],
    SessionList:  'Session1',
    Sessions:[],
    ListRecords2:'',
    RecordsList:[],
    Sessions:[],
    Pflegeheim:'',
    PflegeheimN:'',
    pass:'',
    selectedDate:'',
      };

    componentDidMount = async () => {

      const { navigation } = this.props;
const patientId = navigation.getParam('patientId');
const Pflegeheim = navigation.getParam('Pflegeheim');
const client = navigation.getParam('client');
const pass = navigation.getParam('pass');
const PflegeheimN = navigation.getParam('PflegeheimN');
const selectedDate = navigation.getParam('selectedDate')
      const SessionList = navigation.getParam('SessionList')
      const ListRecords = navigation.getParam('ListRecords')

      if (pass != null){
        this.setState({ showEintrag: true })
        this.setState({ showLeistung: true })
        this.setState({ PflegeheimN: PflegeheimN });
        this.setState({ pass: pass });
      
        }
      
      console.warn('selectedDatefff', selectedDate, ListRecords)
      console.warn('nav', navigation)
      
      this.setState({ patientId: patientId });
      this.setState({ Pflege: Pflegeheim });
      this.setState({ client: client });
      this.setState({ selectedDate: selectedDate });
              this.setState({ SessionList: SessionList });
              this.setState({ ListRecords2: ListRecords });

        this.GetRecords();

        var date = new Date().getDate()
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
   
    console.warn("Dates", Date.now(), date)
    console.warn("con", year+ '-' + month + '-' + date)

      }

    
      GetRecords = async () => {

        const result = await API.graphql(graphqlOperation(queries.listRecordss))
        
        var ListRecords2 = result.data.listRecordss.items.map((rest) => (
            rest.patient == this.props.patientId ? (
              rest
              ): null
          ))

          ListRecords2 = ListRecords2.filter( Boolean );

          console.log('array1: ', ListRecords2);
          console.log('array2: ', this.props.patientId);
          console.log('array3: ', result.data.listRecordss.items);

          var ListRecords = ListRecords2.reverse()


          var brak = ListRecords.map((rest) => rest.createdAt)

          console.warn("1", brak.sort())
          console.warn("2", ListRecords.reverse())
        
        this.setState({
            Fullist:  ListRecords
          })

        this.setState({
          InitialState:  ListRecords
        })
        this.setState({
          ListRecords:  ListRecords
        })
      
        this.setState({
          NumberofPages:  Math.ceil(ListRecords.length/4)
        })

        this.setState({
          Dates:  ListRecords.map((rest)=>(rest.datum))
        })

        console.warn('Dates1', this.props.patientId)
        console.warn('Dates3', ListRecords.map((rest)=>(rest.datum)))
        console.warn('Dates', this.state.Dates)
          
    
      }

      SuchFunktion = async (value) => {
        const Query = value.toLocaleLowerCase()
        console.warn("event", value)
        console.warn("event2", Query)
      
        this.setState({
          originState:  this.state.InitialState
        })
      //error persist because fields records and leistungskette are nul

         var ListRecords = this.state.InitialState.map((rest) => (
             rest.createdAt.toLocaleLowerCase().includes(Query) || rest.record.toLocaleLowerCase().includes(Query) ? (
                 rest
                 ):
                 (
                   null
                 )))
      
        ListRecords = ListRecords.filter( Boolean );
      
        console.log("InitialState", this.state.InitialState)
        console.warn("Result", ListRecords)
        console.warn("Result2", this.state.originState)

        this.setState({
               ListRecords:  ListRecords
             })
      
           if( Query== " " || Query == null){
             this.setState({
               ListRecords:  this.state.InitialState
             })
             console.warn("Me", Query)
           } else {
             this.setState({
               ListRecords:  ListRecords
             })
             console.warn("Me2", Query)
           }
        }
      
        toggleModal = () => {
          this.setState({ filteropen: !this.state.filteropen });
        };
      
        Reset = async (event) => {
        
          var ListRecords = this.state.Fullist.map((rest) => (
            rest.patient == this.props.patientId ? (
              rest
              ): null
          ))

          ListRecords = ListRecords.filter( Boolean );
      
          this.setState({
            InitialState:  ListRecords
          })
      
          this.setState({
              ListRecords:  ListRecords.slice(0, 4)
            })
          
            this.setState({
              NumberofPages:  Math.ceil(ListRecords.length/4)
            })
            
            //console.warn("result",username)
            //console.error("result",this.state.ListRecords)
          }
      
  render() {
    const { Record, SessionList, PflegeheimN, Extra, Kette, TypValue, patientId, client } = this.state;


    console.warn('800000000000000', this.props.PflegeheimN)

    const day = new Date(this.props.selectedDate).getDate()
    var month = new Date(this.props.selectedDate).getMonth() + 1; //Current Month
    var year = new Date(this.props.selectedDate).getFullYear(); //Current Year

    var combined = year+ '-' + month + '-' + day
    console.warn('619121911', combined)

    var ListRecords7 = this.state.ListRecords.map((rest) => (
      rest.datum != "DEL"?(
      rest.datum== combined ? (
        rest
        ): null) :null
    ))

    var date = new Date().getDate() -1

    ListRecords7 = ListRecords7.filter( Boolean );
    

    console.warn('mess8', this.state.ListRecords)

    console.warn("con5", year+ '-' + month + '-' + day)
    console.warn('mess4', this.state.ListRecords)
    console.warn('mess3', this.state.ListRecords.map((rest) => ( rest.datum+'T22:00:00.000Z')))

    return (
           <>
           <Block flex center style={styles.home}>

<DataTable>

        {ListRecords7.map((rest, i) => (
        <DataTable.Row>
          <DataTable.Cell>
               {"  "}</DataTable.Cell>


          <DataTable.Cell style={{ left: 20}} >
          { rest.audio.key != "-" ? (
            <Audios key={rest.audio.key} a={rest.audio.key}/>):(
            rest.file.key != "-" && rest.record != "" ?(

              <Text
                    onPress= {() =>  this.props.navigation.push('CreateLeistungen', 
                    {recordsid: rest.id, patientId: this.props.navigation.state.params.patientId,
                      client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.props.PflegeheimN,
                       pass: this.props.pass, selectedDate: this.props.selectedDate,
                       SessionList:this.state.SessionList, ListRecords:this.props.ListRecords,
                        tip:"newrun"})}>
              
                <><Images  navigation = {this.props.navigation} key={rest.file.key} p={rest.file.key}/>
                <Text style={{marginTop: 20}}> {rest.record}</Text></>

                </Text>


                ):
                ( rest.file.key != "-" && rest.record == "" || rest.record == null ?(

                  <Text
                    onPress= {() =>  this.props.navigation.push('CreateLeistungen', 
                    {recordsid: rest.id, patientId: this.props.navigation.state.params.patientId,
                      client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.props.PflegeheimN,
                       pass: this.props.pass, selectedDate: this.props.selectedDate,
                       SessionList:this.state.SessionList, ListRecords:this.props.ListRecords,
                        tip:"newrun"})}>
                  <Images key={rest.file.key} p={rest.file.key}/>
                  </Text>
                  
                  ):(

                    <Text
                    onPress= {() =>  this.props.navigation.push('CreateLeistungen', 
                    {recordsid: rest.id, patientId: this.props.navigation.state.params.patientId,
                      client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.props.PflegeheimN,
                       pass: this.props.pass, selectedDate: this.props.selectedDate,
                       SessionList:this.state.SessionList, ListRecords:this.props.ListRecords,
                        tip:"newrun"})}>
                    {rest.record}
                    </Text>

                  )
                ))
              }</DataTable.Cell>


          <DataTable.Cell style={{width:10, left: 80}}
          onPress= {() =>  this.props.navigation.push('CreateLeistungen', {recordsid: rest.id, patientId: this.props.navigation.state.params.patientId,
            client: client, Pflegeheim: this.state.Pflege, PflegeheimN: this.props.PflegeheimN, pass: this.props.pass, selectedDate: this.props.selectedDate,
             SessionList:this.state.SessionList, ListRecords:this.props.ListRecords, tip:"newrun"})}>
             <Icon 
              name="right" 
              size={20}/>
             </DataTable.Cell>

        </DataTable.Row>
        ))}

      </DataTable>


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