<!--
 * @Autor: zengjun1.fj
 * @Date: 2024-08-15 16:43:21
 * @LastEditors: zhenjun
 * @LastEditTime: 2024-09-06 17:52:11
 * @Description: 
-->
<script setup>
import { reactive, ref, onMounted, onUnmounted } from "vue";
import { MessagePlugin } from "tdesign-vue-next";
import mapleAxios from "@/api/http";

import { sortByColorThenPoint } from "@/utils/cardUtils";

import {
  flameNormals,
  clickNormals,
  MyCharacterSlot,
  OtherCharacterSlot,
  myturns,
  nexts,
  waitingImage,
} from "./components/image";
import TheGif from "@/components/TheGif.vue";

let cardDeckImage = "mapleOneCard.Deck.deck.png";
let cardDisabledImage = "mapleOneCard.Hand.me.disabled.png";
let cardHandImage = "mapleOneCard.Hand.other.default.png";
/**
 * 卡数组，放public里了
 */
let cardInfoList = reactive([]);
// let changeColorBoard = "mapleOneCard.OneCardPopup.ChangeColor.backgrnd.png";

const FORM_RULES = {
  userName: [
    { required: true, message: '姓名必填' }
  ],
  ppp: [
    { required: true, message: '密码必填' }
  ],
  roomNumber: [
    { required: true, message: '房间号必填' },
    { min: 4, message: "房间号长度只能为4" },
    { max: 4, message: "房间号长度只能为4" },
  ],
};

let data = reactive({
  logined: false,
  ppp: "",
  showStart: false,
  userName: "",
  roomNumber: "",
  userId: "",
  direction: -1,
  turn: 0,
  myturn: 0,
  attackLevel: 0,
  players: [],
  playCard: {
    id: "53",
    color: "other",
    point: "",
  },
  hands: {},
  isAllDisabled: false,
  status: "00",

  turn2: 1,
  turn3: 2,
  turn4: 3,
});

const loading = ref(false);

const pathParent = "../../assets/img/";
let getImage = (name) => {
  return new URL(pathParent + name, import.meta.url).href;
};
let getCardImage = (item) => {
  if (item && item.id) {
    return new URL(pathParent + cardInfoList[item.id - 1].image, import.meta.url).href;
  }

  return new URL(pathParent + cardInfoList[52].image, import.meta.url).href;
};
/**
 * 判断是否是“我”的次序
 * @param {number} myturn “我”的次序
 */
const isMyturn = (myturn) => {
  return '01' === data.status && data.turn === myturn;
};
/**
 * 判断是否是下一个是我
 * @param {number} myturn “我”的次序
 */
const isNext = (myturn) => {
  return '01' === data.status && (data.turn + data.direction + data.players.length) % data.players.length === myturn;
};
/**
 * 判断是否与我无关
 * @param {number} myturn “我”的次序
 */
const isWaiting = (myturn) => {
  return !isMyturn(myturn) && !isNext(myturn);
};
/**
 * 判断是否可出
 * @param {object} card 这张卡
 */
const isDisabledCard = (card) => {
  if (!isMyturn(data.myturn)) {
    return true;
  }
  if ("black" == card.color) {
    return false;
  }
  if ("hero" == data.playCard.point && data.playCard.color != card.color) {
    return true;
  }
  if ("attack2" == data.playCard.point) {
    if ("attack3" == card.point) {
      return false;
    }
    if ("hero" == card.point && "red" == card.color) {
      return false;
    }
  }
  if ("attack3" == data.playCard.point) {
    if ("hero" == card.point && "red" == card.color) {
      return false;
    }
  }

  if (data.playCard.color != card.color && data.playCard.point != card.point) {
    return true;
  }

  data.isAllDisabled = false;
  return false;
};
/**
 * 出牌
 * @param {object} item 牌
 */
const playOneCard = (item) => {
  console.log("出牌：", item);
  mapleAxios
    .post("/battle/play", {
      userName: data.userName,
      roomNumber: data.roomNumber,
      cardId: item.id
    })
    .then((response) => {
      console.log("response:", response);
      if ("000" !== response.code) {
        MessagePlugin.error(response.msg);
        return;
      }
      updateData(response);
    });
};

/**
 * 摸牌
 */
const drawCard = () => {
  if (!isMyturn(data.myturn)) {
    return;
  }
  mapleAxios
    .post("/battle/draw", {
      userName: data.userName,
      roomNumber: data.roomNumber,
    })
    .then((response) => {
      console.log("response:", response);
      if ("000" !== response.code) {
        MessagePlugin.error(response.msg);
        return;
      }
      updateData(response);
    });
};

