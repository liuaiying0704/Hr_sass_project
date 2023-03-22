import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  name: 'departments',
  meta: {
    id: 'departments' // 用来和后端权限做约定的
  },
  children: [
    {
      name: 'departments',
      path: '',
      component: () => import('@/views/departments'),

      meta: { title: '组织架构', icon: 'tree' }
    }
  ]
}
