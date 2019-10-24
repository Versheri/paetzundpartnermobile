import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { withAuthenticator } from 'aws-amplify-react-native'
import { Auth } from "aws-amplify";

import { Block } from "galio-framework";

// screens
import MitarbeiterTable from "../ArztTables/MitarbeiterTable";
import PatientTable from "../ArztTables/PatientTable";
import FolgeTermine from "../ArztTables/FolgeTermine";
import SelectedFolgetermin from "../ArztTables/SelectedFolgetermin";
import ProfilePage from "../../ArztPages/ProfilePage";
import PraxisPage from "../../ArztPages/PraxisPage";
import AddPatient from "../ArztTables/AddPatient";
import Leistungen from "../../Grid/Leistungen/Leistungen";
import CreateLeistungen from "../../Grid/Leistungen/CreateLeistungen";
import AddBild from "../../Grid/Leistungen/AddLeistungen/Addbild";
import AddCamera from "../../Grid/Leistungen/AddLeistungen/AddCamera";
import AddEintrag from "../../Grid/Leistungen/AddLeistungen/Addeintrag";
import AddAudio from "../../Grid/Leistungen/AddLeistungen/AddAudio";
import AddKette from "../../Grid/Leistungen/AddLeistungen/AddKette";
import AddVolgebehandlung from "../../Grid/Leistungen/AddLeistungen/AddVolgebehandlung";
import Befunde from "../../Grid/Befunde/Befunde";
import Planung from "../../Grid/Planung/Planung";
import Scheine from "../../Grid/Scheine/Scheine";
import PatientPage from "../../Grid/PatientPages/PatientPage";
import Refrence from "../../Grid/Refrence";
import Imageshown from "../../Grid/Leistungen/SchowImage/Imageshown";
import ListEintraege from "../../Grid/Leistungen/ListEintraege";
import { Button } from 'react-native-paper';
// drawer
import Navbar from "./Navbar";
import DrawerItem from "../../../../components/DrawerItem";

// header for screens
import Header from "../../../../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ProfilePagesStack = createStackNavigator(
  {
    ProfilePage: {
      screen: ProfilePage,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white style={{height: 50}} transparent title="ProfilePage" navigation={navigation}/>
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
    transitionConfig
  }
);

const PraxisPagesStack = createStackNavigator(
    {
        PraxisPage: {
        screen: PraxisPage,
        navigationOptions: ({ navigation }) => ({
          header: (
            <Header white transparent style={{height: 50}} title="PraxisPage" navigation={navigation} />
          ),
          headerTransparent: true
        })
      }
    },
    {
      cardStyle: { backgroundColor: "#FFFFFF" },
      transitionConfig
    }
  );

