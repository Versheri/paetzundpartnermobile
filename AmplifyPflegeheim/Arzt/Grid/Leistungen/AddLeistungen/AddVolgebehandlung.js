import React, { Component } from 'react';
import { Text, Dimensions, ScrollView, View, StyleSheet, FlatList } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Block, theme } from 'galio-framework';
import { TextInput, HelperText, FAB, Button, IconButton, Headline, Dialog, Avatar, Card, Title, Paragraph, Portal, Provider } from 'react-native-paper';
import { API, Storage, Auth, graphqlOperation }  from "aws-amplify";
import * as FileSystem from 'expo-file-system';
import * as queries from '../../../../graphql/queries';
import * as mutations from '../../../../graphql/mutations';
import * as mutations2 from '../../../../graphql/mutations2';
import { createRecords } from '../../../../graphql/mutations';
import aws_exports from '../../../../../aws-exports'
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';

import gql from 'graphql-tag';
import { buildMutation } from 'aws-appsync';



const { width } = Dimensions.get('screen');


const initialState = {
    patient: "",
    Record: " ",
    image: [],
    audio: "",
    audio: File,
    displayimage: false,
    accessed: false,
    nav: '' ,
    patientId: "" ,
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
    Pflegeheim:"" ,
    pass:"",
    PflegeheimN:"",
    Distanz:[],
    Arzt:"",
    results:[],
    selectedDate:'',
    ListRecords:'',
     SessionList:'',
     Volgebehandlungen:[],
};

export default class AddVolgebehandlung extends React.Component {

  state = {
    ...initialState,
 };

