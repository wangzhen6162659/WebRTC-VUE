<template>
  <div id="board" class="board_div">
    <div class="pro-canvas">
      <div id="plane">
        <canvas id="canvas_board">您的浏览器不支持canvas</canvas>
      </div>
      <div id="controller" style="position: absolute; top: 95%; width: 100%; background-color: #12acef">
        <div id="black_btn" class="color_btn color_btn_selected"></div>
        <div id="blue_btn" class="color_btn"></div>
        <div id="green_btn" class="color_btn"></div>
        <div id="red_btn" class="color_btn"></div>
        <div id="orange_btn" class="color_btn"></div>
        <div id="yellow_btn" class="color_btn"></div>
        <button id="clear_btn" class="op_btn" @click="cleanDraw">清除</button>
        <button @click="closeWhiteBoard()">关闭白板</button>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "whiteboard",
    props: {
      webrtc: ''
    },
    data () {
      return {
        room: ''
      }
    },
    mounted() {
      const vm = this
      $('#controller').css('width', '100%')
      vm.init()
    },
    methods: {
      init () {
        const vm = this
        vm.room = vm.$route.params.room
        initCanvas({
          canvas: $("#canvas_board")[0],
          board: $("#board")[0]
        }, vm.room)
      },
      openWhiteBoard() {
        const vm = this
        initWebRTC(vm.webrtc)
        var yuansu = document.getElementById('board');
        yuansu.style.display = "block";
      },
      closeWhiteBoard() {
        var yuansu = document.getElementById('board');
        yuansu.style.display = "none";
      },
      cleanDraw () {
        const vm = this
        vm.webrtc.cleanDraw(room)
      }
    }
  }
</script>

<style scoped>
  .board_div {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: white;
  }
</style>
