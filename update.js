import React from 'react';
import * as mutations from './AmplifyPflegeheim/graphql/mutations'
import { API, graphqlOperation }  from "aws-amplify";
import WithProvider from './WithProvider'



class Update extends React.Component {
    

  
    async componentDidMount() {
      this.get();
  
    } 

    get = () => {
        console.log("Patient",this.props.updateId)
        var h = this.props.updateId
        console.log("Patient",h)

        if ( this.props.group == "Patient" ) {
            const k = {
                id: this.props.updateId,
                Formular: "2"
              }
              API.graphql(graphqlOperation(mutations.updatePatient2, {input: k}))
              .catch(err => console.log(err))
        }
        if ( this.props.group == "PraxisAdministrator" ) {
            const k = {
                id: this.props.updateId,
                Formular: "2"
              }
              API.graphql(graphqlOperation(mutations.updatePraxisGeschaeftsfuerung2, {input: k}))
              .catch(err => console.log(err))
        } 
        if ( this.props.group == "PflegeheimAdministrator" ) {
            const k = {
                id: this.props.updateId,
                Formular: "2"
              }
              API.graphql(graphqlOperation(mutations.updatePflegeheimGeschaeftsfuerung2, {input: k}))
              .catch(err => console.log(err))
        } 
        if ( this.props.group == "Arzt" ) {
            const k = {
                id: this.props.updateId,
                Formular: "2"
              }
              API.graphql(graphqlOperation(mutations.updateArzt2, {input: k}))
              .catch(err => console.log(err))
        } 
        if ( this.props.group == "Betreuer" ) {
            const k = {
                id: this.props.updateId,
                Formular: "2"
              }
              API.graphql(graphqlOperation(mutations.updateBetreuer2, {input: k}))
              .catch(err => console.log(err))
        }
        if ( this.props.group == "PflegeheimPDL" ) {
          const k = {
              id: this.props.updateId,
              Formular: "2"
            }
            API.graphql(graphqlOperation(mutations.updatePflegeheimPDL2, {input: k}))
            .catch(err => console.log(err))
      }  else return null;
  
      };


  
    
    render() {
      console.log("checkit", this.props.updateId )
      
      return (
          <>
              <WithProvider/>
              </>
      );
        
        }
        }
       
    
  
  
  export default Update;