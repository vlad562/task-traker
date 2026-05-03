# TaskTracker — Angular 18 + JSON Server

Это современное SPA-приложение для управления списком задач. Проект демонстрирует навыки построения компонентной архитектуры, работы с асинхронными запросами (RxJS) и управления состоянием в Angular.

## Основные возможности
- **Full CRUD**: Создание, просмотр, переключение статуса (reminder) и удаление задач.
- **REST API Interaction**: Полноценное взаимодействие с бэкендом (имитация через JSON Server).
- **Responsive Design**: Адаптивный интерфейс, удобный для мобильных устройств.
- **Signals & RxJS**: Использование современных подходов Angular 18 для реактивности.

## Технологический стек
- **Frontend**: Angular 18 (Standalone Components, Signals).
- **Language**: TypeScript.
- **Backend Simulation**: JSON Server.
- **Styling**: [Напишите здесь: CSS / SCSS / Tailwind].
- **Icons**: [Напишите здесь: FontAwesome / Material Icons].

## Установка и запуск

Для работы проекта вам понадобятся [Node.js](https://nodejs.org) и [Angular CLI](https://angular.dev).

### 1. Клонирование репозитория
```bash
git clone https://github.com
cd task-tracker
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск JSON Server (Бэкенд)
Приложение использует локальный файл `db.json` как базу данных.
```bash
npx json-server --watch db.json --port 5000
```

### 4. Запуск Angular приложения (Фронтенд)
Откройте второй терминал и выполните:
```bash
npm start
```
Перейдите по адресу `http://localhost:4200/`.