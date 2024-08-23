/*
 * @Autor: zengjun1.fj
 * @Date: 2024-08-19 14:39:27
 * @LastEditors: zengjun1.fj
 * @LastEditTime: 2024-08-20 17:22:23
 * @Description:
 */
import Color from '@/components/card/color'
import Point from '@/components/card/point'
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
  backlightNext: 'mapleOneCard.MyCharacterSlot.backlight.Next.0.png'
}

const OtherCharacterSlot = {
  board: 'mapleOneCard.OtherCharacterSlot.board.0.png',
  backlightMyturn: 'mapleOneCard.OtherCharacterSlot.backlight.myturn.0.png',
  backlightNext: 'mapleOneCard.OtherCharacterSlot.backlight.Next.0.png'
}

const cardDeck = []
for (let i = 0; i < Color.length; i++) {
  for (let j = 0; j < Point.length; j++) {
    cardDeck.push({
      color: Color[i],
      point: Point[j],
      image: 'mapleOneCard.Hand.me.' + Color[i] + '.button_' + Point[j] + '.normal.0.png'
    })
  }
}
cardDeck.push({
  color: 'black',
  point: 'hero',
  image: 'mapleOneCard.Hand.me.black.button_hero.normal.0.png'
})

export {
  flameNormals,
  cardDeck,
  MyCharacterSlot,
  OtherCharacterSlot,
  clickNormals,
  myturns,
  nexts,
  waitingImage
}
