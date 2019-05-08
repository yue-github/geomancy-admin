<template >
  <div style="padding:30px;">
	    <el-alert :closable="false" title="积分规则/签到一次所获积分">
	      <router-view />
	    </el-alert>
		
	    <div v-for="(item,index) in integral" class="integral">
		  <el-input placeholder="请输入内容" v-model="item.addPoint">
		    <template slot="prepend">{{item.role}}</template>
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
            text: '积分规则修改中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
     	this.$axios.post(domain+'/api/rule/editRule',{
     		...this.integral
     	})
    	.then(res=>{
    		if(res.status==200){
    			this.$message({
		          showClose: true,
		          message: '规则修改成功',
		          type: 'success'
		        });
    		}else{
    			this.$message({
		          showClose: true,
		          message: '规则修改失败',
		          type: 'error'
		        });
    		}
    		
    		loading.close();
    	})
    	.catch(res=>{
    		this.$message({
		          showClose: true,
		          message: '规则修改失败',
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
    	this.$axios.post(domain+'/api/rule/getRule')
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