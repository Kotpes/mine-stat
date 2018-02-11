import React from 'react'
import {Platform, StyleSheet, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {Button, Text} from 'native-base'
import {Container, Content, Picker, Form, Item} from 'native-base'
import {Row, Grid} from 'react-native-easy-grid'
import store from 'react-native-simple-store'

import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Pools',
  }

  constructor(props) {
    super(props)
    this.state = {
      selected2: undefined,
      modalVisible: false,
      availablePools: undefined,
    }
  }

  componentWillMount() {
    this._getPools()
  }

  onValueChange2(value) {
    this.setState({
      selected2: value,
    })
  }

  async _getPools() {
    try {
      const pools = await store.get('pools')
      this.setState({availablePools: pools})
    } catch (e) {
      console.log(e)
    }
  }

  openModal() {
    this.setState({modalVisible: true})
  }

  closeModal() {
    this.setState({modalVisible: false})
  }

  render() {
    const {availablePools} = this.state

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Grid style={styles.grid}>
            <Row style={styles.row}>
              <Text>{`Found pool: ${availablePools &&
                availablePools[0].wallet}`}</Text>
              <Text style={styles.helpText}>
                No pools found, please add one first
              </Text>
              <Button
                block
                iconLeft
                onPress={() => this._goToScreen('AddPool')}
              >
                <Ionicons name="md-add" color={'white'} size={20} />
                <Text style={styles.buttonText}>Add pool</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
  _goToScreen = screen => {
    this.props.navigation.navigate(screen)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 50,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  helpText: {
    color: Colors.noticeText,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#eee',
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalTitle: {
    fontSize: Fonts.heading2,
    fontFamily: 'rubik-medium',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttonText: {
    fontFamily: 'rubik-regular',
    fontSize: 20,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
  },
})
