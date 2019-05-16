<template>
  <div class="fileEdit">
    <share-modal ref="shareModal"></share-modal>
    <Modal
      v-model="showWarnModal"
      title="警告"
      @on-ok="deleteOk"
      @on-cancel="deleteCancel">
      <Alert style="font-size: 15px; text-align: center">是否删除?</Alert>
    </Modal>
    <div class="form-group">
      搜索:
      <Input v-model="submittedFileName" placeholder="请输入查找文件" style="width: 200px">
        <Icon type="ios-search" slot="suffix" />
      </Input>
      <Button class="form-fiel" type="primary" @click="page">确定</Button>
      <div class="pull-right">
        <div style="position: absolute;margin: 0px 0px 0px -90px;">
        <Upload :action="action"
                :headers="self_headers"
                :data="self_data"
                :multiple="multiple"
                :type="type"
                :show-upload-list="showUploadList"
                :accept="accept"
                :max-size="maxSize"
                :before-upload="beforeFileUpload"
                :on-progress="onProgress"
                :on-success="successFunc"
                :on-error="errorFuc"
                :on-remove="onRemove"
                :on-format-error="onFormatError"
                :on-exceeded-size="onExceededSize"
                :default-file-list="defaultFileList"
                ref="upload">
          <Button class="form-fiel" type="warning" icon="ios-cloud-upload-outline" :on-preview="onPreview"><slot>{{btnText}}</slot></Button>
        </Upload>
        </div>
        <div class="form-field">
          <div class="form-group">
            <div class="form-control-wrap">
              <Button class="form-fiel" type="primary" @click="doShares">批量分享</Button>
              <Button class="form-fiel" type="primary" @click="doDownload">批量下载</Button>
              <Button class="form-fiel" type="primary" @click="showWarnModal = true">批量删除</Button>
              <div>
                <ul class="file-list" v-for="(list,index) in newFileArr" :key="index">
                  <li>文件名: <span style="font-size:15px;">{{ list.name }}</span> <Icon type="ios-close" size="20" style="float:right;" @click="delFileList(index)"></Icon></li>
                </ul>
              </div>
              <div v-show="newFileArr.length > 0">
                <Button type="primary" icon="ios-power" @click="upload">
                  <span v-if="uploadTag">提交</span>
                  <span v-else>正在上传文件中...</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import constant from '@/constant/constant'
