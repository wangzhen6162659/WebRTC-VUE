<template>
  <div style="height: 100%;">
  <!--<div>-->
    <!--<div>-->
      <!--<div class="title">创建一个房间</div>-->
    <!--</div>-->
    <!--<div>-->
      <!--<div id='videos'>-->
        <!--<div id="mineVideo" class="videoContainer">-->
          <!--<video id="localVideo" style="height: 150px;" oncontextmenu="return false;"></video>-->
          <!--<div id="localVolume" class="volume_bar"></div>-->
          <!--<label id="name" class="user_name"/>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="mid_video_style" id="mid_video">-->
      <!--</div>-->
      <!--<button id="board_open_btn" @click="openWhiteBoard()">打开白板</button>-->
      <!--<white-board ref="whiteBoard" v-bind:webrtc="webrtc"></white-board>-->
    <!--</div>-->
  <!--</div>-->
  <div class="whead">
    <img src="dist-static/lib/img/close.png" class="closebtn" @click="modal1 = true">
    <p class="wtitle">中科恒运视频会议</p>
  </div>
  <div class="mainvideo" id="mainvideo">
    <div class="personlist">
      <div class="xl bn"></div><div class="xr bn"></div> <div class="xb bn"></div><div class="xbr bn"></div>
      <h1>在线人员列表</h1>
      <ul id="plist">
        <!--<li v-for="(item index) in plist" :key="item.index">
          <img src="dist-static/lib/img/p1.jpg">
          <span>{{item.name}}</span>
        </li>-->
      </ul>
    </div>
    <div class="mainng">
      <div class="l bn"></div><div class="r bn"></div> <div class="b bn"></div><div class="br bn"></div>
      <video src="" poster="dist-static/lib/img/39.png"></video>
      <ul class="op"></ul>
    </div>
    <div class="mainr">
      <dl id="dlc">
        <dd :id="dlcoId">
          <div class="xl bn"></div><div class="xr bn"></div> <div class="xb bn"></div><div class="xbr bn"></div>
          <video src="" poster="dist-static/lib/img/39.png" id="localVideo"></video>
          <div class="spinfo">{{localName}}</div>
          <!-- <div class="videolz" v-show="videolzshow"><i></i>正在录制{{videolzh}}:{{videolzm}}:{{videolz}}</div> -->
          <ul class="op">
            <li title="静音"><i class="el-icon-close-notifications" onclick="sybtn(this)" :data-id="dlcoId"></i></li>
            <li title="录制视频"><i class="el-icon-video-camera" id="recorderControl-1" :data-id="dlcoId"></i></li>
            <li title="麦克风控制"><i class="el-icon-microphone" @click="audioOff"></i></li>
            <li title="摄像头控制"><i class="el-icon-video-cameras" @click="cameraOff" :data-id="dlcoId"></i></li>
          </ul>
        </dd>
      </dl>
    </div>
    <div class="mainb">
      <div class="swiper-container">
        <div class="swiper-wrapper" id="swiperc"></div>
      </div>
    </div>
  </div>
  <div class="btnm">
    <ul class="op mcv">
      <!--<li><img class="sybtn" src="dist-static/lib/img/sy.png"></li>-->
      <!-- <li><img src="dist-static/lib/img/sx1.png"></li> -->
    </ul>
  </div>

    <div class="maskop" v-show="showdia">
    	<div class="dialogk" v-show="showdia">
     <!--  <a class="closemask" @click="showdia = false;this.formValidate">X</a> -->
  	     <Form :ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        		<FormItem label="姓名" prop="userName">
        		    <Input v-model="formValidate.userName" placeholder="请输入姓名"></Input>
        		</FormItem>
        		<FormItem label="身份证号码" prop="idCard">
        		    <Input v-model="formValidate.idCard" placeholder="请输入身份证号码"></Input>
        		</FormItem>
        		<FormItem label="手机号码" prop="account">
        		    <Input v-model="formValidate.account" placeholder="请输入手机号码"></Input>
        		</FormItem>
        		<FormItem>
        		    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        		</FormItem>
  	      </Form>
    	</div>
    </div>

    <div class="maskop" v-show="addRome">
      <div class="dialogk" v-show="addRome">
      <!-- <a class="closemask" @click="addRome = false">X</a> -->
         <Form :ref="roomValidate" :model="roomValidate" :rules="roomRuleValidate" :label-width="100">
            <FormItem label="会议名称" prop="meetName">
                <Input v-model="roomValidate.meetName" placeholder="请输入会议名称"></Input>
            </FormItem>
            <FormItem label="会议描述" prop="meetDesc">
                <Input v-model="roomValidate.meetDesc" placeholder="请输入会议描述"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="roomSubmit('roomValidate')">提交</Button>
            </FormItem>
          </Form>
      </div>
    </div>


  </div>
