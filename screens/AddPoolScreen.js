import React from 'react'
import { ScrollView, StyleSheet, Picker, Platform } from 'react-native'
import { Button, Text } from 'native-base'
import { Container, Content, Form, Item, Input } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Add pool',
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedPool: 'Choose pool from list',
      visiblePicker: false,
      platform: Platform.OS,
    }
  }

  render() {
    const { platform, visiblePicker, selectedPool } = this.state
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Text style={styles.screenTitle}>Add pool</Text>
          <Content style={styles.form}>
            <Text
              onPress={() => this.setState({ visiblePicker: true })}
              style={styles.helpText}
            >
              Select pool from list
            </Text>
            <Text>Choose</Text>
            <Picker
              style={{ opacity: visiblePicker ? 1 : 0 }}
              selectedValue={selectedPool}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedPool: itemValue })
              }
            >
              <Picker.Item label="Ethermine.org" value="ethermineOrg" />
              <Picker.Item label="Ethpool.org" value="ethpool" />
              <Picker.Item label="Ethermine ETC" value="ethermineEtc" />
              <Picker.Item label="Flypool Zcash" value="flypoolZcash" />
            </Picker>
          </Content>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: Fonts.heading1,
    fontFamily: 'rubik-medium',
  },
  form: {
    marginTop: 30,
  },
  helpText: {
    fontSize: Fonts.heading2,
  },
})
