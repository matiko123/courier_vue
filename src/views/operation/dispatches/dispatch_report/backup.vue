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
                    <li class="breadcrumb-item active" aria-current="page"><span>Dispatches</span></li>
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
                <div v-if="loading_dispatch" >
                  <span class="text-danger text-lg"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait ...</span>
                </div >
              </div>
            <div class="d-flex me-4">
                <a v-if="report" :href="`https://abcourier.co.tz/admin-api/api/v1/reports/manifest-pdf?courier_vehicle_id=${ vehicle }`" class="btn btn-success ms-auto ">Print Report</a>
            </div>
              <v-client-table :data="dispatch" :columns="columns">
                <template #action="{ row }">
                  <a :href="`https://abcourier.co.tz/admin-api/api/v1/single-dispatch-pdf?pax_no=${row.pax_no}`" 
                     class="btn btn-secondary btn-sm p-1 me-2" 
                     :class="{ disabled: loading_dispatch }" 
                     @click="loading_dispatch = true">Print</a>
                </template>
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
    baseURL: 'https://abcourier.co.tz/admin-api/api/v1/',
    // baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: { Authorization: `Bearer ${token}` },
  });
  
  export default {
    components: {
      Multiselect,
      ToastNotification,
    },
    data() {
      return {
        vehicle:'',
        report:false,
        dispatch: [],
        loading_dispatch: false,
        searchDate: new Date().toISOString().split('T')[0], // Default to today's date
      };
    },
  
    computed: {
      columns() {
        return [
          'Sn',
          'pax_no',
          'receipt',
          'from',
          'destination',
          'consignor',
          'consignee',
          'quantity',
          'rate',
          'action'
        ];
      },
    },
  
    methods: {
      fetchDispatch() {
        this.loading_dispatch = true;
        axiosInstance
          .get(`vehicle-dispatch?courier_vehicle_id=${this.vehicle}` )
          .then((response) => {
            this.dispatch = response.data.data
              .map((item, index) => ({
                ...item,
                Sn: index + 1,
                rate: item.rate.toLocaleString(),
              })) || [];
            this.report = this.dispatch.length === 0 ? false : true; 
            console.log('Fetched Dispatch in the single vehicle:', this.dispatch);
            console.log(this.vehicle);
          })
          .catch((error) => {
            this.$refs.toastNotification.showErrorToast(`Error fetching Vehicle Dispatch Data: ${error.message}`);
          })
          .finally(() => {
            this.loading_dispatch = false;
          });
      },
    },
  
    watch: {
      searchDate() {
        this.fetchDispatch();
      },
    },
  
    created() {
      const today = new Date();
      today.setDate(today.getDate() -0);
      this.searchDate = today.toISOString().split('T')[0];
    },
  
    mounted() {
      this.vehicle = this.$route.params.vehicleId;  
      this.fetchDispatch();
    },
  };
  </script>
  
