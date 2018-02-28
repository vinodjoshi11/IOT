<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
          <v-btn fab small dark class="grey" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small dark class="purple" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap>

              <v-flex md4 xs12>
                <v-text-field name="firstName" label="First Name" hint="Last name is required" value="Input text" v-model="User.firstName" class="input-group--focused" required></v-text-field>
              </v-flex>  
              <v-flex md4 xs12>
                <v-text-field name="lastName" label="Last Name" maxlength="10" hint="Last name is required" value="Input text" v-model="User.lastName" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12 v-if="User.avatar">
                <img v-if="User.avatar" class="responsive" v-bind:src="User.avatar"></img>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="age" type="number" label="Age" hint="Number between 18 to 150" v-bind:rules="rules.age" 
                 v-model="User.age" class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="email" type="email" label="Email" value="Input text" v-model="User.email" 
                 v-bind:rules="rules.email" class="input-group--focused" required></v-text-field>
              </v-flex>
               <v-flex md4 xs12>
                  <v-switch label="User Status"  v-model="User.isActive" light></v-switch>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
export default {
  data: function () {
    return {
      errors: [],
      title: '',
      User: {},
      rules: {
        age: [() => {
          if (this.User.age < 18 || this.User.age > 100) return 'Age is required. It must be bewteen 18 and 100'
        }],
        email: [() => {
          if (this.User.email) {
            /* eslint-disable no-useless-escape */
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(this.User.email)) return 'Email is invalid.'
          }
        }]
      }
    }
  },
  computed: {
  },
  methods: {
    save: function () {
      let User = this.User
      if (!User.id) {
        this.api.postData('Users', User).then((res) => {
          this.$router.push({name: 'Users'})
        }, (err) => {
          console.log(err)
        })
      } else {
        this.api.putData('Users/' + User.id.toString(), User).then((res) => {
          this.$router.push({name: 'Users'})
        }, (err) => {
          console.log(err)
        })
      }
    },
    getById: function () {
      this.api.getData('Users/' + this.$route.params.id).then((res) => {
        this.User = res.data
        // this.User.avatar = '/assets/' + this.User.avatar
      }, (err) => {
        console.log(err)
      })
    },
    cancel: function () {
      this.$router.push({name: 'Users'})
    }
  },
  mounted: function () {
    if (this.$route.params.id) {
      this.getById()
      this.title = 'Edit User'
    } else this.title = 'New User'
  }
}
</script>
