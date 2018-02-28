<template>
    <v-container grid-list-md id="Account">
        <v-layout row class="mx-2">
            <v-flex md3 sm6 xs12>
                <v-card class="cyan darken-3" light>
                    <v-container fluid grid-list-sm>
                        <v-layout row class="mt-2 mb-0" >
                            <v-flex xs4>
                                <v-icon class="mx-4 whitefont" x-large light>card_membership</v-icon>
                            </v-flex>
                            <v-flex xs8>
                                <div>
                                    <div class="subheading whitefont">New Users</div>
                                    <strong class="whitefont">120</strong>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row class="my-0">
                            <v-flex xs12 class="text-xs-right">
                                <v-btn flat class="grey--text whitefont darken-1">More info</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
             
            <v-flex md3 sm6 xs12>
                <v-card class="blue-grey darken-1" light>  
                    <v-container fluid grid-list-sm >
                            <v-layout row class="mt-2 mb-0" >
                                <v-flex xs4>
                                    <v-icon class="mx-4 whitefont" x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex xs8>
                                    <div>
                                        <div class="subheading whitefont">Unique Visitors</div>
                                        <strong class="whitefont">78</strong>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout row class="my-0">
                                <v-flex xs12 class="text-xs-right">
                                    <v-btn flat class="grey--text whitefont darken-1">More info</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="success  lighten-4" light>
                        <v-container fluid grid-list-sm >
                                <v-layout row class="mt-2 mb-0" >
                                <v-flex xs4>
                                    <v-icon class="mx-4 whitefont" x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex xs8>
                                    <div>
                                        <div class="subheading whitefont">Old Users</div>
                                        <strong class="whitefont">53%</strong>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout row class="my-0">
                                <v-flex xs12 class="text-xs-right">
                                    <v-btn flat class="grey--text whitefont darken-1">More info</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-card>
            </v-flex>
            <v-flex md3 sm6 xs12>
                <v-card class="blue-grey darken-1" light>  
                        <v-container fluid grid-list-sm >
                                <v-layout row class="mt-2 mb-0" >
                                <v-flex xs4>
                                    <v-icon class="mx-4 whitefont" x-large light>card_membership</v-icon>
                                </v-flex>
                                <v-flex xs8>
                                    <div>
                                        <div class="subheadingfont whitefont">Total Admin</div>
                                        <strong class="whitefont">53%</strong>
                                    </div>
                                </v-flex>
                            </v-layout>
                            <v-layout row class="my-0">
                                <v-flex xs12 class="text-xs-right">
                                    <v-btn flat class="grey--text whitefont darken-1">More info</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-card>
            </v-flex>
            </v-layout>
 
    </v-container>
</template>
<script>
    
    export default {
        name: 'Account',
        components: {

        },
        mounted() { }
    }
</script>
<style>
    #Account .flex {
        margin-bottom: 16px
    } 

</style>