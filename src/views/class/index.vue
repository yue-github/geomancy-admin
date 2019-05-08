<template>

  <div class="app-container">
    <div class='title'>
       <span class="title-word">课程购买情况一览表</span>
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
            label="ID"
            width="180" align='center'>

            <template slot-scope="scope">
            
              <i class="fa fa-user-circle-o"></i>
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
             </el-table-column>
             <el-table-column
                label="用户名"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-user-o"></i>
                <span style="margin-left: 10px">{{ scope.row.username }}</span>
              </template>
             </el-table-column>
             <el-table-column
                label="购买时间"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-safari"></i>
                <span style="margin-left: 10px">{{ scope.row.pay_time }}</span>
              </template>
             </el-table-column>
             <el-table-column
                label="购买的课程"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-book"></i>
                <span style="margin-left: 10px" v-html="scope.row.title?scope.row.title:'未知'"></span>
              </template>
             </el-table-column>
             <el-table-column
                label="花费"
                  width="180" align='center'>
              <template slot-scope="scope">
                <i class="fa fa-rmb" style="color:#f40"></i>
                <span style="margin-left: 10px;color:#f40" v-html="scope.row.price?scope.row.price:'未知'"></span>
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
    this.$axios.post(domain+'api/class/getSaleClassDetail')
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

