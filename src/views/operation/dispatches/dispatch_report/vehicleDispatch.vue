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
                  <li class="breadcrumb-item">Operation</li>
                  <li class="breadcrumb-item " aria-current="page"><router-link to="/operation/manifest"><span>Manifest</span></router-link></li>
                  <li class="breadcrumb-item active" aria-current="page"><router-link to="/operation/dispatches/"><span>Dispatches</span></router-link></li>
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
<table class="table-bordered " style="font-size: 1.2em;">
    <tr>
        <td >Vehicle :</td>
        <td >&nbsp; {{ vehicle }} &nbsp;</td>
    </tr>
    <tr>
        <td>Date :</td>
        <td>&nbsp;{{ searchDate }} &nbsp;</td>
    </tr>
</table>



            <div class="text-center">
        
          <div v-if="loading_dispatch" >
                <span class="text-danger text-lg"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait ...</span>
              </div>
            </div>
          
            <v-client-table :data="dispatch" :columns="columns">
              <template #action="{ row }">
               <a :href="`https://abcourier.co.tz/admin-api/api/v1/single-dispatch-pdf?parcel_dispatch_id=${row.parcel_dispatch_id}`" 
                 
                   class="btn btn-secondary btn-sm p-1 me-2" 
                   :class="{ disabled: loading_dispatch }" 
                   @click="loading_dispatch = true">Print</a>

                   
                   <!-- <router-link :to="'vehicle-dispatch/' + row.courier_vehicle_id + '/' + row.departure_date" class="btn btn-success btn-sm p-1 me-2">
                     View
                   </router-link> -->

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
      dispatch: [],
      vehicle:'',
      loading_dispatch: false,
      searchDate: 'no date',
    };
  },

  computed: {
    columns() {
      return [
        'Sn',
        'tracking_number',
        'created_by',
        'source',
        'destination',
        'total_quantity',
        'total_parcel_value',
        'date_time_key',
        'action',
      ];
    },
  },

  methods: {
    fetchDispatch() {
      this.loading_dispatch = true;
      axiosInstance
        .get(`/dispatch?date=${this.searchDate} &vehicle_id=${this.vehicle}`)
        .then((response) => {
          this.dispatch = response.data.data
            .filter(item => item.total_quantity > 0)
            .map((item, index) => ({
              ...item,
              Sn: index + 1,
              total_parcel_value: item.total_parcel_value.toLocaleString(),
            })) || [];

        if (response.data.data.length > 0 && response.data.data[0].courier_vehicle) {
        this.vehicle = response.data.data[0].courier_vehicle;
      }

        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast(`Error fetching Dispatch Data: ${error.message}`);
        })
        .finally(() => {
          this.loading_dispatch = false;
        });
    },
   
  },



  mounted() {
  this.vehicle = this.$route.params.vehicleId;  
  this.searchDate = this.$route.params.date;  
  this.fetchDispatch(); // Call after setting params
}

};
</script>
