<template>
  <v-container fluid> 
    <v-flex xs12>
      <v-card>
       <v-card-text>
        <v-card-title>
          Devices
          <v-spacer></v-spacer> 
           <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchVm.contains.UserName" v-on:keyup="searchUsers"></v-text-field>
          &nbsp;
          <v-btn fab small dark class="purple" @click.native="add">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-title>
      </v-card-text>  
        <v-data-table v-bind:headers="headers" v-bind:items="items" :search="search" v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props" class="body-2">
            <td class="body-2">{{ props.item.id }}</td>
            <td class="text-xs-right">{{props.item.UserName}}</td>  
            <td class="text-xs-right">{{props.item.createdTime}}</td>  
            <td class="text-xs-right">{{props.item.updatedTime}}</td>  
            <td class="text-xs-right">
              <v-icon  class="light">done</v-icon>
              <v-btn fab small class="cyan"  @click.native="remove(props.item)">
                <v-icon style="color:#fff;">delete</v-icon>
              </v-btn> 
             </td> 
            </td>
          </template> 
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
           Your search for "{{ search }}" found no results.
         </v-alert>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :value="pages" :length="pages" :total-visible="5" circle></v-pagination>
        </div>
      </v-card>
    </v-flex> 
  </v-container>

</template>
<script>
  export default {
    data: function () {
      return {
        rightDrawer: false,
        right: true,
        search: '',
        pagination: {
          page: 1,
          totalItems: 0,
          rowsPerPage: 5
        },
        headers: [{
          text: 'User Id',
          align: 'left',
          sortable: false,
          value: 'User Id'
        },
        {
          text: 'User Name',
          value: 'User Name'
        },
        {
          text: 'Created Time',
          value: 'Created Time'
        },
        {
          text: 'Updated Time',
          value: 'Updated Time'
        }],
        items: [],
        searchVm: {
          contains: {
            deviceName: ''
          },
          between: {
            price: {
              former: 0,
              latter: 0
            }
          }
        }
      }
    },
    methods: {
      print() {
        window.print()
      },
      edit(item) {
        this.$router.push({
          name: 'device',
          params: {
            id: item.id
          }
        })
      },
      add() {
        this.$router.push('Newdevice')
      },
      remove(item) {
        const rootComponent = this.appUtil.getRootComponent(this)
        if (rootComponent) {
          rootComponent.openDialog('Do you want to delete this item?', '', () => {
            this.api.deleteData('userzone/' + item.id.toString()).then((res) => {
              this.getdevices()
            }, (err) => {
              console.log(err)
            })
          })
        }
      },
      changeStatus(item) {
        item.isActive = !item.isActive
        this.api.putData('userzone/' + item.id.toString(), item).then((res) => { }, (err) => {
          console.log(err)
        })
      },
      searchUsers() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.buildSearchFilters(this.searchVm)
        let query = this.appUtil.buildJsonServerQuery(this.searchVm)
        this.api.getData('userzone?' + query).then((res) => {
          this.items = res.data
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      getdevices() {
        this.api.getData('userzone').then((res) => {
          this.items = res.data
          this.items.forEach(item => {
            item.amount = item.quantity * item.price
          })
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
    // watch: {
    //   items () {
    //     this.pages()
    //   }
    // },
    mounted: function () {
      // this.$nextTick(() => {
      this.getdevices()
      // })
    }
  }
</script>