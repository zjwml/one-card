<!--
 * @Autor: zengjun1.fj
 * @Date: 2024-08-15 16:43:21
 * @LastEditors: zhenjun
 * @LastEditTime: 2024-09-02 18:36:43
 * @Description: 
-->
<script setup>
import { reactive, onMounted } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import mapleAxios from "@/api/http";

import { shuffleArray, sortByColorThenPoint } from "@/utils/cardUtils";

import { flameNormals, cardDeck, clickNormals, MyCharacterSlot, OtherCharacterSlot, myturns, nexts, waitingImage } from "./components/image";
import TheGif from "@/components/TheGif.vue";

const pathParent = "../../assets/img/";
let cardDeckImage = "mapleOneCard.Deck.deck.png";
let cardDisabledImage = "mapleOneCard.Hand.me.disabled.png";
let cardHandImage = "mapleOneCard.Hand.other.default.png";
// let changeColorBoard = "mapleOneCard.OneCardPopup.ChangeColor.backgrnd.png";

let data = reactive({
  logined: false,
  userName: "",
  roomNumber: "",
  deck: [],
  turn: 0,
  myturn: 0,
  oneTurn: 1,
  twoTurn: 2,
  threeTurn: 3,
  order: -1,
  cardPrevious: {},
  myCards: [],
  oneLeft: 6,
  twoLeft: 6,
  threeLeft: 6,
  attackLevel: 0
})

let getImage = name => {
  return new URL(pathParent + name, import.meta.url).href;
}
/**
 * 判断是否是“我”的次序
 * @param {number} turn 当前次序
 * @param {number} myturn “我”的次序
 */
const isMyturn = (turn, myturn) => {
  return turn === myturn
}
/**
 * 判断是否是下一个是我
 * @param {number} turn 当前次序
 * @param {number} myturn “我”的次序
 */
const isNext = (turn, myturn) => {
  return (turn + data.order + 4) % 4 === myturn
}
/**
 * 判断是否与我无关
 * @param {number} turn 当前次序
 * @param {number} myturn “我”的次序
 */
const isWaiting = (turn, myturn) => {
  return !isMyturn(turn, myturn) && !isNext(turn, myturn)
}
/**
 * 判断是否可出
 * @param {object} card 这张卡
 */
const isDisabledCard = (card) => {
  if (!isMyturn(data.turn, data.myturn)) {
    return true;
  }
  if ('black' == card.color) {
    return false;
  }
  if ('hero' == data.cardPrevious.point && data.cardPrevious.color != card.color) {
    return true;
  }
  if ('attack2' == data.cardPrevious.point) {
    if ('attack3' == card.point) {
      return false;
    }
    if ('hero' == card.point && 'red' == card.color) {
      return false;
    }
  }
  if ('attack3' == data.cardPrevious.point) {
    if ('hero' == card.point && 'red' == card.color) {
      return false;
    }
  }

  if (data.cardPrevious.color != card.color && data.cardPrevious.point != card.point) {
    return true;
  }
  return false;
}
/**
 * 出牌
 * @param {object} item 牌
 * @param {number} index 下标
 */
const playCard = (item, index) => {
  console.log("出牌：", item.color, item.point);
  data.myCards.splice(index, 1);
  data.deck.push(item);
  data.cardPrevious = JSON.parse(JSON.stringify(item));
  if (item.point == "attack2") {
    data.attackLevel += 2;
  }
  if (item.point == "attack3") {
    data.attackLevel += 3;
  }
  if (item.point == 'hero') {
    if (item.color == 'red') {
      data.attackLevel += 5;
    } else if (item.color == 'yellow') {
      data.attackLevel = 0;
    }
  }
  console.log("手牌数量：", data.myCards.length);

  console.log("牌堆还剩下：", cardDeck.length);
}

/**
 * 摸牌
 */
const drawCard = () => {
  const card = data.deck.splice(0, 1)[0];
  data.myCards.push(card);
  data.myCards = sortByColorThenPoint(data.myCards);
  console.log("手牌数量：", data.myCards.length);

  console.log("牌堆还剩下：", cardDeck.length);
}

const onSubmit = ({ validateResult, firstError }) => {
  if (validateResult === false) {
    MessagePlugin.success(firstError);
    return;
  }
  mapleAxios.post("/mapleApi/user/login", {
    data: {
      userName: data.userName,
      roomNumber: data.roomNumber
    }
  }).then(response => {
    console.log(response);
  })



};


onMounted(() => {
  data.deck = shuffleArray(cardDeck);
  data.cardPrevious = data.deck.splice(0, 1)[0];
  data.myCards = data.deck.slice(0, 6);
  data.deck.splice(0, 24);
  data.myCards = sortByColorThenPoint(data.myCards);
  console.log("牌堆还剩下：", cardDeck.length);
})


</script>

