# Map Entity

Сущность для работы с картой и метками ячеек.

## API

### Custom Marks API

#### `updateCustomMarks(customMarks: Map<number, string>, jwt: string)`

Отправляет PUT запрос на `/maps` с обновленными метками. Запрос обновляет запись по UID полю `marathon_version`.

**Параметры:**
- `customMarks` - Map с номерами ячеек и соответствующими эмодзи
- `jwt` - JWT токен пользователя

**Возвращает:** `Promise<CustomMarksUpdateResponse>`

#### `getCustomMarks()`

Получает GET запрос с `/maps` для загрузки сохраненных меток. Публичный эндпоинт, не требует авторизации.

**Параметры:** Нет

**Возвращает:** `Promise<CustomMarksGetResponse>`

## Store

### `useMapStore()`

Pinia store для управления состоянием карты.

**Методы:**
- `markCell(cell: number, emoji: string)` - Добавляет метку к ячейке и отправляет на сервер
- `unmarkCell(cell: number)` - Удаляет метку с ячейки и отправляет на сервер
- `loadCustomMarksFromServer()` - Загружает метки с сервера
- `sendCustomMarksToServer()` - Отправляет текущие метки на сервер

**Состояние:**
- `markedCells: Ref<Map<number, string>>` - Map с текущими метками

## Composable

### `useMapMarks()`

Composable для удобной работы с метками карты.

**Особенности:**
- Автоматически загружает метки при монтировании компонента
- Предоставляет реактивные данные и методы

**Возвращает:**
```typescript
{
  markedCells: Ref<Map<number, string>>,
  markCell: (cell: number, emoji: string) => Promise<void>,
  unmarkCell: (cell: number) => Promise<void>,
  loadCustomMarksFromServer: () => Promise<void>
}
```

## Использование

### Базовое использование

```vue
<script setup>
import { useMapMarks } from '@/entities/map'

const { markedCells, markCell, unmarkCell } = useMapMarks()
</script>
```

### Прямое использование store

```vue
<script setup>
import { useMapStore } from '@/entities/map'

const mapStore = useMapStore()

// Загрузить метки при инициализации (публичный эндпоинт)
await mapStore.loadCustomMarksFromServer()

// Добавить метку (требует авторизации)
await mapStore.markCell(5, '💣')

// Удалить метку (требует авторизации)
await mapStore.unmarkCell(5)
</script>
```

## Формат данных

### Публичный запрос (GET /maps)

```http
GET /maps
```

**Примечание:** Публичный эндпоинт, не требует авторизации.

### Запрос на сервер (PUT /maps)

```json
{
  "custom_marks": {
    "0": "💣",
    "5": "🎁",
    "10": "👻"
  },
  "marathon_version": "autumn_2025_13_uid"
}
```

**Примечание:** Запрос обновляет запись по UID полю `marathon_version`. UID марафона определяется из конфигурации приложения.

### Ответ сервера

```json
{
  "success": true,
  "message": "Метки успешно обновлены"
}
```

## Обработка ошибок

- При отсутствии JWT токена операции с сервером пропускаются с предупреждением в консоли
- Ошибки API запросов логируются в консоль
- Можно расширить функциональность для показа уведомлений пользователю
