//@flow

import React from "react";
import { Platform, StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { observer } from "mobx-react/native";
import { Ionicons } from "@expo/vector-icons";
import { Button, Text } from "native-base";
import { Container, Content, Picker, Form, Item, Spinner } from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import store from "react-native-simple-store";
import observablePoolStore from "../store/poolStore";
import PoolCard from "../components/poolCard";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";

const colors = ["#77c7c8", "#fa8072", "#C5C1DE", "#ABBFA3", "#DCC468", "#C34441", "#74B9E8"]

@observer
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Pools"
  };

  static defaultProps = {
    store: observablePoolStore
  };

  state = {
    loadingPools: true,
    refreshing: false,
    modalVisible: false,
    availablePools: []
  };

  componentDidMount() {
    this._getPools();
  }

  _getPools() {
    const { store } = this.props;
    try {
      const pools = store.pools;
      this.setState({ 
        availablePools: pools,
        loadingPools: false,
      });
    } catch (e) {
      this.setState({ loadingPools: false });
      console.log(e);
    }
  }

  _removePool(pool) {
    const { store } = this.props;
    store.removePool(pool);
    this._getPools();
  }

  _onRefresh() {
    this._getPools();
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  render() {
    const { availablePools, refreshing, loadingPools } = this.state;

    return !loadingPools ? (
      <Container style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          contentContainerStyle={
            availablePools.length === 0
              ? styles.containerNoPools
              : styles.containerPools
          }
        >
          {availablePools.length > 0 ? (
            availablePools.map((pool, i) => (
              <PoolCard  key={pool.index} data={pool} shadowColor={colors[Math.floor(Math.random()*colors.length)]} removePool={() => this._removePool(pool)} onPress={() => this.props.navigation.navigate("poolStatDetails", pool: pool)} />
            ))
          ) : (
            <Text style={styles.helpText}>
              No pools found, please add one first
            </Text>
          )}

          <Button
            block
            iconLeft
            onPress={() => this._goToScreen("AddPool")}
            style={{ marginTop: availablePools.length > 0 ? 0 : 20, marginBottom: 20 }}
          >
            <Ionicons name="md-add" color={"white"} size={20} />
            <Text style={styles.buttonText}>Add pool</Text>
          </Button>
        </ScrollView>
      </Container>
    ):(<Spinner color="gray" />)
  }
  _goToScreen = (screen) => {    
    this.props.navigation.navigate(screen);  
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  containerNoPools: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    //paddingTop: 50,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
  },
  containerPools: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  helpText: {
    color: Colors.noticeText,
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