<template>
  <div class="game-container">
    <div class="login-table" style="width: 350px" v-if="!data.logined">
      <t-form ref="form" :data="data" :colon="true" :label-width="0" @submit="onSubmit">
        <t-form-item name="userName">
          <t-input v-model="data.userName" clearable placeholder="请输入中文用户名">
          </t-input>
        </t-form-item>

        <t-form-item name="roomNumber">
          <t-input v-model="data.roomNumber" clearable placeholder="请输入数字房间号">
          </t-input>
        </t-form-item>

        <t-form-item>
          <t-button theme="primary" type="submit" block>进入</t-button>
        </t-form-item>
      </t-form>
    </div>
    <div class="game-table" v-if="data.logined">
      <img class="card-previous" :src="getImage(data.cardPrevious.image)" />
      <img class="cards-deck" :src="getImage(cardDeckImage)" @click="drawCard" />
      <TheGif class="clickNormals" :imageList="clickNormals" v-show="isMyturn(data.turn, data.myturn)" />


      <div class="flames">
        <TheGif class="flame flame1" :imageList="flameNormals" v-if="data.attackLevel >= 1" />
      </div>

      <div class="boards">
        <div class="MyCharacterSlot">
          <img class="board" :src="getImage(MyCharacterSlot.board)" />
          <img class="backlight" :src="getImage(MyCharacterSlot.backlightMyturn)"
            v-show="isMyturn(data.turn, data.myturn)" />
          <img class="backlight" :src="getImage(MyCharacterSlot.backlightNext)"
            v-show="isNext(data.turn, data.myturn)" />
          <TheGif class="myturn" :imageList="myturns" v-show="isMyturn(data.turn, data.myturn)" />
          <TheGif class="otherTurn" :imageList="nexts" v-show="isNext(data.turn, data.myturn)" />
          <img class="otherTurn" :src="getImage(waitingImage)" v-show="isWaiting(data.turn, data.myturn)" />
        </div>

        <div class="OtherCharacterSlot top-left">
          <img class="board" :src="getImage(OtherCharacterSlot.board)" />
          <img class="backlight" :src="getImage(OtherCharacterSlot.backlightMyturn)"
            v-show="isMyturn(data.turn, data.oneTurn)" />
          <img class="backlight" :src="getImage(OtherCharacterSlot.backlightNext)"
            v-show="isNext(data.turn, data.oneTurn)" />
          <TheGif class="myturn" :imageList="myturns" v-show="isMyturn(data.turn, data.oneTurn)" />
          <TheGif class="otherTurn" :imageList="nexts" v-show="isNext(data.turn, data.oneTurn)" />
          <img class="otherTurn" :src="getImage(waitingImage)" v-show="isWaiting(data.turn, data.oneTurn)" />
        </div>

        <div class="OtherCharacterSlot top-right">
          <img class="board" :src="getImage(OtherCharacterSlot.board)" />
          <img class="backlight" :src="getImage(OtherCharacterSlot.backlightMyturn)"
            v-show="isMyturn(data.turn, data.twoTurn)" />
          <img class="backlight" :src="getImage(OtherCharacterSlot.backlightNext)"
            v-show="isNext(data.turn, data.twoTurn)" />
          <TheGif class="myturn" :imageList="myturns" v-show="isMyturn(data.turn, data.twoTurn)" />
          <TheGif class="otherTurn" :imageList="nexts" v-show="isNext(data.turn, data.twoTurn)" />
          <img class="otherTurn" :src="getImage(waitingImage)" v-show="isWaiting(data.turn, data.twoTurn)" />
        </div>

        <div class="OtherCharacterSlot bottom-right">
          <img class="board" :src="getImage(OtherCharacterSlot.board)" />
          <img class="backlight" :src="getImage(OtherCharacterSlot.backlightMyturn)"
            v-show="isMyturn(data.turn, data.threeTurn)" />
          <img class="backlight" :src="getImage(OtherCharacterSlot.backlightNext)"
            v-show="isNext(data.turn, data.threeTurn)" />
          <TheGif class="myturn" :imageList="myturns" v-show="isMyturn(data.turn, data.threeTurn)" />
          <TheGif class="otherTurn" :imageList="nexts" v-show="isNext(data.turn, data.threeTurn)" />
          <img class="otherTurn" :src="getImage(waitingImage)" v-show="isWaiting(data.turn, data.threeTurn)" />
        </div>
      </div>

      <div class="mycards-container">
        <div :class="'my-card abs-left' + index" v-for="(item, index) in data.myCards" :key="index">
          <img class="cardDisabledImage" :src="getImage(cardDisabledImage)" v-show="isDisabledCard(item)" />
          <img class="card-myturn" :src="getImage(item.image)" @click="playCard(item, index)" />
        </div>
      </div>

      <div class="othercards-container-top-left">
        <div :class="'my-card abs-left' + n" v-for="n in data.oneLeft" :key="n">
          <img class="card-myturn" :src="getImage(cardHandImage)" />
        </div>
      </div>

      <div class="othercards-container-top-right">
        <div :class="'my-card abs-left' + n" v-for="n in data.twoLeft" :key="n">
          <img class="card-myturn" :src="getImage(cardHandImage)" />
        </div>
      </div>
      <div class="othercards-container-bottom-right">
        <div :class="'my-card abs-left' + n" v-for="n in data.threeLeft" :key="n">
          <img class="card-myturn" :src="getImage(cardHandImage)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('HomeView.scss');
</style>