import shareModal from "@/view/dist/components/share/shareModal";
import api from '@/api/axiosApi'
import apiList from '@/view/dist/api/apiList'
export default {
  name: 'fileEdit',
  components: {
    'share-modal': shareModal
  },
  props:
    {
    editList: { // 默认传递过来的图像数据，用于纯粹显示使用
      type: Array,
      default: () => {
        return []
      }
    },
    isAuto: { // 是否自动上传,默认手动
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: '上传'
    },
    action: { // 上传的地址，必填
      type: String,
      default: '/api/file/file/upload'
    },
    headers: Object, // 设置上传的请求头部
    data: Object, // 上传时附带的额外参数
    multiple: {
      type: Boolean,
      default: true
    }, // 是否支持多选文件
    showUploadList: { // 是否显示已上传文件列表
      type: Boolean,
      default: true
    },
    type: { // 上传控件的类型，可选值为 select（点击选择），drag（支持拖拽）
      type: String,
      default: 'select'
    },
    accept: String, // 接受上传的文件类型
    maxSize: Number, // 文件大小限制，单位 kb
    beforeUpload: Function, // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
    onProgress: Function, // 文件上传时的钩子，返回字段为 event, file, fileList
    onSuccess: {
      type: Function,
      default: this.successFunc
    }, // 文件上传成功时的钩子，返回字段为 response, file, fileList
    onError: {
      type: Function, // 文件上传失败时的钩子，返回字段为 error, file, fileList
      default: this.errorFuc
    },
    showMax: { // 设置最大文件数
      type: Number,
      default: 999
    },
    format: Array, // 接受上传的文件类型,与 accept 不同的是，format 是识别文件的后缀名
    onPreview: Function, // 点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
    onRemove: Function, // 文件列表移除文件时的钩子，返回字段为 file, fileList
    onFormatError: Function, // 文件格式验证失败时的钩子，返回字段为 file, fileList
    onExceededSize: Function, // 文件超出指定大小限制时的钩子，返回字段为 file, fileList
    defaultFileList: Array // 设置默认已上传的列表
  },
  data () {
    return {
      submittedFileName: '',
      imgList: [],
      max: this.showMax,
      delFileArr: [],
      newFileArr: [],
      uploadTag: true,
      successNum: 0,
      errorNum: 0,
      uploadNum: 0,
      showWarnModal: false
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    self_headers () {
      /* return Object.assign({
        token: this.userInfo.token,
        _user_id: this.userInfo.userId
      }, this.headers, true) */
      return Object.assign({
        'token': constant.token,
        'user-token': constant.userToken,
      }, this.headers, true)
    },
    self_data () {
      return Object.assign({
        // bizType: 'USER_PHOTO',
        folderId: -1,
      }, this.data, true)
    }
  },
  mounted () {
    const vm = this
    vm.init()
  },
  methods: {
    init () { // 初始化
      const vm = this
      vm.submittedFileName = ''
      vm.imgList = []
      vm.delFileArr = []
      vm.newFileArr = []
      vm.uploadTag = true
      vm.successNum = 0
      vm.errorNum = 0
      vm.uploadNum = 0
    },
    page(){
      const vm = this
      vm.$emit('page', vm.submittedFileName)
    },
    clearFiles () {
      this.$refs.upload.clearFiles()
    },
    doShares (){
      const vm = this
      if (vm.editList.length == 0){
        vm.$Message.info('请先选择文件!')
        return
      }
      vm.$refs.shareModal.open(vm.editList)
    },
    doShare (id){
      const vm = this
      if (!id){
        vm.$Message.info('请先选择文件!')
        return
      }
      var ids = []
      ids.push(id)
      vm.$refs.shareModal.open(ids)
    },
    // 上传前操作
    beforeFileUpload (file) {
      const vm = this
      let fileArray = file.name.split('.')
      let length = fileArray.length - 1
      let fileType = fileArray[length]
      if (vm.format) {
        if (vm.format.length) {
          let fileTypeBoolean = false
          vm.format.map(item => {
            if (item === fileType) {
            fileTypeBoolean = true
          }
        })
          if (!fileTypeBoolean) {
            /* this.$Notice.warning({
              title: '文件上传错误',
              desc: '请上传' + vm.format.join('、') + '格式的文件！'
            }) */
            this.$Message.warning({
              content: '请上传' + vm.format.join('、') + '格式的文件！'
            })
            return false
          }
        }
      }
      if (file.size > 2048 * 1024) {
        vm.$Message.error('文件大小超出2M，请重新上传')
        return false
      }
      let keyID = Math.random().toString().substr(2)
      file['keyID'] = keyID
      // if (vm.bizId) vm.self_data['id'] = vm.bizId
      // 创建一个 FileReader 对象
      let reader = new FileReader()
      // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
      // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
      // 读取文件作为 URL 可访问地址
      reader.readAsDataURL(file)
      reader.onloadend = function (e) {
        file.url = reader.result
        if (vm.imgList.length >= vm.max) {
          vm.$Message.error('文件数量超出限制，请先删除后再添加！')
          return false
        } else {
          vm.imgList.push(file)
          vm.newFileArr.push(file)
        }
      }
      if (vm.isAuto) {
        return true // 自动
      } else {
        return false // 手动上传会被拦截
      }
    },
    upload () { // 上传文件，type为bizType
      const vm = this
      // vm.self_data.bizType = type
      // if (vm.delFileArr.length !== 0) {
      //   vm.removeFindAttachment()
      // }
      if (vm.newFileArr.length === 0) {
        // vm.$Message.error('未选择上传文件')
        return false
      }
      vm.uploadNum = vm.newFileArr.length
      vm.newFileArr.forEach(item => {
        console.log(vm.$refs.upload)
        vm.$refs.upload.post(item)
      })
      vm.uploadTag = false
      // vm.newFileArr.forEach(item => vm.$refs.upload.post(item)) // console.log(item)
    },
    removeFiles () {
      const vm = this
      if (vm.editList.length == 0){
        vm.$Message.info('请先选择文件!')
        return
      }
      api(apiList.removeFiles, {ids: vm.editList}).then(res => {
        if (res.data.errcode === 0) {
          vm.$Message.info('删除成功!')
          vm.$emit('page', "")
        }else {
          vm.$Message.info(res.data.errmsg)
        }
      }, err => { console.log(err) })
    },
    doDownload () {
      const vm = this
      if (vm.editList.length == 0){
        vm.$Message.info('请先选择文件!')
        return
      }
      var ids = vm.editList
      window.location.href = `${constant.apiPath}${apiList.downloadFiles.url}?ids[]=${ids.join('&ids[]=')}&token=${constant.token}&user-token=${constant.userToken}`
    },
    deleteOk () {
      const vm = this
      vm.removeFiles()
    },

    deleteCancel () {
    },

    delFileList(index){
      const vm = this;
      vm.newFileArr.splice(index, 1);
    },
    successFunc (response, file, fileList){
      const vm = this
      vm.successNum += 1
      vm.newFileArr.forEach(function (value, index) {
        if (value.uid == file.uid){
          vm.delFileList(index)
        }
      })
      if (vm.uploadNum == (vm.errorNum + vm.successNum)){
        var msg = '上传成功' + vm.successNum + '个'
        if (vm.errorNum != 0){
          msg += ',失败' + vm.errorNum + '个'
        }
        msg += '!'
        vm.$Message.success(msg)
        vm.errorNum = 0
        vm.successNum = 0
        vm.uploadNum = 0
        vm.uploadTag = true
        vm.$emit('page', "")
      }
    },
    errorFuc (error, file, fileList) {
      const vm = this
      vm.errorNum += 1
      console.log(error)
      vm.$Message.error('上传图片错误,请检查网络后重试！')
    }
  }
}
</script>
<style lang="less" scoped="scoped">
  .hy-upload {
    text-align: left;
    display: table;
  }
  .ivu-form-item-content{
    height:auto;
  }
</style>

<style lang="less">
.hy-upload{
  .ivu-upload-list {
    .ivu-upload-list-file{
      width: 130px;
        span{
          display: block;
          width: 110px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          float: left;
        }
    }
  }
}
.form-group {
  margin-top: -4px;
  margin-bottom: 16px;
}
.form-fiel {
  margin: 4px 8px 4px 0px;
  display: inline-block;
  vertical-align: middle;
}
.pull-right {
  float: right;
}
.form-field {
  margin: 4px 0px;
}
.form-control-wrap {
  display: inline-block;
  vertical-align: middle;
}
.ivu-upload-list{display:none;}
</style>
