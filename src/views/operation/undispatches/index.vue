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

              <div class="text-center row">
    <div class="col">
        <label for="startDate" class="form-label repos">Start Date</label>
        <input type="date" id="startDate" class="form-control w-50 ms-auto" v-model="startDate"  @change="fetchUnDispatch">
    </div>
    <div class="col">
        <label for="endDate" class="form-label repos" >End Date</label>
        <input type="date" id="endDate" class="form-control w-50 ms-auto" v-model="endDate" @change="fetchUnDispatch">
    </div>
    <div class="col">
        <label for="office" class="form-label repos">Select Branch</label>
        <select id="office" class="form-control w-50 ms-auto" v-model="office" @change="fetchUnDispatch">
            <option disabled value="">---</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                {{ branch.name }}
            </option>
        </select>
    </div>
    <div class="col">
        <a v-if="report" :href="`https://abcourier.co.tz/admin-api/api/v1/undispatched-PDF?office=${office}&start_date=${startDate}&end_date=${endDate}`" class="btn btn-success ms-auto">Print Report</a>
        <!-- <a v-if="report" :href="`http://127.0.0.1:8000/api/v1/undispatched-PDF?office=${office}&start_date=${startDate}&end_date=${endDate}`" class="btn btn-success ms-auto">Print Report</a>   -->
      </div>
    <div v-if="loading_dispatch">
        <span class="text-danger text-lg">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Please wait ...
        </span>
    </div>
</div>


              
              <v-client-table :data="undispatch" :columns="columns">

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
    // baseURL: 'https://abcourier.co.tz/admin-api/api/v1/',
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
        undispatch: [],
        branches:[],
        office:'',
        startDate:'',
        endDate:'',
        report:false,
        loading_dispatch: false,
        searchDate: new Date().toISOString().split('T')[0], // Default to today's date
      };
    },
  
    computed: {
      columns() {
        return [
          'Sn',
          'tracking_number',
          'quantity',
          'rate',
          'destination_office',
          'sales_date'
        ];
      },
    },
  
    methods: {
      fetchUnDispatch() {
  this.loading_dispatch = true;
  axiosInstance
    .get(`undispatched?office=${this.office}&&start_date=${this.startDate}&&end_date=${this.endDate}`)
    .then((response) => {
      this.undispatch = response.data.undispatched
        .map((item, index) => ({
          ...item,
          Sn: index + 1,
          rate:item.rate.toLocaleString(),
        })) || [];
      
      this.report = this.undispatch.length === 0 ? false : true;  // Set report to false if empty

      console.log('Fetched Undispatch data:', this.undispatch);
    })
    .catch((error) => {
      this.$refs.toastNotification.showErrorToast(`Error fetching Undispatch Data: ${error.message}`);
    })
    .finally(() => {
      this.loading_dispatch = false;
    });
},


      fetchBranches(){
        this.loading_dispatch = true;
        axiosInstance
          .get(`masters/offices`)
          .then((response) => {
            this.branches = response.data.data
              .map((item, index) => ({
                ...item,
                Sn: index + 1,
              })) || [];
            console.log('Fetched Branches data:', this.branches);
          })
          .catch((error) => {
            this.$refs.toastNotification.showErrorToast(`Error fetching branches: ${error.message}`);
          })
          .finally(() => {
            this.loading_dispatch = false;
          });
      }
    },
  
    watch: {
      searchUndispatch() {
        this.fetchUnDispatch();
      },
    },
  
  
    mounted() {
      this.fetchUnDispatch();
      this.fetchBranches();
    },
  };
  </script>

  <style scoped>
  .repos{
    margin-left:100px;
  }
  </style>
  