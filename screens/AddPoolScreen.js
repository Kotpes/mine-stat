import React from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Picker,
  Platform,
  View,
  SafeAreaView,
  Alert,
  Modal
} from "react-native";
import { Button, Text } from "native-base";
import { BarCodeScanner, Permissions } from "expo";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Icon
} from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import { Ionicons } from "@expo/vector-icons";
import store from "react-native-simple-store";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import Pools from "../static/pools.json";
import observablePoolStore from "../store/poolStore";
import { observer } from "mobx-react/native";

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Add pool"
  };
  static defaultProps = {
    store: observablePoolStore
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPool: undefined,
      selectedPoolLabel: "Select pool",
      visiblePicker: false,
      platform: Platform.OS,
      hasCameraPermission: null,
      modalVisible: false,
      walletAddress: "Wallet address",
      poolsData: Pools.items || [],
      customLabel: "",
      cryptoCode: "",
    };
  }

  componentDidMount() {
    const { store: { pools } } = this.props;
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  _toggleOpacity() {
    const { visiblePicker } = this.state;
    this.setState({ visiblePicker: !visiblePicker });
    if (!visiblePicker) {
      Keyboard.dismiss();
    }
  }

  _submitAlert() {
    const {
      selectedPoolLabel,
      walletAddress,
      hasCameraPermission,
      selectedPool,
      customLabel
    } = this.state;

    if (!selectedPool || selectedPool === 0) {
      Alert.alert("Pool is not selected", `Select pool first`, [
        { text: "OK" }
      ]);
    } else if (walletAddress === "Wallet address") {
      Alert.alert(
        "Wallet information is missing",
        `Add wallet address before continue`,
        [{ text: "OK" }]
      );
    } else if (customLabel === "") {
      Alert.alert(
        "Custom label is missing",
        `Add custom label for this pool before continue`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        `${customLabel} | ${selectedPoolLabel}`,
        `Wallet address: ${walletAddress}`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => this._handlePoolSubmit() }
        ],
        { cancelable: false }
      );
    }
  }

  _handlePoolSubmit() {
    const { walletAddress, customLabel, selectedPoolLabel, poolApiEndpoint, cryptoCode } = this.state;
    const { store } = this.props;

    const pool = {
      name: selectedPoolLabel,
      customLabel,
      wallet: walletAddress,
      poolApiEndpoint,
      cryptoCode,
    };

    try {
      store.addPool(pool);
      this.props.navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  }

  _handleBarCodeRead = data => {
    this.setState({ walletAddress: data && data.data });
    this.closeModal();
  };

  _onPickerValueChange(itemValue) {
    const { poolsData } = this.state;

    const selectedPoolLabel = poolsData.find(p => p.key === itemValue).label;
    const poolApiEndpoint = poolsData.find(p => p.key === itemValue).apiEndpoint;
    const cryptoCode = poolsData.find(p => p.key === itemValue).cryptoCode;    

    this.setState({
      selectedPool: itemValue,
      selectedPoolLabel,
      poolApiEndpoint,
      cryptoCode,
    });
  }

  render() {
    const {
      platform,
      visiblePicker,
      selectedPool,
      walletAddress,
      selectedPoolLabel,
      hasCameraPermission,
      poolsData
    } = this.state;

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
                  <Icon name={visiblePicker ? "arrow-up" : "arrow-down"} />
                </Button>

                <Item style={styles.input}>
                  <Input
                    style={styles.walletInput}
                    placeholder={walletAddress}
                    onFocus={() => visiblePicker && this._toggleOpacity()}
                    onChangeText={walletAddress =>
                      this.setState({ walletAddress })
                    }
                  />
                  <Icon
                    name="camera"
                    style={styles.cameraIcon}
                    onPress={() => this.openModal()}
                  />
                </Item>
                <Item style={styles.input}>
                  <Input
                    style={styles.walletInput}
                    placeholder="Custom label"
                    onChangeText={label =>
                      this.setState({ customLabel: label })
                    }
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
                  mode="dropdown"
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
                    );
                  })}
                </Picker>
              </SafeAreaView>
            )}
          </View>
          <Modal
            visible={this.state.modalVisible}
            animationType={"slide"}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#fff"
  },
  screenTitle: {
    fontSize: Fonts.heading1,
    fontFamily: "rubik-medium",
    textAlign: "center",
    marginBottom: 30
  },
  formContent: {
    flex: 1,
    justifyContent: "flex-start"
  },
  helpText: {
    flex: 1,
    fontSize: Fonts.heading2
  },
  closeIcon: {
    color: Colors.tintColor,
    fontSize: 40,
    padding: 5
  },
  closeButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  input: {
    marginBottom: 20,
    paddingLeft: 0,
    marginLeft: 0
  },
  picker: {
    top: -50
  },
  label: {
    color: Colors.lightGrey
  },
  form: {
    marginLeft: 0
  },
  textStyle: {
    fontSize: 20
  },
  dropDown: {
    left: -10
  },
  cameraIcon: {
    color: Colors.tintColor,
    fontSize: 30
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "grey"
  },
  barCodeScanner: {
    flex: 1
  },
  modalCloseIcon: {
    position: "absolute",
    fontSize: 50,
    padding: 5,
    bottom: 30,
    right: 30,
    color: "white",
    backgroundColor: "transparent"
  },
  walletInput: {
    marginLeft: 0,
    fontSize: 14
  }
});
