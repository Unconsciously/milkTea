import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = resolve => require.ensure([], () => resolve(require('../components/common/Index.vue')), 'Index')
const Login = resolve => require.ensure([], () => resolve(require('../components/pages/Login.vue')), 'Login')
const Welcome = resolve => require.ensure([], () => resolve(require('../components/pages/Welcome.vue')), 'Welcome')
const Shome = resolve => require.ensure([], () => resolve(require('../components/pages/Shome.vue')), 'Shome')
const Sorder = resolve => require.ensure([], () => resolve(require('../components/pages/orders/Sorder.vue')), 'Sorder')
const Sorder2 = resolve => require.ensure([], () => resolve(require('../components/pages/orders/Sorder2.vue')), 'Sorder2')

const Cards = resolve => require.ensure([], () => resolve(require('../components/pages/cards/cards.vue')), 'Cards')
const AddCards = resolve => require.ensure([], () => resolve(require('../components/pages/cards/addCards.vue')), 'AddCards')
const EditCards = resolve => require.ensure([], () => resolve(require('../components/pages/cards/editCards.vue')), 'EditCards')

const Goods = resolve => require.ensure([], () => resolve(require('../components/pages/goods/goods.vue')), 'Goods')
const AddGoods = resolve => require.ensure([], () => resolve(require('../components/pages/goods/addGoods.vue')), 'AddGoods')
const EditGoods = resolve => require.ensure([], () => resolve(require('../components/pages/goods/editGoods.vue')), 'EditGoods')

const Rules = resolve => require.ensure([], () => resolve(require('../components/pages/rules/rules.vue')), 'Rules')
const AddRules = resolve => require.ensure([], () => resolve(require('../components/pages/rules/addRules.vue')), 'AddRules')
const EditRules = resolve => require.ensure([], () => resolve(require('../components/pages/rules/editRules.vue')), 'EditRules')
const Fis = resolve => require.ensure([], () => resolve(require('../components/pages/404.vue')), 'Fis')

const Pay = resolve => require.ensure([], () => resolve(require('../components/pages/pay.vue')), 'Pay')
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/index',
      component: Index,
      meta: {},
      children: [
        {
          path: '/welcome',
          component: Welcome,
          meta: { title: 'Welcome' }
        },
        {
          path: '/shome',
          component: Shome,
          meta: { title: '系统管理' }
        },
        {
          path: '/pay',
          component: Pay,
          meta: { title: '支付设置' }
        },
        {
          path: '/rules',
          component: Rules,
          meta: { title: '规格设置' },
          
        },
        {
          path: '/addrules',
          component: AddRules,
          meta: { title: '创建规格' }
        },
        {
          path: '/editrules/:id',
          component: EditRules,
          meta: { title: '编辑规格' }
        },
        {
          path: '/sorder',
          component: Sorder,
          meta: { title: '订单' }
        },
        {
          path: '/sorder2',
          component: Sorder2,
          meta: { title: '订单2' }
        },
        {
          path: '/cards',
          component: Cards,
          meta: { title: '礼品卡' }
        },
        {
          path: '/addcards',
          component: AddCards,
          meta: { title: '创建礼品卡' }
        },
        {
          path: '/editcards/:id',
          component: EditCards,
          meta: { title: '编辑礼品卡' }
        },
        {
          path: '/goods',
          component: Goods,
          meta: { title: '商品' }
        },
        {
          path: '/addgoods',
          component: AddGoods,
          meta: { title: '创建商品' }
        },
        {
          path: '/editgoods/:id',
          component: EditGoods,
          meta: { title: '编辑商品' }
        },
      ]
    },
    {
      path: '/login',
      component: Login
    },
    
    {
      path: '/404',
      component: Fis
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
