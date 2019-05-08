<template >
  <div style="padding:30px;">
	    <el-alert :closable="false" title="
      活动编辑">
	      <router-view />
	    </el-alert>
		
	    <div v-for="(item,index) in integral" class="integral">
		  <el-input placeholder="请输入内容" v-model="item.title">
		    <template slot="prepend">活动主题</template>
		  </el-input>
      <el-input placeholder="请输入内容" v-model="item.content">
        <template slot="prepend">活动内容</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="item.condition">
        <template slot="prepend">活动奖品条件</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="item.time">
        <template slot="prepend">活动时间</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="item.place">
        <template slot="prepend">活动地点</template>
      </el-input>
		</div>

		<div class="submit-all">
		       <span @click="editSubmit">确认修改</span>
		 </div>
  </div>
</template>
 
 
<script>
	import domain from '@/domain.js'
  export default {
    data() {
      return {
         integral:[]
      }
    },
    methods: {
     editSubmit(){
     	const loading = this.$loading({
            lock: true,
            text: '活动修改中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
     	this.$axios.post(domain+'/api/activity/adminEditActivity',{
     		...this.integral
     	})
    	.then(res=>{
    		if(res.status==200){
    			this.$message({
		          showClose: true,
		          message: '活动修改成功',
		          type: 'success'
		        });
    		}else{
    			this.$message({
		          showClose: true,
		          message: '活动修改失败',
		          type: 'error'
		        });
    		}
    		
    		loading.close();
    	})
    	.catch(res=>{
    		this.$message({
		          showClose: true,
		          message: '活动修改失败',
		          type: 'error'
		     });
    		loading.close();
    	})
     }
    },
    beforeCreate(){
      this.loading = this.$loading({
            lock: true,
            text: '拼命加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
    },
    mounted(){
    	this.$axios.post(domain+'/api/activity/adminGetActivity')
    	.then(res=>{
        this.loading.close();
    		this.integral=res.data;
    	})
    }
  }
</script>
<style scoped>
 .integral{
 	margin-top:10px;
 }
  .submit-all{
    width:100%;
    display:flex;
    align-items: center;
    justify-content:space-around;
    background-color: #f5f7fa;
    margin-top:10px;
    box-sizing: border-box;
    padding:10px;
  }
  .submit-all > span{
     padding: 5px 50px;
     background:rgb(48, 65, 86);
     color:#fff;
     font-size:15px;
     border-radius:10px;
     cursor:pointer;
     white-space: nowrap;

  }
  .submit-all > span:hover{
    background:#1f2d3d;
  }
</style> 