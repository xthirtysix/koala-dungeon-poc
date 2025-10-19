import { type CellEvent } from '@/entities/cell'
import { type CellEventInfo } from '@/widgets/cell-info'

export function useCellInfo() {
    const labelByCharacteristic = new Map<string, string>([
        ['strength', 'Сила'],
        ['agility', 'Ловкость'],
        ['constitution', 'Телосложение'],
        ['wisdom', 'Мудрость'],
    ])

    function getInfo(event: CellEvent): CellEventInfo {
        switch (event.type) {
            case 'checkpoint':
                return { icon: '⛳️', title: 'Чекпоинт' }
            case 'sponsor':
                return { icon: '🤝', title: 'Спонсор' }
            case 'store':
                return { icon: '🛒', title: 'Лавка артефактов' }
            case 'zone':
                return {
                    icon: event.zoneType === 'boss' ? '👾' : '🧑‍🤝‍🧑',
                    title:
                        event.zoneType === 'boss'
                            ? `Зона босса`
                            : `Зона компаньона`,
                    subtitle: `Клетки ${event.startCell}–${event.endCell}`,
                }
            case 'descend':
                return {
                    icon: '🔽',
                    title: `Проверка на ${labelByCharacteristic.get(event.characteristic)} - ${event.check}`,
                    subtitle: `Переход на ${event.destinationCell} при успехе`,
                }
            case 'ascend':
                return {
                    icon: '🔼',
                    title: `Проверка на ${labelByCharacteristic.get(event.characteristic)} - ${event.check}`,
                    subtitle: `Переход на ${event.destinationCell} при провале`,
                }
            default:
                return { icon: '', title: 'Нет событий' }
        }
    }

    return {
        getInfo,
    }
}
