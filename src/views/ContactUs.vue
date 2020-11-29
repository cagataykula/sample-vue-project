<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ invalid }">
        <div class="modal-body">
            <div class="form-group">
            <ValidationProvider vid="name" rules="required" v-slot="{ errors }">
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
            <ValidationProvider vid="name" rules="required" v-slot="{ errors }">
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
            <ValidationProvider vid="phoneNumber" rules="required|phoneNumber" v-slot="{ errors }">
                <label for="phoneNumber">{{$i18n.t('phoneNumber')}}</label>
                <input
                v-model="form.phoneNumber"
                type="phone"
                id="phoneNumber"
                class="form-control"
                :class="{
                    'border border-danger': errors.length && form.email,
                    'border border-success': !errors.length && form.email
                    }"
                :placeholder="$i18n.t('enterPhoneNumber')"
                >
                <span v-if="errors.length" class="validation-error">{{errors[0]}}</span>
            </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider vid="name" rules="required" v-slot="{ errors }">
                <label for="password">{{$i18n.t('message')}}</label>
                <textarea
                v-model="form.text"
                class="form-control"
                :class="{
                    'border border-danger': errors.length && form.text,
                    'border border-success': !errors.length && form.text
                    }" id="message"
                :placeholder="$i18n.t('enterMessage')"
                style="minHeight: 150px;"
                ></textarea>
                <span v-if="errors.length" class="validation-error">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider vid="country" rules="required" v-slot="{ errors }">
                <label for="country">{{$i18n.t('country')}}</label>
                <v-select :key="$locale" v-model="form.country_code" :options="countryList" label="name" :reduce="country => country.id"  id="country"></v-select>
                <span v-if="errors.length" class="validation-error">{{errors[0]}}</span>
              </ValidationProvider>
            </div>
        </div>
        <div class="d-flex justify-content-end flex-fill mr-5">
            <button :disabled="invalid" type="button" class="btn btn-primary" @click="submit()">{{$i18n.t('send')}}</button>
        </div>
      </ValidationObserver>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    vSelect
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        text: '',
        country_code: '',
        phoneNumber: ''
      },
      countryList : [
        { id: "TR", name: this.$i18n.t('turkey'), key: "turkey" },
        { id: "US", name: this.$i18n.t('unitedStatesOfAmerica'), key: "unitedStatesOfAmerica" },
        { id: "GB", name: this.$i18n.t('unitedKingdom'), key: "unitedKingdom" },
        { id: "DE", name: this.$i18n.t('germany'), key: "germany" },
        { id: "SE", name: this.$i18n.t('sweden'), key: "sweden" },
        { id: "KE", name: this.$i18n.t('kenya'), key: "kenya" },
        { id: "BR", name: this.$i18n.t('brazil'), key: "brazil" },
        { id: "ZW", name: this.$i18n.t('zimbabwe'), key: "zimbabwe" }
      ]
    }
  },
  created() {
    const { userInformation } = this.$store.getters
    if(userInformation) {
      this.form.name = userInformation.name
      this.form.email = userInformation.email
      this.form.phoneNumber = userInformation.phoneNumber
    }
    this.selectDefaultCountry()
  },
  methods: {
    submit() {
      const { form } = this
      if(typeof form.country_code == 'object') form.country_code = form.country_code.id
      this.$store.dispatch('sendContactForm', form)
        .then(() => {
          this.form = {
            name: '',
            email: '',
            text: '',
            country_code: '',
            phoneNumber: ''
          }
          this.$refs.form.reset()
        })
    },
    selectDefaultCountry() {
      const selectedCountry = (this.countryList).find((i) => {
          return i.id == this.$locale.toUpperCase()
      })
      if(selectedCountry) this.form.country_code = selectedCountry
      else this.form.country_code = this.countryList[2]
    }
  },
  watch: {
    '$locale': function() {
      if(typeof this.form.country_code == 'object' )
        this.selectDefaultCountry()
      this.countryList.forEach(item => {
        item.name = this.$i18n.t(item.key)
      });
    },
    '$store.getters.userInformation': function() {
      const { userInformation } = this.$store.getters
      if(userInformation) {
      const x = confirm("İletişim sayfasındasın.\nBu sayfadaki isim, email ve telefon numarası alanı hesabındakiler ile eşleştirilsin mi?");
      if (x == true) {
        this.form.name = userInformation.name
        this.form.email = userInformation.email
        this.form.phoneNumber = userInformation.phoneNumber
      }
        
      }
    }
  }
}
</script>


<style lang="scss">

.validation-error {
  color: rgb(255, 0, 0);
  margin: 5px 10px;
  display: block;
}

</style>