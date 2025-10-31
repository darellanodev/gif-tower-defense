import { TileEnd } from '../levels/tiles/TileEnd'
import { TileOrange } from '../levels/tiles/TileOrange'
import { TilePath } from '../levels/tiles/TilePath'
import { TileStart } from '../levels/tiles/TileStart'

export type WalkableTile = TilePath | TileEnd | TileStart
export type NotWalkableTile = TileOrange
export type AnyTile = WalkableTile | NotWalkableTile
