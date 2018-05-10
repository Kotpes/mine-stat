//@flow

import {Ionicons} from "@expo/vector-icons";
import {View, StyleSheet, Alert, TouchableOpacity} from "react-native";
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
  onPress: Function,
  shadowColor: string,
}

type State = {
  noData: boolean,
  data: {
    wallet: string,
    apiEndpoint: string,
    poolName: string,
    customLabel: string,
    cryptoCode: string,
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
    noData: false,
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
      this.setState({noData: true})
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

  _poolNotFound(data: Object) {
    const {removePool} = this.props

    Alert.alert(
      'No data found',
      'No data found for this wallet address. Would you like to delete this pool?',
      [
        {text: 'Cancel', onPress: () => null},
        {text: 'OK', onPress: () => removePool(data)},
      ]
    ) 
  }

  render() {
    const {data, minerCurrentStats, noData} = this.state
    const {onPress, shadowColor} = this.props

    const activeWorkers = minerCurrentStats && minerCurrentStats.activeWorkers >= 0 ? minerCurrentStats.activeWorkers : 0
    const updaidBallance = minerCurrentStats ? minerCurrentStats.unpaid : 0
    const wallet = data.wallet
    const currentHashrate = noData ? 0 : minerCurrentStats && minerCurrentStats.currentHashrate
    
    return (
      <View>
      <TouchableOpacity style={[styles.container, {shadowColor}, styles.card]} onPress={noData ? () => {this._poolNotFound(data)} : onPress}>
        <CardItem>
          <Body>
            <Text style={styles.label}>{data.customLabel}</Text>
            <Text style={styles.pool}>{data.poolName}</Text>
            <Text numberOfLines={1} style={styles.address}>
              {wallet}
            </Text>
          </Body>
        </CardItem>
        <CardItem style={styles.poolStat}>
          <View style={styles.stats}>
            <Text style={styles.stat}>Hashrate</Text>
            <Text style={styles.value}>{getHashrate(currentHashrate)}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.stat}>Workes</Text>
            <Text style={styles.value}>{activeWorkers}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.stat}>Unpaid ballance</Text>
            <Text style={styles.value}>{getBallance(updaidBallance, data.cryptoCode)} {data.cryptoCode}</Text>
          </View>  
        </CardItem>    
      </TouchableOpacity>
      
      <Button transparent onPress={() => this.deleteConfirmation(data)} style={styles.actionButton}>
        <Ionicons name="ios-trash-outline" color={"black"} size={24}/>
      </Button>
    </View>
      
      
    )
  }
}

export default poolCard;

const styles = StyleSheet.create({
  container: {
    // height: 290,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    borderColor: Colors.borderLightGray,
    borderWidth: 1,
    justifyContent: "flex-start",
    shadowRadius: 0,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: 6
    }
  },
  label: {
    fontFamily: "rubik-medium",
    fontSize: Fonts.heading2,
    color: Colors.textColor,
    width: 200,
  },
  pool: {
    fontFamily: "rubik-regular",
    fontSize: Fonts.heading3,
    marginBottom: 5,
    color: Colors.textColor,
  },
  address: {
    fontFamily: "rubik-light",
    letterSpacing: 1,
    fontSize: 10,
    color: Colors.textColor,
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
    fontSize: 15,
    fontFamily: "rubik-medium",
    color: Colors.textColor,
  },
  actionButton: {
    position: "absolute",
    right: 10,
    // top: 30,
  }
});
