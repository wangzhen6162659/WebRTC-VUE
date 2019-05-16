<!-- 门户后台管理首页 -->
<template>
  <div class="ivu-layout-content">
    <Content>
      <Breadcrumb>
        <BreadcrumbItem>文档</BreadcrumbItem>
      </Breadcrumb>
    </Content>
    <Content>
        <file-edit ref="fileEidtModal" v-on:page="page" v-bind:editList="social"></file-edit>
      <div class="title clearfix">文档</div>
      <Table border ref="selection"
             @on-selection-change="selectAll"
             :columns="columns"
             :data="fileList"></Table>
      <div class="page">
        <Page size="small" show-elevator show-sizer
              :total="allNum"
              :current="selectData.pageNo"
              :page-size="selectData.pageSize"
              @on-change="pageByNo"
        />
      </div>
    </Content>

  </div>
</template>

<script>
import api from '@/api/axiosApi'
import apiList from '@/view/dist/api/apiList'
import Input from "iview/src/components/input/input"
import Vue from 'vue'
import Spin from "iview/src/components/spin/spin";
import fileEdit from "@/view/dist/components/fileEdit";
import hover from "@/assets/css/hover.css"
import constant from '@/constant/constant'
export default {
  components: {
    Spin,
    Input,
    'file-edit': fileEdit
  },
  data () {
    return {
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: '文件名',
        key: 'submittedFileName',
      }, {
        title: '大小',
        key: 'size',
      }, {
        title: '所在文件夹',
        key: 'folderName',
        render: (h, params)=> {
          return h('span', params.row.folderName || '根文件夹')
        }
      }, {
        title: '创建日期',
        sortable: true,
        key: 'createTime',
      }, {
        title: '操作',
        key: 'action',
        align: 'center',
        width: 220,
        render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'md-share'
                },
                class: 'hvr-grow button-list',
                style: {
                  title: "分享"
                },
                on: {
                  click: () => {
                    console.log('分享') // 点击操作事件
                    this.doShare(params.row.id)
                  }
                }
              }, 'share'),
                h('Icon', {
                  props: {
                    type: 'md-download'
                  },
                  class: 'hvr-grow button-list',
                  style: {
                    title: "下载"
                  },
                  on: {
                    click: () => {
                      console.log('下载') // 点击操作事件
                      this.doDownload(params.row.id)
                  }
                }
              }, 'download'),
                h('Icon', {
                  props: {
                    type: 'ios-create'
                  },
                  class: 'hvr-grow button-list',
                  style: {
                    title: "重命名"
                  },
                  on: {
                    click: () => {
                      console.log('重命名') // 点击操作事件
                  }
                }
              }, 'rename'),
              h('Icon', {
                props: {
                  type: 'ios-trash'
                },
                class: 'hvr-grow button-list',
                style: {
                  title: "删除"
                },
                on: {
                  click: () => {
                    console.log('删除') // 点击操作事件
                    this.doRemove(params.row.id)
                }
              }
            }, 'remove')
            ]);
        }
      }],
      selectData:{
        pageNo:1,
        pageSize:10,
        data:{
          dataType:"DOC",
          folderId:null,
          submittedFileName:""
        }
      },
      fileList: [],
      social:[],
      allNum: 0
    }
  },
  mounted () {
    const vm = this
    vm.init()
    vm.page()
  },
  methods: {
    init () { // 初始化
      const vm = this
      vm.pageInit()
    },
    pageInit(){
      const vm = this
      vm.dateList = []
      vm.fileList = []
      vm.social = []
    },
    page (submittedFileName) {
        const vm = this
        vm.pageInit()
        vm.selectData.data.submittedFileName = submittedFileName
        vm.filePage()
    },
    pageByNo (pageNo) {
      const vm = this
      vm.selectData.pageNo = pageNo
      vm.filePage()
    },
    filePage () {
      const vm = this
      api(apiList.filePage, vm.selectData).then(res => {
        if (res.data.errcode === 0) {
        const data = res.data.data
        vm.allNum = data.total
        if (data && data.records){
          vm.fileList = data.records
        }
      } else {
        vm.$Message.info(res.data.errmsg)
      }
    }, err => { console.log(err) })
    },
    selectAll (selection) {
      const vm = this
      var ids = selection.map(x => {return x.id})
      vm.social = ids
      console.log(vm.social)
    },
    doShare (id) {
      const vm = this
      vm.$refs.fileEidtModal.doShare(id)
    },
    doRemove (id) {
      const vm = this
      if (!id){
        vm.$Message.info('请先选择文件!')
        return
      }
      var ids = []
      ids.push(id)
      api(apiList.removeFiles, {ids: ids}).then(res => {
        if (res.data.errcode === 0) {
          vm.$Message.info('删除成功!')
          vm.page()
        }else {
          vm.$Message.info(res.data.errmsg)
        }
      }, err => { console.log(err) })
    },
    doDownload (id) {
      const vm = this
      if (!id){
        vm.$Message.info('请先选择文件!')
        return
      }
      window.location.href = `${constant.apiPath}${apiList.downloadFiles.url}?ids[]=${id}&token=${constant.token}&user-token=${constant.userToken}`
    }
  }
}
</script>

<style lang="less">
.page{
  text-align: center;
  margin-top: 5px;
}
.button-list {
  margin-right: 10px;
  font-size: 20px;
  color: #22a2ed;
}
.title {
  color: #777;
  font-size: 2.0em;
  border-bottom: 1px solid #e5e5e5;
}
</style>
