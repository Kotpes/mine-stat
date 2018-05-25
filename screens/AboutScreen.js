//@flow

import React from 'react'
import {Container, Content, ListItem, Separator, Button, Icon} from 'native-base'
import {View, Text, SafeAreaView, ScrollView, StyleSheet, Linking} from 'react-native'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'

type Props = {}

type State = {
  showToast: boolean,
}

class AboutScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'About',
  }

  state = {
    showToast: false,
  }

  _onSendBugReportPress = async() => {
    Linking.openURL('mailto: minestatapp@gmail.com');
  }

  render() {

    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>About this app</Text>
            <Text>
              This app is a side project, that I work on when I have free time. New features/bux fixes will be
              introduced as soon as I have time for it.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Supported pools</Text>
            <Text style={styles.paragraph}>
              List of supported pools will be expanded over time. Supported pools so far:
            </Text>
            <Text style={styles.listItem}>- (ETH) Ethermine.org</Text>
            <Text style={styles.listItem}>- (ETH) Ethpool.org</Text>
            <Text style={styles.listItem}>- (ETC) Ethpool.org</Text>
            <Text style={styles.listItem}>- (ZEC) Flypool Zcash</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Feedback</Text>
            <Text>
              Feedback is appreciated, but keep in mind that this app comes "as is", as I work on it during my free
              time. If you find this app usefull - please rate it on app store.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Bug report</Text>
            <Text style={styles.paragraph}>
              If you encounter a bug please send me a message with description of what happened and, possibly,
              screenshot.
            </Text>
            <Button style={styles.fullWidthButton} iconRight info onPress={() => this._onSendBugReportPress()}>
              <Text style={styles.buttonText}>Send a bug report</Text>
              <Icon name="paper-plane" />
            </Button>
          </View>
        </Content>
      </Container>
    )
  }
}

export default AboutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionHeading: {
    fontFamily: 'rubik-medium',
    fontSize: Fonts.heading3,
    marginBottom: 10,
    color: Colors.textColor,
  },
  section: {
    marginBottom: 20,
    flex: 1,
  },
  listItem: {
    flex: 1,
  },
  paragraph: {
    fontFamily: 'rubik-regular',
    marginBottom: 10,
  },
  fullWidthButton: {
    flexDirection: 'row',
    flex: 1,
    paddingLeft: 15,
  },
  buttonText: {
    fontFamily: 'rubik-medium',
    fontSize: Fonts.heading5,
    color: 'white',
    marginRight: 10,
  },
})
