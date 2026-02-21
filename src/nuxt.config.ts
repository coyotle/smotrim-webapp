// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui'],
  ui: {
    fonts: false
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Радио подкасты',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Веб-клиент для прослушивания подкастов радиостанций Вести ФМ, Маяк, Культура и других. Некоммерческое приложение на основе API Smotrim.ru' },
        { name: 'keywords', content: 'подкасты, радио, вести фм, маяк, культура, радио россия, смотрим, вгтрк, трансляция' }
      ]
    }
  }
})
