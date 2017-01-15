
<template>
  <div class="demo-count" v-show="isShow">
    <div v-text="count"></div>
    <button @click="add">addfssffff</button>
  </div>
</template>

<script>
  import { MSG_COUNT_SHOW, MSG_COUNT_INCREMENT } from './msg';
  import { sendMessage } from '../../common/message';

  export default {
    data() {
      return {
        isShow: false,
        count: 0
      };
    },
    methods: {
      add() {
        sendMessage(MSG_COUNT_INCREMENT, (responseMsg) => {
          this.count = responseMsg.count;
          if (this.count >= 10) {
            this.isShow = false;
          }
        });
      }
    },
    mounted() {
      sendMessage(MSG_COUNT_SHOW, (responseMsg) => {
        this.isShow = responseMsg.isShow;
      });
    }
  };
</script>

<style lang="less">
.demo-count {
  position: absolute;
  background: #fff;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 50%;
  margin: -100px 0 0 -100px;
  border: 1px solid red;
  box-shadow: 0 2px 5px #999;
  font-size: 24px;
  text-align: center;
}
</style>
