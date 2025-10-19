# Конфигурация приложения

## Marathon UID

Для обновления UID марафона измените значение в файле `marathon.consts.ts`:

```typescript
// Замените на реальный UID из API
export const CURRENT_MARATHON_UID = 'your_marathon_uid_here'
```

### Где используется:

- `environment.ts` - конфигурация для development/production
- `api.consts.ts` - экспорт MARATHON_VERSION
- `map.api.ts` - POST запрос на /maps

### Как получить UID:

1. Обратитесь к API для получения списка марафонов
2. Найдите нужный марафон по дате или другим параметрам
3. Скопируйте UID из ответа API
4. Обновите `CURRENT_MARATHON_UID` в `marathon.consts.ts`

### Пример API запроса для получения UID:

```bash
curl -H "Authorization: Bearer YOUR_JWT" \
     "https://api.xthirtysix.ru/api/marathons"
```
