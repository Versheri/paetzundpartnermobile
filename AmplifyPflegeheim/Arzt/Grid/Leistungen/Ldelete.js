import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, StyleSheet } from 'react-native';
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
      };
    componentDidMount = async () => {
        this.GetRecords();
        const subscription = API.graphql(
          graphqlOperation(subscriptions.onCreateRecords)
          ).subscribe({
              next: (RecordData) => this.GetRecords()
          });

          const subscription2 = API.graphql(
            graphqlOperation(subscriptions.onCreateRecords2)
            ).subscribe({
                next: (RecordData) => this.GetRecords()
            });

          console.warn("reperformed")
      }

    
      GetRecords = async () => {

        const result = await API.graphql(graphqlOperation(queries.listRecordss))
        
        var ListRecords2 = result.data.listRecordss.items.map((rest) => (
            rest.patient == this.props.patientId ? (
              rest
              ): null
          ))

          ListRecords2 = ListRecords2.filter( Boolean );

          var ListRecords = ListRecords2.reverse()

          var array1 = ['one', 'two', 'three'];
          // datetable
          // b1 and zähler
          console.log('array1: ', array1);
          // expected output: Array ['one', 'two', 'three']

          var reversed = array1.reverse(); 
          console.log('reversed: ', reversed);

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
          ListRecords:  ListRecords.slice(0, 4)
        })
      
        this.setState({
          NumberofPages:  Math.ceil(ListRecords.length/4)
        })
          
    
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
      
        resetFilter () {
          this.setState({
            datum:  ''
          })
          this.setState({
            Eintrag:  ''
          })
          this.setState({
            Leistungskette:  ''
          })
          this.setState({
            filters:  false
          })
          this.Reset().catch((err)=> console.warn("error2", err))
        }
      
        FilterFunktion = async () => {
          this.setState({ filteropen: !this.state.filteropen });
          var one = this.state.datum
          var two = this.state.Eintrag
          var three = this.state.Leistungskette

          console.warn("eintrag", this.state.Eintrag)
          console.warn("eintrag", one)
      
          var QueryList = this.state.InitialState;
          if(this.state.Eintrag != "" && this.state.datum != ""){
            console.warn("1")
          var ListRecords = this.state.InitialState.map((rest) => (
            rest.createdAt == one && rest.record == two
             ? (
              rest
              ):
              (
                null
              )))
          } else if(this.state.Eintrag != "" && this.state.datum == ""){
            console.warn("2", two)
            var ListRecords = this.state.InitialState.map((rest) => (
               rest.record==two ? (
                rest
                ):
                (
                  null
                )))
          } else if(this.state.Eintrag == "" && this.state.datum != ""){ 
            console.warn("3")
            var ListRecords = this.state.InitialState.map((rest) => (
              rest.createdAt == one 
               ? (
                rest
                ):
                (
                  null
                )))
          }
      
              ListRecords = ListRecords.filter( Boolean );
      
              console.warn("values", ListRecords)

              this.setState({
                ListRecords:  []
              })
      
               this.setState({
                 filters:  true
               })
      
               this.setState({
                 NumberofPages:  Math.ceil(ListRecords.length/4)
               })

               
               this.setState({
                ListRecords:  ListRecords
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
             ListRecords:  QueryList.slice(one, two)
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
      
          // console.warn("result", this.state.ListRecords.slice(0, 4))
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
             ListRecords:  QueryList.slice(one, two)
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
    const { firstQuery, searchopen, datum, Eintrag, Leistungskette } = this.state;
    // const subscription = API.graphql(
    //   graphqlOperation(subscriptions.onCreateRecords)
    //   ).subscribe({
    //       next: (RecordData) => this.GetRecords()
    //   });
    console.warn("eintrag2", this.state.ListRecords)
    let Datum = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.createdAt 
        }
      ))
    ];
    let Eintrage = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.record 
        }
      ))
    ];
    let Leistungsketten = [
      ...this.state.InitialState.map((rest, i) => (
        {
         value: ' ',
         value: rest.Leistungskette 
        }
      ))
    ];
    return (
           <>
           <Block flex center style={styles.home}>

           <Modal 
        isVisible={this.state.filteropen}
        backdropOpacity = {0.7}
        coverSreen={false}>
           <View style={styles.content}>
              <Text style={styles.contentTitle}>FILTER</Text>

              <Dropdown
              label='Datum & Uhrzeit'
              value={datum}
              style={{ width: 60 }}
              onChangeText={ (datum) => this.setState({ datum }) }
              data={Datum}
              />

              <Dropdown
              label='Eintrag'
              value={Eintrag}
              style={{ width: 60 }}
              onChangeText={ (Eintrag) => this.setState({ Eintrag }) }
              data={Eintrage}
              />
              
              {/* <Dropdown
              label='Kette'
              value={Leistungskette}
              style={{ width: 60 }}
              onChangeText={ (Leistungskette) => this.setState({ Leistungskette }) }
              data={Leistungsketten}
              /> */}

              <Button onPress={this.FilterFunktion}>Fertig</Button>
              <Button onPress={this.toggleModal}>Abbrechen</Button>
            </View>
        </Modal>

           {searchopen &&
       <>
       <Searchbar
        placeholder="Search"
        onChangeText={(query) => { this.setState({ firstQuery: query });
                                    this.SuchFunktion(firstQuery) }}
        value={firstQuery}
      />
      <Icon 
              onPress={() => {this.setState({ searchopen: false })
                              this.SuchFunktion(" ")}} 
              name="close" 
              size={30}/>
              </>
      }


           <DataTable>
           <DataTable.Header>
          {!searchopen&&
          <>
              <Icon 
              onPress={() => this.setState({ searchopen: true })} 
              name="search1" 
              size={30}/>
              <Icon 
              onPress={() => this.setState({ filteropen: true })} 
              name="filter" 
              style={{ left: 20}}
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
          <DataTable.Title >{"Datum"}</DataTable.Title>
          <DataTable.Title >{"Zahn"}</DataTable.Title>
          <DataTable.Title style={{ left: 60}}>Eintrag</DataTable.Title>
        </DataTable.Header>
        {this.state.ListRecords.map((rest, i) => (
        <DataTable.Row>
          <DataTable.Cell>{rest.datum}</DataTable.Cell>
          <DataTable.Cell style={{ left: 60}}>
          { rest.audio.key != "-" ? (
            <Audios key={rest.audio.key} a={rest.audio.key}/>):(
            rest.file.key != "-" && rest.record != "" ?(
                <><Images navigation = {this.props.navigation} key={rest.file.key} p={rest.file.key}/>
                <Text style={{marginTop: 20}}> {rest.record}</Text></>):
                ( rest.file.key != "-" && rest.record == "" || rest.record == null ?(
                  <Images key={rest.file.key} p={rest.file.key}/>):(
                    rest.record
                  )
                ))
              }</DataTable.Cell>
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