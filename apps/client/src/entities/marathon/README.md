# Marathon Entity

Модуль для работы с марафонами в приложении.

## Структура

- `api/marathon.ts` - API функции для работы с марафонами
- `model/types.ts` - TypeScript типы
- `model/marathon.store.ts` - Pinia store для управления состоянием марафона
- `model/use-marathon.ts` - Composable с использованием Pinia Colada
- `ui/marathon-info.vue` - Компонент для отображения информации о марафоне

## Использование

### 1. Использование Pinia Store

```vue
<script setup lang="ts">
import { useMarathonStore } from '@/entities/marathon'

const marathonStore = useMarathonStore()

// Загрузить марафон
await marathonStore.fetchMarathon()

// Получить данные
const marathon = marathonStore.marathon
const isLoading = marathonStore.isLoading
const error = marathonStore.error
</script>
```

### 2. Использование Pinia Colada Composable

```vue
<script setup lang="ts">
import { useMarathon } from '@/entities/marathon'

const { marathon, isLoading, error, refetch } = useMarathon()
</script>

<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="marathon">
    <!-- Отображение данных марафона -->
  </div>
</template>
```

### 3. Использование готового компонента

```vue
<script setup lang="ts">
import { MarathonInfo } from '@/entities/marathon'
</script>

<template>
  <MarathonInfo />
</template>
```

## Автоматическая загрузка

Марафон автоматически загружается при старте приложения в `main.ts`. Данные доступны во всех компонентах через store или composable.

## API

### Marathon Interface

```typescript
interface Marathon {
  id: number
  startTime: string
  totalTime: number
  passedTime: number
  isPaused: boolean
  banner?: {
    url: string
  }
  bannerLink?: string
}
```

### Store Methods

- `fetchMarathon()` - Загрузить данные марафона
- `clearMarathon()` - Очистить данные марафона

### Composable Methods

- `refetch()` - Перезагрузить данные марафона
