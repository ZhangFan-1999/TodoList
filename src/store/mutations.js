import * as types from '@/store/mutationTypes'
const matutaions = {
  [types.SET_USERINFO](state,data){
    state.userInfo=data
  }
}

export default matutaions