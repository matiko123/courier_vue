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
                  <li class="breadcrumb-item"><a href="javascript:;">Operation </a></li>
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
              <div class="d-flex justify-content-end align-items-center">
 

                <multiselect
  v-model="selectedVehicle"
  :options="vehicles"
  :searchable="true"
  :placeholder="'Select a vehicle'"
  label="customLabel"
  track-by="id"
  class="form-control w-25 mx-2"
  @select="onVehicleSelect"
></multiselect>


  <input type="date" class="form-control w-25" v-model="searchDate" @change="fetchDispatch">
</div>
          <div v-if="loading_dispatch" >
                <span class="text-danger text-lg"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait ...</span>
              </div>
            </div>
          
            <v-client-table :data="dispatch" :columns="columns">
              <template #action="{ row }">
               <a :href="`https://abcourier.co.tz/admin-api/api/v1/single-dispatch-pdf?parcel_dispatch_id=${row.parcel_dispatch_id}`" 
                 
                   class="btn btn-secondary btn-sm p-1 me-2" 
                   :class="{ disabled: loading_dispatch }" 
                   target="_blank">Print</a>

                   
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
  //  baseURL: 'http://127.0.0.1:8000/api/v1/',
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
      vehicles:[],
      vehicle:'',
      loading_dispatch: false,
      searchDate: new Date().toISOString().split('T')[0], // Default to today's date
      selectedVehicle:null,
      courier_Vehicle_id:null,
    };
  },

  computed: {
    columns() {
      return [
        'Sn',
        'tracking_number',
        'created_by',
        'vehicle',
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
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast(`Error fetching Dispatch Data: ${error.message}`);
        })
        .finally(() => {
          this.loading_dispatch = false;
        });
    },

   fetchVehicles() {
  this.loading_dispatch = true;
  axiosInstance
    .get(`/vehicles?departure_date=${this.searchDate}`)
    .then((response) => {
      this.vehicles = (response.data.data || []).map(v => ({
        ...v,
        customLabel: `${v.vehicle} - ${v.departure_time}`
      }));
    })
    .catch((error) => {
      this.$refs.toastNotification.showErrorToast(`Error fetching Vehicles Data: ${error.message}`);
      this.vehicles = [];
    })
    .finally(() => {
      this.loading_dispatch = false;
    });
},



    onVehicleSelect(selectedVehicle){
      this.vehicle=selectedVehicle.id;
      this.fetchDispatch();
    },

  },

  watch: {
    searchDate() {
      this.fetchVehicles();
    },
  },

  created() {
    const today = new Date();
    today.setDate(today.getDate() -0);
    this.searchDate = today.toISOString().split('T')[0];
  },

  mounted() {
    this.fetchDispatch();
    this.fetchVehicles();
  },
};
</script>
