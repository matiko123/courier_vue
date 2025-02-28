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
                  <li class="breadcrumb-item active" aria-current="page"><span>Offloads</span></li>
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
            <div class="d-flex justify-content-end align-items-center">
 

 <multiselect
v-model="selectedVehicle"
:options="vehicles"
:searchable="true"
:placeholder="'Select a vehicle'"
label="customLabel"
track-by="courier_vehicle_id"
class="form-control w-25 mx-2"
@select="onVehicleSelect"
></multiselect>


<input type="date" class="form-control w-25" v-model="searchDate" @change="fetchVehicles">
</div>
            <div v-if="loading_spinner" >
                <span class="text-danger text-lg"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait ...</span>
              </div>
            <v-client-table :data="offloads" :columns="columns">
              <template #action="{ row }">
                <a :href="`https://abcourier.co.tz/admin-api/api/v1/offloads-pdf?offload_id=${row.offload_id}`" 
                  class="btn btn-secondary btn-sm p-1 me-2" 
                  :class="{ disabled: loading_offloads }" 
                  target="_blank">Print</a>
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
  //  baseURL: 'http://127.0.0.1:8000/api/v1/',
   baseURL: 'https://abcourier.co.tz/admin-api/api/v1/',
  headers: { Authorization: `Bearer ${token}` },
});

export default {
  components: {
    Multiselect,
    ToastNotification,
  },
  data() {
    return {
      offloads: [],
      vehicles:[],
      loading_spinner: false,
      selectedVehicle:null,
      searchDate: new Date().toISOString().split('T')[0], 
      vehicle:'',
    };
  },

  computed: {
    columns() {
      return [
        'Sn',
        'tracking_number',
        'offloaded_by',
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
    onVehicleSelect(selectedVehicle){
      this.vehicle=selectedVehicle.courier_vehicle_id;
      this.fetchOffloads();
    },

    fetchOffloads() {
      this.loading_spinner = true;
      axiosInstance
      .get(`/offloads?date=${this.searchDate} &vehicle_id=${this.vehicle}`)
        .then((response) => {
          this.offloads = response.data.data
          .filter(item => item.total_quantity > 0)
          .map((item, index) => ({
            ...item,
            Sn: index + 1,
            total_parcel_value: item.total_parcel_value.toLocaleString(),
            date_time_key:  `${item.date} ${item.time}`,
          })) || [];
          // console.log('Fetched Data in the offload:', this.offloads);
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast(`Error fetching Offloads Data: ${error.message}`);
        })
        .finally(() => {
          this.loading_spinner = false;
        });
    },

    fetchVehicles() {
  axiosInstance
    .get(`/offload-vehicles?offload_date=${this.searchDate}`)
    .then((response) => {
      this.vehicles = (response.data.data || []).map(v => ({
        ...v,
        customLabel: `${v.vehicle} - ${v.time}`
      }));
    })
    .catch((error) => {
      this.$refs.toastNotification.showErrorToast(`Error fetching Vehicles Data: ${error.message}`);
      this.vehicles = [];
    })
    .finally(() => {

    });
},
  },

  mounted() {
    this.fetchOffloads();
  },
};
</script>