const onLogin = ({ validateResult, firstError }) => {
  if (validateResult === false) {
    MessagePlugin.success(firstError);
    return;
  }
  mapleAxios
    .post("/user/login", {
      userName: data.userName,
      roomNumber: data.roomNumber,
      ppp: data.ppp
    })
    .then((response) => {
      console.log("response:", response);
      if ("000" !== response.code) {
        MessagePlugin.error(response.msg);
        return;
      }
      const respData = response.data;
      data.logined = true;
      data.userId = "" + respData.userInfo.id;
      updateData(response);
    });
};

const onStartGame = () => {
  if (data.players.length < 2) {
    MessagePlugin.error("一个人开不了游戏");
    return;
  }
  mapleAxios
    .post("/battle/start", {
      userName: data.userName,
      roomNumber: data.roomNumber,
    })
    .then((response) => {
      console.log("response:", response);
      if ("000" !== response.code) {
        MessagePlugin.error(response.msg);
        return;
      }
      loading.value = true;
      updateData(response);
    });
};

const updateData = (response) => {
  const respData = response.data.battleInfoSubOutVo;
  data.players = [];
  let players = respData.players;
  for (let i = 0; i < players.length; i++) {
    if ("string" === typeof players[i].hand) {
      players[i].hand = JSON.parse(players[i].hand);
    }
    data.players.push(players[i]);
  }
  for (let i = 0; i < players.length; i++) {
    if (data.userName === players[i].userName) {
      data.myturn = i;
      data.turn2 = (i + data.direction + players.length) % players.length;
      data.turn3 = (i + 2 * data.direction + players.length) % players.length;
      data.turn4 = (i + 3 * data.direction + players.length) % players.length;
      break;
    }
  }
  data.players = players;
  data.turn = respData.turn;
  data.attackLevel = respData.attackLevel;
  data.direction = respData.direction;
  data.playCard = respData.playCard;
  data.status = respData.status;
  if ("00" == data.status) {
    data.showStart = true;
  } else {
    data.showStart = false;
  }
  // console.log("测试", data.players[data.myturn])
}

/**
 * 获得手牌
 * @param {string} army 对家
 */
// const getHand = (army) => {
//   if (!data.hands) {
//     return 0;
//   }

// }

// 设置一个定时器，每隔timeout秒请求查询
let intervalId = null;

onMounted(() => {
  fetch("card_info.json")
    .then((response) => response.json())
    .then((data) => {
      cardInfoList = data.card_info;
    })
    .catch((error) => {
      console.error("Error reading JSON file:", error);
    });

  intervalId = setInterval(() => {
    loading.value = false;
    if (data.logined) {
      mapleAxios
        .post("/battle/query", {
          roomNumber: data.roomNumber,
          userName: data.userName,
        })
        .then((response) => {
          if ("000" !== response.code) {
            MessagePlugin.success(response.msg);
            return;
          }
          updateData(response);
        });
    }
  }, 1000); // timeout秒
});

onUnmounted(() => {
  // 组件卸载时清除定时器
  clearInterval(intervalId);
});
</script>

