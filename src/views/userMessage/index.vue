<template>

  <div class="app-container">
    <div class='title'>
       <span class="title-word">用户信息</span>
    </div>
     
      <div class="tui_table">
        <template>
        <el-table
            :data="tableData"
            height="500"
            :empty-text="msg"
            class="tableMain"
            v-loading='loading'
            style="width: 100%">
            <el-table-column
                label="角色"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-user-circle"></i>
                <span style="margin-left: 10px" v-html="scope.row.openid?'普通用户':'超级管理员'"></span>
              </template>
             </el-table-column>
            <el-table-column
            label="ID"
            width="180" align='center'>

            <template slot-scope="scope">
              <!-- <i class="el-icon-time"></i> -->
              <i class="fa fa-user-circle-o"></i>
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
             </el-table-column>
             <el-table-column
                label="用户名"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-user-o"></i>
                <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
              </template>
             </el-table-column>
             <el-table-column
                label="注册时间"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-safari"></i>
                <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
              </template>
             </el-table-column>
             <el-table-column
                label="城市"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-map-pin"></i>
                <span style="margin-left: 10px" v-html="scope.row.city?scope.row.city:'未知'"></span>
              </template>
             </el-table-column>
             <el-table-column
                label="省份"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-map-pin"></i>
                <span style="margin-left: 10px" v-html="scope.row.province?scope.row.province:'未知'"></span>
              </template>
             </el-table-column>
             <el-table-column
                label="拥有积分"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-trophy" style="color:rgb(64, 158, 255)"></i>
               <span style="margin-left: 10px" v-html="scope.row.points?scope.row.points:'未知'"></span>
              </template>
             </el-table-column>
              <el-table-column
                label="上次签到时间"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-safari"></i>
                <span style="margin-left: 10px" v-html="scope.row.signDate?scope.row.signDate:'未知'"></span>
              </template>
             </el-table-column>
              <el-table-column
                label="签到一次所获积分"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-trophy" style="color:rgb(64, 158, 255)"></i>
                <span style="margin-left: 10px" v-html="scope.row.addPoint?scope.row.addPoint:'未知'"></span>
              </template>
             </el-table-column>
              <el-table-column
                label="签到次数"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-calendar-check-o"></i>
                <span style="margin-left: 10px" v-html="scope.row.the_time?scope.row.the_time:'未知'"></span>
              </template>
             </el-table-column>
              <el-table-column
                label="拥有推广金"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-trophy" style="color:#ffcc00"></i>
                <span style="margin-left: 10px" v-html="scope.row.promotion_fund?scope.row.promotion_fund:'未知'"></span>
              </template>
             </el-table-column>
              <el-table-column
                label="vip级别"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-fort-awesome"></i>
                <span style="margin-left: 10px" v-html="scope.row.role?scope.row.role:'未知'"></span>
              </template>
             </el-table-column>
        </el-table>
        </template>
      </div>
  </div>
</template>

<script>
  import domain from '@/domain.js';
export default {
  data() {
    return {
      loading:true,
      disable:true,
      msg:'暂无消息',
      tableData: [],
    }

  },
  methods: {
      
     
      
  },
  mounted(){
    this.$axios.post(domain+'api/msg/getUserMsg')
    .then(res=>{
      this.loading=false;
      this.tableData=res.data;
      
    })
  }
}
</script>

<style scoped>
 
  .title{
    width:100%;
    height:46px;
  
    box-sizing: border-box;
    display:flex;
    align-items: center;
    justify-content: center;
     text-align: center;
    border-radius:3px;
    position:relative;
  }
  .title-back{
   
    font-size:1rem;
    cursor: pointer;
    width:30px;
    position:absolute;
    left:0px;
    text-align:center;

  }
  .title-word{
     display:block;
     margin-left:-5%;
     font-size: 1rem;
     font-weight:bold;
  }
   
</style>

