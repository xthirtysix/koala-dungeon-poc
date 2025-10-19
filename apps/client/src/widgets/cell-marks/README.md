# Cell Marks Widget

Виджет для отображения и управления маркерами ячеек карты.

## Описание

`CellMarks` - это виджет, который предоставляет интерфейс для добавления, изменения и удаления маркеров на ячейках карты. Виджет использует u-popover для отображения панели с доступными маркерами.

## Использование

### Базовое использование

```vue
<template>
  <cell-marks :cell-number="5" />
</template>

<script setup>
import { CellMarks } from '@/widgets/cell-marks'
</script>
```

### Использование через slot в cell-info

```vue
<template>
  <cell-info :cell-number="5" :events="events">
    <template #marks="{ cellNumber }">
      <cell-marks :cell-number="cellNumber" />
    </template>
  </cell-info>
</template>

<script setup>
import { CellInfo } from '@/widgets/cell-info'
import { CellMarks } from '@/widgets/cell-marks'
</script>
```

## Props

| Prop | Тип | Обязательный | Описание |
|------|-----|--------------|----------|
| `cellNumber` | `number` | Да | Номер ячейки для которой отображаются маркеры |

## Функциональность

- Отображение текущего маркера ячейки (если есть)
- Открытие popover с выбором маркеров
- Добавление нового маркера
- Удаление существующего маркера
- Анимация кнопки при открытии/закрытии popover

## Доступные маркеры

Константа `MARKS` определена в `consts/marks.ts`:

- 💣 (бомба)
- 🎁 (подарок)
- 👻 (призрак)
- 💩 (пометка)
- 💰 (монеты)

### Импорт константы

```typescript
import { MARKS, type MarkType } from '@/widgets/cell-marks'
```

## Зависимости

- `@/entities/map` - для работы с маркерами ячеек
- `@/entities/user` - для проверки авторизации пользователя
