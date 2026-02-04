# Smotrim.ru Podcasts Web App

Веб-приложение на **Nuxt 4 + Vue 3** для прослушивания радио-подкастов через API [smotrim.ru](https://smotrim.ru).

Приложение позволяет:

- Просматривать список подкастов и эпизодов.
- Слушать подкасты прямо в браузере.
- Скачивать доступные медиафайлы.
- Автоматически отображает анонсы и описания выпусков.
- Использует минималистичный дизайн без визуального мусора.
- Поддерживает светлую и темную тему.

---

## Установка

Клонируйте репозиторий:

```bash
git clone https://github.com/coyotle/smotrim-webapp
cd smotrim-webapp
```

Установите зависимости:

```bash
npm install
# или
yarn install
```

При необходимости отредактируйте `app/data/podcasts.yaml` и обновите `app/data/podcasts.json`:
```bash
cat app/data/podcasts.yaml | yq -j > app/data/podcasts.json
```

> [!NOTE]  
> `yq` — консольная утилита для работы с YAML файлами.
> Более побробно см. https://github.com/mikefarah/yq


## Локальный запуск

Для разработки с SSR:

```bash
npm run dev
```

Приложение будет доступно по адресу http://localhost:3000

Для сборки и продакшн-режима:

```bash
npm run build
npm run preview
```