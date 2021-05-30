import * as types from '@/store/mutationTypes'
import {setUser} from "@/utils"
export const setCurrentUser=function(ctx,data){
  ctx.commit(types.SET_USERINFO,setUser(data))
}