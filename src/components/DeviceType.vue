<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          Devices Type
          <v-spacer></v-spacer> <v-spacer></v-spacer>
           <v-text-field append-icon="search" label="Search" single-line hide-details v-model="searchVm.contains.deviceName" v-on:keyup="searchUsers"></v-text-field> 
          &nbsp;
          <!--<v-btn fab small class="grey" @click.native="print()">
            <v-icon>print</v-icon>
          </v-btn>--> 
        </v-card-title>
        <v-data-table v-bind:headers="headers" v-bind:items="items" v-bind:search="search" v-bind:pagination.sync="pagination" hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props" class="body-2"> 
            <td class="body-2">{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.deviceName}}</td>
            <td class="text-xs-right">{{ props.item.Description}}</td>
            <!--<td class="text-xs-right">
              <v-btn fab small dark class="teal" @click.native="edit(props.item)">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn fab small class="cyan" @click.native="remove(props.item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </td>-->
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
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
        pagination: {},
        headers: [
          {
            text: 'Categorys Id',
            align: 'left',
            sortable: false,
            value: 'catid'
          },
          { text: 'Device Name', value: 'Device Name' },
          { text: 'Description', value: 'Description' }
        ],
        items: [],
        searchVm: {
          contains: {
            product: ''
          },
          between: {
            price: { former: 0, latter: 0 }
          }
        }
      }
    },
    methods: {
      print() {
        window.print()
      },
      remove(item) {
        const rootComponent = this.appUtil.getRootComponent(this)
        if (rootComponent) {
          rootComponent.openDialog('Do you want to delete this item?', '', () => {
            this.api.deleteData('deviceCategorys/' + item.id.toString()).then((res) => {
              this.getdeviceCategorys()
            }, (err) => {
              console.log(err)
            })
          })
        }
      },
      searchUsers() {
        this.rightDrawer = !this.rightDrawer
        this.appUtil.buildSearchFilters(this.searchVm)
        let query = this.appUtil.buildJsonServerQuery(this.searchVm)
        this.api.getData('deviceCategorys?' + query).then((res) => {
          this.items = res.data
          this.pagination.totalItems = this.items.length
        }, (err) => {
          console.log(err)
        })
      },
      changeStatus(item) {
        item.isActive = !item.isActive
        this.api.putData('deviceCategorys/' + item.id.toString(), item).then((res) => {
        }, (err) => {
          console.log(err)
        })
      },
      getdeviceCategorys() {
        this.api.getData('deviceCategorys?_expand=user').then((res) => {
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
      // this.$nextTick(() => {
      this.getdeviceCategorys()
      // })
    }
  }
</script>