<template>
    <div class="layout-px-spacing">
      <div class="row layout-top-spacing">
        <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
          <!-- breadcrumb -->
          <ul class="navbar-nav breadcrumb-1">
            <li>
              <div class="page-header">
                <nav class="breadcrumb-one" aria-label="breadcrumb">
                  <ol class="breadcrumb pt-2 ml-3">
                    <li class="breadcrumb-item"><a href="javascript:;">Operation</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>shipments</span></li>
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
            <div class="invoice-inbox p-4 text-center">
                <input type="date" class="form-control w-25 ms-auto" v-model="searchDate" @change="fetchshipments">
              <div v-if="loading_shipments" >
                  <span class="text-danger text-lg"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait ...</span>
                </div>
              <v-client-table :data="shipments" :columns="columns">

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
   baseURL: 'http://127.0.0.1:8000/api/v1/',
   headers: { Authorization: `Bearer ${token}` },
 });
 
 export default {
   components: {
     Multiselect,
     ToastNotification,
   },
   data() {
     return {
       shipments: [],
       loading_shipments: false,
       searchDate: new Date().toISOString().split('T')[0], // Default to today's date
     };
   },
 
   computed: {
     columns() {
       return [
         'Sn',
         'receiver',
         'destination_office',
         'tracking_number',
         'parcel_type',
         'rate',
         'created_at',
         'status'
       ];
     },
   },
 
   methods: {
     fetchshipments() {
       this.loading_shipments = true;
       axiosInstance
         .get(`/shipment?date=${this.searchDate}`)
         .then((response) => {
           if (Array.isArray(response.data.shipments)) {
             this.shipments = response.data.shipments.map((item, index) => ({
               ...item,
               Sn: index + 1,
               rate: item.rate.toLocaleString(),
             }));
           } else {
             this.$refs.toastNotification.showErrorToast('Invalid response data format');
           }
         })
         .catch((error) => {
           this.$refs.toastNotification.showErrorToast(`Error fetching shipments Data: ${error.message}`);
         })
         .finally(() => {
           this.loading_shipments = false;
         });
     },
   },
 
   mounted() {
     this.fetchshipments();
   },
 };
</script>

  