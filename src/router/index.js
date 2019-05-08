import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '明正道大学堂',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/addClass',
    name: '首页',
    meta: { title: '首页', icon: 'fa fa-home' },
    children: [
      {
        path: 'table',
        name: '首页轮播图',
        component: () => import('@/views/table/index'),
        meta: { title: '首页轮播图', icon: 'fa fa-image' }
      },
       {
        path: 'shopBanner',
        name: '商城轮播图',
        component: () => import('@/views/shopBanner/index'),
        meta: { title: '商城轮播图', icon: 'fa fa-image' }
      },
      {
        path: 'tree',
        name: '课程编辑',
        component: () => import('@/views/tree/index'),
        meta: { title: '课程编辑', icon: 'fa fa-vcard' }
        
      },
      {
        path: 'addClass',
        name: '课程添加',
        component: () => import('@/views/tree/addClass'),
        meta: { title: '课程添加', icon: 'fa fa-vcard'}
        
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    name:'信息',
    children: [
      {
        path: 'index',
        name: '信息',
        component: () => import('@/views/form/index'),
        meta: { title: '信息', icon: 'fa fa-bell' }
      }
    ]
  },
 
  

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: '规则',
    meta: {
      title: '规则',
      icon: 'fa fa-briefcase'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: '积分规则',
        meta: { title: '积分规则', icon:'fa fa-binoculars' },
        // children: [
        //   {
        //     path: 'menu1-1',
        //     component: () => import('@/views/nested/menu1/menu1-1'),
        //     name: 'Menu1-1',
        //     meta: { title: 'Menu1-1' }
        //   },
        //   {
        //     path: 'menu1-2',
        //     component: () => import('@/views/nested/menu1/menu1-2'),
        //     name: 'Menu1-2',
        //     meta: { title: 'Menu1-2' },
        //     children: [
        //       {
        //         path: 'menu1-2-1',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        //         name: 'Menu1-2-1',
        //         meta: { title: 'Menu1-2-1' }
        //       },
        //       {
        //         path: 'menu1-2-2',
        //         component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        //         name: 'Menu1-2-2',
        //         meta: { title: 'Menu1-2-2' }
        //       }
        //     ]
        //   },
        //   {
        //     path: 'menu1-3',
        //     component: () => import('@/views/nested/menu1/menu1-3'),
        //     name: 'Menu1-3',
        //     meta: { title: 'Menu1-3' }
        //   }
        // ]
      },
      {
        path: 'menu2',
        name:'推广金规则',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: '推广金规则', icon:'fa fa-btc' }
      },
       {
        path: 'menu3',
        name:'其它规则',
        component: () => import('@/views/nested/menu3/index'),
        meta: { title: '其它规则', icon:'fa fa-support' }
      }
    ]
  },

 {
    path: '/activity',
    component: Layout,
    name:'活动',
    children: [
      {
        path: 'activity',
        name: '活动',
        component: () => import('@/views/activity/index'),
        meta: { title: '活动', icon: 'fa fa-cloud' }
      }
    ]
  },

  {
    path: '/userMessage',
    component: Layout,
    name:'用户信息',
    children: [
      {
        path: 'userMessage',
        name: '用户信息',
        component: () => import('@/views/userMessage/index'),
        meta: { title: '用户信息', icon: 'fa fa-address-book-o' }
      }
    ]
  },

   {
    path: '/userMsg',
    component: Layout,
    name:'课程购买详情',
    children: [
      {
        path: 'index',
        name: '课程购买详情',
        component: () => import('@/views/class/index'),
        meta: { title: '课程购买详情', icon: 'fa fa-book' }
      }
    ]
  },
  // {
  //   path: '/introduce',
  //   component: Layout,
  //   name:'公司介绍修改',
  //   children: [
  //     {
  //       path: 'index',
  //       name: '公司介绍修改',
  //       component: () => import('@/views/introduce/index'),
  //       meta: { title: '公司介绍修改', icon: 'fa fa-book' }
  //     }
  //   ]
  // },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://baidu.com',
        meta: { title: '百度一下', icon: 'fa fa-paw' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
