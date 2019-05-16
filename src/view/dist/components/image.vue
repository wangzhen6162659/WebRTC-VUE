<!-- 门户后台管理首页 -->
<template>
  <div class="ivu-layout-content">
    <Content>
      <Breadcrumb>
        <BreadcrumbItem>图片</BreadcrumbItem>
      </Breadcrumb>
    </Content>
    <Content>
        <file-edit v-on:page="page" v-bind:editList="social"></file-edit>
        <div class="title clearfix">图片</div>
        <div class="dateBox all-select clearfix" v-for="(val, key, index) in fileList" :key="key">
          <Checkbox :value="dateList[key]" @click.prevent.native="selectAll(key)"/>
          <span class="dateTable">{{key}}</span>
          <CheckboxGroup v-for="item in val" :key="item.id" v-model="social">
            <Checkbox class="img-box" :label="item.id">
              <img class="img" :src="item.url">
              <span class="valueImgTle">{{item.submittedFileName}}</span>
            </Checkbox>
          </CheckboxGroup>
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
export default {
  components: {
    Spin,
    Input,
    'file-edit': fileEdit
  },
  data () {
    return {
      selectData:{
        pageNo:1,
        pageSize:"100000",
        data:{
          dataType:"IMAGE",
          folderId:null,
          submittedFileName:""
        }
      },
      fileList: {},
      dateList: {},
      social:[]
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
      vm.fileList = {}
      vm.social = []
    },
    page (submittedFileName) {
        const vm = this
        vm.pageInit()
        vm.selectData.data.submittedFileName = submittedFileName
        api(apiList.filePage, vm.selectData).then(res => {
          if (res.data.errcode === 0) {
            const data = res.data.data
            if (data && data.records){
              var tempData = data.records;
              tempData.forEach(function (obj) {
                if (obj && obj.createTime){
                  var tempTime = obj.createTime.split(' ')[0]
                  if (!vm.fileList[tempTime]){
                    // vm.fileList[tempTime] = []
                    Vue.set(vm.fileList, tempTime, [])
                    Vue.set(vm.dateList, tempTime, false)
                  }
                  vm.fileList[tempTime].push(obj)
              }})
            }
            console.log(vm.fileList)
          } else {
            vm.$Message.info(res.data.errmsg)
          }
      }, err => { console.log(err) })
    },
    selectAll (key) {
      const vm = this
      var data = vm.fileList[key]
      var isCheck = vm.dateList[key]
      if (isCheck) {
        data.forEach(function (obj) {
          var index = vm.social.indexOf(obj.id)
          if (index != -1){
            vm.social.splice(index, 1);
          }
        })
        vm.dateList[key] = false
      } else {
        data.forEach(function (obj) {
          if (vm.social.indexOf(obj.id) == -1){
            vm.social.push(obj.id)
          }
        })
        vm.dateList[key] = true
      }
    }
  }
}
</script>

<style lang="less">
.img-box {
  position: relative;
  float: left;
  margin: 5px;
  width: 150px;
  height: 150px;
  cursor: pointer;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    max-width: 100px;
    max-height: 80px;
  }
  .ivu-checkbox{position: absolute;left:5px;top:5px;}
  .valueImgTle {
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
    padding: 0 10px;
    color: #666;
    line-height: 27px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.dateBox {
  .dateTable{
    font-size: 20px;
  }
}
.title {
  color: #777;
  font-size: 2.0em;
  margin-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
}
</style>
