import { MapDataType } from '../types/mapDataType'
import { ConstDirection } from '../constants/ConstDirection'

export class LevelsDataTesting {
  static data: MapDataType[] = [
    {
      id: 1,
      title: 'serpent',
      author: 'ocliboy',
      comments: 'first level and also used in unit testing',
      rowsMap: [
        '111111111111111x',
        '1000000000000000',
        '1011111111111111',
        '1010000000000001',
        '1010000111111101',
        '1011111100000101',
        '1000000000000101',
        '1111111111111101',
        '0000000000000001',
        'y111111111111111',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 7,
      title: 'serpiente',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        '0000000000000000',
        '011111111111111y',
        '0100000000000000',
        '0100000000000000',
        '0100001111111100',
        '0100001000000100',
        '0111111000000100',
        '0000000000000100',
        '0000000000111100',
        '0000000000x00000',
      ],
      money: 150,
      startDirection: ConstDirection.DOWN,
      endDirection: ConstDirection.UP,
    },
    {
      id: 8,
      title: 'cross',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        '000y000000000000',
        '0001000000000000',
        '0001022011111100',
        '0001022010000100',
        '0001000010220100',
        '0001111110220100',
        '0000000000000100',
        '0000002201111100',
        '0000002201000000',
        '000000000x000000',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.UP,
    },
    {
      id: 9,
      title: 'animal',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        '0000000000000000',
        '0000000000000000',
        'y11111100111111x',
        '0000001001000000',
        '0111111001111110',
        '0100000000000010',
        '0100111111110010',
        '0100100000010010',
        '0111100000011110',
        '0000000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 10,
      title: 'happy',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        '0000000000000000',
        '011111111111111x',
        '0100000000000000',
        '0100022000022000',
        '0100022000022000',
        '0100000000000000',
        '0102200000000220',
        '0100020000002000',
        '0100002222220000',
        '0y00000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.DOWN,
    },
    {
      id: 11,
      title: 'walls',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        '0000000000000000',
        '0111101110222220',
        '0122101010222220',
        '0122101010000000',
        '0122111010111110',
        '0122000010100010',
        '0122000010101110',
        '0111100010101000',
        '000010001110111y',
        '0000x00000000000',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.RIGHT,
    },
    {
      id: 12,
      title: 'question',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        '0000000000000000',
        'x111111111111110',
        '0000002222220010',
        '0111020000002010',
        '0101000022220010',
        '0101000020000010',
        '0101000000000010',
        '0101000020000010',
        '0101111111111110',
        '0y00000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.RIGHT,
      endDirection: ConstDirection.DOWN,
    },
    {
      id: 13,
      title: 'doble loop',
      author: 'ocliboy',
      comments: 'third level',
      rowsMap: [
        '00000000x0000000',
        '000000011000011y',
        '0000001100001100',
        '0000011000011000',
        '0000110000110000',
        '0000100000100000',
        '0111111111111100',
        '0100100000100100',
        '0111100000111100',
        '0000000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.DOWN,
      endDirection: ConstDirection.RIGHT,
    },
    {
      id: 14,
      title: 'one loop',
      author: 'ocliboy',
      comments: 'second valid level',
      rowsMap: [
        '0000000000000000',
        '001111100000011x',
        '0010001111111100',
        '0010000000000000',
        '0010001111111100',
        '0010001000000100',
        '0011111111111100',
        '0000001000000000',
        '000000111111111y',
        '0000000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.RIGHT,
    },
    {
      id: 15,
      title: 'psycho',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        '000y000011100000',
        '0011000110110000',
        '0110001100011000',
        '0100011000001000',
        '0100010000111000',
        '0100010000100000',
        '0110110111111110',
        '0010100100100010',
        '0011100110111110',
        '00000000x0000000',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.UP,
    },
    {
      id: 16,
      title: 'threeloops',
      author: 'ocliboy',
      comments: '',
      rowsMap: [
        '0000000000000000',
        '0111111000111000',
        '0102201101101000',
        '0111111111111200',
        '0002221222122200',
        '0002111112110000',
        '0001121010011000',
        '2211021110001122',
        '2110022000000112',
        '2y000000000000x2',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.DOWN,
    },
    {
      id: 17,
      title: 'prueba2',
      author: 'Zel',
      comments: '',
      rowsMap: [
        '000000y000000000',
        '0000001000000000',
        '0000001000000000',
        '0000001000000000',
        '0000001110000000',
        '0000000010000000',
        '0000000010000000',
        '0000000010000000',
        '0000000010000000',
        '00000000x0000000',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.UP,
    },
    {
      id: 18,
      title: 'yeah',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '0000000000000000',
        'y111002220011100',
        '0001000000010100',
        '0001111111010100',
        '0000000001010100',
        '0001111111010110',
        '0001000000010010',
        '0001111111110110',
        '0000000000000100',
        '0000002220000x00',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.UP,
    },
    {
      id: 19,
      title: 'itiseasy',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '0000000000000000',
        'y111111111111110',
        '0000000000000010',
        '0111101111011110',
        '0100101001010000',
        '011010110111011x',
        '2010100100000100',
        '0110111101110102',
        '0102000001011102',
        '0111111111000002',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 20,
      title: 'La Roca',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '2000022y2x111111',
        '0111111122000221',
        '0100022221111111',
        '0102011111222222',
        '0102012222111110',
        '0102012222100010',
        '0102011111102010',
        '0100022222200010',
        '0111111111111110',
        '2000000000000002',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.RIGHT,
    },
    {
      id: 21,
      title: 'ER stage',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '2222222220000022',
        '2200000001111102',
        '2201111101000102',
        '2201222101020102',
        '2201222101011102',
        '2001222101010022',
        '2111111101011022',
        '2101000001001100',
        '210111111102011x',
        '2y00000022022000',
      ],
      money: 150,
      startDirection: ConstDirection.RIGHT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 22,
      title: 'irreal',
      author: 'ocliboy',
      comments: 'problem: can reach the exit',
      rowsMap: [
        '111111011101110x',
        '0111111121112111',
        '1111012101210101',
        '1101110121012121',
        '1111112101210101',
        '0111110111011121',
        '1112011101110111',
        '1010201020102012',
        '1112021101110111',
        'y101111111112111',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 23,
      title: 'Confussion',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '000000000000000x',
        '0111111110001111',
        '0100000010111001',
        '0101111010100001',
        '0101001010100001',
        '0101111111100001',
        '0100001010100001',
        '0111111010100001',
        '0000000010111111',
        'y111111110000000',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.RIGHT,
    },
    {
      id: 24,
      title: 'La escalera',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        'y222222222222222',
        '1100000002000002',
        '2110000002000002',
        '2011000002000002',
        '200110000200001x',
        '2000110002000112',
        '2000011002001102',
        '2000001102011002',
        '2200000111110022',
        '2222222222222222',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 25,
      title: 'Laberinto PintoTinto',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '0y212210000100x0',
        '0121221111112210',
        '0121221200011110',
        '0121111100012210',
        '0122100100111110',
        '0122100100120210',
        '0122100100100010',
        '0120111122120210',
        '0111102112111110',
        '0002102211100010',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.RIGHT,
    },
    {
      id: 26,
      title: 'castle',
      author: 'ocliboy',
      comments: 'problem: it has more rows than normal maps',
      rowsMap: [
        '211y111111112222',
        '2121222222211222',
        '2111110201111102',
        '2221012221012122',
        '2111110201112102',
        '2121222222222122',
        '2121222222222122',
        '2111112021112102',
        '2121222222222122',
        '2111112021112102',
        '2221212021212122',
        '2021112021111102',
        '22222222222x2222',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.UP,
    },
    {
      id: 27,
      title: 'La escalera',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        'y222222222111111',
        '1100200222100001',
        '2110020022100001',
        '2011002002100021',
        '2001100202100201',
        '220011002210201x',
        '2020011002120110',
        '2202001102101102',
        '2220200112121022',
        '2222222211111222',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.UP,
    },
    {
      id: 29,
      title: 'Problems?',
      author: 'Pedro Medario',
      comments: '',
      rowsMap: [
        'yx00000000000000',
        '0000000000000000',
        '0000000000000202',
        '0222020202020202',
        '0200020202020202',
        '0220020202020000',
        '0200022202220202',
        '0000000000000000',
        '0000000000000000',
        '0000000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.DOWN,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 30,
      title: 'Easy',
      author: 'Nick',
      comments: '',
      rowsMap: [
        'y01110111011101x',
        '1010101010101010',
        '1010101010101010',
        '1010101010101010',
        '1010101010101010',
        '1010101010101010',
        '1010101010101010',
        '1010101010101010',
        '1010101010101010',
        '1110111011101110',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.UP,
    },
    {
      id: 31,
      title: 'La Nada',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '1110111111110111',
        '1111111111111111',
        '1111111111111111',
        '1111111111111111',
        '2111111111111112',
        'y11110111101111x',
        '2111011111101112',
        '1111111111111111',
        '1111111111111111',
        '1111111111111111',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 32,
      title: 'funloopings',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '2020202020202022',
        'y111112111111112',
        '2222212122020012',
        '2011111111122012',
        '2012212100120012',
        '201111210012111x',
        '2000002100121012',
        '2222222100121112',
        '2222222111120002',
        '2200222022022222',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 33,
      title: 'Cornerlike',
      author: 'Henix879',
      comments: '',
      rowsMap: [
        '2222222022111222',
        'y111111222101020',
        '2222201222111112',
        '1110201220201212',
        '1011111211121212',
        '1222222010121212',
        '1111111111121212',
        '2222222010201210',
        '222222221111121x',
        '2222222022222022',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 34,
      title: 'Reboting rocks',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        'x111111111111112',
        '2100220021222212',
        '2122100211111112',
        '2111102122210022',
        '2020121111110222',
        '2020111111002222',
        '2111121100020222',
        'y122121000222022',
        '2222111002222202',
        '2222222222222220',
      ],
      money: 150,
      startDirection: ConstDirection.RIGHT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 35,
      title: 'easy peasy',
      author: 'bob',
      comments: '',
      rowsMap: [
        '000000211111111x',
        '2000000100000002',
        '1111111111111111',
        '1020000100000201',
        '1211111111111121',
        '1211111120000101',
        '1020000200000101',
        '1111111111111121',
        '2000000000000201',
        'y111111111111111',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 36,
      title: 'LOLEASYWUT?',
      author: 'Dragovin',
      comments: '',
      rowsMap: [
        '2y20202020202020',
        '0111110202020202',
        '2020212020202020',
        '0202011111111202',
        '2020202020201020',
        '0201111111111202',
        '2021202022222220',
        '1111110222222202',
        '1020212022222220',
        '111111111111111x',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.UP,
    },
    {
      id: 37,
      title: 'Symetricity',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '2x22222222222222',
        'y111111111111111',
        '2102222222222201',
        '2102202020202201',
        '2102022222220201',
        '2102020202020201',
        '2102000020000201',
        '2102222222222201',
        '2100000020000001',
        '2111111111111111',
      ],
      money: 150,
      startDirection: ConstDirection.DOWN,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 38,
      title: 'Cuadricos Negros',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '2x21212122222222',
        '211111111211111y',
        '2202122212100200',
        '0001111212100000',
        '0201221212102220',
        '0001211112100200',
        '0201212212100200',
        '0201211112100200',
        '0201222222102020',
        '2021111111100200',
      ],
      money: 150,
      startDirection: ConstDirection.DOWN,
      endDirection: ConstDirection.RIGHT,
    },
    {
      id: 39,
      title: 'lol',
      author: 'BK',
      comments: '',
      rowsMap: [
        '2y20220222111111',
        '2121112111111111',
        '2121211120110222',
        '2121222221121112',
        '2121111121211212',
        '0122222121112112',
        '2121112122201122',
        '2121212121111222',
        '211121112102021x',
        '2222202201111110',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.UP,
    },
    {
      id: 52,
      title: 'random-p',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '2222222222220000',
        '2011111111120000',
        '2010000002120000',
        '2010000002120000',
        '2012222222120000',
        'x111111111120000',
        '2012222222220000',
        '2012000000000000',
        '2012000000000000',
        '20y2000000000000',
      ],
      money: 150,
      startDirection: ConstDirection.RIGHT,
      endDirection: ConstDirection.DOWN,
    },
    {
      id: 58,
      title: 'IdaYVuelta',
      author: 'unknown321',
      comments: '',
      rowsMap: [
        '2000002y20000002',
        '0111111111111110',
        '0000000000000010',
        '0000000100000010',
        '0111111111111110',
        '0100000100000000',
        '0111111111111110',
        '0000000100000010',
        '0000000111111110',
        '2202200x20000002',
      ],
      money: 150,
      startDirection: ConstDirection.UP,
      endDirection: ConstDirection.UP,
    },
    {
      id: 61,
      title: 'untitled',
      author: 'unknown',
      comments: '',
      rowsMap: [
        'y100000111001110',
        '0101110101011010',
        '0111010101010010',
        '0000010101011010',
        '0000010101001010',
        '0000010101001010',
        '0000010101011010',
        '0000010101010010',
        '0000010101010010',
        '000001110111001x',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 6666,
      title: 'no valid map 1',
      author: 'admin',
      comments:
        'invalid map with unreachable exit (look at the last row, there is a "0" blocking the exit), for unit testing purposes',
      rowsMap: [
        '111111111111111x',
        '1000000000000000',
        '1011111111111111',
        '1010000000000001',
        '1010000111111101',
        '1011111100000101',
        '1000000000000101',
        '1111111111111101',
        '0000000000000001',
        'y011111111111111',
      ],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
    {
      id: 6667,
      title: 'no valid map 2',
      author: 'admin',
      comments: 'empty rowsMap, for unit testing purposes',
      rowsMap: [],
      money: 150,
      startDirection: ConstDirection.LEFT,
      endDirection: ConstDirection.LEFT,
    },
  ]
}
