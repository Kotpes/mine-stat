import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Button, Text } from 'native-base'
import { Container, Content } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Pools',
  }

  state = {
    modalVisible: false,
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
            <Row
              style={{
                height: 200,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Button block iconLeft onPress={() => this.openModal()}>
                <Ionicons name="md-add" color={'white'} size={20} />
                <Text style={styles.buttonText}>Add pool</Text>
              </Button>
              <Modal
                visible={this.state.modalVisible}
                animationType={'slide'}
                onRequestClose={() => this.closeModal()}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.innerContainer}>
                    <Text>This is content inside of modal component</Text>
                    <Button block iconLeft onPress={() => this.closeModal()}>
                      <Ionicons name="md-add" color={'white'} size={20} />
                      <Text style={styles.buttonText}>Add pool</Text>
                    </Button>
                  </View>
                </View>
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
  modalContainer: {
    marginTop: 50,
    backgroundColor: 'salmon',
  },
  grid: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttonText: {
    fontFamily: 'rubik-regular',
    fontSize: 20,
  },
})
