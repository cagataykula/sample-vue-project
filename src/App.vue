<template>
  <div id="app">
    <navbar />
    <login :active="true" />
    <div class="container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Login from '@/components/Login.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Login,
    Footer
  },
  data() {
    return {
      showLogin: true
    }
  }
}
</script>

<style lang="scss">
</style>
