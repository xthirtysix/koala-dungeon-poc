# Place Token Feature

Функциональность для размещения токена героя на карте.

## Описание

`PlaceTokenButton` - это компонент-кнопка, который позволяет перемещать токен героя на выбранную клетку карты. Компонент рендерится в слоте `cell-info.vue` и при клике перемещает `hero-token.vue` на соответствующую клетку.

## Структура

```
features/place-token/
├── model/
│   ├── usePlaceToken.ts    # Composable для управления позицией токена
│   └── index.ts           # Экспорт модели
├── ui/
│   ├── place-token-button.vue  # Компонент кнопки
│   └── index.ts               # Экспорт UI
├── example-usage.vue      # Пример использования
└── index.ts              # Главный экспорт
```

## Использование

### Базовое использование

```vue
<template>
  <place-token-button :cell-number="5" />
</template>

<script setup>
import { PlaceTokenButton } from '@/features/place-token'
</script>
```

### Использование в слоте cell-info

```vue
<template>
  <cell-info :cell-number="cellNumber" :events="events">
    <template #default="{ cellNumber }">
      <div class="flex gap-2">
        <cell-marks :cell-number="cellNumber" />
        <place-token-button :cell-number="cellNumber" />
      </div>
    </template>
  </cell-info>
</template>

<script setup>
import { CellInfo } from '@/widgets/cell-info'
import { CellMarks } from '@/widgets/cell-marks'
import { PlaceTokenButton } from '@/features/place-token'
</script>
```

## Props

| Prop | Тип | Обязательный | Описание |
|------|-----|--------------|----------|
| `cellNumber` | `number` | Да | Номер клетки, на которую нужно переместить токен |
| `disabled` | `boolean` | Нет | Отключает кнопку |

## Функциональность

- **Размещение токена**: При клике перемещает токен героя на указанную клетку
- **Проверка доступности**: Кнопка отключается, если токен не загружен
- **Адаптивный дизайн**: Кнопка имеет hover и active эффекты
- **Иконка местоположения**: Использует SVG иконку для визуального обозначения

## Зависимости

- `@/entities/token` - для управления токеном
- `@/entities/map` - для получения данных о клетках карты
- `@/entities/cell` - для типов клеток

## Стили

Компонент использует Tailwind CSS классы:
- `place-token-btn` - основной класс кнопки
- Hover эффекты с изменением фона и тени
- Active эффекты с масштабированием
- Полупрозрачный фон с размытием для эффекта стекла

## Технические детали

- Координаты клеток конвертируются из относительных единиц (0-1) в пиксели
- Токен центрируется относительно размера (50px)
- Использует `transform: translate3d()` для плавной анимации
- Автоматически находит контейнер карты по классу `.map-container`

