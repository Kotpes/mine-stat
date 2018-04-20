//@flow

import React from 'react'
import {Platform, StyleSheet, View, ScrollView, Text} from 'react-native'
import {Container, Spinner, Badge, Content, Button} from 'native-base'
import {observer} from 'mobx-react/native'
import {getMiner, getMinerPayouts} from '../api/apiClient'
import {getHashrate, getBallance} from '../utils/dataUtils'
import observablePoolStore from '../store/poolStore'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'

type Props = {
  navigation: {
    state: {
      params: {
        customLabel: string,
        apiEndpoint: string,
        wallet: string,
        cryptoCode: string,
      },
    },
  },
}

type State = {
  minerStats: Array<any>,
  payouts: Array<any>,
  loading: boolean,
  cryptoCode: string,
}

class PoolStatDetails extends React.Component<Props, State> {
  static navigationOptions = ({navigation}: Object) => {
    const {customLabel} = navigation.state.params

    return {
      title: `${customLabel} details`,
    }
  }

  state = {
    loading: false,
    cryptoCode: "",
    minerStats: [],
    payouts: [],
  }

  static defaultProps = {
    store: observablePoolStore,
  }

  componentDidMount() {
    const {cryptoCode} = this.props.navigation.state.params
    this.setState({cryptoCode})
    this._onComponentDidMount()
  }

  async _onComponentDidMount() {
    const {apiEndpoint, wallet, cryptoCode} = this.props.navigation.state.params
    this.setState({loading: true})

    try {
      const miner = await getMiner(wallet, apiEndpoint)
      const payouts = await getMinerPayouts(wallet, apiEndpoint)
      this.setState({
        minerStats: miner.data,
        payouts: payouts.data,
        loading: false,
      })
    } catch (error) {
      console.log(error)
    }
  }

  getAllTimePayouts = () => {
    const {payouts, cryptoCode} = this.state
    
    const allTime = payouts && payouts.reduce((acc, cur) => {
      return acc + cur.amount
    }, 0)

    return `${getBallance(allTime)} ${cryptoCode}`

  }

  getLatestPayout = () => {
    const {payouts, cryptoCode} = this.state
    const latestPayout = payouts && payouts[0].amount

    return `${getBallance(latestPayout)} ${cryptoCode}`
  }

  render() {
    console.log(this.state)

    const {loading} = this.state

    if (loading) {
      return <Spinner color="gray" />
    }

    const {minerStats} = this.state
    const {currentStatistics, workers} = minerStats

    console.log();
    

    const workersStat =
      workers &&
      workers.map((worker, i) => {
        const workerInfo = {
          name: worker.worker,
          currentHashrate: getHashrate(worker.currentHashrate),
          reportedHashrate: getHashrate(worker.reportedHashrate),
          lastSeen: new Date(worker.lastSeen * 1000).toDateString(),
          key: i,
        }

        return (
          <View style={styles.workerStats} key={i}>
            <Text style={styles.workerName}>{workerInfo.name}</Text>
            <View style={styles.sectionStats}>
              <View style={styles.stats}>
                <Text style={styles.statLabel}>Hashrate</Text>
                <View style={styles.rowNoWrap}>
                  <View style={styles.culumnNoWrap}>
                    <Text style={styles.workerSubheading}>{workerInfo.currentHashrate}</Text>
                  </View>
                  <Text> | </Text>
                  <View style={styles.culumnNoWrap}>
                    <Text style={styles.workerSubheading}>{workerInfo.reportedHashrate}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.stats}>
                <Text style={styles.statLabel}>Last seen</Text>
                <Text style={styles.workerSubheading}>{workerInfo.lastSeen}</Text>
              </View>
            </View>
          </View>
        )
      })

    return (
      <Container>
        {currentStatistics && (
          <Content style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Hashrate</Text>
              <View style={styles.sectionContent}>
                <View style={styles.sectionStats}>
                  <View style={styles.stats}>
                    <Text style={styles.statLabel}>Current</Text>
                    <Text style={styles.sectionSubheading}>{getHashrate(currentStatistics.currentHashrate)}</Text>
                  </View>
                  <View style={styles.stats}>
                    <Text style={styles.statLabel}>Reported</Text>
                    <Text style={styles.sectionSubheading}>{getHashrate(currentStatistics.reportedHashrate)}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Shares</Text>
              <View style={styles.sectionStats}>
                <View style={styles.stats}>
                  <Text style={styles.statLabel}>Valid</Text>
                  <Text style={styles.sectionSubheading}>{currentStatistics.validShares}</Text>
                </View>
                <View style={styles.stats}>
                  <Text style={styles.statLabel}>Stale</Text>
                  <Text style={styles.sectionSubheading}>{currentStatistics.staleShares}</Text>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Payouts</Text>
              <View style={styles.sectionStats}>
                <View style={styles.stats}>
                  <Text style={styles.statLabel}>Latest</Text>
                  <Text style={styles.sectionSubheading}>{this.getLatestPayout()}</Text>
                </View>
                <View style={styles.stats}>
                  <Text style={styles.statLabel}>All time</Text>
                  <Text style={styles.sectionSubheading}>{this.getAllTimePayouts()}</Text>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>
                Workers
              </Text>
              {workersStat}
            </View>
          </Content>
        )}
      </Container>
    )
  }
}

export default PoolStatDetails

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  columnNoWrap: {
    flexDirection: 'column',
  },
  rowNoWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tabContent: {
    flex: 1,
  },
  sectionHeading: {
    fontFamily: 'rubik-medium',
    fontSize: Fonts.heading2,
    marginBottom: 10,
  },
  sectionSubheading: {
    fontFamily: 'rubik-medium',
    fontSize: Fonts.heading3,
    marginBottom: 3,
  },
  workerName: {
    fontFamily: 'rubik-medium',
    fontSize: Fonts.heading3,
    marginBottom: 3,
  },
  workerSubheading: {
    fontFamily: 'rubik-medium',
    fontSize: Fonts.heading5,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: Colors.borderLightGray,
    paddingBottom: 20,
  },
  sectionStats: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  stats: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'rubik-regular',
    color: Colors.noticeText,
    fontSize: 14,
  },
  subLabel: {
    fontFamily: 'rubik-regular',
    color: Colors.noticeText,
    fontSize: 12,
  },
  sectionContent: {
    // borderColor: Colors.borderLightGray,
    // borderWidth: 1,
    // padding: 5,
    alignItems: 'center',
  },
  badgeInfo: {
    color: '#fff',
  },
  workerStats: {
    marginBottom: 15,
    alignItems: 'center',
  },
})
