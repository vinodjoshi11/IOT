<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Users
          <v-spacer></v-spacer>
           <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchVm.contains.firstName" v-on:keyup="searchUsers"></v-text-field>
           &nbsp;
          <!--<v-btn fab small dark class="purple" @click.native="add">
            <v-icon>add</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small dark class="grey" @click.native="print">
            <v-icon>print</v-icon>
          </v-btn>-->
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">

          <template slot="items" slot-scope="props" class="body-2"> 
            <td class="text-xs-left">{{ props.item.AcountNumber }}</td>
            <td class="text-xs-left">{{ props.item.firstName }}</td>
            <td class="text-xs-right">{{ props.item.lastName }}</td>
            <td class="text-xs-right">{{ props.item.email }}</td>
            <td class="text-xs-right">{{ props.item.Role }}</td>
            <!--<td class="text-xs-right">
              <v-icon v-if="!props.item.isActive" class="light">block</v-icon>
              <v-icon v-if="props.item.isActive" class="light">done</v-icon>
            </td>-->
            <td class="text-xs-right">
              <!--<v-btn fab small dark class="indigo" @click.native="changeStatus(props.item)">
                <v-icon>autorenew</v-icon>
              </v-btn>
              <v-btn fab small dark class="teal" @click.native="edit(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn fab small dark class="cyan" @click.native="remove(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>-->
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
          <!-- Math.ceil(pagination.totalItemstotalItems / pagination.rowsPerPage) -->
        </div>
      </v-card>
    </v-flex>  
    <v-snackbar :timeout="2500" :top="true" :error="true" :multi-line="true" v-model="snackbar">
      {{ errText }}
      <v-btn flat light @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
  export default {
    data: function () {
      return {
        rightDrawer: false,
        right: true,
        search: '',
        errText: '',
        pagination: {
          page: 1,
          totalItems: 0,
          rowsPerPage: 5
        },
        snackbar: false,
        headers: [
          { text: 'Acount Number', align: 'left', value: 'Acount Number' },
          {
            text: 'First Name',
            align: 'left',
            value: 'firstName'
          },
          { text: 'Last Name', value: 'lastName' },
          { text: 'Email', value: 'email' },
          { text: 'Role', value: 'Role' }
        ],
        items: [],
        searchVm: {
          contains: {
            firstName: '',
            lastName: ''
          },
          between: {
            age: { former: 0, latter: 0 }
          }
        }
      }
    },
    methods: {
      edit(item) {
        this.$router.push({ name: 'User', params: { id: item.id } })
      },
      add() {
        this.$router.push('Newuser')
      },
      remove(item) {
        const rootComponent = this.appUtil.getRootComponent(this)
        if (rootComponent) {
          rootComponent.openDialog('Do you want to delete this User?', '', () => {
            this.api.deleteData('Users/' + item.id.toString()).then((res) => {
              this.getUsers()
            }, (err) => {
              console.log(err)
              this.snackbar = true
              this.errText = 'Status has not be deleted successfully. Please try again.'
            })
          })
        }
      },
      changeStatus(item) {
        item.isActive = !item.isActive
        this.api.putData('Users/' + item.id.toString(), item).then((res) => {
          // this.$router.push('Users')
        }, (err) => {
          console.log(err)
          this.snackbar = true
          this.errText = 'Status has not be updated successfully. Please try again.'
          item.isActive = !item.isActive
        })
      },
      searchUsers() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.buildSearchFilters(this.searchVm)
        let query = this.appUtil.buildJsonServerQuery(this.searchVm)

        this.api.getData('Users?' + query).then((res) => {

          this.items = res.data
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      clearSearchFilters() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.clearSearchFilters(this.searchVm)

        this.api.getData('Users').then((res) => {
          this.items = res.data
          this.pagination.totalItems = this.items.length
          console.log(this.items)
        }, (err) => {
          console.log(err)
        })
      },
      getUsers() {
        this.api.getData('Users?_embed=orders').then((res) => {
          this.items = res.data
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      }
    },
    computed: {
      pages() {
        return this.pagination && this.pagination.rowsPerPage ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage) : 0
      }
    },
    mounted: function () {
      this.getUsers()
    }
  }
</script>