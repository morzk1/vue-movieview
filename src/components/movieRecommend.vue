<template>
<div>
  <Card>
    <div class="rcmd-add-box">
      <Select v-model="selectedMovieID" filterable @on-change="calcHref(selectedMovieID)">
          <Option v-for="item in movieInfo" :value="item._id" :key="item._id" >{{ item.movieName }}---{{ item._id }}---{{ filterTime(item.movieTime) }}</Option>
      </Select>
      <Input placeholder="请选择电影.." :value="mvHref" readonly>
        <label slot="prepend">电影地址</label>
      </Input>
      <Input placeholder="请输入轮播图地址:" v-model="imgSrc">
        <label slot="prepend">图片地址</label>
      </Input>
      <Button @click="submitRcmd">提交</Button>
    </div>
  </Card>
  <Card>
    <div class="rcmd-table">
      <!-- <Button @click="refreshRcmd">刷新列表</Button> -->
        <Table border :columns="columns" :data="rcmdList"></Table>
    </div>
  </Card>
</div>
</template>

<script>
  import serverSrc from '../commen/commen.js'
export default {
  created () {
    this.refreshMovieList()
    this.refreshRcmd()
  }
  ,
  data(){
      return {
        selectedMovieID:'',
        movieInfo:[],
        newRcmd:{},
        mvHref:'',
        imgSrc:'',
        rcmdList:[],
        columns:[
                {
                    title: '索引',
                    type:'index',
                    width:60
                },
                {
                    title: 'ID',
                    key: '_id',
                    width:200,
                },
                {
                    title: '名字',
                    key: 'recommendTitle',
                    width:150,

                },
                {
                    title: '图片地址',
                    key: 'recommendImg'
                },
                {
                    title: '视频地址',
                    key: 'recommendSrc'
                },
                {
                        title: 'Action',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            window.open(params.row.recommendSrc, '_blank');
                                        }
                                    }
                                }, '播放'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editRcmd(params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            if(window.confirm('你确定要取消删除吗？')){
                                              this.delRcmd(params.row._id ,params.index)
                                            }else{
                                               return false;
                                            }

                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
      }
  },
  methods:{
    refreshRcmd(){
      this.$http.get(serverSrc.src + '/showIndex').then( data =>{
        this.rcmdList = data.body.data;
      })
    },
    refreshMovieList(){
      this.$http.get(serverSrc.src + '/admin/movie').then((data) => {
      this.movieInfo = data.body.data;
      //  console.log(data.body)
     })
    },
    submitRcmd(){
      let postData ={
        id:localStorage._id,
        username:localStorage.username,
        token:localStorage.token,
        recommendImg:this.imgSrc,
        recommendSrc:this.mvHref,
        recommendTitle:this.movieInfo.find((row)=>{
              return row._id === this.selectedMovieID;
            }).movieName,
      }
       this.$http.post(serverSrc.src + '/admin/addRecommend', postData).then((data)=>{
        if(data.body.status == 1){
          alert(data.body.message);
        }else{
          alert('添加成功!');
          this.refreshRcmd();
        }
       })
    },
    calcHref(){
      let {href} = this.$router.resolve({path: '/movieDetail', query:{ id: this.selectedMovieID }});
      this.mvHref = href;
    },
    delRcmd(id, index){
      let postData = {
        id:localStorage._id,
        username:localStorage.username,
        token:localStorage.token,
        recommendId:id,
      }
      this.$http.post(serverSrc.src + '/admin/delRecommend',postData).then(data =>{
        if(data.body.status == 1){
          alert(data.body.message);
        } else {
          alert('删除成功!');
          this.rcmdList.splice(index, 1);
        }
      })
    }
    ,
    editRcmd(movieInfo){
      let newInfo = {
        // recommendId:movieInfo._id,
        recommendSrc:movieInfo.recommendSrc,
        recommendImg:movieInfo.recommendImg,
        recommendTitle:movieInfo.recommendTitle,
      }
      this.$Modal.confirm({
            render: (h) => {
                return h('div',[
                    h('Input', {
                      props: {
                        value: movieInfo._id,
                        autofocus: true,
                        readonly: true,
                        prefix:'md-code'
                        // placeholder: 'Please enter your name...'
                      },
                      on: {
                          
                      }
                    }),
                    h('Input', {
                      props: {
                        value: movieInfo.recommendTitle,
                        autofocus: true,
                        placeholder: '请输入电影名..',
                        prefix: 'md-videocam'
                      },
                      on: {
                          input: (val) => {
                              newInfo.recommendTitle = val;
                              // console.log(newInfo)
                          }
                      }
                    }),
                    h('Input', {
                      props: {
                        value: movieInfo.recommendSrc,
                        autofocus: true,
                        placeholder: '请输入视频地址..',
                        prefix: 'md-play'
                      },
                      on: {
                          input: (val) => {
                            newInfo.recommendSrc = val;
                          }
                      }
                    }),
                    h('Input', {
                      props: {
                        value: movieInfo.recommendImg,
                        autofocus: true,
                        placeholder: '请输入图片地址..',
                        prefix: 'md-image',
                      },
                      on: {
                          input: (val) => {
                            newInfo.recommendImg = val;
                          }
                      }
                    }),
                    

                ])
            },
            onOk:()=> {
              let postData ={
                id:localStorage._id,
                username:localStorage.username,
                token:localStorage.token,
                recommendId:movieInfo._id,
                movieInfo:JSON.stringify(newInfo),
              }
              this.$http.post(serverSrc.src + '/admin/updateRecommend',postData).then((data) => {
                if( data.body.status==1){
                  alert(data.body.message)
                }else{
                  alert('修改成功!')
                  this.refreshRcmd()
                }
              })
            }
        })
      },
      filterTime(movieTime){
        let str = new Date(parseInt(movieTime)).toLocaleString().replace(/:\d{1,2}$/,' ');
          return str;
      }




//end of methods
  } 
}
</script>