import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './lang/en'
import tr from './lang/tr'
import router, { changeDocumentTitle } from '@/router'
import { localeChanged } from 'vee-validate';
import EventBus from '@/helpers/event-bus'
Vue.use(VueI18n)

const messages = {
    tr,
    en
}

var userLang = (navigator.language || navigator.userLanguage).split('-')[0] || 'en'; 


const i18n = new VueI18n({
    locale: userLang,
    messages
  });

  Object.defineProperty(Vue.prototype, '$locale', {
    get: function () {
      return i18n.locale
    },
    set: function (locale) {
      i18n.locale = locale
      changeDocumentTitle(router.currentRoute.meta.title)
      localeChanged()
      EventBus.$emit('localeChanged')
    }
  })

export default i18n
