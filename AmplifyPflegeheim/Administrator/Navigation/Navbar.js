import React from "react";
import { DrawerItems } from "react-navigation";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  View
} from "react-native";

import Images from "../../../constants/Images";
import { DataTable, Card, Avatar, Searchbar, HelperText, Button  } from 'react-native-paper';


const { width } = Dimensions.get("screen");

const Drawer = props => (
  <View style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <View  style={styles.header, {flex:0.05}}>
      <Image styles={styles.logo} source={Images.Logo} />
    </View>
    <View style={styles.header, {flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </View>
  </View>
);

const Navbar = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: "white",
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: "white",
    inactiveTintColor: "#000",
    activeBackgroundColor: "transparent",
    itemStyle: {
      width: width * 0.75,
      backgroundColor: "transparent"
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: "normal"
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflow: "hidden"
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    // paddingBottom: theme.SIZES.BASE,
    // paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  }
});

export default Navbar;
