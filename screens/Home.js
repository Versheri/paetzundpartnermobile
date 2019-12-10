import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'react-native-paper';

import { Card } from '../components';
import articles from '../constants/articles';
//working
import AddPatient from '../AmplifyPflegeheim/Arzt/ArztComponents/ArztTables/AddPatient';
import MitarbeiterTable from '../AmplifyPflegeheim/Arzt/ArztComponents/ArztTables/MitarbeiterTable';
import Scheine from '../AmplifyPflegeheim/Arzt/Grid/Scheine/Scheine';
import Befunde from '../AmplifyPflegeheim/Arzt/Grid/Befunde/Befunde';
import PatientPage from '../AmplifyPflegeheim/Arzt/Grid/PatientPages/PatientPage';
import Planung from '../AmplifyPflegeheim/Arzt/Grid/Planung/Planung';
import Refrence from '../AmplifyPflegeheim/Arzt/Grid/Refrence';
//error
 import PatientTable from '../AmplifyPflegeheim/Arzt/ArztComponents/ArztTables/PatientTable';
 import Leistungen from '../AmplifyPflegeheim/Arzt/Grid/Leistungen/Leistungen';
import Eintrage from '../AmplifyPflegeheim/Arzt/Grid/Leistungen/EintraegePatient';


const { width } = Dimensions.get('screen');

class Home extends React.Component {
  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          <Card item={articles[0]} horizontal  />
          <Block flex row>
            <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
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
});

export default Home;
