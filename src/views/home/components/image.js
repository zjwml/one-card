/*
 * @Autor: zengjun1.fj
 * @Date: 2024-08-19 14:39:27
 * @LastEditors: zhenjun
 * @LastEditTime: 2024-09-09 16:46:14
 * @Description:
 */
// 火球
const flameNormals = []
for (let i = 0; i < 6; i++) {
  flameNormals.push('mapleOneCard.Effect.flame.normal.' + i + '.png')
}
//点击
const clickNormals = []
for (let i = 0; i < 6; i++) {
  clickNormals.push('mapleOneCard.Effect.screeneff.click.' + i + '.png')
}
//我的回合-出现
const myturnAppear = []
for (let i = 0; i < 8; i++) {
  myturnAppear.push('mapleOneCard.Effect.status.myturn.appear.' + i + '.png')
}
//我的回合
const myturns = []
for (let i = 0; i < 8; i++) {
  myturns.push('mapleOneCard.Effect.status.myturn.loop.' + i + '.png')
}
//下一个
const nexts = []
for (let i = 0; i < 8; i++) {
  nexts.push('mapleOneCard.Effect.status.next.loop.' + i + '.png')
}
//等待
const waitingImage = 'mapleOneCard.Effect.status.waiting.loop.0.png'

const MyCharacterSlot = {
  board: 'mapleOneCard.MyCharacterSlot.board.0.png',
  backlightMyturn: 'mapleOneCard.MyCharacterSlot.backlight.myturn.0.png',
  backlightNext: 'mapleOneCard.MyCharacterSlot.backlight.next.0.png'
}

const OtherCharacterSlot = {
  board: 'mapleOneCard.OtherCharacterSlot.board.0.png',
  backlightMyturn: 'mapleOneCard.OtherCharacterSlot.backlight.myturn.0.png',
  backlightNext: 'mapleOneCard.OtherCharacterSlot.backlight.next.0.png'
}

//米哈尔
const mihile = []
for (let i = 0; i < 8; i++) {
  mihile.push('mapleOneCard.Effect.screeneff.michael.' + i + '.png')
}
//奥兹
const oz = []
for (let i = 0; i < 8; i++) {
  oz.push('mapleOneCard.Effect.screeneff.oz.' + i + '.png')
}
//伊莉娜
const irina = []
for (let i = 0; i < 8; i++) {
  irina.push('mapleOneCard.Effect.screeneff.irina.' + i + '.png')
}
//伊卡尔特
const icart = []
for (let i = 0; i < 8; i++) {
  icart.push('mapleOneCard.Effect.screeneff.icart.' + i + '.png')
}
//胡克
const hooke = []
for (let i = 0; i < 8; i++) {
  hooke.push('mapleOneCard.Effect.screeneff.hawkeye.' + i + '.png')
}
//数字牌出牌图
const getaniImage = []
for (let i = 0; i < 5; i++) {
  getaniImage.push('mapleOneCard.Hand.me.getani.' + i + '.png')
}
//功能牌出牌图
const magiccardImage = []
for (let i = 0; i < 7; i++) {
  magiccardImage.push('mapleOneCard.Effect.magiccard.' + i + '.png')
}
//胜利
const victoryImage = []
for (let i = 0; i < 20; i++) {
  victoryImage.push('mapleOneCard.Effect.screeneff.victory.' + i + '.png')
}
//最后一张牌
const lastCardImage = []
for (let i = 0; i < 19; i++) {
  lastCardImage.push('mapleOneCard.Effect.screeneff.lastcard.' + i + '.png')
}

const chooseColorBoardImage = 'mapleOneCard.OneCardPopup.ChangeColor.backgrnd.png'

export {
  flameNormals,
  MyCharacterSlot,
  OtherCharacterSlot,
  clickNormals,
  myturns,
  nexts,
  waitingImage,
  mihile,
  oz,
  irina,
  icart,
  hooke,
  chooseColorBoardImage,
  getaniImage,
  magiccardImage,
  victoryImage,
  lastCardImage
}
