<template>
<v-container fluid >
  <v-layout row wrap>
    <v-flex xs5 offset-xs3 justify-space-between>
      <h1> &nbsp;</h1>  
      <v-card>
          <v-card-title  class="blue darken-1">
            <h4 style="color:white">Change Password</h4>
          </v-card-title>
          <v-card-text>
              <form @submit.prevent="login">
                <v-layout row> 
                  <v-flex xs12>
                   <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row> 
                  <v-flex xs12>
                   <v-text-field prepend-icon="lock" name="cpassword" label="Confirm Password" id="cpassword" type="password"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12  style="text-align: right;">
                 <v-btn type="submit">Submit</v-btn>
                  </v-flex>
                </v-layout>
                <v-snackbar v-if="error" :timeout="timeout" :top="true" :multi-line="mode === 'multi-line'" :vertical="mode === 'vertical'" v-model="error">
                  {{ text }}
                  <v-btn flat class="pink--text" @click.native="error = false">Close</v-btn>
                </v-snackbar>
              </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
<script>
import auth from '../utils/auth'

export default {
  data () {
    return {
      email: 'vinod.joshi@surmountsoft.com',
      pass: '1234',
      error: false,
      text: ''
    }
  },
  methods: {
    login () {
      auth.login(this.email, this.pass, (loggedIn, err) => {
        if (err) {
          console.log('login', err)
          this.error = true
          this.text = err
        } else if (loggedIn === false) {
          console.log('login', loggedIn)
          this.error = true
          this.text = 'Bad login information'
        } else {
          console.log(this.$route)
          this.$router.push(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>
<style lang="stylus">
  @import '../stylus/main'
</style>
