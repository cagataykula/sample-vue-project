<template>
  <div class="modal fade" id="loginModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <ValidationObserver ref="form" v-slot="{ invalid }">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">{{$i18n.t('login')}}</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <label for="name">{{$i18n.t('name')}}</label>
                  <input
                    v-model="form.name"
                    type="text"
                    id="name"
                    class="form-control"
                    :class="{
                      'border border-danger': errors.length && form.name,
                      'border border-success': !errors.length && form.name
                      }"
                    :placeholder="$i18n.t('enterName')"
                  >
                  <span v-if="errors.length" class="validation-error">{{errors[0]}}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <label for="email">{{$i18n.t('email')}}</label>
                  <input
                    v-model="form.email"
                    type="email"
                    id="email"
                    class="form-control"
                    :class="{
                      'border border-danger': errors.length && form.email,
                      'border border-success': !errors.length && form.email
                      }"
                    :placeholder="$i18n.t('enterEmail')"
                  >
                  <span v-if="errors.length" class="validation-error">{{errors[0]}}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider rules="required|phoneNumber" v-slot="{ errors }">
                  <label for="email">{{$i18n.t('phoneNumber')}}</label>
                  <input
                    v-model="form.phoneNumber"
                    type="phoneNumber"
                    id="phoneNumber"
                    class="form-control"
                    :class="{
                      'border border-danger': errors.length && form.phoneNumber,
                      'border border-success': !errors.length && form.phoneNumber
                      }"
                    :placeholder="$i18n.t('enterPhoneNumber')"
                  >
                  <span v-if="errors.length" class="validation-error">{{errors[0]}}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <label for="password">{{$i18n.t('password')}}</label>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    :class="{
                      'border border-danger': errors.length && form.password,
                      'border border-success': !errors.length && form.password
                      }" id="password"
                    :placeholder="$i18n.t('enterPassword')"
                    @keypress.enter="submit()"
                  >
                  <span v-if="errors.length" class="validation-error">{{errors[0]}}</span>
                </ValidationProvider>
              </div>
          </div>
          <div class="modal-footer justify-content-between">
            <div>
              <a class="languageName dropdown-toggle" id="siteLanguage" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span :class="`flag-icon flag-icon-${$i18n.t('classSuffix')}`"> </span> {{$i18n.t('languageName')}}</a>
              <div class="dropdown-menu">
                  <template v-for="lang in $i18n.availableLocales" >
                      <a :key="lang" v-if="lang !== $i18n.t('fileName')" class="dropdown-item" href="#" @click="$locale = lang"><span :class="`flag-icon flag-icon-${$i18n.t('classSuffix', lang)}`"> </span>  {{$i18n.t('languageName', lang)}}</a>
                  </template>
              </div>
            </div>
            <div>
              <button :disabled="invalid" type="button" class="btn btn-primary" @click="submit()">{{$i18n.t('login')}}</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">{{$i18n.t('cancel')}}</button>
            </div>
          </div>
        </div>
      </ValidationObserver>
      
    </div>
  </div>
  
</template>

<script>

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('sendLoginForm', this.form)
      this.$store.dispatch('closeLoginModal')
      this.form = {
        name: '',
        email: '',
        phoneNumber: '',
        password: ''
      }
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="scss" scoped>

.validation-error {
  color: rgb(255, 0, 0);
  margin: 5px 10px;
  display: block;
}

</style>>
