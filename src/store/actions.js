export default {
    showLoginModal() {
        const $ = require('jquery')
        $('#loginModal').modal('toggle')
    },
    closeLoginModal() {
        const $ = require('jquery')
        $('#loginModal').modal('hide')
    },
    sendLoginForm({ commit }, payload) {
        commit('setUserInformation', payload)
    },
    logout({ commit }) {
        commit('setUserInformation', null)
    },
    sendContactForm(store, payload) {
        new Promise((resolve) => {
            console.log('Contact Form: ', payload)
            alert('You can check data from developer console.')
            resolve()
        })
    }
}