<template>
  <div class="app-container">
   
   <div class="content" v-for='(item,index) in bannerMsg'>
      <div class="banner-name">{{item.name}}</div>
        <div class="content-detail">
           <div class="imgChoose">
            <imgChoose v-bind:imgIndex="index" v-bind:id="item.id?parseInt(item.id):666" v-bind:url="item.url?item.url:''" v-bind:item="item?item:{}" @changeImgMsg="changeImgMsg"/>
           </div>
           <div class="banner-center">
             *温馨提示：可删除图片进行更改；可点击文本框进行介绍文字编辑
           </div>
            <!-- :rows="10" -->
          <div class="content-font">
               <el-input
              type="textarea"
            
             :rows=6
              placeholder="请输入内容"
              maxlength='1000'
              resize="none"
              
              v-model="item.introduce" class="textarea">
               </el-input> 
          </div>
        </div>
        
  </div>

   <div class="title">
     <span class="title-font" @click="submit">确认修改</span>
   </div>

 
</div>
</template>

<script>
  // import { loading } from 'element-ui';
  import domain from '@/domain';
  import imgChoose from '@/components/iview/imgChooseM';
  export default {
    data() {
      return {
       
          bannerMsg:[
            
          ]
          
      }
        
    },
    methods: {
      changeImgMsg(data){
        this.bannerMsg[data.imgIndex]=data;
       
      },
      
      // 用于上传判断，避免出现bug
      submit(){
       
        const loading = this.$loading({
          lock: true,
          text: '数据修改中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        
        let json=this.bannerMsg.map((item,index)=>{
          let obj={
              id:item.id,
              name:item.name,
              introduce:item.introduce,
              url:item.url
          }
          return obj;
        })
        this.$axios.post(domain+'/api/banner/setList',{
          json
        })
        .then(res=>{
          this.bannerMsg=res.data;
          loading.close();
            this.$Notice.open({
                top: 50,
                duration: 3,
                desc:'轮播图数据修改成功',
                title:'数据修改'
            })
          
          })
          .catch(res=>{
               loading.close();
          })
      }
    },
    components:{
      imgChoose
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

      let that=this;
      this.$axios.post(domain+'/api/banner/list')
      .then(res=>{
        this.loading.close();
        this.bannerMsg=res.data;
      })
    }
    
  }
</script>
<style scoped>
html{
  font-size:12px;
}
.title{
  width:100%;
  height:55px;
  box-sizing: border-box;
  /*border-bottom:1px solid #F0F0F0;*/
  display:flex;
  align-items: center;
  justify-content: center;
  font-size:1rem;
  margin-top:18px;
}
.title-font{
  padding:5px 100px;
  background:rgb(48, 65, 86);
  border-radius:10px;
  color:#fff;
  letter-spacing:5px;
  display:flex;
  align-items: center;
  box-sizing:border-box;
  margin-bottom:20px;
  white-space: nowrap;
  flex-wrap: nowrap;
  cursor:pointer;

}
.title-font:hover{
  background:#1f2d3d;
}
.imgChoose{
  width:302px;
  height:123px;
  display:flex;
  overflow:hidden;
  margin:10px;
  margin-left:0;
  z-index:10;
} 
.banner-name{
  width:100%;
  height:50px;
  display:flex;
  align-items: center;
  justify-content: center;
}
.content{
  width:100%;
  border-bottom:1px solid #F0F0F0;
}
.content-detail{
  width:100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.content-font{
  width:302px;
  height:123px;
  border:1px solid #F0F0F0;
  z-index:9;
  overflow:hidden;
}
.banner-center{
  width:200px;
  display:flex;
  align-items: center;
  justify-content: center;
  white-space: wrap;
  word-break: break-all;
  font-size:13px;
  color:#999999;
}
/*@media screen and (max-width:568px){
  .banner-center{
    font-size:12px;
    height:123px;
    overflow:hidden;
    transform: scale(0.6);
  }
}*/
.textarea{
  border:none;
  outline: none;
  height:100%;
}
 
</style>
