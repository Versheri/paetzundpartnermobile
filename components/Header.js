import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Picker, TextInput } from 'react-native';
import { Block, NavBar, Text, theme } from 'galio-framework';
import { Button } from 'react-native-paper';
import { DataTable, Card, Avatar, Searchbar, HelperText  } from 'react-native-paper';


import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';
import { API, Storage, Auth, graphqlOperation }  from "aws-amplify";
import aws_exports from '../aws-exports'
import * as mutations from '../AmplifyPflegeheim/graphql/mutations';
import * as queries from '../AmplifyPflegeheim/graphql/queries';
import SegmentedControlTab from "react-native-segmented-control-tab";


const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.push('Pro')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="bell"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.push('Pro')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.push('Pro')}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {

  state = {
    searchvalue: [],
    selectedIndex: 0,
  };

  //  componentDidMount = async () => {
  //      const point = this.props.navigation.getParam('point')

  //      console.warn('title', this.props.title)
  //      console.warn('22')
      
  //      this.setState({selectedIndex: this.props.point})
  //   }

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;
    const jack = 'kass'

    if (jack === 'Title') {
      return [
        <Text onPress={this.props.signOut}>Sign Out</Text>
      ]
    }

    switch (routeName) {
      case 'Home':
        return ([
          <BellButton key='chat-home' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-home' navigation={navigation} isWhite={white} />
        ]);
      case 'Deals':
        return ([
          <BellButton key='chat-categories' navigation={navigation} />,
          <BasketButton key='basket-categories' navigation={navigation} />
        ]);
      case 'Categories':
        return ([
          <BellButton key='chat-categories' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-categories' navigation={navigation} isWhite={white} />
        ]);
      case 'Category':
        return ([
          <BellButton key='chat-deals' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Profile':
        return ([
          <BellButton key='chat-profile' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

    handleIndexChange = index => {

      API.graphql(graphqlOperation(queries.listAdministrators))
      .then(()=>this.setState({
        ...this.state,
        selectedIndex: index
      }))
      .then(()=> this.Push())
    };

    Push() {
      const { navigation } = this.props;
      const patientId = navigation.getParam('patientId')
      const point = navigation.getParam('point')
      const Navval= this.state.selectedIndex
      console.warn("Navval", this.props.point)
      console.warn('state',this.state.selectedIndex)
      console.warn('navi',navigation)

       if(Navval == 0){
         this.props.navigation.push('Leistungen', {patientId: patientId, point: this.props.point} )
       } else if(Navval == 1){
        this.props.navigation.push('Scheine', {patientId: patientId, point: this.props.point} )
       } else if(Navval == 2){
        this.props.navigation.push('PatientPage', {patientId: patientId, point: this.props.point} )
       } else if(Navval == 3){
        this.props.navigation.push('Planung', {patientId: patientId, point: this.props.point})
       } else if(Navval == 4){
        this.props.navigation.push('Befunde', {patientId: patientId, point: this.props.point} )
       }

       this.setState({
        ...this.state,
        selectedIndex: Navval
      })

    };

  renderSearch = () => {
    const { searchvalue } = this.state;
    console.warn('nav22', this.props.navigation.state.routeName)

    const IndexRefrence = this.props.navigation.state.routeName == 'Scheine'?(
       1
    ):(
      this.props.navigation.state.routeName == 'Leistungen'?(
        0
      ):(
        this.props.navigation.state.routeName == 'PatientPage'?(
          2
        ):(
          this.props.navigation.state.routeName == 'Planung'?(
            3
          ):(
            this.props.navigation.state.routeName == 'Befunde'?(
              4
            ):(
              0
            )
          )
        )
      )
    )


    return (
       <SegmentedControlTab
    // borderWidth: 1,
    // borderRadius: 3,
    // borderColor: argonTheme.COLORS.BORDER
          style={styles.search}
          borderRadius={80}
          tabsContainerStyle={{ padding: 2, borderRadius:80, backgroundColor: argonTheme.COLORS.BORDER, borderColor: argonTheme.COLORS.BORDER, height: 35, width: width - 32, marginHorizontal: 16, marginBottom: 5 }}
          tabStyle={{ padding: 2, borderRadius:80, backgroundColor: argonTheme.COLORS.BORDER, borderColor: argonTheme.COLORS.BORDER }}
          tabTextStyle={{ color: '#ffffff' }}
          activeTabStyle={{ padding: 2, borderRadius:80, backgroundColor: '#ffffff' , borderColor: '#ffffff' }}
          activeTabTextStyle={{ color: argonTheme.COLORS.BORDER }}
          values={["Leistung", "Scheine", "P.Profil", "Planung", "Befunde"]}
          accessible={true}
          selectedIndex={IndexRefrence}
          onTabPress={this.handleIndexChange}
        />
    );
  }
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.push('Pro')}>
          <Block row middle>
            <Icon name="diamond" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles.tabTitle}>{optionLeft || 'Beauty'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.push('Pro')}>
          <Block row middle>
            <Icon size={16} name="bag-17" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON}/>
            <Text size={16} style={styles.tabTitle}>{optionRight || 'Fashion'}</Text>
          </Block>
        </Button>
      </Block>
    );
  }
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    )
  }
  renderHeader = () => {
    const { search, options, tabs, navigation } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <>
            <Icon 
              name={back ? 'nav-left' : "menu-8"} family="ArgonExtra" 
              size={14} onPress={this.handleLeftPress} 
              color={iconColor || argonTheme.COLORS.ICON}/>
              </>
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
});

export default withNavigation(Header);
