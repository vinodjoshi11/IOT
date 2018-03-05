<template>
  <v-container fluid> 
    <v-flex xs12>
      <v-card>
       <v-card-text>
        <v-card-title>
          Devices Categories
          <v-spacer></v-spacer> 
           <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchVm.contains.deviceType" v-on:keyup="searchUsers"></v-text-field> 
          &nbsp;
          <!--<v-btn fab small dark class="purple" @click.native="add">
            <v-icon>add</v-icon>
          </v-btn>-->
        </v-card-title>
      </v-card-text>  
        <v-data-table v-bind:headers="headers" v-bind:items="items" :search="search" v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props" class="body-2">
            <td class="body-2">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.deviceType}}</td>
            <td class="text-xs-right">{{ props.item.deviceName}}</td>
            <td class="text-xs-right">sn{{ props.item.serialno }}</td>
            <td class="text-xs-right">{{ props.item.Zonearea }}</td>

           <td class="text-xs-right" >
               <v-btn fab small dark class="teal" @click.native="edit(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <!--<v-btn fab small class="cyan"  @click.native="remove(props.item)">
                <v-icon style="color:#fff;">delete</v-icon>
              </v-btn>--> 
             </td>
           <!--<td class="text-xs-right" v-if="props.item.isprimary===false">  
              <v-icon   class="light">block</v-icon>
               <v-btn fab small class="cyan" @click.native="remove(props.item)">
                <v-icon style="color:#fff;">delete</v-icon>
              </v-btn> 
            </td>-->
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :value="pages" :length="pages" :total-visible="8" circle></v-pagination>
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
          text: 'Account Id',
          align: 'left',
          value: 'Device Id'
        },
        {
          text: 'Device Type',
          value: ''
        },
        {
          text: 'Device Name',
          value: 'unitPrice'
        },
        {
          text: 'Serialno',
          value: 'unitInStock'
        },
        {
          text: 'Zone Area',
          value: 'unitInStock'
        },
        {
          text: ' ',
          value: ' '
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
      edit(item) {
        this.$router.push({
          name: 'Device',
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
            this.api.deleteData('devices/' + item.id.toString()).then((res) => {
              this.getdevices()
            }, (err) => {
              console.log(err)
            })
          })
        }
      },
      changeStatus(item) {
        item.isActive = !item.isActive
        this.api.putData('devices/' + item.id.toString(), item).then((res) => { }, (err) => {
          console.log(err)
        })
      },
      searchUsers() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.buildSearchFilters(this.searchVm)
        let query = this.appUtil.buildJsonServerQuery(this.searchVm)
        this.api.getData('devices?' + query).then((res) => {
          this.items = res.data
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      getdevices() {
        this.api.getData('devices').then((res) => {
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