const PatientTableStack = createStackNavigator(
  {
    PatientTable: {
      screen: PatientTable,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="PatientTable" style={{height: 50}} navigation={navigation}/>
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const FolgeTermineStack = createStackNavigator(
  {
    FolgeTermine: {
      screen: FolgeTermine,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FolgeTermine" style={{height: 50}} navigation={navigation}/>
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const SelectedFolgeterminStack = createStackNavigator(
  {
    SelectedFolgetermin: {
      screen: SelectedFolgetermin,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="FolgeTermin" style={{height: 50}} navigation={navigation}/>,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const AddPatientStack = createStackNavigator(
  {
    AddPatient: {
      screen: AddPatient,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="AddPatient" style={{height: 50}} navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const LeistungensStack = createStackNavigator(
  {
    Leistungen: {
      screen: Leistungen,
      navigationOptions: ({ navigation, focused }) => ({
        header: <Header search point={0} style={{height: 15}} title="Leistungen" focused={focused} search navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const ImageshownStack = createStackNavigator(
  {
    Imageshown: {
      screen: Imageshown,
      navigationOptions: ({ navigation, focused }) => ({
        header: <Header title="Leistungen" focused={focused} navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const CreateLeistungenStack = createStackNavigator(
  {
    CreateLeistungen: {
      screen: CreateLeistungen,
      navigationOptions: ({ navigation }) => ({
        header: <Header search point={0} style={{height: 15}} title="Leistungen" navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const ListEintraegesStack = createStackNavigator(
  {
    ListEintraege: {
      screen: ListEintraege,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Leistungen" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const RefrenceStack = createStackNavigator(
  {
    Refrence: {
      screen: Refrence,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Refrence" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const BefundesStack = createStackNavigator(
  {
    Befunde: {
      screen: Befunde,
      navigationOptions: ({ navigation }) => ({
        header: <Header search style={{height: 15}} point={4} title="Befunde" navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const ScheinesStack = createStackNavigator(
  {
    Scheine: {
      screen: Scheine,
      navigationOptions: ({ navigation }) => ({
        header: <Header style={{height: 15}} search point={1} title="Scheine" navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const PatientPagesStack = createStackNavigator(
  {
    PatientPage: {
      screen: PatientPage,
      navigationOptions: ({ navigation }) => ({
        header: <Header search style={{height: 15}} point={2} title="PatientPage" navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const PlanungStack = createStackNavigator(
  {
    Planung: {
      screen: Planung,
      navigationOptions: ({ navigation }) => ({
        header: <Header search style={{height: 15}} point={3} title="Planung" navigation={navigation} />,
        gesturesEnabled: false,
        headerLeft: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  }
);

const MitarbeiterTablesStack = createStackNavigator(
    {
        MitarbeiterTable: {
        screen: MitarbeiterTable,
        navigationOptions: ({ navigation }) => ({
          header: <Header style={{height: 50}} title="MitarbeiterTable" navigation={navigation} />
        })
      }
    },
    {
      cardStyle: {
        backgroundColor: "#F8F9FE"
      },
      transitionConfig
    }
  );


  const AddBildsStack = createStackNavigator(
    {
      AddBild: {
        screen: AddBild,
        navigationOptions: ({ navigation }) => ({
          header: <Header style={{height: 50}} title="Eintrag erstellen" navigation={navigation} />,
          gesturesEnabled: false,
          headerLeft: null
        })
      }
    },
    
    {
      cardStyle: {
        backgroundColor: "#F8F9FE"
      },
      transitionConfig
    }
  );

  const AddAudioStack = createStackNavigator(
    {
      AddAudio: {
        screen: AddAudio,
        navigationOptions: ({ navigation }) => ({
          header: <Header style={{height: 50}} title="Audio Aufnehmen" navigation={navigation} />,
          gesturesEnabled: false,
          headerLeft: null
        })
      }
    },
    
    {
      cardStyle: {
        backgroundColor: "#F8F9FE"
      },
      transitionConfig
    }
  );

  const AddVolgebehandlungsStack = createStackNavigator(
    {
      AddVolgebehandlung: {
        screen: AddVolgebehandlung,
        navigationOptions: ({ navigation }) => ({
          header: <Header style={{height: 50}} title="Volgebehandlungen" navigation={navigation} />,
          gesturesEnabled: false,
          headerLeft: null
        })
      }
    },
    {
      cardStyle: {
        backgroundColor: "#F8F9FE"
      },
      transitionConfig
    }
  );

  const AddCamerasStack = createStackNavigator(
    {
      AddCamera: {
        screen: AddCamera,
        navigationOptions: ({ navigation }) => ({
          header: <Header style={{height: 50}} title="Eintrag erstellen" navigation={navigation} />,
          gesturesEnabled: false,
         headerLeft: null
        })
      }
    },
    {
      cardStyle: {
        backgroundColor: "#F8F9FE"
      },
      transitionConfig
    }
  );

  const AddEintragsStack = createStackNavigator(
    {
      AddEintrag: {
        screen: AddEintrag,
        navigationOptions: ({ navigation }) => ({
          header: <Header style={{height: 50}} title="Eintrag erstellen" navigation={navigation} />,
          gesturesEnabled: false,
        headerLeft: null
        })
      }
    },
    {
      cardStyle: {
        backgroundColor: "#F8F9FE"
      },
      transitionConfig
    }
  );

  const AddKettesStack = createStackNavigator(
    {
      AddKette: {
        screen: AddKette,
        navigationOptions: ({ navigation }) => ({
          header: <Header style={{height: 50}} title="Eintrag erstellen" navigation={navigation} />,
          gesturesEnabled: false,
        headerLeft: null
        })
      }
    },
    {
      cardStyle: {
        backgroundColor: "#F8F9FE"
      },
      transitionConfig
    }
  );
// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    PatientTable: {
      screen: PatientTableStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <>
          <DrawerItem focused={focused} title="PatientTable" 
           />
          </>
        )
      })
    },
    FolgeTermine: {
      screen: FolgeTermineStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <>
          <DrawerItem focused={focused} title="FolgeTermine" />
          </>
        )
      })
    },
    SelectedFolgetermins: {
      screen: SelectedFolgeterminStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    AddPatients: {
      screen: AddPatientStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    Leistungens: {
      screen: LeistungensStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    Imageshowns: {
      screen: ImageshownStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    CreateLeistungens: {
      screen: CreateLeistungenStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    ListEintraeges: {
      screen: ListEintraegesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    Refrences: {
      screen: RefrenceStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    Planungs: {
      screen: PlanungStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    AddBilds: {
      screen: AddBildsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    AddAudios: {
      screen: AddAudioStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    AddVolgebehandlungs: {
      screen: AddVolgebehandlungsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    AddCameras: {
      screen: AddCamerasStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    AddEintrags: {
      screen: AddEintragsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    AddKettes: {
      screen: AddKettesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    Befundes: {
      screen: BefundesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    Scheines: {
      screen: ScheinesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    PatientPages: {
      screen: PatientPagesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          null
        )
      })
    },
    MitarbeiterTables: {
        screen: MitarbeiterTablesStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} screen="MitarbeiterTable" title="MitarbeiterTable" />
          )
        })
      },
    ProfilePages: {
      screen: ProfilePagesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="ProfilePage" title="ProfilePage" />
        )
      })
    },
    PraxisPages: {
        screen: PraxisPagesStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} screen="PraxisPage" title="PraxisPage" />
          )
        })
      },
      // Signout: {
      //   screen: PraxisPagesStack,
      //   navigationOptions: navOpt => ({
      //     drawerLabel: ({ focused, children }) => (
      //       <>
      //       {children}
      //       </>
      //     )
      //   })
      // },
  },
  Navbar
);

const AppContainer = createAppContainer(AppStack);



export default (AppContainer);
