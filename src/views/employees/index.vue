<template>
  <div class="dashboard-container">
    <!-- :isShowLeft="false" -->

    <!--   left-tag 可动态传值：图标的类名  isShowLeft：false 左侧不显示-->

    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            v-isHas="point.employees.import"
          >
            导入</el-button
          >
          <el-button size="small" type="danger" @click="excelExport"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="addEmployees"
            v-if="isHas(point.employees.add)"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="" prop="username">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                alt=""
                v-imgError="require('@/assets/common/head.jpg')"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>

          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatterEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <!--点击查看，跳转路由 -->
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showAssign(row.id)"
                >角色</el-button
              >
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pages.size"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 添加员工组件 -->
    <add-employees
      @add-success="getEmployeesInfoApi"
      :visible.sync="showAddEmployees"
    ></add-employees>

    <!--头像二维码 dialog -->
    <el-dialog title="二维码" :visible.sync="erCodeDialog" width="30%">
      <canvas id="canvas"></canvas>
    </el-dialog>

    <!-- 分配角色 -->
    <AssignRole
      :visible.sync="showAssignDialog"
      :currentEmployeesId="currentEmployeesId"
    />
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from '@/api/employees'
import addEmployees from './components/add-employees'
import employee from '@/constant/employees'
import qrcode from 'qrcode'
import AssignRole from './components/assign-role.vue'

const { hireType, exportExcelMapPath } = employee
// import permissionPoint from '@/constant/permission'
import mixinsPermissionPoint from '@/mixins/permission'

export default {
  data() {
    return {
      employees: [],
      loading: false,
      // 总条数
      total: 0,
      pages: {
        page: 1,
        // 一页条数
        size: 10
      },
      showAddEmployees: false,
      erCodeDialog: false,
      showAssignDialog: false,
      // 当前员工 的ID--弹层的使用
      currentEmployeesId: ''
      // 权限按钮
      // point: permissionPoint
    }
  },

  mixins: [mixinsPermissionPoint],

  components: {
    addEmployees,
    AssignRole
  },
  created() {
    this.getEmployeesInfoApi()
  },

  methods: {
    async getEmployeesInfoApi() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.employees = rows
      this.total = total
      // console.log(this.employees)
    },
    handleCurrentChange(val) {
      this.pages.page = val
      this.getEmployeesInfoApi()
    },
    formatterEmployment(row, column, cellValue, index) {
      // if (cellValue === 1) return '正式'
      // if (cellValue === 2) return '非正式'
      // return '未知'

      // 方法2

      const findItem = employee.hireType.find((item) => {
        item.id === cellValue
      })
      return findItem ? findItem.value : '未知'
    },

    async onRemove(val) {
      await this.$confirm('是否删除该员工')
      await delEmployee(val)
      this.$message.success('删除成功')
      this.getEmployeesInfoApi()
    },
    addEmployees() {
      this.showAddEmployees = true
    },

    // 导出excel🌼🌼🌼
    // 1、复制文件至@/vendor/Export2Excel'，仅在下面引入；
    // 2、下载安装包已经下了js-xlsx，下载依赖npm install xlsx file-saver -S    npm install script-loader -S -D

    // 点击事件excelExport，引入解构出 export_json_to_excel
    async excelExport() {
      // 引入解构
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesInfoApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
        // 多个表头
        mutiHeader: [['手机号', '其他信息', '', '', '', '', '部门']],
        // 合并
        merges: ['A1:A2', 'B1:F1', 'G1:G2']
      })
    },

    // 图片生成二维码的弹层🌼🌼🌼  1.下载插件qrcode  2.引入：import qrcode from 'qrcode'，使用qrcode
    showErCodeDialog(pic) {
      if (!pic) return this.$message.error('该用户还未上传图片')
      this.erCodeDialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        qrcode.toCanvas(canvas, pic)
      })
    },

    //点击角色弹层显示
    showAssign(id) {
      this.showAssignDialog = true
      this.currentEmployeesId = id
    },

    // 员工按钮权限
    isHas(point) {
      return this.$store.state.permission.points.includes(point)
    }
  }
}
</script>

<style scoped lang="less"></style>
