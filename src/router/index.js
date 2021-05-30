import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login/login"
import Home from "@/components/Home/home"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/login",
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/home",
      component:Home
    }
  ]
})
