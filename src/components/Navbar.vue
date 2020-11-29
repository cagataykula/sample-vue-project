<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
  <a class="navbar-brand" href="#">
      <div class="d-flex align-items-center justify-content-center">
        <router-link :to="{ name: 'Home' }">
          <img alt="" class="logo" src="@/assets/sample-icon.png" />
        </router-link>
        <h1 class="currentPageName m-0 ml-3 p-0">
            {{$i18n.t($route.meta.title)}}
        </h1>
    </div>
    </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item" :class="isActivePage('Home')">
        <router-link class="nav-link" :to="{name: 'Home'}">{{this.$t('home')}}</router-link>
      </li>
      <li class="nav-item" v-if="$store.getters.userInformation">
        <router-link class="nav-link" :to="{name: 'Profile'}">{{this.$t('profile')}}</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'ContactUs'}">{{this.$t('contactUs')}}</router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" v-if="!$store.getters.userInformation" @click.prevent="$store.dispatch('showLoginModal', true)">{{$i18n.t('login')}}</a>
        <a class="nav-link" href="#" v-if="$store.getters.userInformation" @click.prevent="$store.dispatch('logout')">{{$i18n.t('logout')}}</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="http://example.com" id="siteLanguage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span :class="`flag-icon flag-icon-${$i18n.t('classSuffix')}`"> </span> {{$i18n.t('languageName')}}</a>
        <div class="dropdown-menu" aria-labelledby="siteLanguage">
            <template v-for="lang in $i18n.availableLocales" >
                <a :key="lang" v-if="lang !== $i18n.t('fileName')" class="dropdown-item" href="#" @click="$locale = lang"><span :class="`flag-icon flag-icon-${$i18n.t('classSuffix', lang)}`"> </span>  {{$i18n.t('languageName', lang)}}</a>
            </template>
        </div>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import 'flag-icon-css/css/flag-icon.min.css'
export default {
    data() {
        return {
        }
    },
    methods: {
        isActivePage(value) {
            return this.$route.name == value && 'active'
        }
    }
}
</script>

<style scoped lang="scss">
.logo {
    width: 50px;
}

.currentPageName {
    font-size: 22px;
    font-weight: 300;
}

</style>