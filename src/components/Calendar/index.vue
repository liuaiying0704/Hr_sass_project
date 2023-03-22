<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col style="width: 118px; height: 30px">
        <el-select v-model="currentYear" @change="updateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col style="margin-left: 10px; width: 118px; height: 30px">
        <el-select v-model="currentMonth" @change="updateCalendar">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span class="getDay" v-if="isWeek(date)"> 休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      years: [2020, 2021, 2022], //当前年份前5，后5年
      currentMonth: '',
      currentDate: ''
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      // 2017--2027
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i)
      this.currentDate = date
    },
    // 周六日插槽的使用

    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    //切换月份，更新日历
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>

<style scoped lang="scss">
// scss解析拼接
::v-deep .el-calendar {
  .el-calendar-table td {
    border: none;
  }

  .el-calendar__header {
    display: none;
  }
}
.getDay {
  color: #fff;
  background-color: #fa7c4d;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-left: 10px;
}
.cell-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
