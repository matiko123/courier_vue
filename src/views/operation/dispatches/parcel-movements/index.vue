<template>
  <div class="layout-px-spacing apps-invoice-list">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Operations</a></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Parcels List</span></li>
              </ol>
            </nav>
          </div>
        </li>
      </ul>
    </teleport>

    <div class="row layout-top-spacing">
      <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
        <div class="panel br-6">
          <div class="custom-table">
            <v-client-table :data="items" :columns="columns">
                <template #sn="props">
                <span class="data-id centered">{{ getSerialNumber(props.index) }}</span>
              </template>
              <template #beforeFilter>
                <form @submit.prevent="fetchData">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-auto">
                      <div class="input-group mb-2">
                        <multiselect v-model="selectedDispatchType" :options="dispatch_types" :searchable="true" placeholder="Select Dispatch Type" :custom-label="customLabel"></multiselect>
                      </div>
                    </div>
                    <div class="col-auto">
                      <button type="button" class="btn btn-danger me-2" @click="resetSelection">Reset</button>
                      <button type="submit" class="btn btn-primary me-2">Search</button>
                    </div>
                  </div>
                </form>
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
import ToastNotification from '@/components/ToastNotification.vue';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import axios from 'axios';
export default {
  components: {
    Multiselect,
    ToastNotification,
  },
  data() {
    return {
      selectedDispatchType: null,
      dispatch_types: [],
      items: [],
      loading: false,
      dataFetched: false,
    };
  },
  computed: {
    columns() {
      return ['sn', 'tracking_number', 'departure_date', 'total_parcel_dispatches', 'date', 'time'];
    },
  },
  mounted() {
    this.fetchDispatchType();
  },
  methods: {
    customLabel(option) {
      return option;
    },

    getSerialNumber(index) {
      return index + 0;
    },

    async fetchDispatchType() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/masters/type');
        this.dispatch_types = response.data.data;
      } catch (error) {
        console.error('Error fetching Dispatch Type:', error);
      }
    },

    resetSelection() {
      this.selectedDispatchType = null;
      this.items = [];
      this.dataFetched = false;
    },

    async fetchData() {
      try {
        this.loading = true;
        this.dataFetched = false;

        const params = {
            dispatch_type: this.selectedDispatchType || 'ALL',
        };

        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/parcels/dispatches/list', {
          params,
        });

        this.items = response.data.data;
        this.dataFetched = true;
        this.$refs.toastNotification.showSuccessToast('Dispatch data fetched');
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 403) {
          this.$refs.toastNotification.showErrorToast('Permission denied.');
        } else {
          this.$refs.toastNotification.showErrorToast('Error fetching data: ' + error.message);
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
  
  <style>
.table .text-right {
  text-align: right;
}
</style>
  