import React from 'react'
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Picker,
  Platform,
  View,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native'
import {Button, Text} from 'native-base'
import {BarCodeScanner, Permissions} from 'expo'
import {Container, Content, Form, Item, Input, Label, Icon} from 'native-base'
import {Row, Grid} from 'react-native-easy-grid'
import {Ionicons} from '@expo/vector-icons'
import store from 'react-native-simple-store'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import Pools from '../static/pools.json'

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Add pool',
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedPool: undefined,
      selectedPoolLabel: 'Select pool',
      visiblePicker: false,
      platform: Platform.OS,
      hasCameraPermission: null,
      modalVisible: false,
      walletAddress: 'Wallet address',
      poolsData: Pools.items || [],
    }
  }

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({hasCameraPermission: status === 'granted'})
  }

  componentDidMount() {
    this._getListOfPools()
  }

  openModal() {
    this.setState({modalVisible: true})
  }

  closeModal() {
    this.setState({modalVisible: false})
  }

  _toggleOpacity() {
    const {visiblePicker} = this.state
    this.setState({visiblePicker: visiblePicker ? false : true})
    if (!visiblePicker) {
      Keyboard.dismiss()
    }
  }

  _submitAlert() {
    const {
      selectedPoolLabel,
      walletAddress,
      hasCameraPermission,
      selectedPool,
    } = this.state
    console.log(walletAddress)
    if (!selectedPool || selectedPool === 0) {
      Alert.alert('Pool is not selected', `Select pool first`, [{text: 'OK'}])
    } else if (walletAddress === 'Wallet address') {
      Alert.alert(
        'Wallet information is missing',
        `Add wallet address before continue`,
        [{text: 'OK'}],
      )
    } else {
      Alert.alert(
        'Pool info',
        `Selected pool: ${selectedPoolLabel} Wallet address: ${walletAddress}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => this._handlePoolSubmit()},
        ],
        {cancelable: false},
      )
    }
  }

  async _handlePoolSubmit() {
    const {selectedPool, walletAddress} = this.state

    const existingPool = await store.get('pools')

    const PoolInfo = {
      key: selectedPool,
      wallet: walletAddress,
    }
    try {
      await store.push('pools', PoolInfo)
      this.props.navigation.navigate('Main')
    } catch (e) {
      console.log(e)
    }
  }

  async _getListOfPools() {
    try {
      const pools = await store.get('pools')
      console.log(pools)
    } catch (e) {
      console.log(e)
    }
  }

  _handleBarCodeRead = data => {
    this.setState({walletAddress: data && data.data})
    this.closeModal()
  }

  _onPickerValueChange(itemValue) {
    const {poolsData} = this.state
    console.log(poolsData[itemValue].label)
    this.setState({
      selectedPool: itemValue,
      selectedPoolLabel: poolsData[itemValue].label,
      visibleWalletField: true,
    })
  }

  render() {
    const {
      platform,
      visiblePicker,
      selectedPool,
      walletAddress,
      selectedPoolLabel,
      hasCameraPermission,
      poolsData,
    } = this.state

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Text style={styles.screenTitle}>Pool info</Text>
          <View style={styles.formContent}>
            <Form style={styles.form}>
              <View>
                <Button
                  transparent
                  dark
                  onPress={() => this._toggleOpacity()}
                  style={styles.dropDown}
                >
                  <Text style={styles.textStyle}>{selectedPoolLabel}</Text>
                  <Icon name={visiblePicker ? 'arrow-up' : 'arrow-down'} />
                </Button>

                <Item style={styles.input}>
                  <Input
                    style={styles.walletInput}
                    placeholder={walletAddress}
                    onFocus={() => this._toggleOpacity()}
                    onChangeText={walletAddress =>
                      this.setState({walletAddress})
                    }
                  />
                  <Icon
                    name="camera"
                    style={styles.cameraIcon}
                    onPress={() => this.openModal()}
                  />
                </Item>
                <Button block onPress={() => this._submitAlert()}>
                  <Text style={styles.buttonText}>Add pool</Text>
                </Button>
              </View>
            </Form>
            {visiblePicker && (
              <SafeAreaView>
                <Picker
                  selectedValue={selectedPool}
                  onValueChange={itemValue =>
                    this._onPickerValueChange(itemValue)
                  }
                >
                  {poolsData.map(pool => {
                    return (
                      <Picker.Item
                        key={pool.key}
                        label={pool.label}
                        value={pool.key}
                      />
                    )
                  })}
                </Picker>
              </SafeAreaView>
            )}
          </View>
          <Modal
            visible={this.state.modalVisible}
            animationType={'slide'}
            onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              {hasCameraPermission && (
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={styles.barCodeScanner}
                />
              )}
              <Icon
                name="close"
                onPress={() => this.closeModal()}
                style={styles.modalCloseIcon}
              />
            </View>
          </Modal>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: Fonts.heading1,
    fontFamily: 'rubik-medium',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  helpText: {
    flex: 1,
    fontSize: Fonts.heading2,
  },
  closeIcon: {
    color: Colors.tintColor,
    fontSize: 40,
    padding: 5,
  },
  closeButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  input: {
    marginBottom: 20,
    paddingLeft: 0,
    marginLeft: 0,
  },
  picker: {
    top: -50,
  },
  label: {
    color: Colors.lightGrey,
  },
  form: {
    marginLeft: 0,
  },
  textStyle: {
    fontSize: 20,
  },
  dropDown: {
    left: -10,
  },
  cameraIcon: {
    color: Colors.tintColor,
    fontSize: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
  barCodeScanner: {
    flex: 1,
  },
  modalCloseIcon: {
    position: 'absolute',
    fontSize: 50,
    padding: 5,
    bottom: 30,
    right: 30,
    color: 'white',
    backgroundColor: 'transparent',
  },
  walletInput: {
    marginLeft: 0,
    fontSize: 14,
  },
})
