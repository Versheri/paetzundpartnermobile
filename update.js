import React from 'react';
import * as mutations from './API/mutations2'
import WithProvider from './newApp'
import { View } from 'react-native'




class Update extends React.Component {

  async componentDidMount() {
    this.get();
  } 


   get = async() => {
      console.log("Patient",this.props.updateId.id, this.props.client)
      var h = this.props.updateId
      var recordId = this.props.updateId.id
      var version = this.props.updateId._version
      const client=this.props.client
      console.log("Patient",h)

      if ( this.props.group == "Patient" ) {
        const query2 = mutations.updatePatient2;
        const variables2={
          id:recordId,
          Formular:'2',
          status:'ACTIVE',
          _version: version+1}
        const variables={input:variables2, expectedVersion: version, condition:{Formular:{ eq: '1' }}}
         
         const result2 = await this.props.client.mutate({
          mutation: query2,
          variables ,
      });
      }
      if ( this.props.group == "Administrator" ) {
        const query2 = mutations.updateAdministrator2;
        const variables2={
          id:recordId,
          Formular:'2',
          status:'ACTIVE',
          _version: version+1}
        const variables={input:variables2, expectedVersion: version, condition:{Formular:{ eq: '1' }}}
         
         const result2 = await this.props.client.mutate({
          mutation: query2,
          variables ,
      });
      }
      if ( this.props.group == "PraxisAdministrator" ) {
        const query2 = mutations.updatePraxisGeschaeftsfuerung2;
        const variables2={
          id:recordId,
          Formular:'2',
          status:'ACTIVE',
          _version: version+1}
        const variables={input:variables2, expectedVersion: version, condition:{Formular:{ eq: '1' }}}
         
         const result2 = await this.props.client.mutate({
          mutation: query2,
          variables ,
      });
      }
      if ( this.props.group == "PraxisMitarbeiter" ) {
        const query2 = mutations.updatePraxisMitarbeiter2;
        const variables2={
          id:recordId,
          Formular:'2',
          status:'ACTIVE',
          _version: version+1}
        const variables={input:variables2, expectedVersion: version, condition:{Formular:{ eq: '1' }}}
         
         const result2 = await this.props.client.mutate({
          mutation: query2,
          variables ,
      });
    }  
      if ( this.props.group == "PflegeheimAdministrator" ) {
        const query2 = mutations.updatePflegeheimGeschaeftsfuerung2;
        const variables2={
          id:recordId,
          Formular:'2',
          status:'ACTIVE',
          _version: version+1}
        const variables={input:variables2, expectedVersion: version, condition:{Formular:{ eq: '1' }}}
         
         const result2 = await this.props.client.mutate({
          mutation: query2,
          variables ,
      });
      } 
      if ( this.props.group == "Arzt" ) {
        const query2 = mutations.updateArzt2;
        const variables2={
          id:recordId,
          Formular:'2',
          status:'ACTIVE',
          _version: version+1}
        const variables={input:variables2, expectedVersion: version, condition:{Formular:{ eq: '1' }}}
         
         const result2 = await this.props.client.mutate({
          mutation: query2,
          variables ,
      });
      } 
      if ( this.props.group == "Betreuer" ) {
        const query2 = mutations.updateBetreuer2;
        const variables2={
          id:recordId,
          Formular:'2',
          status:'ACTIVE',
          _version: version+1}
        const variables={input:variables2, expectedVersion: version, condition:{Formular:{ eq: '1' }}}
         
         const result2 = await this.props.client.mutate({
          mutation: query2,
          variables ,
      });
      }
      if ( this.props.group == "PflegeheimPDL" ) {
        const query2 = mutations.updatePflegeheimPDL2;
        const variables2={
          id:recordId,
          Formular:'2',
          status:'ACTIVE',
          _version: version+1}
        const variables={input:variables2, expectedVersion: version, condition:{Formular:{ eq: '1' }}}
         
         const result2 = await this.props.client.mutate({
          mutation: query2,
          variables ,
      });
    }  
    else return null;
    };

    render() {

      console.log("checkit", this.props.updateId )
      
      return (
          <View>
               <WithProvider/> 
              </View>
      );
        
        }
        }
       
    
  
  
  export default Update;