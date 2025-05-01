# 🐨 Koala Dungeon

Монорепозиторий с Nuxt.js и Strapi приложениями.

## Структура проекта

```
koala-dungeon/
├── apps/
│   ├── client/           # Nuxt.js приложение
│   │   └── src/          # Исходный код клиента
│   │       ├── app/      # Инициализация приложения
│   │       ├── pages/    # Страницы
│   │       ├── widgets/  # Композиционные компоненты
│   │       ├── features/ # Функциональность
│   │       ├── entities/ # Бизнес-сущности
│   │       └── shared/   # Переиспользуемый код
│   └── server/           # Strapi приложение
└── package.json
```

## Конвенции работы с git

| Имя ветки | Описание                            |
| --------- | ----------------------------------- |
| `main`    | Главная ветка                       |
| `release` | Ветка релиза                        |
| `feature` | Ветка нового функционала            |
| `fix`     | Ветка исправления бага              |
| `hotfix`  | Ветка исправления критического бага |

## Команды

-   `pnpm dev` - Запуск всех приложений в режиме разработки
-   `pnpm build` - Сборка всех приложений
-   `pnpm start` - Запуск всех приложений в production режиме

## Архитектура

Проект использует Feature-Sliced Design (FSD) методологию для клиентского приложения.

## Установка и запуск проекта

### Предварительные требования

- Node.js версии 18 или выше
- pnpm версии 8 или выше
- Git

### Установка Node.js и pnpm

#### macOS
1. Установите Homebrew, если он еще не установлен:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Установите Node.js:
   ```bash
   brew install node
   ```

3. Установите pnpm:
   ```bash
   brew install pnpm
   ```

#### Windows
1. Скачайте и установите Node.js с [официального сайта](https://nodejs.org/)
2. Откройте PowerShell и установите pnpm:
   ```powershell
   Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
   ```

### Клонирование и настройка проекта

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/xthirtysix/koala-dungeon.git
   cd koala-dungeon
   ```

2. Установите зависимости:
   ```bash
   pnpm install
   ```

3. Создайте файл `.env` в корневой директории проекта:
   ```bash
   cp .env.example .env
   ```

4. Заполните необходимые переменные окружения в файле `.env`

### Запуск проекта

#### Режим разработки
```bash
pnpm dev
```
Это запустит:
- Клиентское приложение на http://localhost:3000
- Серверное приложение на http://localhost:1337

#### Продакшн сборка
```bash
pnpm build
pnpm start
```

### Возможные проблемы и их решение

#### macOS
- Если возникает ошибка с правами доступа при установке пакетов:
  ```bash
  sudo chown -R $USER:$GROUP ~/.npm
  sudo chown -R $USER:$GROUP ~/.pnpm-store
  ```

#### Windows
- Если PowerShell блокирует выполнение скриптов, выполните:
  ```powershell
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- Если возникают проблемы с установкой node-gyp:
  ```powershell
  npm install --global --production windows-build-tools
  ```

### Дополнительная информация

- Для доступа к админ-панели Strapi перейдите по адресу http://localhost:1337/admin
- При первом запуске Strapi попросит создать администратора
- Для разработки рекомендуется использовать VS Code с расширениями:
  - Volar (для Vue.js)
  - ESLint
  - Prettier