<template>
  <div class="game-container">
    <t-loading :loading="loading" text="加载中..." fullscreen />
    <div class="login-table" style="width: 350px" v-if="!data.logined">
      <t-form ref="form" :data="data" :colon="true" @submit="onLogin" :rules="FORM_RULES">
        <t-form-item label="用户名" name="userName" required>
          <t-input v-model="data.userName" clearable placeholder="请输入中文用户名">
          </t-input>
        </t-form-item>

        <t-form-item label="密码" name="ppp">
          <t-input v-model="data.ppp" type="password" clearable placeholder="请输入密码">
          </t-input>
        </t-form-item>

        <t-form-item label="房间号" name="roomNumber">
          <t-input v-model="data.roomNumber" clearable placeholder="请输入4位数字">
          </t-input>
        </t-form-item>

        <t-form-item>
          <t-button theme="primary" type="submit" block>进入</t-button>
        </t-form-item>
      </t-form>
    </div>

    <div class="game-table" v-if="data.logined">
      <img class="card-previous" :src="getCardImage(data.playCard)" />
      <img class="cards-deck" :src="getImage(cardDeckImage)" @click="drawCard" />
      <TheGif class="clickNormals" :imageList="clickNormals" v-show="isMyturn(data.myturn) && data.isAllDisabled" />

      <div class="flames" v-if="data.attackLevel >= 1">
        <TheGif :class="'flame flame' + n" v-for="n in data.attackLevel" :key="n" :imageList="flameNormals" />
      </div>

      <div class="btn_start" v-if="data.showStart">
        <t-button @Click="onStartGame">开始</t-button>
      </div>

      <div class="boards">
        <div class="MyCharacterSlot">
          <img class="board" :src="getImage(MyCharacterSlot.board)" />
          <img class="backlight" :src="getImage(MyCharacterSlot.backlightMyturn)" v-show="isMyturn(data.myturn)" />
          <img class="backlight" :src="getImage(MyCharacterSlot.backlightNext)" v-show="isNext(data.myturn)" />
          <TheGif class="myturn" :imageList="myturns" v-show="isMyturn(data.myturn)" />
          <TheGif class="otherTurn" :imageList="nexts" v-show="isNext(data.myturn)" />
          <img class="otherTurn" :src="getImage(waitingImage)" v-show="isWaiting(data.myturn)" />
          <div class="myname">{{ data.userName }}</div>
        </div>

        <div class="OtherCharacterSlot top-left">
          <img class="board" :src="getImage(OtherCharacterSlot.board)" />
          <img class="backlight" v-if="data.players && data.players.length === 4"
            :src="getImage(OtherCharacterSlot.backlightMyturn)" v-show="isMyturn(data.turn4)" />
          <img class="backlight" v-if="data.players && data.players.length === 4"
            :src="getImage(OtherCharacterSlot.backlightNext)" v-show="isNext(data.turn4)" />
          <TheGif class="myturn" v-if="data.players && data.players.length === 4" :imageList="myturns"
            v-show="isMyturn(data.turn4)" />
          <TheGif class="otherTurn" v-if="data.players && data.players.length === 4" :imageList="nexts"
            v-show="isNext(data.turn4)" />
          <img class="otherTurn" v-if="data.players && data.players.length === 4" :src="getImage(waitingImage)"
            v-show="isWaiting(data.turn4)" />
          <div class="othername" v-if="data.players && data.players.length === 4">
            {{
      data.players[(data.myturn + data.players.length + 3) % data.players.length]
    }}
          </div>
        </div>

        <div class="OtherCharacterSlot top-right">
          <img class="board" :src="getImage(OtherCharacterSlot.board)" />
          <img class="backlight" v-if="data.players && data.players.length === 3"
            :src="getImage(OtherCharacterSlot.backlightMyturn)" v-show="isMyturn(data.turn3)" />
          <img class="backlight" v-if="data.players && data.players.length === 3"
            :src="getImage(OtherCharacterSlot.backlightNext)" v-show="isNext(data.turn3)" />
          <TheGif class="myturn" v-if="data.players && data.players.length === 3" :imageList="myturns"
            v-show="isMyturn(data.turn3)" />
          <TheGif class="otherTurn" v-if="data.players && data.players.length === 3" :imageList="nexts"
            v-show="isNext(data.turn3)" />
          <img class="otherTurn" v-if="data.players && data.players.length === 3" :src="getImage(waitingImage)"
            v-show="isWaiting(data.turn3)" />
          <div class="othername" v-if="data.players && data.players.length === 3">
            {{
      data.players[(data.myturn + data.players.length + 2) % data.players.length]
    }}
          </div>
        </div>

        <div class="OtherCharacterSlot bottom-right">
          <img class="board" :src="getImage(OtherCharacterSlot.board)" />
          <img class="backlight" :src="getImage(OtherCharacterSlot.backlightMyturn)" v-show="isMyturn(data.turn2)" />
          <img class="backlight" :src="getImage(OtherCharacterSlot.backlightNext)" v-show="isNext(data.turn2)" />
          <TheGif class="myturn" :imageList="myturns" v-show="isMyturn(data.turn + data.direction, data.turn2)" />
          <TheGif class="otherTurn" :imageList="nexts" v-show="isNext(data.turn + data.direction, data.turn2)" />
          <img class="otherTurn" :src="getImage(waitingImage)"
            v-show="isWaiting(data.turn + data.direction, data.turn2)" />
          <div class="othername" v-if="data.players.length > 1">
            {{
      data.players[(data.myturn + data.players.length + 1) % data.players.length].userName
    }}
          </div>
        </div>
      </div>

      <div class="mycards-container" v-if="data.hands">
        <div :class="'my-card abs-left' + index"
          v-for="(item, index) in sortByColorThenPoint(data.players[data.myturn].hand)" :key="index">
          <img class="cardDisabledImage" :src="getImage(cardDisabledImage)" v-show="isDisabledCard(item)" />
          <img class="card-myturn" :src="getCardImage(item)" @click="playOneCard(item)" />
        </div>
      </div>

      <div class="othercards-container-top-left" v-if="data.players && data.players.length === 4">
        <div :class="'my-card abs-left' + n" v-for="n in data.players[data.turn4].hand" :key="n">
          <img class="card-myturn" :src="getImage(cardHandImage)" />
        </div>
      </div>

      <div class="othercards-container-top-right" v-if="data.players && data.players.length === 3">
        <div :class="'my-card abs-left' + n" v-for="n in data.players[data.turn3].hand" :key="n">
          <img class="card-myturn" :src="getImage(cardHandImage)" />
        </div>
      </div>
      <div class="othercards-container-bottom-right" v-if="data.players && data.players.length === 2">
        <div :class="'my-card abs-left' + n" v-for="n in data.players[data.turn2].hand" :key="n">
          <img class="card-myturn" :src="getImage(cardHandImage)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url("HomeView.scss");
</style>
