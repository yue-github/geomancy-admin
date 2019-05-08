	<template>
		<div class='main'>
			<div v-show="!editBoo">
				<template>
					<el-table
					:data="tableData"
					:empty-text="msg"
					class="tableMain"
					height="500"
					v-loading='loading'
					style="width: 100%">
					<el-table-column label="操作" width="180" align='center'>
						<template slot-scope="scope" class="editor">

							<el-button
							size="mini"
							type="danger"
							@click="handleDelete(scope.$index, scope.row)">删除</el-button>
							<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
				label="课程名称"
				width="180" align='center'>
				<template slot-scope="scope">
					<i class="fa fa-book"></i>
					<span style="margin-left: 10px">{{ scope.row.title }}</span>
				</template>
			</el-table-column>
			<el-table-column
			label="课程类型"
			width="180" align='center'>
			<template slot-scope="scope">
				<i class="fa fa-flag"></i>
				<span style="margin-left: 10px">{{ scope.row.line_is }}</span>
			</template>
		</el-table-column>
		<el-table-column
		label="课程讲师"
		width="180" align='center'>
		<template slot-scope="scope">
			<el-popover trigger="hover" placement="top">
				<p>课程讲师: {{ scope.row.whoColumn }}</p>
				<div slot="reference" class="name-wrapper">
					<el-tag size="medium">{{ scope.row.whoColumn }}</el-tag>
				</div>
			</el-popover>
		</template>
	</el-table-column>
	<el-table-column
	label="已购买人数"
	width="180" align='center'>
	<template slot-scope="scope">
		<el-popover trigger="hover" placement="top">
			<p>已购买人数: {{ scope.row.howPeople }}</p>
			<div slot="reference" class="name-wrapper">
				<el-tag size="medium">{{ scope.row.howPeople }}</el-tag>
			</div>
		</el-popover>
	</template>
	</el-table-column>

	<el-table-column
	label="课程价格"
	width="180" align='center'>
	<template slot-scope="scope">
		<el-popover trigger="hover" placement="top">
			<p>课程价格: {{ scope.row.price }}</p>
			<div slot="reference" class="name-wrapper">
				<el-tag size="medium">{{ scope.row.price }}</el-tag>
			</div>
		</el-popover>
	</template>
	</el-table-column>
	<el-table-column
	label="可获推广金"
	width="180" align='center'>
	<template slot-scope="scope">
		<el-popover trigger="hover" placement="top">
			<p>可获推广金: {{ scope.row.tui_found }}</p>
			<div slot="reference" class="name-wrapper">
				<el-tag size="medium">{{ scope.row.tui_found }}</el-tag>
			</div>
		</el-popover>
	</template>
	</el-table-column>
	<el-table-column
	label="积分抵扣/元"
	width="180" align='center'>
	<template slot-scope="scope">
		<el-popover trigger="hover" placement="top">
			<p>每多少积分抵扣的钱数: {{ scope.row.integral }}</p>
			<div slot="reference" class="name-wrapper">
				<el-tag size="medium">{{ scope.row.integral }}</el-tag>
			</div>
		</el-popover>
	</template>
	</el-table-column>
	<el-table-column
	label="每多少积分"
	width="180" align='center'>
	<template slot-scope="scope">
		<el-popover trigger="hover" placement="top">
			<p>抵扣的钱数中每多少积分: {{ scope.row.howIntegral }}</p>
			<div slot="reference" class="name-wrapper">
				<el-tag size="medium">{{ scope.row.howIntegral }}</el-tag>
			</div>
		</el-popover>
	</template>
	</el-table-column>
	<el-table-column
	label="课程剩余份数"
	width="180" align='center'>
	<template slot-scope="scope">
		<el-popover trigger="hover" placement="top">
			<p>课程剩余份数: {{ scope.row.number }}</p>
			<div slot="reference" class="name-wrapper">
				<el-tag size="medium">{{ scope.row.number }}</el-tag>
			</div>
		</el-popover>
	</template>
	</el-table-column>
	<el-table-column
	label="课程浏览记录"
	width="180" align='center'>
	<template slot-scope="scope">
		<el-popover trigger="hover" placement="top">
			<p>课程浏览记录: {{ scope.row.eye }}</p>
			<div slot="reference" class="name-wrapper">
				<el-tag size="medium">{{ scope.row.eye }}</el-tag>
			</div>
		</el-popover>
	</template>
	</el-table-column>

	</el-table>
	</template>
	</div>
	<div class="class-edit" v-show="editBoo">
		<div class="edit-title">
			<span class="fa fa-chevron-left edit-back" @click="back"></span>
			<span class="edit-font">课程编辑</span>
		</div>
		<div class="content">
			<div>
				<el-input placeholder="请输入内容" v-model="title" maxlength="500">
					<template slot="prepend">课程名称</template>
				</el-input>
			</div>
		</div>

		<div class="content">
			<div>
				<el-input placeholder="请输入内容" v-model="whoColumn" maxlength="500">
					<template slot="prepend">课程讲师</template>
				</el-input>
			</div>
		</div>
		<div class="content">
			<div>
				<el-input placeholder="请输入内容" v-model="price" maxlength="500">
					<template slot="prepend">课程价格</template>
				</el-input>
			</div>
		</div>
		<div class="content">
			<div>
				<el-input placeholder="请输入内容" v-model="tui_found" maxlength="500">
					<template slot="prepend">推广者可获推广金</template>
				</el-input>
			</div>
		</div>
		<div class="content">
			<div>
				<el-input placeholder="请输入内容" v-model="integral" maxlength="500">
					<template slot="prepend">每多少积分抵扣的钱数</template>
				</el-input>
			</div>
		</div>
		<div class="content">
			<div>
				<el-input placeholder="请输入积分，例如你输入8,并且你在上面输入的是1,那用户每8积分可以抵扣1元" v-model="howIntegral" maxlength="500">
					<template slot="prepend">抵扣的钱数中每多少积分</template>
				</el-input>
			</div>
		</div>
		<div class="content">
			<div>
				<el-input placeholder="请输入内容" v-model="number" maxlength="500">
					<template slot="prepend">课程剩余份数</template>
				</el-input>
			</div>
		</div>
		<div class="content">
			<div class="class-type">
				<div class="class-type-font">课程类型</div>
				<el-row class="demo-autocomplete" width="500">
					<el-col :span="12">
						<el-autocomplete
						class="inline-input"
						v-model="line_is"
						:fetch-suggestions="querySearch"
						placeholder="请选择或者输入内容"
						@select="handleSelect"
						style="width:200px"
						></el-autocomplete>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="content">
			<div class="class-type-font">封面图片修改</div>
			<div class="class-pre">
				<div class="ImgChooseM">

					<div class="demo-upload-list" v-for="item in uploadList">
						<template v-if="item.status === 'finished'">
							<img :src="item.url">
							<div class="demo-upload-list-cover">
								<Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
								<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
							</div>
						</template>
						<template v-else>
							<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						</template>
					</div>
					<Upload
					ref="upload"
					:show-upload-list="false"
					:default-file-list="defaultList"
					:on-success="handleSuccess"
					:format="['jpg','jpeg','png']"
					:max-size="2048"
					:on-format-error="handleFormatError"
					:on-exceeded-size="handleMaxSize"
					:before-upload="handleBeforeUpload"
					type="drag"
					:data="req"
					:action="domain1"
					style="display: inline-block;width:300px;height:120px">
					<div class="camera-main">
						<Icon type="ios-camera" size="20"></Icon>
					</div>
				</Upload>
				<Modal title="图片预览" v-model="visible">
					<img :src="imgName" v-if="visible" style="width: 500px;height:200px">
				</Modal>
			</div>

		</div>
	</div>
	<div class="content">
		<div class="class-type-font">课程内容介绍</div>
	</div>
	<div class="introduce-detail">
		<el-input
		type="textarea"
		:rows="10"
		placeholder="请输入内容"

		v-model="introduce" style="resize:none">
	   </el-input>
	</div>
	<div class="content">
		<div class="class-type-font">课程音频上传</div>
	</div>
	<div class="audio">
		<el-upload
		class="upload-demo"
		:action="audioSrc"
		:on-preview="handlePreviewAudio"
		:on-remove="handleRemoveAudio"
		:file-list="audioList"
		:data="audioRequest"
		:on-success="audioSuccess"
		:before-upload='beforeUploadAudio'
		>
		<el-button size="small" type="primary">点击上传</el-button>
	</el-upload>
	
	</div>
	<div class="try-listen" v-show="audio_src?true:false">
		<div class="listen_button" ref="tryListen" @click="listenMusic">{{listen}}</div>
	</div>
	<img src="@/assets/v_logo.gif" class="gif-logo" alt="" v-show="gif_boo">
	<audio :src="audio_src" loop="loop" ref='audio' preload="preload"></audio>
	<div class="submit-all">
		<span @click="back">返回</span><span @click="editSubmit">提交修改</span>
	</div>
	</div>

	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	</div>

	</div>
	</template>
	<script>
		import domain from '@/domain.js';
		import imgChoose from '@/components/iview/imgChooseM';
		export default{
			data() {
				return {
					loading:true,
					limitUploadBoo:true,
					gif_boo:false,
					listen:'播放',
					audioSrc:domain+'/api/class/audio',
					audioRequest:{
						domain:domain,
						 
					},
					editBoo:false,
					tableData: [],
					msg:'暂无消息',
					classObj:{
						domain:domain
					},
					title: '',
					whoColumn:'',
				 
					price:'',
					tui_found:'',
					url:'',
					integral:'',
					howIntegral:'',
					number:'',
					boo:1,
					class_try_read:1,
					audio_src:'',
					line_is:'',
	        // 选择性框
	        restaurants: [],
	        status:'',
	        // 图片
	        domain1:domain+'api/class/imgUpload',
	        domain2:domain,
	        msg:"暂无数据",
		  	// 图片上传的参数
		  	req:{
		  		id:1,
		  		url:'https://miao.su/images/2019/02/18/guoxue8a7df.md.jpg',
		  		domain:domain

		  	},
		  	defaultList: [{}],
		  	visible: false,
		  	uploadList: [{}],
		  	introduce:'',
		  	audioList: [],
		 
		  }




		},
	 // watch:{
	 // 	defaultList:(data=[])=>{
	 // 		return data;
	 // 	}
	 // },
		methods: {
			beforeUploadAudio(){
		        this.limitUploadBoo=false;
		    },
			handleEdit(index, row) {

				this.classObj=this.tableData[index];
				this.classObj.domain=domain;
				this.req=this.classObj;
				this.music=this.classObj.audio_src;
				this.title=this.classObj.title;
				this.whoColumn=this.classObj.whoColumn;
				this.price=this.classObj.price;
				this.tui_found=this.classObj.tui_found;
				this.integral=this.classObj.integral;
				this.howIntegral=this.classObj.howIntegral;
				this.number=this.classObj.number;
				this.url=this.classObj.url,
				this.line_is=this.classObj.line_is,
				this.audio_src=this.classObj.audio_src;
				this.introduce=this.classObj.introduce,
				this.uploadList[0]=Object.assign({},this.uploadList[0],{
				 	name:this.url,
				 	url:this.url
				 });
				 // 音频请求携带参数
			 	this.audioRequest=Object.assign({},this.audioRequest,{
			 		title:this.title,
			 		id:this.classObj.id

			 	})
				 
				
				this.audioList=[
					{
						name:this.title,
						url:this.audio_src
					}
				];
				this.editBoo=true;
				 

			},

			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
			           const loading = this.$loading({
				          lock: true,
				          text: '数据删除中...',
				          spinner: 'el-icon-loading',
				          background: 'rgba(0, 0, 0, 0.7)'
				        });
						 
						 this.$axios.post(domain+'/api/class/delete',{
						 		id:row.id
						 })
						 .then(res=>{
						 	 loading.close();
						 	if(res.data.status==200){
						 		this.tableData=res.data.data;
						 		  this.$Notice.open({
				                    top: 50,
				                    duration: 3,
				                    desc:'课程数据删除成功',
				                    title:'课程删除'
				           
				                 })
						 	}else{
						 		 loading.close();
						 		   this.$Notice.error({
				                    top: 50,
				                    duration: 3,
				                    desc:'课程数据删除失败',
				                    title:'课程删除'
				           
				                 })
						 	}
						 	 
						 })
						 .catch(res=>{
						 	loading.close();
						 })
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '已取消删除'
			          });          
			        });
			},
			    
		 
			querySearch(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
	        // 调用 callback 返回建议列表的数据
	        cb(results);
	    },
	    createFilter(queryString) {
	    	return (restaurant) => {
	    		return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	    	};
	    },
	    loadAll() {
	    	return [
	    	{ "value": "线下课程" },
	    	{ "value": "推荐课程" },
	    	{ "value": "精品课程" },

	    	];
	    },
	    handleSelect(item) {
	    	if(item.value=='线下课程'){
	    		this.boo=1;
	    		this.class_try_read=0;

	    	}else{
	    		this.boo=1;
	    		this.class_try_read=1;

	    	}
	    
	    	this.line_is=item.value;


	    },
	      // 图片预览
	      handleView (name) {

	      	this.imgName = this.defaultList[0].url;
	      	this.visible = true;
	      },
	    // 图片移除
	    handleRemove (file) {
	    	const fileList = this.$refs.upload.fileList;
	    	this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
	    },
	    handleSuccess (res, file) {


	    	if(this.defaultList[0]){

	    		this.defaultList[0]=Object.assign({},this.defaultList[0],res);
	    		this.url=res.url;
	    	}
	    	
	    	file.url=file.response.url;
	    	file.name = res.url;
	    	if(this.$refs.upload.fileList.length>1){
	    		this.$refs.upload.fileList.shift();
	    	}
	    	this.limitUploadBoo=true;
	    },
	    handleFormatError (file) {
	    	this.$Notice.warning({
	    		title: '文件格式不正确',
	    		desc: '文件 ' + file.name + ' 格式不正确, 请选择 jpg 或者 png.'
	    	});
	    },
	    handleMaxSize (file) {
	    	this.$Notice.warning({
	    		title: '尺寸限制',
	    		desc: '文件  ' + file.name + ' 太大, 别超过2M.'
	    	});
	    },
	    handleBeforeUpload () {
	    	this.limitUploadBoo=false;
	    	const check = this.uploadList.length < 2;
	    	if (!check) {
	    		this.$Notice.warning({
	    			title: '最多上传1张图片'
	    		});
	    	}
	    	return check;
	    },
	    handleRemoveAudio(file, fileList) {
	    	this.audioList.shift();
	    },
	    handlePreviewAudio(file) {
	    	// console.log(file);
	    },
	    audioSuccess(res){
	    	this.audioList.push({
	    		name:res.title,
	    		url:res.audio_src
	    	});
	    	this.audio_src=res.audio_src;
	    	this.gif_boo=false;
	    	this.listen='播放';
	    	if(this.audioList.length>1){
	    		this.audioList.shift();
	    	}
	    	this.limitUploadBoo=true;
	    	// console.log(this.audioList)
	    },
	    listenMusic(){
	    	
	    	this.gif_boo=!this.gif_boo;
	    	if(this.gif_boo){
	    		this.listen='暂停';
	    		this.$refs.audio.play();
	    	}else{
	    		this.listen='播放';
	    		this.$refs.audio.pause();
	    	}

	    },
	    editSubmit(){
	    	if(!this.limitUploadBoo){
	    		return false;
	    	}
	    	const loading = this.$loading({
	          lock: true,
	          text: '数据更新中...',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	    	let json=Object.assign({},this.classObj,{
	    		id: this.classObj.id,
		        url: this.url,
		        whoColumn:this.whoColumn,
		        price:this.price,
		        title: this.title,
		        integral: this.integral,
		        howIntegral: this.howIntegral,
		        inCount: 88,
		        popBoo: false,
		        number:this.number,
		        introduce: this.introduce,
		        audio_src:this.audio_src,
		        line_is:this.line_is,
		        boo:this.boo,
		        tui_found:this.tui_found

	    	})
	    	delete json['domain'];
	    	this.editBoo=false;
	    	this.gif_boo=false;
	    	this.$refs.audio.pause();
	    	this.$refs.audio.load();
	    	this.listen='播放';
	    	this.$axios.post(domain+'api/class/edit',{
	    		...json
	    	})
	    	.then(res=>{
	    		this.$axios.post(domain+'/api/class/getClass')
				.then(res=>{
					this.tableData=res.data;
					 loading.close();
					 this.$message({
			          showClose: true,
			          message: '数据更新成功',
			          type: 'success'
			        });
				}) 
	    	})
	    	.catch(res=>{
				 	loading.close();
			})
	    },
	    back(){
		    const loading = this.$loading({
	          lock: true,
	          text: '数据加载中...',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	    	this.editBoo=false;
	    	this.gif_boo=false;
	    	this.$refs.audio.pause();
	    	this.$refs.audio.load();
	    	this.listen='播放';

	    	this.$axios.post(domain+'/api/class/getClass')
			.then(res=>{
				this.tableData=res.data;
				 loading.close();
			})
	    }

	},

	mounted(){
		this.$axios.post(domain+'/api/class/getClass',{
			domain:domain
		})
		.then(res=>{
			this.loading=false;
			this.tableData=res.data;
		})
		this.restaurants = this.loadAll();
	    	// 图片
	    	this.uploadList = this.$refs.upload.fileList;
	    }
	}
	</script>
	<style scoped>
	.edit-title{
		width:100%;
		display:block;
		margin:0 auto;
		box-sizing:border-box;
		padding:0 10px;
		 text-align: center;
		position:relative;
	}
	.class-edit{
		margin-top:15px;
	}
	.el-select .el-input {
		width: 130px;
	}
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
	.content{
		margin-top:15px;
	}
	.class-type{
		width:100%;
		display:flex;
		align-items: center;


	}
	.class-type-font{
		width:97px;
		height:40px;
		display:flex;
		align-items:center;
		justify-content: center;
		color:#909399;
		border: 1px solid #dcdfe6;
		border-radius:4px;
		white-space: nowrap;
		background-color:#f5f7fa;
	}
	.class-pre-img{
		display:block;
		width:300px;
		height:120px;
	}
	.demo-upload-list{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 300px;
		height: 120px;
		text-align: center;
		line-height: 60px;
		border: 1px dashed #f40;
		border-radius: 4px;
		/*overflow: hidden;*/
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);

		/*margin:10px;*/
	}
	.demo-upload-list img{
		width: 300px;
		height: 120px;


	}
	.demo-upload-list-cover{
		/*display: none;*/
		position: absolute;
		top: 0;

		left: 0;

		background: rgba(0,0,0,.6);
		width:300px;
		height:120px;
		display:flex;
		align-items: center;
		justify-content: center;
		display:none;
	}

	.demo-upload-list-cover i{
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;	 

	}
	.camera-main{
		width: 300px;
		height:120px;
		display:flex;
		align-items: center;
		justify-content: center;
		/*line-height: 58px;*/

	}

	.demo-upload-list:hover .demo-upload-list-cover{
		display:block;

	}
	.demo-upload-list:hover .demo-upload-list-cover i{
		margin-top:50px;

	}
	.class-pre{
		width:302px;
		height:123px;
		display:flex;

		overflow:hidden;
		margin:10px;

	}
	.introduce-detail{
		margin-left:10px;
		margin-top:10px;
	}
	.audio{
		margin:10px;
	}
	.try-listen{
		margin-top:10px;
		margin-left:10px;
	}
	.listen_button{
		width:80px;
		height:32px;
		background:#28FF28;
		border-radius:5px;
		display:flex;
		align-items: center;
		justify-content: center;
		color:#fff;
		font-size:15px;
		cursor:pointer;
	}
	.gif-logo{
		width: 100px;
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
	.edit-back{
		position:absolute;
		left:10px;
		 font-size:18px;
	}
	.edit-font{
		 display:block;
		 margin:0 auto;
		 
	}
	</style> 