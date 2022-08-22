export default {
  // 按钮权限映射表，便于维护。  v-if="isHas(point.employees.import)"在这里维护一次   ===   v-if="isHas(employees-import)"多处使用修改
  employees: {
    add: 'employees-add',
    import: 'employees-import',
    del: 'employees-del',
    export: 'employees-export'
  },
  //  公司设置setting
  roles: {
    add: 'roles-add'
  }
}
