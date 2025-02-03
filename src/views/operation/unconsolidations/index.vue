<template>
    <div class="layout-px-spacing">
      <div class="row layout-top-spacing">
        <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
          <!-- breadcrumb -->
          <ul class="navbar-nav breadcrumb-1">
            <li>
              <div class="page-header d-flex">
                <nav class="breadcrumb-one ms-auto" aria-label="breadcrumb">
                  <ol class="breadcrumb pt-2 ml-3">
                    <li class="breadcrumb-item"><a href="javascript:;">Operation</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>Consolidations</span></li>
                  </ol>
                </nav>
              </div>
            </li>
          </ul>
          <!-- end of breadcrumb -->
        </div>
      </div>
      <div class="panel">
        <div class="col-xl-12 mb-3">
          <div class="custom-table">
            <div class="invoice-inbox p-4">
              <div class="text-center">
                <input type="date" class="form-control w-25 ms-auto" v-model="searchDate" @change="fetchConsolidations">
                <div v-if="loading_consolidations" >
                  <span class="text-danger text-lg"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait ...</span>
                </div>
              </div>
            
              <v-client-table :data="consolidations" :columns="columns">
               
              </v-client-table>
            </div>
          </div>
        </div>
      </div>
      <ToastNotification ref="toastNotification" />
    </div>
  </template>
  
<script>
import axios from 'axios';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import ToastNotification from '@/components/ToastNotification.vue';

const token = localStorage.getItem('token');
const axiosInstance = axios.create({
    baseURL: 'https://abcourier.co.tz/admin-api/api/v1/parcels/',
    headers: { Authorization: `Bearer ${token}` },
});

export default {
    components: {
        Multiselect,
        ToastNotification,
    },
    data() {
        return {
            consolidations: [],
            loading_consolidations: false,
            searchDate: new Date().toISOString().split('T')[0], // Default to today's date
        };
    },

    computed: {
        columns() {
            return [
                'Sn',
                'tracking_number',
                'parcel_type',
                'rate',
                'total_amount',
                'origin_office',
                'destination_office',
            ];
        },
    },

    methods: {
        fetchConsolidations() {
            this.loading_consolidations = true;
            axiosInstance
                .get(`consolidations/index`)
                .then((response) => {
                    this.consolidations = response.data.data.map((item, index) => ({
                        ...item,
                        Sn: index + 1,
                    })) || [];
                    // console.log('Fetched Data in the consolidations:', this.consolidations);
                })
                .catch((error) => {
                    this.$refs.toastNotification.showErrorToast(`Error fetching Consolidations Data: ${error.message}`);
                })
                .finally(() => {
                    this.loading_consolidations = false;
                });
        },
    },

    // watch: {
    //     searchDate() {
    //         this.fetchConsolidations();
    //     },
    // },

    // created() {
    //     const today = new Date();
    //     today.setDate(today.getDate() - 0);
    //     this.searchDate = today.toISOString().split('T')[0];
    // },

    mounted() {
        this.fetchConsolidations();
    },
};
</script> 
