import type { Artefact } from './types'
import { ArtefactSlot } from './types'

export const artefacts: Artefact[] = [
  {
    id: 'krotovuha',
    name: 'Банка Кротовухи',
    slot: ArtefactSlot.Belt,
    description: 'Позволяет перераспределить 5 очков характеристик из одного навыка в другой.',
    stats: {},
    durability: 1
  },
  {
    id: 'champagne',
    name: 'Бокал шампусика',
    slot: ArtefactSlot.Belt,
    description: 'Восстанавливает 5 хп, но душа рвется в караоке: стример в обязательном порядке поет 1 песню на выбор чата.',
    stats: {},
    durability: 1
  },
  {
    id: 'breakdancer',
    name: 'Ботинки Брейкдансера',
    slot: ArtefactSlot.Feet,
    description: 'Позволяют пропустить подъем.',
    stats: {
      dexterity: 2,
      wisdom: -1
    },
    durability: 1
  },
  {
    id: 'patches',
    name: 'Ботинки Лоскутика',
    slot: ArtefactSlot.Feet,
    description: 'Добавляет +3 к силе, но дает -1 ко всем броскам движения.',
    stats: {
      strength: 3
    },
    durability: Infinity
  },
  {
    id: 'bronelifchik',
    name: 'Бронелифчик',
    slot: ArtefactSlot.Chest,
    description: 'Срезает 1 ОЖ с любого урона.',
    stats: {
      constitution: 2
    },
    durability: 5
  },
  {
    id: 'speedbucket',
    name: 'Ведро скорости',
    slot: ArtefactSlot.Head,
    description: 'При активации, перед началом движения, стример подкидывает монету и двигается с удвоенной скоростью в выпавшем направлении. Орел - движение вперед, решка - назад.',
    stats: {
      constitution: 1
    },
    durability: 2
  },
  {
    id: 'koalarope',
    name: 'Веревка из шерсти коалы',
    slot: ArtefactSlot.Belt,
    description: 'Позволяет добавить 1к4 кубик к проверке спусков и подъемов.',
    stats: {},
    durability: 2
  },
  {
    id: 'umbrella',
    name: 'Катана-зонтик',
    slot: ArtefactSlot.Weapon,
    description: 'После активации выключает одно ивентовое событие, такое как: "Скользкий тип", "Сайлент Хилл", "Камень я дам", "Кислотная вечеринка", "Рандомайзер", "Музыкальный автомат", "Голый забег", "Перевертыш". Если событий несколько, то стример сам выбирает какое выключить.',
    stats: {
      strength: 1
    },
    durability: 2
  },
  {
    id: 'breadshoes',
    name: 'Кеды Бегущего за хлебом',
    slot: ArtefactSlot.Feet,
    description: 'При активации, прибавляют к броску движения 1к4, но если стример попадает на клетку оканчивающуюся цифрами 6 или 9, то он теряет 2 ОЖ каждый раз.',
    stats: {
      constitution: 1
    },
    durability: 3
  },
  {
    id: 'ithat',
    name: 'Кепка айтишника',
    slot: ArtefactSlot.Head,
    description: 'Дает +1 монету при любом их получении.',
    stats: {
      wisdom: 1
    },
    durability: Infinity
  },
  {
    id: 'remotebutton',
    name: 'Кнопка перемотки',
    slot: ArtefactSlot.Belt,
    description: 'Позволяет рерольнуть помеху, один раз в 4 часа.',
    stats: {},
    durability: 3
  },
  {
    id: 'quadrober',
    name: 'Лапки квадробера',
    slot: ArtefactSlot.Hands,
    description: 'Очень стильные перчатки, которые повышают Ловкость на 3, но если персонаж надевает их, то стример, тоже должен надеть. Мода, хули.',
    stats: {
      dexterity: 3
    },
    durability: Infinity
  },
  {
    id: 'oldchest',
    name: 'Нагрудник из старого таза',
    slot: ArtefactSlot.Chest,
    description: 'Когда О.Ж. персонажа падает до 0, позволяет остаться на ближайшем чекпойнте, а не идти на два назад. Артефакт при этом теряет свою прочность.',
    stats: {
      constitution: 1
    },
    durability: 1
  },
  {
    id: 'pathfinder',
    name: 'Нагрудник поиска пути',
    slot: ArtefactSlot.Chest,
    description: 'Позволяет по желанию остановиться при прохождение спуска.',
    stats: {
      wisdom: 1
    },
    durability: 2
  },
  {
    id: 'palochka',
    name: 'Палочка-копалочка',
    slot: ArtefactSlot.Weapon,
    description: 'Позволяет призвать 1 рандомный артефакт. Его прочность будет равна 1.',
    stats: {
      wisdom: 1
    },
    durability: 1
  },
  {
    id: 'rougegloves',
    name: 'Перчатки шулера',
    slot: ArtefactSlot.Hands,
    description: 'При активации кубик роллится 5 раз и выбирается лучшее число.',
    stats: {
      dexterity: 1
    },
    durability: 3
  },
  {
    id: 'extrahand',
    name: 'Третья кибер-рука',
    slot: ArtefactSlot.Hands,
    description: 'Помеха роляется дважды, выбирается результат понравившийся стримеру.',
    stats: {
      dexterity: 1
    },
    durability: 2
  },
  {
    id: 'chelotron',
    name: 'Челенатор',
    slot: ArtefactSlot.Weapon,
    description: 'В прямом смысле охуенный меч. За топ 8-4 стример не получает урон. Можно применить сразу после катки.',
    stats: {
      strength: 2
    },
    durability: 3
  }
]
