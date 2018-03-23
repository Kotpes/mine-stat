//@flow

import {Ionicons} from "@expo/vector-icons";
import {View, StyleSheet, Alert} from "react-native";
import {
  Container,
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Content,
} from "native-base";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import {getMiner} from "../api/apiClient"
import * as React from 'react';
import { getHashrate, getBallance } from "../utils/dataUtils";

type Props = {
  removePool: Function,
  data: Object,
}

type State = {
  data: {
    wallet: string,
    apiEndpoint: string,
    poolName: string,
    customLabel: string,
  },
  minerCurrentStats?: {
    activeWorkers: number,
    currentHashrate: number,
    unpaid: number,
  },
}

class poolCard extends React.Component<Props, State> {
  props: Props

  state: State = {
    data: this.props.data,
  }

  componentDidMount() {
    this._onComponentDidMount()
  }

  async _onComponentDidMount() {
    const {data} = this.state
    try {
      const miner = await getMiner(data.wallet, data.apiEndpoint)
      this.setState({minerCurrentStats: miner.data.currentStatistics})
    } catch (error) {
      console.log(error) 
    }
  }

  deleteConfirmation(data: Object) {
    const {removePool} = this.props

    Alert.alert(
      'Delete pool',
      'Are you sure you want to remove this pool?',
      [
        {text: 'Cancel', onPress: () => null},
        {text: 'OK', onPress: () => removePool(data)},
      ]
    )    
  }

  render() {
    const {data, minerCurrentStats} = this.state
    
    if (!minerCurrentStats) {
      return null
    }

    const activeWorkers = minerCurrentStats.activeWorkers >= 0 ? minerCurrentStats.activeWorkers : 0

    return (
      <Container style={styles.container}>
        <View style={styles.card}>
          <CardItem>
            <Body>
              <Text style={styles.label}>{data.customLabel}</Text>
              <Text style={styles.pool}>{data.poolName}</Text>
              <Text numberOfLines={1} style={styles.address}>
                {data.wallet}
              </Text>
            </Body>
          </CardItem>
          <CardItem style={styles.poolStat}>
            <View style={styles.stats}>
              <Text style={styles.stat}>Hashrate</Text>
              <Text style={styles.value}>{getHashrate(minerCurrentStats.currentHashrate)}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.stat}>Workes</Text>
              <Text style={styles.value}>{activeWorkers}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.stat}>Unpaid ballance</Text>
              <Text style={styles.value}>{getBallance(minerCurrentStats.unpaid)}</Text>
            </View>
          </CardItem>
          <View style={styles.cardActions}>
            <Button transparent onPress={() => this.deleteConfirmation(data)}>
              <Ionicons name="ios-trash-outline" color={"black"} size={24}/>
            </Button>  
          </View>
          {/* <CardItem>
            
            <Button block iconLeft onPress={() => removePool(data)}>
              <Ionicons name="ios-trash" color={"white"} size={20}/>
              <Text style={styles.buttonText}>Remove</Text>
            </Button>
          </CardItem> */}
        </View>
      </Container>
    )
  }
}

export default poolCard;

const styles = StyleSheet.create({
  container: {
    height: 190,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    borderColor: Colors.borderLightGray,
    borderWidth: 1,
    justifyContent: "flex-start",
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  label: {
    fontFamily: "rubik-medium",
    fontSize: Fonts.heading2
  },
  pool: {
    fontFamily: "rubik-regular",
    fontSize: Fonts.heading3,
    marginBottom: 5
  },
  address: {
    fontFamily: "rubik-light",
    letterSpacing: 1,
    fontSize: 11,
  },
  poolStat: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardActions: {
    flex: 1,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  cardFooter: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  stats: {

    alignItems: "center",
  },
  stat: {
    color: Colors.noticeText,
    fontSize: Fonts.heading3,
    fontSize: 14
  },
  value: {
    fontSize: Fonts.heading4,
  }
});
