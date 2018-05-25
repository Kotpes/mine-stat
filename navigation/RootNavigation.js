import {Notifications} from 'expo'
import React from 'react'
import {StackNavigator} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import PoolStatDetails from '../screens/PoolStatDetails'
import AddPoolScreen from '../screens/AddPoolScreen'
import AboutScreen from '../screens/AboutScreen'
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
    About: {
      screen: AboutScreen,
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
