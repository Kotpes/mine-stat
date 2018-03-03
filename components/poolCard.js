import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Text,
  Card,
  CardItem,
  Body,
  Content
} from "native-base";

const PoolCard = ({ data, removePool }) => (
  <Container style={styles.container} key={data.index}>
    <View style={styles.card}>
      <CardItem>
        <Body>
          <Text>Pool label:{data.customLabel}</Text>
          <Text>Pool name:{data.poolName}</Text>
          <Text>Wallet address:{data.wallet}</Text>
        </Body>
      </CardItem>
      <CardItem footer>
        <Button block iconLeft onPress={() => removePool(data)}>
          <Ionicons name="ios-trash" color={"white"} size={20} />
          <Text style={styles.buttonText}>Remove</Text>
        </Button>
      </CardItem>
    </View>
  </Container>
);

export default PoolCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
  },
  card: {
    flex: 1,
    // height: 200,
    justifyContent: "space-between",
    borderRadius: 15,
    shadowRadius: 15,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 }
  }
});
