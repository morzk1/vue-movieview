<template>
        <div>
            <div class="fixBox">
                <Button @click="delSelected" style="width: 100%;margin-bottom: 10px;" type = "error">删除选中</Button>
            </div>
            <Table border :columns="columns" :data="movieList" @on-selection-change ="showselection"></Table>
        </div>
</template>
<script>
    import serverSrc from '../commen/commen.js'
export default {
  // props:[
  //   'movieList',
  // ],
  created () {
    this.refreshMovieList();
    // document.title = '控制台'
  },
  data () {
    return {
      columns:[
                {
                    type: 'selection',
                    width:50,
                    align:'center',
                },
                {
                    title: '索引',
                    type:'index',
                    width:70,
                    align:'center',
                },
                {
                    title: 'ID',
                    key: '_id',
                    width:200,
                    align:'center',
                },
                {
                    title: '名字',
                    key: 'movieName',
                    width:150,
                    align:'center',

                },
                {
                    title: '图片地址',
                    key: 'movieImg'
                },
                {
                    title: '视频地址',
                    key: 'movieVideo'
                },
                {
                    title: '下载地址',
                    key: 'movieDownload'
                },
                {
                    title: '点赞量',
                    key: 'movieNumSuppose',
                    width:80,
                    align:'center',
                },
                {
                    title: '下载量',
                    key: 'movieNumDownload',
                    width: 80,
                    align:'center',

                },
                {
                    title: '首页推荐',
                    key: 'movieMainPage',
                    width: 120,
                    align:'center',
                    filters: [
                            {
                                label: '已推荐',
                                value: 1
                            },
                            {
                                label: '尚未推荐',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.movieMainPage == true;
                            } else if (value === 2) {
                                return row.movieMainPage == false;
                            }
                        }

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
                                            // this.show(params.index)
                                            // console.log(params)
                                            // console.log(params.row)
                                            let {href} = this.$router.resolve({path: '/movieDetail', query:{ id: params.row._id }});
                                            window.open(href, '_blank');
                                            // this.$router.push({path: '/movieDetail', query:{ id: params.row._id }})
                                            
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
                                            // this.show(params.index)
                                            // console.log(params)
                                            // console.log(params.row)
                                            this.editMovie(params.row)
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
                                              this.delMovie(params.row._id ,params.index)
                                            }else{
                                               return false;
                                            }

                                            // this.remove(params.index)
                                            // this.delMovie(params.row._id ,params.index)
                                            // console.log(params.row._id)

                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
        movieList:[],
        selection:[],

    }
  },
    methods:{
    
    refreshMovieList(){
      this.$http.get(serverSrc.src + '/admin/movie').then((data) => {
      this.movieList = data.body.data;
      //  console.log(data.body)
     })
    },
    delMovie(movieID, index){
      let moviedel = {
        id:localStorage._id,
        username:localStorage.username,
        token:localStorage.token,
        movieId:movieID
      }
      this.$http.post(serverSrc.src + '/admin/movieDel',moviedel).then((data) => {
        if( data.body.status==1){
          alert(data.body.message)
        }else{
        //   alert('删除成功!')
          this.movieList.splice(index,1);
        }
//        console.log( data.body.data)
      })
    },
    updateMovie(movieID, newInfo){
      let postData ={
        id:localStorage._id,
        username:localStorage.username,
        token:localStorage.token,
        movieInfo:newInfo,
      }
      this.$http.post(serverSrc.src + '/admin/movieUpdate',postData).then((data) => {
        if( data.body.status==1){
          alert(data.body.message)
        }else{
          alert('删除成功!')
          this.movieList.splice(index,1);
        }
      })
    }
    ,
    editMovie(movieInfo){
      let newInfo = {
        movieDownload:movieInfo.movieDownload,
        movieVideo:movieInfo.movieVideo,
        movieImg:movieInfo.movieImg,
        movieName:movieInfo.movieName,
  
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
                        value: movieInfo.movieName,
                        autofocus: true,
                        placeholder: '请输入新电影名..',
                        prefix: 'md-videocam'
                      },
                      on: {
                          input: (val) => {
                              newInfo.movieName = val;
                              // console.log(newInfo)
                          }
                      }
                    }),
                    h('Input', {
                      props: {
                        value: movieInfo.movieVideo,
                        placeholder: '请输入新视频地址..',
                        prefix: 'md-play'
                      },
                      on: {
                          input: (val) => {
                            newInfo.movieVideo = val;
                          }
                      }
                    }),
                    h('Input', {
                      props: {
                        value: movieInfo.movieDownload,
                        placeholder: '请输入新下载地址..',
                        prefix: 'md-download'
                      },
                      on: {
                          input: (val) => {
                            newInfo.movieDownload = val;
                          }
                      }
                    }),
                    h('Input', {
                      props: {
                        value: movieInfo.movieImg,
                        placeholder: '请输入新封面图地址..',
                        prefix: 'md-image',
                      },
                      on: {
                          input: (val) => {
                            newInfo.movieImg = val;
                          }
                      }
                    }),
                    h('Checkbox', {
                      props: {
                        value: movieInfo.movieMainPage,
                      },
                      on: {
                          input: (val) => {
                            newInfo.movieMainPage = val;
                          }
                      }
                    },[
                    '首页推荐'
                    ]),
                    

                ])
            },
            onOk:()=> {
              
              // alert(1);
              // console.log(newInfo)
              // updateMovie(movieInfo._id, newInfo)
              let postData ={
                id:localStorage._id,
                username:localStorage.username,
                token:localStorage.token,
                movieId:movieInfo._id,
                movieInfo:JSON.stringify(newInfo),
              }
              this.$http.post(serverSrc.src + '/admin/movieUpdate',postData).then((data) => {
                if( data.body.status==1){
                  alert(data.body.message)
                }else{
                  alert('修改成功!')
                  this.refreshMovieList()
                }
              })
            }
        })
      },
      showselection(selection){
        //   let selection = this.$refs.table
        this.selection = selection
          console.log(this.selection)
      },
      delSelected(){
        if(this.selection.length == 0){
            alert('尚未选中');
            return false;
        }
        if(window.confirm('你确定要取消删除吗？')){
            this.selection.forEach(row =>{
              this.delMovie(row._id);
          })
        }else{
            return false;
        }
          
      },
      menuShow(event){
        alert(1);
      }
  
  }, //of methods
}
</script>

<style scoped>
/* .fixBox{
    position: fixed;
    top:200px;
    left:0px;
    z-index: 999;
    width: 100%;
} */
</style>