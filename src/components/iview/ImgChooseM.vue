<template>
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
</template>

<script>
import domain from '@/domain'
export default {
	// this.$refs.upload.fileList这个为已经上传的图片信息数组集合
  name: 'ImgChooseM',
  data(){
	  return {
	  	domain1:domain+'api/banner/imgUpload',
	  	domain2:domain,
	  	msg:"ImgChooseM",
	  	// 图片上传的参数
	  	req:{
	  		// domain:this.$store.state.domain,
	  		bannerName:'banner1' 

	  	},
  	  	defaultList: [],
        visible: false,
        uploadList: [],
	  }
    
  },
  props:{
  		id:{
  			type:Number,
  			required:true
  		},
  		url:{
  			type:String,
  			required:true
  		},
  		item:{
  			type:Object,
  			required:true
  		},
  		imgIndex:{
  			type:Number,
  			required:true
  		}
  		 
  },
  methods:{
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
     		this.$emit('changeImgMsg',this.defaultList[0]);
     	}
    	
    	file.url=file.response.url
        file.name = res.url;
        if(this.$refs.upload.fileList.length>1){
        	this.$refs.upload.fileList.shift();
        }
        
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
        const check = this.uploadList.length < 2;
        if (!check) {
            this.$Notice.warning({
                title: '最多上传1张图片'
            });
        }
        return check;
    },
  },

  created(){
  	this.item.imgIndex=this.imgIndex;
  	this.defaultList=[this.item];
  	this.req=this.item;
  	this.req.domain=domain;
  },
  mounted(){
  	this.uploadList = this.$refs.upload.fileList;
  	 
  	
  	 

  }
}
</script>

 
<style scoped>
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
</style>