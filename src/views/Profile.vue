<template>
  <div class="userInformation" v-if="userInformation">
    <h1 class="mt-3 mb-3">{{$i18n.t('yourInformations')}}</h1>
    <div>
      <strong>{{$i18n.t('name')}}:</strong> {{userInformation.name}}
    </div>
    <div>
      <strong>{{$i18n.t('email')}}:</strong> {{userInformation.email}}
    </div>
    <div>
      <strong>{{$i18n.t('phoneNumber')}}:</strong> {{userInformation.phoneNumber}}
    </div>
    <div>
      <strong>{{$i18n.t('password')}}:</strong> {{'*'.repeat(userInformation.password.length)}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'userInformation'
    ])
  }
}
</script>
