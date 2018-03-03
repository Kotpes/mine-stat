import React from "react";
import { Platform, StyleSheet, View, ScrollView } from "react-native";
import { observer } from "mobx-react/native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "native-base";
import { Container, Content, Picker, Form, Item } from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import store from "react-native-simple-store";
import observablePoolStore from "../store/poolStore";
import PoolCard from "../components/poolCard";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Pools"
  };

  static defaultProps = {
    store: observablePoolStore
  };

  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      modalVisible: false,
      availablePools: []
    };
  }

  componentDidMount() {
    this._getPools();
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  _getPools() {
    const { store } = this.props;
    try {
      const pools = store.pools;
      this.setState({ availablePools: pools });
    } catch (e) {
      console.log(e);
    }
  }
  _removePool(pool) {
    const { store } = this.props;
    store.removePool(pool);
    this._getPools();
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { availablePools } = this.state;
    console.log(availablePools);

    return (
      <Container style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            availablePools.length === 0
              ? styles.containerNoPools
              : styles.containerPools
          }
        >
          {availablePools.length > 0 ? (
            availablePools.map(pool => (
              <PoolCard data={pool} removePool={() => this._removePool(pool)} />
            ))
          ) : (
            <Text style={styles.helpText}>
              No pools found, please add one first
            </Text>
          )}

          <Button block iconLeft onPress={() => this._goToScreen("AddPool")}>
            <Ionicons name="md-add" color={"white"} size={20} />
            <Text style={styles.buttonText}>Add pool</Text>
          </Button>
        </ScrollView>
      </Container>
    );
  }
  _goToScreen = screen => {
    this.props.navigation.navigate(screen);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  containerNoPools: {
    flex: 1,
    //paddingTop: 50,
    flexDirection: "column",
    justifyContent: "center"
  },
  containerPools: {},
  helpText: {
    color: Colors.noticeText,
    marginBottom: 20,
    textAlign: "center"
  },
  modalContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#eee",
    paddingLeft: 20,
    paddingRight: 20
  },
  modalTitle: {
    fontSize: Fonts.heading2,
    fontFamily: "rubik-medium",
    textAlign: "center",
    marginBottom: 20
  }
});
