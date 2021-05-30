import storage from "good-storage"
var CURRENTUSER_KEY='currentUser'

export function setUser(data){
  storage.get(CURRENTUSER_KEY||[])
  storage.set(CURRENTUSER_KEY,data)
  return storage.get(CURRENTUSER_KEY,[])
}
// 加载当前用户
export function loadUser(){
  return storage.get(CURRENTUSER_KEY,[])
}
