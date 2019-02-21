<template>
  <div class="container">
    <!-- <Button type="primary" @click="showList = !showList">{{buttonName[Number(showList)]}}</Button> -->
    <div class="edit" >
        <article-editor :articleinfo="a" @refresharticle="refreshArticleList"></article-editor>
    </div>
    <div class="list" >
        <Table border :columns="columns" :data="articleList" @on-selection-change ="showselection" @on-row-click="handlerRowClick"></Table>
    </div>
  </div>
</template>

<script>

import articleEditor from '../components/articleEditor';
import serverSrc from '../commen/commen.js'
export default{
  
  components:{
    articleEditor,
  },
  created() {
    this.refreshArticleList();
  },
  data () {
    return {
      showList:true,
      buttonName:['显示编辑器', '隐藏编辑器'],
      a:{
        articleTitle:'',
        articleContext:'',
        articleId:'',
      },
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
                    title: '标题',
                    key: 'articleTitle',
                    width:150,
                    align:'center',

                },
                {
                    title: '内容预览',
                    key: 'articleContext',
                    align:'center',
                    // className:'content-overflow',
                },
                {
                    title: '发布时间',
                    key: 'articleTime',
                    align:'center',
                    width:100,
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
                                            let {href} = this.$router.resolve({path: '/newDetail', query:{ id: params.row._id }});
                                            window.open(href, '_blank');
                                            // this.$router.push({path: '/movieDetail', query:{ id: params.row._id }})
                                            
                                        }
                                    }
                                }, '查看')
                            ]);
                        }
                    }
                ],
        articleList:[],
        selection:[],
    }
  },
  methods: {
    refreshArticleList(){
      this.$http.get(serverSrc.src + '/showArticle').then(data =>{
        if(data.body.status == 1){
          alert(data.body.message);
        } else {
          this.articleList = data.body.data;
          this.articleList.forEach((row)=>{
            row.articleTime = this.filerTime(row.articleTime)
          })
        }
      }) 
    },
    showselection(selection){
      this.selection = selection;
      // console.log(this.selection)
    },
    filerTime(time){
      let str = new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/,' ');
          return str;
    },
    handlerRowClick(data, index){
      this.a.articleTitle = data.articleTitle;
      this.a.articleContext = data.articleContext;
      this.a.articleId = data._id;
    },



  },
  
}
</script>

<style scoped>
 /* .ivu-table td.content-overflow{
  overflow: hidden;
  background-color: red;
} */
</style>