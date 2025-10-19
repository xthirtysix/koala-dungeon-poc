import { ArtefactSlot } from '@/entities/artefact'

const beltArtefact = {
    bonus: [],
    description:
        'Восстанавливает 5 хп, но душа рвется в караоке: стример в обязательном порядке поет 1 песню на выбор чата. ',
    durability: 1,
    id: 2,
    image: {
        url: 'https://res.cloudinary.com/dvgai1ych/image/upload/v1746300847/champagne_c6bf911586.png',
    },
    name: 'Бокал шампусика',
    slot: 'пояс',
}

const weaponArtefact = {
    name: 'Аннигилятор',
    durability: 2,
    description:
        'При активации, стример уничтожает 1 предмет на себе и получает на выбор 10 монет или 10 О.Ж. ',
    image: {
        url: 'https://res.cloudinary.com/dvgai1ych/image/upload/v1746300848/annihilator_8ef1b69fb7.png',
    },
    bonus: [
        {
            id: 23,
            characteristic: 'сила',
            value: 3,
            isNegative: false,
        },
        {
            id: 24,
            characteristic: 'мудрость',
            value: 1,
            isNegative: true,
        },
    ],
}

const chestArtefact = {
    name: 'Бронелифчик ',
    durability: 2,
    description: 'Срезает 1 ОЖ с любого урона. ',
    image: {
        url: 'https://res.cloudinary.com/dvgai1ych/image/upload/v1746300848/bronelifchik_5c92f811b6.png',
    },
    bonus: [
        {
            id: 6,
            characteristic: 'телосложение',
            value: 2,
            isNegative: false,
        },
    ],
}

export const equipmentMock = [
    {
        slot: ArtefactSlot.Head,
        artefact: null,
    },
    {
        slot: ArtefactSlot.Chest,
        artefact: chestArtefact,
    },
    {
        slot: ArtefactSlot.Hands,
        artefact: null,
    },
    {
        slot: ArtefactSlot.Feet,
        artefact: null,
    },
    {
        slot: ArtefactSlot.Weapon,
        artefact: weaponArtefact,
    },
    {
        slot: ArtefactSlot.Belt,
        artefact: null,
    },
    {
        slot: ArtefactSlot.Belt,
        artefact: beltArtefact,
    },
    {
        slot: ArtefactSlot.Belt,
        artefact: null,
    },
]