</template>
<script>
  import api, {httpServerCancel, httpServerRe} from '@/api/axiosApi'
  import WhiteBoard from "@/view/dist/components/whiteboard";
  import apiList from '@/view/dist/api/apiList'
  import {mapState} from 'vuex'

  export default {
    components: {
      'white-board': WhiteBoard
    },
    data() {
      return {
        showdia: false,
        addRome: false,
        webrtc: '',
        loginTag: false,
        room: '',
        userName: '',
        userPhone: '',
        userId: '',
        dlcoId: '',
        localName: '',
        videolz: '',
        videolzh:'00',
        videolzm:'00',
        videolzshow: false,
        owner:'',
        room:'',
        token: '',
        tag1: "静音",
        tag2: "取消静音",
        vidTag1: "关闭视频",
        vidTag2: "打开视频",
        audTag1: "关闭麦克风",
        audTag2: "打开麦克风",
        midInterval: null,
        fullscreenLoading: false,
	      formValidate: {
           userName: '',
           idCard: '',
	         account:''
        },
        roomValidate: {
           meetName: '',
           meetDesc: ''
        },
        roomRuleValidate:{
          meetName: [
            {required: true, message: '请填写会议名称', trigger: 'blur' }
          ]
        },
	     ruleValidate: {
  	    userName: [
  		    {required: true, message: '请填写用户名', trigger: 'blur' }
  	    ],
  	    idCard: [
  		    {required: true, message: '请填写身份证号码', trigger: 'blur' }
  	    ],
  	    account: [{
      		  required: true,
      		  validator: (rule, value, cb) => {
      		  if (!value) {
      		    cb(new Error('不能为空'))
      		  }
      		  if (value && !/^1[345789]\d{9}$/.test(value)) {
      		    cb(new Error('手机号格式不正确'))
      		  }
      		  cb()
      	     }}]
      	}
      }
    },
    computed: {},
    mounted() {
    const vm = this
    let token = this.GetUrlParam("token");
    let mid = this.GetUrlParam("mid");
    vm.room = mid
    vm.token = token
    this.login()
      // this.isLogin()
      this.fit()
    },
    methods:{
    handleSubmit(){
     const vm = this
      this.fullscreenLoading = true
      api(apiList.saveUser,
        vm.formValidate
      ).then(res => {
      this.fullscreenLoading = false
      window.location.href =  window.location.href+'?token='+res.data.data.token+'&mid='+vm.room
        this.$router.go(0)
        vm.sj()
      })
     },
     roomSubmit(name){
       const vm = this
       vm.roomValidate.owner = vm.userId
       vm.fullscreenLoading = true
       api(apiList.saveMeet,
          vm.roomValidate
        ).then(res => {
          let d = res.data.data
          vm.room = d.id
          window.location.href =  window.location.href.split('?')[0]+'?token='+vm.token+'&mid='+vm.room
          vm.$router.go(0)
          vm.fullscreenLoading = false
          vm.sj()
        })
     },
     login (){
     const vm = this
         if (vm.token) {
          api(apiList.getDecode,
            {token: vm.token}
          ).then(res => {
            if (res.data.code!=0){
              vm.$Message.info(res.data.errmsg)
              vm.showdia = true
            }else{
              const d = res.data.data
              vm.userName = d.userName
              vm.userPhone = d.account
              vm.userId = d.id
              vm.hasRoom()
              vm.localName = d.userName
              vm.dlcoId = d.id
              vm.sj()
            }
          })
        }else{
          vm.showdia = true
        }
     },
     hasRoom(){//房间
     const vm = this
        if(vm.room){
          api(apiList.getMeet, {id: vm.room}
        ).then(res => {
          if (!res.data.data){
            vm.$Message.info("请进入有效房间！")
            vm.addRome = true
          }else{
            vm.isLogin()
            vm.owner = res.data.data.owner
          }
        })
        }else{
          this.addRome = true
        }
     },
     GetUrlParam(paraName) {
          var url = document.location.toString();
          var arrObj = url.split("?");
          if (arrObj.length > 1) {
              var arrPara = arrObj[1].split("&");
              var arr;

              for (var i = 0; i < arrPara.length; i++) {
                  arr = arrPara[i].split("=");

                  if (arr != null && arr[0] == paraName) {
                      return arr[1];
                  }
              }
              return "";
          }
          else {
              return "";
          }
      },
      fit() {
        var w = $('body').width();
        var h = $('body').height();
        var hd = $('.whead').height();
        var vd = $('.mainvideo').height(h - hd - 40);
        $('.mainng').width(w - $('.mainr').width() - $('.personlist').width() - 70).height(vd.height() - 210);
        $('.mainr').height(vd.height() - 210);
        $('.personlist').height(vd.height() - 230);
      },
      sj() {
        $('.swiper-slide,.mainr dl dd,.mainng').hover(function(){
          $(this).find('ul').stop(true,false).fadeIn();
        },function(){
          $(this).find('ul').stop(true,false).fadeOut();
        })
        $('.personlist ul li,.mainr dl dd,.mainb .swiper-slide').click(function(){
          if (this.tagName == 'DD') {
            $('.mainb .swiper-slide').removeClass('active');
          } else if (this.tagName == 'DIV') {
            $('.mainr dl dd').removeClass('active');
          }
          $(this).addClass('active').siblings().removeClass('active');
        });
      },
      ec() {
        var wh = $(window).width()
        var index = 6;
        if(wh < 1445){
          index = 4
        }
        var swiper = new Swiper('.swiper-container', {
          slidesPerView: index,
          spaceBetween: 20
        })
      },
      userlist(id,name){
        let strlist = ''
        strlist += '<li id="w'+id+'">'
        strlist += '<img src="dist-static/lib/img/p1.jpg">'
        strlist += '<span>'+name+'</span>'
        strlist += '</li>'
        $('#plist').append(strlist)
        this.sj()
      },
      closeWhiteBoard() {
        this.$refs.whiteBoard.closeWhiteBoard()
      },
      openWhiteBoard (){
        this.$refs.whiteBoard.openWhiteBoard()
      },
      isLogin() {
        try {
          if (this.room) {
            this.loginTag = true
            this.startVideo()
          } else {
            alert("请选择正确的房间！")
          }
          // 返回参数ID表示用户唯一识别,photo代表头像
        } catch (err) {
          if (constant.version == '1.0.0') {
            this.loginTag = true
            this.startVideo()
          } else {
            alert("请先登录！")
            var param = encodeURIComponent(location.href.split('&')[0])
            console.log(param)
            window.location.href = loginUrl + '/' + param
            console.log("请先登录！")
          }
        }
      },
      showVolume(el, volume) {
        if (!el) return;
        if (volume < -45) { // -45 ~ -20
          el.style.height = '0px';
        } else if (volume > -20) {
          el.style.height = '100%';
        } else {
          el.style.height = '' + Math.floor((volume + 100) * 100 / 25 - 220) + '%';
        }
      },
      setRoom(name) {
        // $('form').remove();
        // $('h1').text('远程交流系统 - 房间' + name);
        // // $('#subTitle').text('分享链接给其他人: ' + location.href);
        // $('body').addClass('active');
      },
      setLocalMid() {
        const vm = this
        var localVideo = $('#localVideo');
        var midVideo = document.getElementById('mid_video');
        if (localVideo[0].srcObject != null) {
          var copyNode = localVideo[0].cloneNode();
          copyNode.srcObject = localVideo[0].srcObject;
          copyNode.style.height = '400%';
          var div = document.createElement('div');
          div.className = 'videoContainer';
          div.appendChild(copyNode)
          midVideo.appendChild(div);
          window.clearInterval(constant.midInterval);
          setMidButton(copyNode, midVideo, true)
          localVideo[0].onclick = function () {
            vm.setMidButton(localVideo[0], midVideo, true)
          }
        }
      },
      videoREGSelf(copyNode,id){
        // 设置视频录制 start
        const vm = this
        var recorder = new MediaRecorder(copyNode.srcObject);
        var recorderControl = document.getElementById("recorderControl"+id);
        var isplay = true
        var indexs = null
        recorderControl.onclick = function () {
          // vm.videolzshow = true
          // if(isplay){
          //     vm.videolz = '00'
          //     vm.videolzm = '00'
          //     $(this).addClass('active')
          //     recorder.start()
          //     indexs = setInterval(function(){
          //       vm.videolz++
          //       if (vm.videolz < 10){
          //         vm.videolz = '0' + vm.videolz
          //       } else if(vm.videolz > 59){
          //         vm.videolz = '01'
          //         if (vm.videolzm < 9) {
          //           vm.videolzm = '0' + (Number(vm.videolzm)+1)
          //         }else if (Number(vm.videolzm) < 59){
          //           vm.videolzm = Number(vm.videolzm)+1
          //         }else{
          //           vm.videolzm = '00'
          //           if (vm.videolzh < 9) {
          //             vm.videolzh ='0' + (Number(vm.videolzh) + 1)
          //           }else{
          //             vm.videolzh = Number(vm.videolzh) + 1
          //           }
          //         }
          //       }
          //     },1000)
          // }else{
          //   // vm.videolzshow = false
          //   $(this).removeClass('active')
          //   recorder.stop()
          //   clearInterval(indexs)
          // }
          // isplay = !isplay
        };
        var buffers = [];
        recorder.ondataavailable = function (event) {
          buffers = event.data;
        }
        $('#downloadButton'+id).remove();
        $('body').append('<a href="" id="downloadButton'+id+'" style="display:none"></a>')
        var downloadButton = document.getElementById("downloadButton"+id);
        recorder.onstop = function () {
          var file = new File([buffers], "录制视频.mp4", {type: 'mpeg4', lastModified: Date.now()});
          var url = URL.createObjectURL(file);
          downloadButton.href = url;
          downloadButton.download = "录制视频.mp4";
          downloadButton.click();
          buffers = null;
        }
      },
      videoOff() {
        this.webrtc.videoOffCon()
      },
      videoOpen() {
        this.webrtc.videoOpenCon()
      },
      audioOff(e) {
        var im = $(e.target).attr('class');
        if(im == 'el-icon-microphone'){
           $(e.target).attr('class','el-icon-turn-off-microphone')
           this.webrtc.audioOffCon()
        }else{
            $(e.target).attr('class','el-icon-microphone')
            this.webrtc.audioOpenCon()
        }
      },
      cameraOff(e){
        var im = $(e.target).attr('class')
        if(im == 'el-icon-video-cameras'){
          $(e.target).attr('class','el-icon-video-camerasa')
          this.webrtc.videoOffCon()
        }else{
          $(e.target).attr('class','el-icon-video-cameras')
          this.webrtc.videoOpenCon()
        }
      },
      startVideo() {
        const vm = this
        if (vm.loginTag) {
          // 创建房间
          vm.webrtc = new SimpleWebRTC({
            // 本地媒体元素
            localVideoEl: 'localVideo',
            // 远程媒体元素
            remoteVideosEl: '',
            // 请求摄像头
            autoRequestMedia: true,
            debug: false,
            detectSpeakingEvents: true,
            // 这里代表的是LocalStorage的某个key，用于显示用户名
            userPhone: vm.userPhone,
            userName: vm.userName,
            url: getPort()
          });
          // 当响应完成，将会执行加入房间方法
          vm.webrtc.on('readyToCall', function () {
            // you can name it anything
            if (vm.room) {
              var conn = vm.webrtc.joinRoom(vm.room);
              $("#localVideo")[0].muted = true
              vm.userlist(vm.userPhone,vm.userName)
              vm.localName = vm.userName
              vm.dlcoId = vm.userId
              // vm.videoREGSelf($("#localVideo")[0])
              //$("#mineVideo").append(vm.buttonSet($("#localVideo")[0], vm.setVolMute));
              //$("#mineVideo").append(vm.buttonSet($("#localVideo")[0], vm.setVidTag, 'videoTag', vm.vidTag1, 'button', 50));
              //$("#mineVideo").append(vm.buttonSet($("#localVideo")[0], vm.setAudTag, 'audioTag', vm.audTag1, 'button', 85));
            }
          });

          vm.webrtc.on('getMineId', function (user) {
            $('#name').text(user.userName);
          })
          vm.webrtc.on('initMineVideo',function(){
              vm.videoREGSelf($("#localVideo")[0],-1)
          })

          vm.webrtc.on('channelMessage', function (peer, label, data) {
            if (data.type == 'volume') {
              vm.showVolume(document.getElementById('volume_' + peer.id), data.volume);
            }
          });

          vm.webrtc.on('videoAdded', function (video, peer) {
            var dlc = $('#dlc')
            var swiperc = $('#swiperc')
            var plist = $('#plist')
            var userPhone = peer.userPhone
            if (dlc.find('dd').length < 3) {
              var str = ''
              str += '<dd id="'+userPhone+'">'
              str += '<div class="xl bn"></div><div class="xr bn"></div><div class="xb bn"></div><div class="xbr bn"></div>'
              str += '<div class="spinfo">'+peer.userName+'</div>'
              // str += $(video)//'<video src="" poster="dist-static/lib/img/2.jpg"></video>'
              str += '<ul class="op">'
              str += '<li><i class="el-icon-bells" data-id="'+userPhone+'" onclick="sybtn(this)"></i></li>'
              str += '<li><i class="el-icon-video-camera" id="recorderControl'+userPhone+'" :data-id="'+userPhone+'"></i></li>'
              str += '</ul>'
              str += '</dd>'
              dlc.append($(str)[0]);
              $('#'+userPhone).append($(video))
              vm.videoREGSelf(video,userPhone)
            }else {
              var str1 = ''
              str1 += '<div class="swiper-slide" id="'+userPhone+'">'
              str1 += '<div class="xl bn"></div><div class="xr bn"></div> <div class="xb bn"></div><div class="xbr bn"></div>'
              str += '<div class="spinfo">'+peer.userName+'</div>'
              str1 += video//'<video src="" poster="dist-static/lib/img/2.jpg"></video>'
              str1 += '<ul class="op">'
              str1 += '<li><i class="el-icon-bells" data-id="'+userPhone+'" onclick="sybtn(this)"></i></li>'
              str1 += '<li><i class="el-icon-video-camera" id="recorderControl'+userPhone+'" :data-id="'+userPhone+'"></i></li>'
              str1 += ' </ul>'
              str1 += '</div>'
              swiperc.append(str1);
              $('#'+userPhone).append($(video))
              vm.videoREGSelf(video,userPhone)
            }
            vm.sj();
            vm.ec();
            vm.userlist(peer.userPhone,peer.userName)
            // var remotes = document.getElementById('videos');
            // if (remotes) {
            //   var d = document.createElement('div');
            //   d.className = 'videoContainer';
            //   d.id = 'container_' + this.getDomId(peer);
            //   d.appendChild(video);
            //   var vol = document.createElement('div');
            //   vol.id = 'volume_' + peer.id;
            //   vol.className = 'volume_bar';
            //   video.onclick = function () {
            //     $("#mid_video").empty();
            //     var midVideo = document.getElementById('mid_video');
            //     vm.setMidButton(video, midVideo)
            //   };
            //   //下方唯一id
            //   var name = document.createElement('label');
            //   name.className = 'user_name';
            //   name.innerHTML = peer.userName;
            //   d.appendChild(vol);
            //   d.appendChild(name);
            //   d.appendChild(vm.buttonSet(video, vm.setVolMute));
            //   remotes.appendChild(d);
            // }
          });
          vm.webrtc.on('videoRemoved', function (video, peer) {
            $('#'+peer.userPhone).remove();
            $('#w'+peer.userPhone).remove();
            // var remotes = document.getElementById('videos');
            // var el = document.getElementById('container_' + vm.webrtc.getDomId(peer));
            // if (remotes && el) {
            //   remotes.removeChild(el);
            // }
          });
          vm.webrtc.on('volumeChange', function (volume, treshold) {
            vm.showVolume(document.getElementById('localVolume'), volume);
          });


          if (vm.room) {
            vm.setRoom(vm.room);
          } else {
            $('form').submit(function () {
              var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
              this.webrtc.createRoom(val, function (err, name) {
                console.log(' create room cb', arguments);

                var newUrl = location.pathname + '?' + name;
                if (!err) {
                  history.replaceState({foo: 'bar'}, null, newUrl);
                  setRoom(name);
                } else {
                  console.log(err);
                }
              });
              return false;
            });
          }

          var button = $('#screenShareButton'),
          setButton = function (bool) {
            button.text(bool ? 'share screen' : 'stop sharing');
          };

          vm.webrtc.on('localScreenStopped', function () {
            setButton(true);
          });

          vm.webrtc.on('setMidInterval', function () {
            // vm.midInterval = window.setInterval(vm.setLocalMid, 1000)
          });

          setButton(true);

          vm.webrtc.on('initDraw', function (data) {
          })
          vm.webrtc.openBoard(vm.room)
          vm.webrtc.removeBoard(vm.room)
          vm.webrtc.initDrawReady(vm.room)
          vm.webrtc.initDraw()
          vm.webrtc.flashMouseEmit()
          vm.webrtc.cleanDrawEmit()
        }
      },
      setLocalMid() {
        const vm = this
        var localVideo = $('#localVideo');
        var midVideo = document.getElementById('mid_video');
        if (localVideo[0].srcObject != null) {
          var copyNode = localVideo[0].cloneNode();
          copyNode.srcObject = localVideo[0].srcObject;
          copyNode.style.height = '400%';
          var div = document.createElement('div');
          div.className = 'videoContainer';
          div.appendChild(copyNode)
          midVideo.appendChild(div);
          window.clearInterval(vm.midInterval);
          vm.setMidButton(copyNode, midVideo, true)
          localVideo[0].onclick = function () {
            vm.setMidButton(localVideo[0], midVideo, true)
          }
        }
        console.log(midVideo)
      },
      setMidButton(video, midVideo, isMine) {
        const vm = this
        $("#mid_video").empty();
        var copyNode = video.cloneNode();
        copyNode.srcObject = video.srcObject;
        // copyNode.style.width = '400%';
        copyNode.style.height = '400%';
        var div = document.createElement('div');
        div.className = 'videoContainer';
        //创建录制按钮
        div.appendChild(copyNode);
        //附加按钮
        vm.initMuteTag(copyNode, isMine)
        div.appendChild(this.buttonSet(copyNode, vm.addButton, 'recorderControl', "录制"));
        var bt = this.buttonSet(copyNode, vm.addButton, 'downloadButton', "下载", "a")
        bt.style.display = 'none'
        div.appendChild(bt);
        // div.appendChild(vm.setVolMute(copyNode));
        midVideo.appendChild(div);

        // 设置视频录制 start
        var recorder = new MediaRecorder(copyNode.srcObject);
        var recorderControl = document.getElementById("recorderControl");
        recorderControl.onclick = function () {
          //this.textContent == "录制" ? copyNode.play() : copyNode.pause();
          this.textContent == "录制" ? recorder.start() : recorder.stop();
          this.textContent = this.textContent == "录制" ? "停止" : "录制";
        };
        var buffers = [];
        recorder.ondataavailable = function (event) {
          buffers = event.data;
        }
        var downloadButton = document.getElementById("downloadButton");
        recorder.onstop = function () {
          var file = new File([buffers], "录制视频.mp4", {type: 'mpeg4', lastModified: Date.now()});
          var url = URL.createObjectURL(file);
          downloadButton.href = url;
          downloadButton.download = "录制视频.mp4";
          downloadButton.click();
          buffers = null;
        };
        // 设置视频录制 end
      },

      buttonSet(volEl, func, id, text, tag = "button", y) {
        var bt = document.createElement(tag)
        bt.className = 'small_video_menu'
        return func(volEl, bt, id, text, y)
      },

      addButton(volEl, bt, id, text) {
        bt.id = id;
        bt.appendChild(document.createTextNode(text))
        return bt;
      },
      // 调整视频设置
      setVidTag(volEl, bt, id, text, y) {
        const vm = this
        bt.innerHTML = text
        bt.style.top = y + "px"
        bt.onclick = function () {
          if (bt.innerHTML == vm.vidTag1) {
            videoOff()
            bt.innerHTML = vm.vidTag2
          } else {
            videoOpen()
            bt.innerHTML = vm.vidTag1
          }
        }
        return bt
      },
      // 调整视频设置
      setAudTag(volEl, bt, id, text, y) {
        const vm = this
        bt.innerHTML = text
        bt.style.top = y + "px"
        bt.onclick = function () {
          if (bt.innerHTML == audTag1) {
            audioOff()
            bt.innerHTML = vm.audTag2
          } else {
            audioOpen()
            bt.innerHTML = vm.audTag1
          }
        }
        return bt
      },

      //静音设置
      setVolMute(volEl, bt) {
        const vm = this
        //附加按钮
        this.setVolMuteTag(bt, volEl)
        bt.onclick = function () {
          //绑定点击事件
          volEl.muted = !volEl.muted;
          setVolMuteTag(bt, volEl)
        }
        return bt
      },

      //静音初始化
      initMuteTag(volEl, tag = false) {
        volEl.muted = tag
      },

      //静音设置状态变更
      setVolMuteTag(btEl, volEl) {
        if (volEl.muted) {
          btEl.innerHTML = this.tag2
        } else {
          btEl.innerHTML = this.tag1
        }
      }
    }
  }
</script>
<style>
body > div:nyh-of-type(1),
.ivu-layout{height:100%;}
.ivu-layout{background: none;}
/* .ivu-modal-hidden ,.ivu-modal-mask,.ivu-modal{
    display: block!important;
} */
.maskop{position:absolute;width:100%;height:100%;top:0;background:rgba(0,0,0,.5);}
.dialogk{position:absolute;;width:600px;padding:30px;left:0;right:0;top:15%;background:#fff;margin:0 auto;}
.closemask{background: #19be6b; color: #fff; position: absolute; width: 25px; height: 25px; text-align: center; line-height: 25px; border-radius: 50%; right: 5px; top: 5px;}
.spinfo{position: absolute; color: red; bottom: 10px; z-index: 100; width: 100%; text-align: left;font-size: 16px;text-indent: 25px;}
.op li i{font-size:26px;color:#fff;}
.op li i.active{
  animation:myfirst 2s 1s both infinite;
}
@keyframes myfirst
{
0%   {color:red;}
25%  {color:#fff;}
50%  {color:red;}
100% {color:#fff;}
}
</style>
