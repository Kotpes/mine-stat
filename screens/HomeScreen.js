import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Content, Button, Text } from 'native-base'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Pool stats',
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Grid>
            <Row style={{ backgroundColor: '#635DB7', height: 200 }}>
              <Content style={styles.welcomeContainer}>
                <Text style={styles.text}>Start by adding a new pool</Text>
              </Content>
            </Row>
            <Row style={{ backgroundColor: '#00CE9F', height: 200 }} />
          </Grid>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
