import {Notifications} from 'expo'
import React from 'react'
import {StackNavigator} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import PoolStatDetails from '../screens/PoolStatDetails'
import AddPoolScreen from '../screens/AddPoolScreen'
import SettingsScreen from '../screens/SettingsScreen'
import observablePoolStore from '../store/poolStore'

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
    AddPool: {
      screen: AddPoolScreen,
    },
    poolStatDetails: {
      screen: PoolStatDetails,
    },
    Settings: {
      screen: SettingsScreen,
    }
  },
  // {
  //   initialRouteName: 'AddPool',
  // },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  },
)

export default class RootNavigator extends React.Component {

  render() {
    return <RootStackNavigator store={observablePoolStore} />
  }
}
