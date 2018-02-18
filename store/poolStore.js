import {observable} from 'mobx'

let index = 0

class ObservablePoolStore {
  @observable pools = []

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

const observablePoolStore = new ObservablePoolStore()
export default observablePoolStore
