<template>
  <div class="app-container">
		<div class='title'>
			<span class="fa fa-chevron-left title-back" @click="back" v-show="!edit_boo"></span><span class="title-word">用户推广金兑换信息</span>
		</div>
 		 <div class="delete_boo" v-show="multipleSelection.length==0?false:true">
 		 	<span @click="deleteChoose">选中删除</span>
 		 </div>
	    <div class="tui_table" v-show="edit_boo">
	    	<template>
				<el-table
						:data="tableData.length==0?[]:tableData"
            v-loading='loading'
						height="500"
						:empty-text="msg"
						class="tableMain"
						 @selection-change="handleSelectionChange"
						style="width: 100%">
						<el-table-column
					      type="selection"
					      width="55">
					    </el-table-column>
						<el-table-column label="操作" width="230" align='center'>
							<template slot-scope="scope" class="editor">

								<el-button
								size="mini"
								type="danger"
								@click="handleDelete(scope.$index, scope.row)">删除</el-button>
								<el-button
								size="mini"
								@click="handleEdit(scope.$index, scope.row)"><span v-html="scope.row.is_success?'已处理':'未处理'" v-bind:class="{changeColor:scope.row.is_success?true:false,rawColor:scope.row.is_success?false:true}"></span></el-button>
								<el-button
								size="mini"
								@click="handleLook(scope.$index, scope.row)">详情</el-button>
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
							  label="分销者名称"
						      width="180" align='center'>
							<template slot-scope="scope">
								<i class="fa fa-user-o"></i>
								<span style="margin-left: 10px">{{ scope.row.name }}</span>
							</template>
					   </el-table-column>
					   <el-table-column
							  label="分销者电话"
						      width="180" align='center'>
							<template slot-scope="scope">
								<i class="fa fa-phone"></i>
								<span style="margin-left: 10px">{{ scope.row.phone }}</span>
							</template>
					   </el-table-column>
					   <el-table-column
							  label="分销者地址"
						      width="180" align='center'>
							<template slot-scope="scope">
								<i class="fa fa-map-pin"></i>
								<span style="margin-left: 10px">{{ scope.row.adrress }}</span>
							</template>
					   </el-table-column>
					   <el-table-column
							  label="兑换请求时间"
						      width="180" align='center'>
							<template slot-scope="scope">
								<i class="fa fa-safari"></i>
								<span style="margin-left: 10px">{{ scope.row.create_time }}</span>
							</template>
					   </el-table-column>
					   <el-table-column
							  label="兑换推广金点数"
						      width="180" align='center'>
							<template slot-scope="scope">
								<i class="fa fa-trophy" style="color:#ffcc00"></i>
								<span style="margin-left: 10px">{{ scope.row.promotion_fund }}</span>
							</template>
					   </el-table-column>
					    <el-table-column
							  label="公司需支付"
						      width="180" align='center'>
							<template slot-scope="scope">
								<i class="fa fa-rmb"></i>
								<span style="margin-left: 10px">{{ scope.row.need_pay }}</span>
							</template>
					   </el-table-column>
					   <el-table-column
							  label="每多少积分"
						      width="180" align='center'>
							<template slot-scope="scope">
								<i class="fa fa-podcast"></i>
								<span style="margin-left: 10px">{{ scope.row.how_integral }}</span>
							</template>
					   </el-table-column>
					    <el-table-column
							  label="每多少积分可兑"
						      width="180" align='center'>
							<template slot-scope="scope">
								<i class="fa fa-rmb"></i>
								<span style="margin-left: 10px">{{ scope.row.money }}</span>
							</template>
					   </el-table-column>
				</el-table>
		    </template>
	    </div>
	    <div class="doit" v-show="!edit_boo">
	    	<div style="margin-top:5px">
			  <el-input placeholder="详情展示" v-model="msgDetail.name" :disabled="disable">
			    <template slot="prepend">分销者姓名</template>
			  </el-input>
			</div>
			<div style="margin-top:5px">
			  <el-input placeholder="详情展示" v-model="msgDetail.phone" :disabled="disable">
			    <template slot="prepend">分销者电话</template>
			  </el-input>
			</div>
			<div style="margin-top:5px">
			  <el-input placeholder="详情展示" v-model="msgDetail.adrress" :disabled="disable">
			    <template slot="prepend">分销者地址</template>
			  </el-input>
			</div>
			<div style="margin-top:5px">
			  <el-input placeholder="详情展示" v-model="msgDetail.create_time" :disabled="disable">
			    <template slot="prepend">分销者兑换请求时间</template>
			  </el-input>
			</div>
			<div style="margin-top:5px">
			  <el-input placeholder="详情展示" v-model="msgDetail.how_integral" :disabled="disable">
			    <template slot="prepend">每多少推广金/点</template>
			  </el-input>
			</div>
			<div style="margin-top:5px">
				<span class="fa fa-hand-o-down" style="color:#28FF28"></span>
			</div>
			
			<div style="margin-top:5px">
			  <el-input placeholder="详情展示" v-model="msgDetail.money" :disabled="disable">
			    <template slot="prepend">可兑换/rmb-元</template>
			  </el-input>
			</div>
			<div style="margin-top:5px">
			  <el-input placeholder="详情展示" v-model="msgDetail.promotion_fund" :disabled="disable">
			    <template slot="prepend">分销者兑换推广金点数</template>
			  </el-input>
			</div>
			<div style="margin-top:5px">
			  <el-input placeholder="详情展示" v-model="msgDetail.need_pay" :disabled="disable">
			    <template slot="prepend">公司需要支付/rmb-元</template>
			  </el-input>
			</div>
			<div style="margin-top:5px" class="dothat">
			   <span v-html="msgDetail.is_success?'已处理':'未处理'" v-bind:class="{changeColor:msgDetail.is_success?true:false,rawColor:msgDetail.is_success?false:true}" style="border:1px solid #F0F0F0;padding:2px 10px;border-radius:10px;"></span>
			</div>
			<div class="warn">
				*温馨提示：管理员请务必认真对待每一次分销者的兑换请求,请扫描下方二维码支付给分销者佣金，再标记为已处理即可
			</div>
			<div class="customerImg">
				<div class="button-do">
					<span @click="back">返回</span>
				</div>
				<img v-bind:src="msgDetail.erweimaSrc" alt="">
				<div class="button-do">
					<span @click="mark">标记为已处理</span>
			    </div>
			</div>
	    </div>
  </div>