 async  componentDidMount() {

    const { navigation } = this.props;
    const patientId = navigation.getParam('patientId')
    const Pflegeheim = navigation.getParam('Pflegeheim')
    const pass = navigation.getParam('pass')
    const PflegeheimN = navigation.getParam('PflegeheimN')
    const selectedDate = navigation.getParam('selectedDate')
    const SessionList = navigation.getParam('SessionList')
    const ListRecords = navigation.getParam('ListRecords')
    const Leistungsname = navigation.getParam('Leistungsname')

    console.warn('Leistungsname', Leistungsname)

            this.setState({ SessionList: SessionList });
            this.setState({ ListRecords: ListRecords });
    this.setState({ selectedDate: selectedDate });

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

    this.arrayContainsAnotherArray(Leistungsname)
    
  
}

async arrayContainsAnotherArray(value){

    const volge = await API.graphql(graphqlOperation(queries.listVolgebehandlungs))
    const k = volge.data.listVolgebehandlungs.items


    for(var i = 0; i < value.length; i++){
       var a = k.map((rest)=>(
            rest.Leistungsname.indexOf(value[i]) ?
            (null):(rest)   
        ))

        a = a.filter( Boolean );



        this.setState({Volgebehandlungen: a})
        
        this.setState({
            showfilteredkette:  true
          })
        

    }

    
  }

handleChange2 = event => {
  this.ListLeistungen().then(()=> this.setState({accessed: true}));
};

List() {
console.warn("in")
this.ListLeistungen()
.catch(err => console.warn("err",err))
.then(()=> this.setState({accessed: true}));
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

  ClearBehandlungen = async (value) => {
    
    var ListRecords = this.state.Volgebehandlungen.map((rest) => (
        rest.Name.includes(value) ? (
            null
          ): (
              rest
          )
      ))

      ListRecords = ListRecords.filter( Boolean );

      this.setState({
        Volgebehandlungen:  ListRecords
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

toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible });
  };


  Batch(){
    // console.warn('Behand', this.state.Volgebehandlungen)
    // console.warn('ExtraBehand', this.state.ExtraBehandlungen)

    console.warn('Arzt', this.state.Arzt)
      const Arztu =this.state.Arzt.map((rest)=>( rest.username))

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

    var date = new Date().getDate()
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
   
    console.warn("Dates", Date.now(), date)
    console.warn("con", year+ '-' + month + '-' + date)
    
    if (this.state.Volgebehandlungen != "" && this.state.ExtraBehandlungen != "" ){
    
    const Behand = this.state.Volgebehandlungen.map((rest, i) => (
                                                              { Name: rest.Name, 
                                                                patientId: this.state.patientId,
                                                                arztId: Arztu[0][0], 
                                                                 abrechnungsnummerprivat: rest.abrechnungsnummerprivat,
                                                                abrechnungsnummergesaetzlich: rest.abrechnungsnummergesaetzlich,
                                                                Leistungskette: '-', 
                                                                Status:'Offen',
                                                                Leistungsname:rest.Name,
                                                                datum: this.state.selectedDate, 
                                                                Session: this.state.SessionList, 
                                                                SessionTime: this.state.ListRecords}
                                                          ))
     var ExtraBehand = this.state.ExtraBehandlungen.map((behand, i) => (
                                                                      {Name: behand, 
                                                                        patientId: this.state.patientId,
                                                                        arztId: Arztu[0], 
                                                                         abrechnungsnummerprivat:"-",
                                                                        abrechnungsnummergesaetzlich: "-",
                                                                        Leistungskette: '-', 
                                                                        Status:'Offen',
                                                                        Leistungsname:behand,
                                                                        datum: this.state.selectedDate, 
                                                                        Session: this.state.SessionList, 
                                                                        SessionTime: this.state.ListRecords}))
    
    var newArray = Behand.slice();    
            ExtraBehand.forEach(function(element) {newArray.push(element);});
    
    this.setState({ BatchKette: newArray });
    
    // console.warn('Behandsoo', Bond)
    // console.warn('Behandsoo2', Bass)
    console.warn('Behandsoo3', Behand)
    console.warn('muai')
    console.warn('muchos', newArray)
    } else if(this.state.Volgebehandlungen == "" && this.state.ExtraBehandlungen == ""){
    console.warn('welldone')
    } else if(this.state.Volgebehandlungen != "" && this.state.ExtraBehandlungen == ""){
    
    const Behand = [this.state.Volgebehandlungen.map((rest, i) => (
        { Name: rest.Name, 
            patientId: this.state.patientId,
            arztId: Arztu[0], 
            Leistungsname:rest.Name, 
             abrechnungsnummerprivat: rest.abrechnungsnummerprivat,
            abrechnungsnummergesaetzlich: rest.abrechnungsnummergesaetzlich,
            Leistungskette: '-', 
            Status:'Offen',
            datum: this.state.selectedDate, 
            Session: this.state.SessionList, 
            SessionTime: this.state.ListRecords}
                                                          ))]
      const Bass = Behand[0]
      const Bond = Bass[0]
    
      this.setState({ BatchKette: Bass });
      console.warn('Behandsoo', Bond)
      console.warn('Behandsoo2', Bass)
      console.warn('Behandsoo3', Behand)
    console.warn('well')
    } else if(this.state.Volgebehandlungen == "" && this.state.ExtraBehandlungen != ""){
    
    const Behand = [this.state.ExtraBehandlungen.map((behand, i) => (
        {Name: behand, 
            patientId: this.state.patientId,
            arztId: Arztu[0], 
             abrechnungsnummerprivat:"-",
            abrechnungsnummergesaetzlich: "-",
            Leistungskette: '-', 
            Status:'Offen',
            datum: this.state.selectedDate, 
            Session: this.state.SessionList, 
            SessionTime: this.state.ListRecords,
            Leistungsname:behand}))]

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
    
    
      var rec ={
        record: "DEL", 
        patient: "DEL",
        Access: "DEL",
        abrechnungsnummerprivat: "DEL",
        abrechnungsnummergesaetzlich: "DEL",
        Leistungskette: "DEL",
         file, 
         audio,
         datum: "DEL",
         Session:"Session1",
         SessionTime:"11:00"
      }  
    
    var record2 = this.state.BatchKette;
    
    var record = [
    { record: 'max'},
    { record: 'carlos'},
    { record: 'jango'},
    ];
    
    console.warn('result', record)
    console.warn('result2', record2)
    
    const result = await API.graphql(graphqlOperation(mutations2.createOffeneVolgebehandlung2, {records: record2}))

    console.warn('result3', result)
    
   // this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId})
    }
    
    BatchProcess() {
    
    API.graphql(graphqlOperation(queries.listArzts2))
    .then(()=> this.Batch())
    .then(()=> this.BatchaddRecords())
    
    }

    both = async () => {

      console.warn("161912191", this.state.results)


      API.graphql(graphqlOperation(queries.listArzts2))
      .then(()=> this.Batch())
      .then(()=> this.BatchaddRecords())
      .catch((err)=> console.warn('err1', err))
      .catch((err)=> console.warn('err12', err))
      .then(()=> this.props.navigation.push('Leistungen', {patientId: this.props.navigation.state.params.patientId,
        client: this.props.navigation.state.params.client,
        Pflegeheim: this.state.Pflegeheim,
        PflegeheimN: this.state.PflegeheimN,
        pass: this.props.navigation.state.params.pass,
        selectedDate: this.state.selectedDate, SessionList:this.state.SessionList, ListRecords:this.state.ListRecords,
        Leistungsname:this.state.Volgebehandlung}))
  
      }
      
  render() {
    const { Record, Extra, Kette, TypValue, patientId, Volgebehandlungen } = this.state;

    console.warn('handlungen', this.state.Volgebehandlungen)

    return (
           <>
           <Block flex center style={styles.home}>
           <>
       <KeyboardAwareScrollView
            contentContainerStyle={{ width: width, backgroundColor: '#FEFDFD'}}
            scrollEnabled={true}
            enableResetScrollToCoords= {false}
            enableAutomaticScroll
            extraScrollHeight= {150}
            innerRef={ref => {
              this.scroll = ref
            }}
            keyboardDismissMode='on-drag'
            >

           <>

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
  
                 {Volgebehandlungen.map((rest, i) => (  
                  <FlatList
                  data={[{key: rest.Name}]}
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
               // onPress={() => console.warn(this.state.Volgebehandlungen)}
                >
                Hinzufügen
                </Button>

                <Button 
                icon="send" 
                mode="outlined" 
                style={styles.contentBody2} 
                onPress={() => this.both()}
                >
                Fertig
                </Button>
              </>
            </KeyboardAwareScrollView>
             </>
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