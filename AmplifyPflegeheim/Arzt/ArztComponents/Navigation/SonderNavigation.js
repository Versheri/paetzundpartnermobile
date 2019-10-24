import React from "react";
import { StyleSheet } from "react-native";
import { Block, Text, theme } from "galio-framework";

import Icon from "../../../../components/Icon";
import argonTheme from "../../../../constants/Theme";

class SonderNavigation extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="shop"
            family="ArgonExtra"
            size={10}
            color={focused ? "white" : argonTheme.COLORS.ICON}
          />
        );
      case "Elements":
        return (
          <Icon
            name="map-big"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : argonTheme.COLORS.ICON}
          />
        );
      case "Components":
        return (
          <Icon
            name="map-big"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : argonTheme.COLORS.ICON}
          />
        );
      case "Articles":
        return (
          <Icon
            name="spaceship"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : argonTheme.COLORS.ICON}
          />
        );
      case "Profile":
        return (
          <Icon
            name="chart-pie-35"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : argonTheme.COLORS.ICON}
          />
        );
      case "Account":
        return (
          <Icon
            name="calendar-date"
            family="ArgonExtra"
            size={12}
            color={focused ? "white" : argonTheme.COLORS.ICON}
          />
        );
      case "Getting Started":
        return <Icon />;
      case "Log out":
        return <Icon />;
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;
      const Pflegeheim = navigation.getParam('Pflegeheim')

      console.warn('nav', navigation)
      console.warn('ppp', Pflegeheim)

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <Block flex row style={containerStyles}>
        <Block row center flex={0.9}>
          <Text
            size={15}
            onPress={()=>this.props.navigation.push('PatientTable', {Pflegeheim:Pflegeheim})}
          >
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14
  },
  activeStyle: {
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default SonderNavigation;
