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
            >导入</el-button
          >
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="addEmployees"
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
                style="border-radius: 50%; width: 100px; height: 100px,padding: 10px"
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
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
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
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from '@/api/employees'
import addEmployees from './components/add-employees'
import employee from '@/constant/employees'
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
      showAddEmployees: false
    }
  },
  components: {
    addEmployees
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
    }
  }
}
</script>

<style scoped lang="less"></style>
