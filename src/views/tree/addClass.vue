  <template>
  <div class='main'>
  <div class="class-edit">
    <div class="edit-title">
      
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
                <div  @click.stop="setImgReq" style="width:100%;height:100%;position:absolute;z-index: 100" v-show="limit_boo"></div>
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
    style="position:relative"
    >
    <el-button size="small" type="primary" @click="setReq">
        点击上传
    </el-button>
    <div  @click.stop="setReq" style="width:100%;height:100%;position:absolute;z-index:100;left:0;top:0" v-show="limit_boo"></div>
  </el-upload>
  
  </div>
  <div class="try-listen" v-show="audio_src?true:false">
    <div class="listen_button" ref="tryListen" @click="listenMusic">{{listen}}</div>
  </div>
  <img src="@/assets/v_logo.gif" class="gif-logo" alt="" v-show="gif_boo">
  <audio :src="audio_src" loop="loop" ref='audio' preload="preload"></audio>
  <div class="submit-all">
       <span @click="editSubmit">添加课程</span>
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
          gif_boo:false,
          listen:'播放',
          audioSrc:domain+'/api/class/audio',
          audioRequest:{
            domain:domain,
             
          },
      
          msg:'暂无消息',
          classObj:{
            domain:domain
          },
          title: '风水国学',
          whoColumn:'李老师',
          introduce:'你好，世界',
          price:'888.88',
          tui_found:'8',
          url:'',
          integral:'0.25',
          howIntegral:'8',
          number:'1000',
          boo:1,
          id:'',
          class_try_read:1,
          audio_src:'',
          line_is:'精品课程',
          // 选择性框
          restaurants: [],
          status:'',
          // 图片
          domain1:domain+'api/class/imgUpload',
          domain2:domain,
          msg:"ImgChooseM",
        // 图片上传的参数
        req:{
          url:'https://miao.su/images/2019/02/18/guoxue8a7df.md.jpg',
          domain:domain

        },
        defaultList: [{
          name:'',
          url:''
        }],
        visible: false,
        uploadList: [{
          
        }],
       
        audioList: [],
        // 用于上传图片和视频时限制id不一致，导致插入空数据
        limit_boo:false
     
      }




    },
   // watch:{
   //   defaultList:(data=[])=>{
   //     return data;
   //   }
   // },
    methods: {
   
      beforeUploadAudio(){
        this.limit_boo=true;
      },
      setReq(){
          if(this.limit_boo){
            this.$message({
              message: '慢点,当前有文件在上传',
              type: 'warning'
            });
             
        }
        this.audioRequest={
          domain:domain,
          id:this.id
        }
     
      },
      setImgReq(){
        if(this.limit_boo){
            this.$message({
              message: '慢点,当前有文件在上传',
              type: 'warning'
            });
            
        }
         this.req={
          id:this.id,
          domain:domain
        };

      },
    
      handleDelete(index, row) {
          
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
        this.url=res.url;
        this.id=res.id;
         this.audioRequest=Object.assign({},this.audioRequest,{
          id:res.id
        })
        if(this.defaultList[0]){

          this.defaultList[0]=Object.assign({},this.defaultList[0],res);
      
        }
        
        file.url=file.response.url;
        file.name = res.url;
        if(this.$refs.upload.fileList.length>1){
          this.$refs.upload.fileList.shift();
        }
        this.limit_boo=false;

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
        this.req={
          id:this.id,
          domain:domain
        };

        
        this.limit_boo=true;
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
        
      },
      audioSuccess(res){
   
       this.id=res.id;
       this.req=Object.assign({},this.req,{
          id:res.id
        })
       this.audio_src=res.audio_src;
        this.audioList.push({
          name:this.title,
          url:res.audio_src
        });
        this.audio_src=res.audio_src;
        this.gif_boo=false;
        this.listen='播放';
        if(this.audioList.length>1){
          this.audioList.shift();
        }

       this.limit_boo=false;
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
        if(this.audio_src==''){
          alert('课程音频必须上传');
          return false;
        }
        if(this.url==''){
           alert('课程封面图片必须上传');
          return false;
        }
        const loading = this.$loading({
            lock: true,
            text: '数据添加中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
        let json={
          id:this.id,
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
          class_try_read:this.class_try_read,
          boo:this.boo,
          tui_found:this.tui_found,
          other:'热销中',
          popBoo:0,
          pay_is:0,
          eye:0,
          classCount:'信息',
          howPeople:0

        }
       
        this.gif_boo=false;
        this.$refs.audio.pause();
        this.$refs.audio.load();
        this.listen='播放';
        
          this.$axios.post(domain+'/api/class/addClass',{
            ...json
          })
          .then(res=>{
            
              this.$router.replace({
                 path:'tree'
              });
         
           // this.tableData=res.data;
           loading.close();
             if(res.status==200){
                  this.$Notice.open({
                    top: 50,
                    duration: 3,
                    desc:'课程数据添加成功',
                    title:'课程添加'
           
                 })
             }else{
                this.$Notice.error({
                    top: 50,
                    duration: 3,
                    desc:'课程数据添加失败',
                    title:'课程添加'
           
                 })
             }
           
          })
          .catch(res=>{
          loading.close();
         }) 
        
      }
       

  },

  mounted(){
   
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
 
  .edit-font{
     display:block;
     margin:0 auto;
     
  }
  </style> 