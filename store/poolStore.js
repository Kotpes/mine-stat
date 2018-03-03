import {observable} from 'mobx'
import {AsyncStorage} from 'react-native'
import { create, persist } from 'mobx-persist'

let index = 0

class ObservablePoolStore {
  @persist('list') @observable pools = []

  removePool(pool) {
    this.pools = this.pools.filter(p => {
      return p.customLabel !== pool.customLabel
    })
  }

  addPool(pool) {
    this.pools.push({
      poolName: pool.name,
      customLabel: pool.customLabel,
      wallet: pool.wallet,
      index,
    })
    index++
  }
}

const hydrate = create({
    storage: AsyncStorage,
    jsonify: true,
})

const observablePoolStore = new ObservablePoolStore()
export default observablePoolStore

hydrate('pools', observablePoolStore)
    // post hydration
    .then(() => console.log('some hydrated'))
