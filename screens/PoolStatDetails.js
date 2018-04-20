//@flow

import React from 'react';
import { Platform, StyleSheet, View, ScrollView, Text } from "react-native";
import {Container, Tabs, Tab, Spinner} from 'native-base';
import { observer } from "mobx-react/native";
import {getMiner} from "../api/apiClient"
import observablePoolStore from "../store/poolStore";

type Props = {
  navigation: {
    state: {
      params: {
        customLabel: string,
        apiEndpoint: string,
        wallet: string,
      },
    }
  }
}

type State = {
  minerStats: Array<any>,
  loading: boolean,
}


class PoolStatDetails extends React.Component<Props, State> {

  static navigationOptions = ({navigation}: Object) => {
    const { customLabel } = navigation.state.params;

    return {
      title: `${customLabel} details`,
    }
  };

  state = {
    loading: false,
    minerStats: [],
  }
  
  static defaultProps = {
    store: observablePoolStore
  };

  componentDidMount() {
    this._onComponentDidMount()
  }

  async _onComponentDidMount() {
    const { apiEndpoint, wallet } = this.props.navigation.state.params;
    this.setState({loading: true})
    
    try {
      const miner = await getMiner(wallet, apiEndpoint)      
      this.setState({minerStats: miner.data})
      this.setState({loading: false})
    } catch (error) {
      console.log(error) 
    }
  }

  render() {
    console.log(this.state);

    const {loading} = this.state

    if (loading) {
      return <Spinner color='gray' />
    }

    const {minerStats} = this.state


    // const minerStats = this.state.minerStats ? this.state.minerStats : []
        
    return (
      <Container>
        <Tabs initialPage={0}>
          <Tab heading="Tab1">
            <Text> Here's current stat: {minerStats.currentStatistics && minerStats.currentStatistics.currentHashrate} </Text>
          </Tab>
          <Tab heading="Tab2">
            <Text> Here's second tab content </Text>
          </Tab>
        </Tabs>
      </Container>
    )
  }
}

export default PoolStatDetails;