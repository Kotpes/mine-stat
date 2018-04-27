import React from 'react'
import {Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {TabNavigator, TabBarBottom} from 'react-navigation'

import Colors from '../constants/Colors'

import HomeScreen from '../screens/HomeScreen'
import AddPoolScreen from '../screens/AddPoolScreen'
import SettingsScreen from '../screens/SettingsScreen'

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state
        let iconName
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-albums${focused ? '' : '-outline'}`
                : 'md-albums'
            break
          case 'Settings':
            iconName =
              Platform.OS === 'ios'
                ? `ios-cog`
                : 'md-cog'
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{marginBottom: -3}}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        )
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
)
