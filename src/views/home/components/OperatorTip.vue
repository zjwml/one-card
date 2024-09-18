<!--
 * @Autor: zhenjun
 * @Date: 2024-09-13 10:02:27
 * @LastEditors: zhenjun
 * @LastEditTime: 2024-09-13 11:15:32
 * @Description: 
-->
<template>
  <div>
    <t-descriptions :column="1">
      <t-descriptions-item label="胜利条件">出完最后一张牌</t-descriptions-item>
      <t-descriptions-item label="失败条件">手牌数超过20张</t-descriptions-item>
      <t-descriptions-item label="与UNO的区别">最后一张牌也可以是功能牌</t-descriptions-item>
    </t-descriptions>
    <t-table title="功能牌介绍" :data="data.tableData" :columns="columns" :rowKey="cardName">
      <template #img="{ row }">
        <t-image :src="getImage(row.img)" ></t-image>
      </template>
    </t-table>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { getImage } from '@/utils/imageUtils';

const columns = ref([{
  colKey: 'img',
  title: '卡面',
  width: '70',
}, {
  colKey: 'cardName',
  title: '卡名',
  width: '50'
}, {
  colKey: 'condition',
  title: '特殊出牌规则',
  width: '70'
}, {
  colKey: 'cardDesc',
  title: '描述',
  width: '130'
}])

const data = reactive({
  tableData: [{
    img: 'mapleOneCard.Hand.me.blue.button_attack2.normal.0.png',
    cardName: '攻击2',
    cardDesc: '攻击点数加2',
    condition:''
  }, {
    img: 'mapleOneCard.Hand.me.blue.button_attack3.normal.0.png',
    cardName: '攻击3',
    cardDesc: '攻击点数加3',
    condition:'上张牌为攻击2'
  }, {
    img: 'mapleOneCard.Hand.me.blue.button_change.normal.0.png',
    cardName: '变色',
    cardDesc: '变色',
    condition:''
  }, {
    img: 'mapleOneCard.Hand.me.blue.button_onemore.normal.0.png',
    cardName: '再出一张',
    cardDesc: '再行动一次出牌或摸牌',
    condition:''
  }, {
    img: 'mapleOneCard.Hand.me.blue.button_jump.normal.0.png',
    cardName: '跳开',
    cardDesc: '跳过下一个出牌者',
    condition:''
  }, {
    img: 'mapleOneCard.Hand.me.blue.button_goback.normal.0.png',
    cardName: '转向',
    cardDesc: '反转出牌顺序',
    condition:''
  }, {
    img: 'mapleOneCard.Hand.me.yellow.button_hero.normal.0.png',
    cardName: '米哈尔',
    cardDesc: '召唤无敌盾牌，攻击点数置0',
    condition:'有攻击点数'
  }, {
    img: 'mapleOneCard.Hand.me.red.button_hero.normal.0.png',
    cardName: '奥兹',
    cardDesc: '利用强大的魔法施加5点的攻击。',
    condition:'上张牌为攻击2或攻击3'
  }, {
    img: 'mapleOneCard.Hand.me.green.button_hero.normal.0.png',
    cardName: '伊莉娜',
    cardDesc: '依次吸收包括自己在内的所有玩家的绿色牌。',
    condition:''
  }, {
    img: 'mapleOneCard.Hand.me.black.button_hero.normal.0.png',
    cardName: '伊卡尔特',
    cardDesc: '跳过自己的出牌回合。',
    condition:'随时可出'
  }, {
    img: 'mapleOneCard.Hand.me.blue.button_hero.normal.0.png',
    cardName: '胡克',
    cardDesc: '除了自己以外的所有玩家各增加2张牌。（无法抵抗）',
    condition:''
  }]
})
</script>
<style scoped lang='scss'></style>
