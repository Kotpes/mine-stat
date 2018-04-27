//@flow

import React from 'react';
import {Container, Content, ListItem, Separator} from 'native-base'
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'


type Props = {

}

type State = {

}

class SettingsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'About',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.sectionHeading}>
            About this app
          </Text>
          <Text>
            This app is a side project, that I work on when I have free time. New features/bux fixes
            will be introduced as soon as I have time for it.
          </Text>
        </Content>
      </Container>
    ) 
  }
}

export default SettingsScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  sectionHeading: {
    fontFamily: 'rubik-medium',
    fontSize: Fonts.heading3,
    marginBottom: 10,
    color: Colors.textColor,
  }
})