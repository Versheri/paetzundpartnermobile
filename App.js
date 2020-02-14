import React from 'react';

//AWS
import { Auth } from "aws-amplify"
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import AWS from 'aws-sdk'
import { ConfirmSignIn, 
          ConfirmSignUp, 
          ForgotPassword, 
          RequireNewPassword, 
          SignUp, 
          VerifyContact,
          withAuthenticator } from 'aws-amplify-react-native'

//react-native
import { View,
         Text, 
         Dimensions, 
         Image,
         } from 'react-native'

//react-native-paper
import { Subheading,
         Button,
         Card,
         TextInput } from 'react-native-paper';

//classes
import NewApp from './newApp'

//keyboard-aware-scroll-view
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

//images
import logo from './assets/logo.png'

//Text
import * as Textfile from './Textfile'

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

Amplify.configure(awsconfig);

AWS.config.update({ region: 'eu-central-1' });

AWS.config.update({ 
accessKeyId: "AKIAXYA4IHKA55IJRKPM",
secretAccessKey: "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", 
region: 'eu-central-1',

});

//MainApp
function Signout(props) {
  console.warn('Bobo: ', Auth.currentAuthenticatedUser())
    function signOut() {
      Auth.signOut()
        .then(() => {
          props.onStateChange('signedOut', null);
        })
        .catch(err => {
          console.log('err: ', err)
        })
    }
    
    return (
      <>
        <NewApp SignOut={signOut}/> 
      </>
    )
  }

  //AuthenticationHandling
  class MySignIn extends React.Component {

    state={
      username:'',
      password:'',
      code:'',
      usernameerr:false,
      passwerr:false,
      errormessage:'',
      view:true,
      viewPasswordReset:false,
      viewNewPassword:false,
      viewForgotPasswort:false,
      codeerr:false,
    };
   
    //Hand
    HandleSignIn(){
      Auth.signIn(this.state.username, this.state.password)
      .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
            const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
           Auth.completeNewPassword(
            user, 
            this.state.password,
            requiredAttributes
        )
                console.log(user);
        } else {
            null
        }
    })
      .catch(err =>{ 
        if(err.code == 'UserNotFoundException'){
          console.log('UserNotFoundException')
          this.setState({usernameerr: true})
          this.setState({errormessage: Textfile.AuthErrors.UserNotFoundException})
        } else if(err.code == 'NotAuthorizedException'){
          console.log('NotAuthorizedException')
          this.setState({passwerr: true})
          this.setState({errormessage: Textfile.AuthErrors.NotAuthorizedException})
        } else{
          if(this.state.uername=='' && this.state.password=='' ){
            this.setState({passwerr: true})
          this.setState({usernameerr: true})
          this.setState({errormessage: Textfile.AuthErrors.EmptyField})
          }
          else if(this.state.uername=='' ){
          this.setState({usernameerr: true})
          this.setState({errormessage: Textfile.AuthErrors.EmptyField})
          }
          else if(this.state.password=='' ){
            this.setState({passwerr: true})
          this.setState({errormessage: Textfile.AuthErrors.EmptyField})
          }
          
        }
         console.log('AuthError',err)});
    }

    ForgotPassword(){
     // console.log(this.state.username)
    Auth.forgotPassword(this.state.username)
    .catch(err =>{ 
      if(err.code == 'UserNotFoundException'){
        console.log('UserNotFoundException')
        this.setState({usernameerr: true})
        this.setState({errormessage: Textfile.AuthErrors.UserNotFoundException})
      } else{
        console.log('UserNotFoundException')
        this.setState({usernameerr: true})
        this.setState({errormessage: Textfile.AuthErrors.EmptyField})
      }
      console.log(err)})
      .then(data => {
        if(this.state.usernameerr==true){
          null
        } else {
        console.log(data)
                                          this.setState({viewForgotPasswort:false});
                                          this.setState({viewNewPassword:false});
                                          this.setState({viewPasswordReset:true});
                                          this.setState({view:false});
                                          this.setState({usernameerr: false});
                                          this.setState({passwerr: false});
                                          this.setState({errormessage: ''})
      }});
    }

    SubmitForgotPassword(){
      console.log(this.state.password, this.state.username, this.state.code)
    Auth.forgotPasswordSubmit(this.state.username, this.state.code, this.state.password)
    .then(data => console.log(data))
    .catch(err =>{ 
      if(err.code == 'UserNotFoundException'){
        console.log('UserNotFoundException')
        this.setState({usernameerr: true})
        this.setState({errormessage: Textfile.AuthErrors.UserNotFoundException})
      } else if(err.code == 'CodeMismatchException'){
        console.log('CodeMismatchException')
        this.setState({codeerr: true})
        this.setState({errormessage: Textfile.AuthErrors.CodeMismatchException})
      }else if(err.code == 'NotAuthorizedException'){
        console.log('NotAuthorizedException')
        this.setState({passwerr: true})
        this.setState({errormessage: Textfile.AuthErrors.NotAuthorizedException})
      } else{
        if(this.state.uername=='' && this.state.password=='' ){
          this.setState({passwerr: true})
        this.setState({usernameerr: true})
        this.setState({errormessage: Textfile.AuthErrors.EmptyField})
        }
        else if(this.state.uername=='' ){
        this.setState({usernameerr: true})
        this.setState({errormessage: Textfile.AuthErrors.EmptyField})
        }
        else if(this.state.password=='' ){
          this.setState({passwerr: true})
        this.setState({errormessage: Textfile.AuthErrors.EmptyField})
        }
        
      }
       console.log('AuthError',err)})
       .then(() => {
         if(this.state.codeerr==true || this.state.passwerr==true || this.state.usernameerr==true){
           null
         } else { 
            this.setState({viewForgotPasswort:false});
            this.setState({viewNewPassword:false});
            this.setState({viewPasswordReset:false});
            this.setState({view:true});
            this.setState({usernameerr: false});
            this.setState({passwerr: false});
            this.setState({errormessage: ''});
         }
        });
    }


    render() {
      //value mobile: 360
      //value tablet: 1024
      //value web: 1920

      //Styles
      const stilView= width>= 1750?
                     ({flex:1, width: '100%', backgroundColor: 'blue'})
                     :
                     (width>=980?
                      ({flex:1, backgroundColor: 'blue', width: width})
                      :
                      (width>=0?
                        ({flex:1, backgroundColor: 'blue', width: width}):
                        (null)))

      const stilKeyboard= width>= 1750?
      ({ marginTop: 90,minWidth:'50%', maxWidth:'80%', alignSelf:'center', backgroundColor: '#FEFDFD'})
      :
      (width>=980?
        ({ marginTop: 90, maxWidth: width/1.5, alignSelf:'center', backgroundColor: '#FEFDFD'})
        :
        (width>=0?
          ({ marginTop: 90, maxWidth: width, alignSelf:'center', backgroundColor: '#FEFDFD'})
          :
          (null)))

      const stilCardmain= width>= 1750?
      ({width: '100%', alignSelf:'center', marginTop:'10%'})
      :
      (width>=980?
        ({width: width/1.5, alignSelf:'center', marginTop:'10%'})
      :
      (width>=0?
        ({width: width, alignSelf:'center', marginTop:'10%'})
        :
        (null)))
      
       const stilCardaction= width>= 1750?
         ({ width:'100%', alignSelf:'center', marginTop:10})
         :
         (width>=980?
           ({alignSelf:'center', marginTop:10})
         :
         (width>=0?
         ({alignSelf:'center', marginTop:10})
           :
           (null)))
        
       const stilButton= width>= 1750?
         ({minWidth: '100%', maxWidth:900})
         :
         (width>=980?
           ({width: '100%'})
         :
         (width>=0?
           ({width: '100%'})
           :
           (null)))
      
        // const stilCardaction= width<= 1750?
        // (null)
        // :
        // (width<=980?
        //   (null)
        // :
        // (width<=0?
        //   (null)
        //   :
        //   (null)))


      console.warn(Dimensions.get('screen'))
      if (this.props.authState !== 'signIn') {
        return null;
      } else{
        return(
          <View style={stilView} >
  
          <KeyboardAwareScrollView
          //contentContainerStyle={styles.container}
          contentContainerStyle={stilKeyboard}
          scrollEnabled={true}
          enableResetScrollToCoords= {false}
          enableAutomaticScroll
          innerRef={ref => {
            this.scroll = ref
          }}
          keyboardDismissMode='on-drag'
          >
          <Card style={stilCardmain}>
            {this.state.view==true?(
              
              <>
              {width >= 1750?(
              <Card.Title style={{alignSelf:'center'}} title={Textfile.Anmelden}></Card.Title>
              ):(
              <Card.Content>
                <Subheading style={{alignSelf:'center'}}>{Textfile.Anmelden}</Subheading>
              </Card.Content>
              )}
    
              <Card.Content>
              <Image source={logo} style={{ width: 50, height: 50, alignSelf:'center'}}/>
              </Card.Content>
      
              <Card.Content style={{marginTop:35}}>
              <TextInput
              mode='outlined'
              label={Textfile.Nutzername}
              error= {this.state.usernameerr}
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
               />
              { this.state.usernameerr==true?(
               <Text style={{color:'red'}}>{this.state.errormessage}</Text>
               ):(null)}
              </Card.Content>
      
              <Card.Content style={{marginTop:25}}>
              <TextInput
              mode='outlined'
              label={Textfile.Passwort}
              error= {this.state.passwerr}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
               />
              { this.state.passwerr==true?(
               <Text style={{color:'red'}}>{this.state.errormessage}</Text>
               ):(null)}
               <Button onPress={()=>{this.setState({viewForgotPasswort:true});
                                      this.setState({viewNewPassword:false});
                                      this.setState({viewPasswordReset:false});
                                      this.setState({view:false});
                                      this.setState({usernameerr: false});
                                      this.setState({passwerr: false});
                                      this.setState({errormessage: ''})}} style={{alignSelf:'center'}}>{Textfile.ForgotPassword}</Button>
              </Card.Content>
      
              <Card.Actions style={stilCardaction}>
                <Button onPress={()=>this.HandleSignIn()} mode='contained' style={stilButton}>{Textfile.Einloggen}</Button>
              </Card.Actions>
              </>

            ):(this.state.viewNewPassword==true?(null):(this.state.viewPasswordReset==true?(
              <>
              {width >= 1750?(
              <Card.Title style={{alignSelf:'center'}} title={Textfile.Anmelden}></Card.Title>
              ):(
              <Card.Content>
                <Subheading style={{alignSelf:'center'}}>{Textfile.Anmelden}</Subheading>
              </Card.Content>
              )}
    
              <Card.Content>
              <Image source={logo} style={{ width: 50, height: 50, alignSelf:'center'}}/>
              </Card.Content>

              <Card.Content style={{marginTop:25}}>
                <Subheading style={{alignSelf:'center', width:'90%'}}>{Textfile.ForgotPasswordResponse}</Subheading>
              </Card.Content>

              <Card.Content>
              <TextInput
              mode='outlined'
              label={Textfile.Code}
              error= {this.state.codeerr}
              value={this.state.code}
              onChangeText={code => this.setState({ code })}
               />
              { this.state.codeerr==true?(
               <Text style={{color:'red'}}>{this.state.errormessage}</Text>
               ):(null)}
               </Card.Content>
      
              <Card.Content style={{marginTop:35}}>
              <TextInput
              mode='outlined'
              label={Textfile.Nutzername}
              error= {this.state.usernameerr}
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
               />
              { this.state.usernameerr==true?(
               <Text style={{color:'red'}}>{this.state.errormessage}</Text>
               ):(null)}
              </Card.Content>

              <Card.Content style={{marginTop:25}}>
              <TextInput
              mode='outlined'
              label={Textfile.Passwort}
              error= {this.state.passwerr}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
               />
              { this.state.passwerr==true?(
               <Text style={{color:'red'}}>{this.state.errormessage}</Text>
               ):(null)}
               </Card.Content>
      
              <Card.Content style={{marginTop:25}}>
               <Button onPress={()=>{this.setState({viewForgotPasswort:false});
                                      this.setState({viewNewPassword:false});
                                      this.setState({viewPasswordReset:false});
                                      this.setState({view:true});
                                      this.setState({usernameerr: false});
                                      this.setState({passwerr: false});
                                      this.setState({errormessage: ''})}} style={{alignSelf:'center'}}>{Textfile.BackToLogin}</Button>
              </Card.Content>
      
              <Card.Actions style={stilCardaction}>
                <Button onPress={()=>this.SubmitForgotPassword()} mode='contained' style={stilButton}>{Textfile.Fertig}</Button>
              </Card.Actions>
              </>
            ):(this.state.viewForgotPasswort==true?(
             
             <>
              {width >= 1750?(
              <Card.Title style={{alignSelf:'center'}} title={Textfile.Anmelden}></Card.Title>
              ):(
              <Card.Content>
                <Subheading style={{alignSelf:'center'}}>{Textfile.Anmelden}</Subheading>
              </Card.Content>
              )}
    
              <Card.Content>
              <Image source={logo} style={{ width: 50, height: 50, alignSelf:'center'}}/>
              </Card.Content>
      
              <Card.Content style={{marginTop:35}}>
              <TextInput
              mode='outlined'
              label={Textfile.Nutzername}
              error= {this.state.usernameerr}
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
               />
              { this.state.usernameerr==true?(
               <Text style={{color:'red'}}>{this.state.errormessage}</Text>
               ):(null)}
              </Card.Content>
      
              <Card.Content style={{marginTop:25}}>
               <Button onPress={()=>{this.setState({viewForgotPasswort:false});
                                      this.setState({viewNewPassword:false});
                                      this.setState({viewPasswordReset:false});
                                      this.setState({view:true});
                                      this.setState({usernameerr: false});
                                      this.setState({passwerr: false});
                                      this.setState({errormessage: ''})}} style={{alignSelf:'center'}}>{Textfile.BackToLogin}</Button>
              </Card.Content>
      
              <Card.Actions style={stilCardaction}>
                <Button onPress={()=>this.ForgotPassword()} mode='contained' style={stilButton}>{Textfile.ResetPassword}</Button>
              </Card.Actions>
              </>
            ):(null))))}
           
          </Card>
  
          </KeyboardAwareScrollView>
  
          </View>
        );
      }
    }
  }

   export default withAuthenticator(Signout, false, [
     <MySignIn/>,
     <ConfirmSignIn/>,
     <VerifyContact/>,
     <SignUp/>,
     <ConfirmSignUp/>,
     <ForgotPassword/>,
     <RequireNewPassword />
   ]);