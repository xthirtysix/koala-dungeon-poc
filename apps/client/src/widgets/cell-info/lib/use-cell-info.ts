import { type CellEvent } from '@/entities/cell'
import { type CellEventInfo } from '@/widgets/cell-info'
import moveUp from '@/app/assets/images/map/move_up.webp'
import moveDown from '@/app/assets/images/map/move_down.webp'
import checkpoint from '@/app/assets/images/map/checkpoint.webp'
import store from '@/app/assets/images/map/store.webp'
import boss from '@/app/assets/images/map/boss.webp'

export function useCellInfo() {
    const labelByCharacteristic = new Map<string, string>([
        ['strength', 'Сила'],
        ['dexterity', 'Ловкость'],
        ['constitution', 'Телосложение'],
        ['wisdom', 'Мудрость'],
    ])

    function getInfo(event: CellEvent): CellEventInfo {
        switch (event.type) {
            case 'checkpoint':
                return { icon: checkpoint, title: 'Чекпоинт' }
            case 'sponsor':
                return { icon: '🤝', title: 'Спонсор' }
            case 'store':
                return { icon: store, title: 'Лавка артефактов' }
            case 'zone':
                return {
                    icon: event.zoneType === 'boss' ? boss : '',
                    title:
                        event.zoneType === 'boss'
                            ? `Зона босса`
                            : `Зона компаньона`,
                    subtitle: `Клетки ${event.startCell}–${event.endCell}`,
                }
            case 'descend':
                return {
                    icon: moveDown,
                    title: `Проверка на ${labelByCharacteristic.get(event.characteristic)} - ${event.check}`,
                    subtitle: `Переход на ${event.destinationCell} при успехе`,
                }
            case 'ascend':
                return {
                    icon: moveUp,
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
