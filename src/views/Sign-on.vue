<template>
  <section id="sign-on" class="page">
    <header>
      <h3>{{ person.first_name }} {{ person.last_name }}</h3>
      <menu v-if="signed_in">
        <button @click="sign_off">Sign off</button>
      </menu>
    </header>
    <mobile-as-form
      v-if="!signed_in"
      v-model:person="person"
      @signed-on="signed_on" />
    <name-as-form v-if="nameless" v-model:person="person" @valid="new_person" />
  </section>
</template>
<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import mobile_as_form from '@/components/profile/as-form-mobile'
  import name_as_form from '@/components/profile/as-form-name'
  import signed_on from '@/mixins/signed_in'
  export default {
    components: {
      'mobile-as-form': mobile_as_form,
      'name-as-form': name_as_form
    },
    mixins: [signed_on],
    data() {
      return {
        nameless: false,
        person: {
          mobile: ''
        }
      }
    },
    async created() {
      firebase.auth().onAuthStateChanged(this.auth_state)
    },
    methods: {
      auth_state(user) {
        if (user && this.person) this.person.mobile = null
      },
      async signed_on() {
        this.nameless = true
      },
      sign_off() {
        firebase.auth().signOut()
      },
      new_person() {
        this.nameless = false
      }
    }
  }
</script>
<style lang="stylus">
  section#sign-on.page
    margin:auto
    display: flex
    flex-direction: column
    justify-content: space-between
    & > header > h3
      margin: 0
    form
    footer
      padding: base-line
      padding-top: 0
    & > footer > button
      opacity: 0.5
      &:hover
        opacity: 1
    @media (min-width: pad-begins)
      form, header
        align-self: center
      header
        width: 29rem
        margin: base-line
</style>
