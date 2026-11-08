import { expect } from 'vitest'
import { Config } from '../../src/Config'
import { OldLevelConverter } from '../../src/utils/OldLevelConverter'

const oldLevelWithIce = `(48,'Blue cacao','unknown321','2020202020202020,ys1s1s1s1s1s1s12,02020202020202s0,22201s1s101s1012,0202s020s2s0s2s0,2s1sss0210121012,0120ss20s1s0s1s0,2s02020202020202,01s1s1s1s1sssssx,2020202020202020@2,2,0,50,150',1299836796,'79.159.13.189',0,52,2),`

const oldLevelWithCrystals = `(55,'with crystals','unknown','0000000000000000,y111111c00000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000@2,2,0,50,150',1297020179,'127.0.0.1',0,288,3),`

const oldLevelWithTeleports = `(56,'with teleports','unknown','0000000000000000,y11p1111q1111111,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000@2,2,0,50,150',1297020180,'127.0.0.1',0,10,3),`

const oldLevelWithJumpers = `(57,'with jumpers','unknown','0000000000000000,y1115111111111x,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000,0000000000000000@2,2,0,50,150',1297020181,'127.0.0.1',0,10,3),`

const canBeConverted = (oldLevel: string) =>
  new OldLevelConverter(oldLevel).canBeConverted(Config.availableTiles)

test('an old level with ice tiles can be converted with the configured available tiles', () => {
  expect(canBeConverted(oldLevelWithIce)).toBeTruthy()
})

test('an old level with crystal tiles can be converted with the configured available tiles', () => {
  expect(canBeConverted(oldLevelWithCrystals)).toBeTruthy()
})

test('an old level with teleport tiles can not be converted yet', () => {
  expect(canBeConverted(oldLevelWithTeleports)).toBeFalsy()
})

test('an old level with jumper tiles can not be converted yet', () => {
  expect(canBeConverted(oldLevelWithJumpers)).toBeFalsy()
})