</template>

<script>
	import domain from '@/domain.js';
export default {
  data() {
    return {
      disable:true,
      msg:'暂无消息',
      tableData: [],
      edit_boo:true,
      msgDetail:{
    	 
   	  },
      loading:true,
   	  multipleSelection:[]
    }

  },
  methods: {
  	 deleteChoose(){
  	 	this.$confirm('此操作将永久删除选中数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then(() => {
         
        const loading = this.$loading({
            lock: true,
            text: '数据删除中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        	this.edit_boo=true;
        	this.$axios.post(domain+'api/msg/deleteAll',{
        		...this.multipleSelection
        	})
        	.then(res=>{
        		if(res.data.status==200){
        			this.tableData=res.data.data;
        			this.$message({
        				showClose: true,
			            type: 'success',
			            message: '数据删除成功'
			        });
        		}else{
        			this.$message({
        				showClose: true,
			            type: 'error',
			            message: '数据删除失败'
			        });
        		}
        		loading.close();
        	 
        		
        	})
        	.catch(res=>{
        		this.$message({
			            type: 'error',
			            message: '数据删除失败'
			    });
			    loading.close();
			    
        	})
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
	         this.$message({
	            type: 'info',
	            message: '已取消删除'
	         });         
        });
  	 },
	 handleSelectionChange(val) {
	    let newV=val.map((item,index)=>{
	    	return item.id;
	    });

	    this.multipleSelection = newV;
	 
	},
     handleLook(index, row) {
      // const loading = this.$loading({
      //       lock: true,
      //       text: '数据加载中...',
      //       spinner: 'el-icon-loading',
      //       background: 'rgba(0, 0, 0, 0.7)'
      // });
      this.$axios.post(domain+'api/user/getConcactImg',{
        openid:row.openid
      })
      .then(res=>{
          this.msgDetail=Object.assign({},this.msgDetail,res.data[0]);
          
      })
      .catch(res=>{
       
      });
      this.msgDetail=row;
      this.msgDetail.index=index;
      this.edit_boo=false;
         
     	
     },
     handleDelete(index, row){
     	 this.$confirm('此操作将永久删除这条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center:true
        }).then(() => {
         
        const loading = this.$loading({
            lock: true,
            text: '数据删除中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        	this.edit_boo=true;
        	this.$axios.post(domain+'api/msg/adminDelete',{
        		id:row.id
        	})
        	.then(res=>{
        		if(res.data.status==200){
        			this.tableData=res.data.data;
        			this.$message({
        				showClose: true,
			            type: 'success',
			            message: '数据删除成功'
			        });
        		}else{
        			this.$message({
        				showClose: true,
			            type: 'error',
			            message: '数据删除失败'
			        });
        		}
        		loading.close();
        	 
        		
        	})
        	.catch(res=>{
        		this.$message({
			            type: 'error',
			            message: '数据删除失败'
			    });
			    loading.close();
			    
        	})
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
	         this.$message({
	            type: 'info',
	            message: '已取消删除'
	         });         
        });
     },
     back() {
     	if(this.msgDetail.is_success==1){
     		this.edit_boo=true;
     		return false;
     	}
        this.$confirm('你是否将此条信息标记为已处理？, 请选择', '提示', {
          confirmButtonText: '标记为已处理',
          cancelButtonText: '不标记继续返回',
          type: 'warning',
          center:true,
        }).then(() => {
         
        const loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        	this.edit_boo=true;
        	this.$axios.post(domain+'api/msg/mark',{
        		id:this.msgDetail.id
        	})
        	.then(res=>{
        		if(res.data.status==200){
        			this.tableData=res.data.data;
        			this.$message({
        				showClose: true,
			            type: 'success',
			            message: '标记成功'
			        });
        		}else{
        			this.$message({
        				showClose: true,
			            type: 'error',
			            message: '标记失败'
			        });
        		}
        		loading.close();
        		this.edit_boo=true;
        		
        	})
        	.catch(res=>{
        		this.$message({
			            type: 'error',
			            message: '标记失败'
			    });
			    loading.close();
			    this.edit_boo=true;
        	})
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
        
           this.edit_boo=true;         
        });
      },
      mark(){
      	const loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
      		this.$axios.post(domain+'api/msg/mark',{
        		id:this.msgDetail.id
        	})
        	.then(res=>{
        		if(res.data.status==200){
        			this.tableData=res.data.data;
        			this.$message({
        				showClose: true,
			            type: 'success',
			            message: '标记成功'
			        });
        		}else{
        			this.$message({
        				showClose: true,
			            type: 'error',
			            message: '标记失败'
			        });
        		}
        		loading.close();
        		this.edit_boo=true;
        		
        	})
        	.catch(res=>{
        		this.$message({
			            type: 'error',
			            message: '标记失败'
			    });
			    loading.close();
			    this.edit_boo=true;
        	})

      }
    
  },
  mounted(){
  	this.$axios.post(domain+'api/msg/getTuiMoneyConvert')
  	.then(res=>{
      this.loading=false;
  		this.tableData=res.data;
  		this.msgDetail=this.tableData[0]?this.tableData[0]:{};
      
  	})
  }
}
</script>

<style scoped>
 .changeColor{
 	color:#28FF28;
 }
 .rawColor{
 	color:#f40;
 }
 .dothat{
 	width:100%;
 	display:flex;
 	box-sizing:border-box;
 	padding:5px 10px;
 	justify-content: flex-end;
 }
 .customerImg{
 	width:100%;
 	display:flex;
 	align-items: center;
 	justify-content: space-around;
 	margin-top:18px;
 	 
 }
 .customerImg> img{
 	width:30%;
	z-index:100;
	position:relative;
	 
 }
 .warn{
 	width:100%;
 	color:#999999;
 	font-size:0.5rem;
 }
 .button-do{
 	width:100%;
    display:flex;
    align-items: center;
    justify-content:space-around;
    background-color: #f5f7fa;
    margin-top:10px;
    box-sizing: border-box;
    padding:10px;
 }
 .button-do > span{
 	padding: 5px 50px;
     background:rgb(48, 65, 86);
     color:#fff;
     font-size:15px;
     border-radius:10px;
     cursor:pointer;
     white-space: nowrap;
 }
 .button-do > span:hover{
    background:#1f2d3d;
  }
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
  .delete_boo{
  	width:100%;
  	margin:5px 10px;
  }
  .delete_boo > span{
  	width:100px;
  	height:30px;
  	border-radius:3px;
  	display:flex;
  	align-items: center;
  	justify-content: center;
  	background:red;
  	color:#fff;
  	font-size:0.8rem;
  	cursor:pointer;
  }
</style>

