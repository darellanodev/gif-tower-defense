import { TileEnd } from '../tiles/TileEnd'
import { TileOrange } from '../tiles/TileOrange'
import { TilePath } from '../tiles/TilePath'
import { TileStart } from '../tiles/TileStart'

export type WalkableTile = TilePath | TileEnd | TileStart
export type NotWalkableTile = TileOrange
export type AnyTile = WalkableTile | NotWalkableTile
