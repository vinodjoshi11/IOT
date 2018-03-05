<template>
  <v-container fluid>
    <v-flex xs12>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-title>
          {{title}}
          <v-spacer></v-spacer>
          <!--<v-text-field append-icon="search" label="Search" single-line hide-details v-model="search"></v-text-field>-->
          <v-btn fab small class="grey whitefont" @click.native="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          &nbsp;
          <v-btn fab small class="purple whitefont" @click.native="save()">
            <v-icon>save</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout row wrap class="px-10">
              <v-flex md4 xs12>
                <v-text-field name="AccountId" label="Account Id" hint="Account Id is required" value="Input text" v-model="device.id"
                  class="input-group--focused" required></v-text-field>
              </v-flex> 
              <v-flex md4 xs12>
                <v-text-field name="deviceType" label="Device Type" hint="device Type is required" value="Input text" v-model="device.deviceType"
                  class="input-group--focused" required></v-text-field>
              </v-flex>

              <v-flex md4 xs12>
                <v-text-field name="deviceName" label="device" hint="device name is required" value="Input text" v-model="device.deviceName"
                  class="input-group--focused" required></v-text-field>
              </v-flex>
              <v-flex md4 xs12>
                <v-text-field name="Serialno" label="Serial no" v-model="device.serialno" class="input-group--focused"
                  required></v-text-field>
              </v-flex> 
              <v-flex md4 xs12>
                <v-text-field name="Zonearea" label="Zone Area" v-model="device.Zonearea" class="input-group--focused"
                  required></v-text-field>
              </v-flex>
              <!--<v-flex md4 xs12>
                <v-select required v-bind:items="categoryList" label="Category" v-model="device.categoryId"></v-select>
              </v-flex>-->
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
        device: {
          categoryId: 0,
          category: { categoryName: '' }
        },
        categorys: [],
        categoryList: []
      }
    },
    computed: {
      newdevice: function () {
        return 'New Device'
      }
    },
    methods: {
      save: function () {
        let device = this.device
        delete this.device.category

        if (!device.id) {
          this.api.postData('devices', device).then((res) => {
            this.$router.push({ name: 'Devices' })
          }, (err) => {
            console.log(err)
          })
        } else {
          this.api.putData('devices/' + device.id.toString(), device).then((res) => {
            this.$router.push({ name: 'Devices' })
          }, (err) => {
            console.log(err)
          })
        }
      },
      selectCategory(item) {
        this.device.categoryId = item.value
      },
      getById: function () {
        this.api.getData('devices/' + this.$route.params.id).then((res) => {
          this.device = res.data
          // this.device.category.categoryName = this.device.category.firstName + ' ' + this.device.category.lastName
        }, (err) => {
          console.log(err)
        })
      },
      getCategorys: function () {
        this.api.getData('categories').then((res) => {
          this.categorys = res.data
          this.categoryList = []
          this.categorys.forEach((c) => {
            let category = c
            category.text = c.categoryName
            category.value = c.id
            this.categoryList.push(category)
          })
        }, (err) => {
          console.log(err)
        })
      },
      cancel: function () {
        this.$router.push({ name: 'Devices' })
      }
    },
    mounted: function () {
      this.getCategorys()
      if (this.$route.params.id) {
        this.getById()
        this.title = 'Edit device'
      } else this.title = 'New device'
    }
  }
</script>
<style>
.whitefont{color:#fff;}
</style>
