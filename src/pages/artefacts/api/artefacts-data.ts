import type { Artefact } from '~/entities/artefact/model/artefact'

export default <Artefact[]>[
    {
        id: 'krotovuha',
        name: 'Банка Кротовухи',
        type: 'belt',
        description:
            'Позволяет перераспределить 5 очков характеристик из одного навыка в другой.',
        attributes: '-',
        durability: 1,
    },
    {
        id: 'champagne',
        name: 'Бокал шампусика',
        type: 'belt',
        description:
            'Восстанавливает 5 ХП, но душа рвется в караоке: стример в обязательном порядке поет 1 песню на выбор чата.',
        attributes: '-',
        durability: 1,
    },
    {
        id: 'breakdancer',
        name: 'Ботинки Брейкдансера',
        type: 'legs',
        description: 'Позволяют пропустить подъем.',
        attributes: 'Ловкость + 2; Мудрость - 1',
        durability: 1,
    },
    {
        id: 'patches',
        name: 'Ботинки Лоскутика',
        type: 'legs',
        description:
            'Добавляют +3 к силе, но дают -1 ко всем броскам движения.',
        attributes: 'Сила + 3',
        durability: undefined,
    },
    {
        id: 'bronelifchik',
        name: 'Бронелифчик',
        type: 'chest',
        description: 'Срезает 1 ОЖ с любого урона.',
        attributes: 'Телосложение + 2',
        durability: 5,
    },
    {
        id: 'speedbucket',
        name: 'Ведро скорости',
        type: 'head',
        description:
            'При активации перед началом движения стример подкидывает монету и двигается с удвоенной скоростью в выпавшем направлении. Орел - движение вперед, решка - назад.',
        attributes: 'Телосложение + 1',
        durability: 2,
    },
    {
        id: 'koalarope',
        name: 'Веревка из шерсти коалы',
        type: 'belt',
        description: 'Позволяет добавить 1к4 к проверке спусков и подъемов.',
        attributes: '-',
        durability: 2,
    },
    {
        id: 'umbrella',
        name: 'Катана-зонтик',
        type: 'weapon',
        description:
            'После активации выключает одно ивентовое событие, такое как: "Скользкий тип", "Сайлент Хилл", "Камень я дам", "Кислотная вечеринка", "Рандомайзер", "Музыкальный автомат", "Голый забег", "Перевертыш". Если событий несколько, то стример сам выбирает, какое выключить.',
        attributes: 'Сила + 1',
        durability: 2,
    },
    {
        id: 'breadshoes',
        name: 'Кеды Бегущего за хлебом',
        type: 'legs',
        description:
            'При активации прибавляют к броску движения 1к4, но если стример попадает на клетку, оканчивающуюся цифрами 6 или 9, то он теряет 2 ОЖ каждый раз.',
        attributes: 'Телосложение + 1',
        durability: 3,
    },
    {
        id: 'ithat',
        name: 'Кепка айтишника',
        type: 'head',
        description: 'Дает +1 монету при любом их получении.',
        attributes: 'Мудрость + 1',
        durability: undefined,
    },
    {
        id: 'remotebutton',
        name: 'Кнопка перемотки',
        type: 'belt',
        description: 'Позволяет перебросить помеху один раз в 4 часа.',
        attributes: '-',
        durability: 3,
    },
    {
        id: 'quadrober',
        name: 'Лапки квадробера',
        type: 'hands',
        description:
            'Очень стильные перчатки, которые повышают Ловкость на 3, но если персонаж надевает их, то стример тоже должен надеть. Мода, хули.',
        attributes: 'Ловкость + 3',
        durability: undefined,
    },
    {
        id: 'oldchest',
        name: 'Нагрудник из старого таза',
        type: 'chest',
        description:
            'Когда ОЖ персонажа падает до 0, позволяет остаться на ближайшем чекпойнте, а не идти на два назад. Артефакт при этом теряет свою прочность.',
        attributes: 'Телосложение + 1',
        durability: 1,
    },
    {
        id: 'pathfinder',
        name: 'Нагрудник поиска пути',
        type: 'chest',
        description:
            'Позволяет по желанию остановиться при прохождении спуска.',
        attributes: 'Мудрость + 1',
        durability: 2,
    },
    {
        id: 'palochka',
        name: 'Палочка-копалочка',
        type: 'weapon',
        description:
            'Позволяет призвать 1 случайный артефакт. Его прочность будет равна 1.',
        attributes: 'Мудрость + 1',
        durability: 1,
    },
    {
        id: 'rougegloves',
        name: 'Перчатки шулера',
        type: 'hands',
        description:
            'При активации кубик бросается 5 раз и выбирается лучшее число.',
        attributes: 'Ловкость + 1',
        durability: 3,
    },
    {
        id: 'repairkit',
        name: 'Ремкомплект',
        type: 'belt',
        description: 'Позволяет добавить 1 прочность к любому предмету.',
        attributes: '-',
        durability: 1,
    },
    {
        id: 'extrahand',
        name: 'Третья кибер-рука',
        type: 'hands',
        description:
            'Помеха бросается дважды, выбирается результат, понравившийся стримеру.',
        attributes: 'Ловкость + 1',
        durability: 2,
    },
    {
        id: 'chelotron',
        name: 'Челенатор',
        type: 'weapon',
        description:
            'В прямом смысле охуенный меч. За топ 8-4 стример не получает урон. Можно применить сразу после катки.',
        attributes: 'Сила + 2',
        durability: 3,
    },
    {
        id: 'folga',
        name: 'Шапочка из фольги',
        type: 'head',
        description:
            'Позволяет сбросить все характеристики и распределить их так, как тебе хочется, но подлые рептилоиды воруют у тебя 3 очка.',
        attributes: 'Мудрость + 1',
        durability: 1,
    },
    {
        id: 'kleopold',
        name: 'Ходули Клеопольда',
        type: 'legs',
        description:
            'При активации позволяют ходить через 1 клетку, но необходимо пройти проверку силы со сложностью 14. Если стример не проходит, то падает, получая 1к6 урона и ломает ходули.',
        attributes: 'Ловкость + 2',
        durability: 2,
    },
    {
        id: 'taxi',
        name: 'Визитка с номером такси',
        type: 'belt',
        description:
            'Позволяет обменять монеты на движение по клеткам по курсу 3 к 1.',
        attributes: '-',
        durability: 1,
    },
    {
        id: 'gandonka',
        name: 'Шапка гопника',
        type: 'head',
        description: 'Позволяет получить 1к8 монет при прохождении чекпойнта.',
        attributes: 'Телосложение + 1',
        durability: 2,
    },
    {
        id: 'bosschest',
        name: 'Кираса убийцы боссов',
        type: 'chest',
        description:
            'При активации позволяет вызвать босса на бой за 15 клеток до или после зоны босса.',
        attributes: 'Сила + 2',
        durability: 1,
    },
    {
        id: 'huyagloves',
        name: 'Наручи фирмы "Huya"',
        type: 'hands',
        description: 'При активации ваше место в катке становится на 1 выше.',
        attributes: 'Мудрость + 2',
        durability: 4,
    },
    {
        id: 'timebelt',
        name: 'Маховик времени',
        type: 'belt',
        description:
            'При активации стример бросает 6к6 и добавляет к таймеру то количество минут, что выпало на кубиках.',
        attributes: '-',
        durability: 1,
    },
    {
        id: 'annihilator',
        name: 'Аннигилятор',
        type: 'weapon',
        description:
            'При активации стример уничтожает 1 предмет на себе и получает на выбор 10 монет или 10 ОЖ.',
        attributes: 'Сила + 3',
        durability: 2,
    },
    {
        id: 'pump',
        name: 'Насос от говновоза',
        type: 'belt',
        description:
            'При активации позволяет перекачать до 10 единиц ОЖ в монеты и наоборот.',
        attributes: '-',
        durability: 1,
    },
]
