import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  hidden: true,
  meta: {
    id: 'import'
  },

  children: [
    {
      path: '',
      component: () => import('@/views/import/index'),
      meta: { title: '对账统计', icon: 'qian' }
    }
  ]
}
