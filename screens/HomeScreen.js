import React from 'react'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Button, Text } from 'native-base'
import { Container, Content, Picker, Form, Item } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Pools',
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      selected2: undefined,
      modalVisible: false,
    }
  }

  onValueChange2(value) {
    this.setState({
      selected2: value,
    })
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Grid style={styles.grid}>
            <Row style={styles.row}>
              <Text style={styles.helpText}>
                No pools found, please add one first
              </Text>
              <Button block iconLeft onPress={() => this.goToScreen('AddPool')}>
                <Ionicons name="md-add" color={'white'} size={20} />
                <Text style={styles.buttonText}>Add pool</Text>
              </Button>

              <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.closeModal()}
                style={styles.modal}
              >
                <Content contentContainerStyle={styles.modalContainer}>
                  <View style={styles.innerContainer}>
                    <Text style={styles.modalTitle}>Add pool</Text>
                    <Text style={styles.helpText}>
                      Please, select pool from the list below
                    </Text>
                    <Content>
                      <Form>
                        <Picker
                          mode="dropdown"
                          placeholder="Select One"
                          selectedValue={this.state.selected2}
                          onValueChange={this.onValueChange2.bind(this)}
                        >
                          <Item label="Wallet" value="key0" />
                          <Item label="ATM Card" value="key1" />
                          <Item label="Debit Card" value="key2" />
                          <Item label="Credit Card" value="key3" />
                          <Item label="Net Banking" value="key4" />
                        </Picker>
                      </Form>
                    </Content>
                    <Button iconLeft onPress={() => this.closeModal()}>
                      <Text style={styles.buttonText}>Add pool</Text>
                    </Button>
                  </View>
                </Content>
              </Modal>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
  goToScreen = screen => {
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
