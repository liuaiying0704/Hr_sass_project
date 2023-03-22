import enLocale from 'element-ui/lib/locale/lang/en'

export default {
  name: 'en',
  dashboard: {
    calendar: 'calendar',
    progress: 'progress'
  },
  ...enLocale,
  route: {
    首页: 'dashboard',
    员工: 'employees',
    审批: 'approvals',
    组织架构: 'departments',
    考勤: 'attendances',
    权限管理: 'departments',
    工资: 'salarys',
    公司设置: 'setting',
    社保: 'social_securitys'
  }
}
