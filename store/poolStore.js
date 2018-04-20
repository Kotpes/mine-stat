import { observable } from "mobx";
import { AsyncStorage } from "react-native";
import { create, persist } from "mobx-persist";
import { generateId } from "../utils/dataUtils";

class ObservablePoolStore {
  @persist("list")
  @observable pools = [];

  removePool(pool) {
    this.pools = this.pools.filter(p => {
      return p.customLabel !== pool.customLabel;
    });
  }

  addPool(pool) {
    this.pools.push({
      poolName: pool.name,
      customLabel: pool.customLabel,
      wallet: pool.wallet,
      apiEndpoint: pool.poolApiEndpoint,
      cryptoCode: pool.cryptoCode,
      index: generateId()
    });
  }
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

const observablePoolStore = new ObservablePoolStore();
export default observablePoolStore;

hydrate("pools", observablePoolStore)
  // post hydration
  .then(() => console.log("some hydrated"));
