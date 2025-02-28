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
              <input type="date" class="form-control w-25 ms-auto" v-model="searchDate" @change="fetchDispatch">
              <div v-if="loading_dispatch" >
                <span class="text-danger text-lg"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Please wait ...</span>
              </div>
            </div>
          
            <v-client-table :data="dispatch" :columns="columns">
              <template #action="{ row }">
                <a :href="`https://abcourier.co.tz/admin-api/api/v1/reports/manifest-pdf?courier_vehicle_id=${row.courier_vehicle_id}`" 
                   class="btn btn-secondary btn-sm p-1 me-2" 
                   :class="{ disabled: loading_dispatch }" 
                   @click="loading_dispatch = true">Print</a>

                   
                   <router-link :to="'vehicle-dispatch/' + row.courier_vehicle_id + '/' + row.departure_date" class="btn btn-success btn-sm p-1 me-2">
                     Dispatches
                   </router-link>

                   <router-link :to="'vehicle-dispatch-parcels/' + row.courier_vehicle_id" class="btn btn-info btn-sm p-1 me-2">
                     Parcels
                   </router-link>

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
      loading_dispatch: false,
      searchDate: new Date().toISOString().split('T')[0], // Default to today's date
    };
  },

  computed: {
    columns() {
      return [
        'Sn',
        'courier_vehicle',
        'route',
        'total_quantity',
        'parcel_value',
        'datetime_key',
        'action',
      ];
    },
  },

  methods: {
    fetchDispatch() {
      this.loading_dispatch = true;
      axiosInstance
        .get(`reports/manifest-preview?date=${this.searchDate}${this.routeId ? `&route_id=${this.routeId}` : ''}`)
        .then((response) => {
          this.dispatch = response.data.data
            .filter(item => item.total_quantity > 0)
            .map((item, index) => ({
              ...item,
              Sn: index + 1,
              parcel_value: item.parcel_value.toLocaleString(),
            })) || [];
          // console.log('Fetched Data in the offload:', this.dispatch);
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast(`Error fetching Dispatch Data: ${error.message}`);
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
    this.fetchDispatch();
  },
};
</script>
