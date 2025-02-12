<template>
    <div class="layout-px-spacing">
      <!-- Main form -->
      <div class="row invoice layout-top-spacing layout-spacing apps-invoice">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <!-- breadcrumb -->
          <ul class="navbar-nav breadcrumb-1">
            <li>
              <div class="page-header">
                <nav class="breadcrumb-one" aria-label="breadcrumb">
                  <ol class="breadcrumb pt-2 ml-3">
                    <li class="breadcrumb-item"><a href="javascript:;">Operation</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>Sales</span></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>Report</span></li>
                  </ol>
                </nav>
              </div>
            </li>
          </ul>
          <div class="panel br-6">
            <div class="row">
              <div class="col-xl-12">
                <div class="invoice-container">
                  <div class="invoice-inbox p-4">
                    <form>
                      <div class="row">
                        <div class="col-md-3">
                          <div class="col-auto">
                            <div class="input-group mb-2">
                              <multiselect v-model="selectedBranch" :options="branches" :searchable="true" placeholder="Select Branch" :custom-label="customLabel" @change="fetchOffices"></multiselect>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Office selection -->
                        <div class="col-xl-3 col-md-3 col-sm-6">
                          <div class="col-auto">
                            <div class="input-group mb-2">
                              <multiselect
                                v-model="selectedOffice"
                                :options="offices"
                                :searchable="true"
                                placeholder="Select Office"
                                :custom-label="customLabel"
                               
                              ></multiselect>
                            </div>
                          </div>
                        </div>
                      
                        <div class="col-xl-6 col-md-3 col-sm-6">
                          <div class="buttons p-2">
                            <button class="btn btn-danger me-2" @click.prevent="resetSelection">Reset</button>
                            <a  :href="`https://abcourier.co.tz/admin-api/api/v1/offloads-dispatch-pdf?office=${office}`"
                            class="btn btn-secondary me-2"  >
                              <span v-if="loading" role="status" aria-hidden="true">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  class="feather feather-loader spin me-2"
                                >
                                  <line x1="12" y1="2" x2="12" y2="6"></line>
                                  <line x1="12" y1="18" x2="12" y2="22"></line>
                                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                  <line x1="2" y1="12" x2="6" y2="12"></line>
                                  <line x1="18" y1="12" x2="22" y2="12"></line>
                                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                </svg>
                              </span>
                              <span v-if="!loading">Print</span>
                            </a>
                            
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  <div class="br-6  panel">
      <table class="table table-bordered">
  <thead>
    <tr>
      <th colspan="2" class="text-center">Dispatch Summary </th>
      <th colspan="2" class="text-center">Offload Summary</th>
    </tr>
    <tr>
      <th>Category</th>
      <th>Value</th>
      <th>Category</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Total Parcel Value</td>
      <td>{{ dispatchReport.total_parcel_value }}</td>
      <td>Total Parcel Value</td>
      <td>{{ offloadReport.total_parcel_value }}</td>
    </tr>
    <tr>
      <td>Total Parcels</td>
      <td>{{ dispatchReport.total_parcels }}</td>
      <td>Total Parcels</td>
      <td>{{ offloadReport.total_parcels }}</td>
    </tr>
    <tr>
      <td>Total Vehicles</td>
      <td>{{ dispatchReport.total_vehicles }}</td>
      <td>Total Vehicles</td>
      <td>{{ offloadReport.total_vehicles }}</td>
    </tr>
  </tbody>
</table>
</div>


      <ToastNotification ref="toastNotification" />
      <!-- Section for table template -->
    </div>
  </template>
  
  
  <script>
  import { ref, onMounted } from 'vue';
  import Multiselect from '@suadelabs/vue3-multiselect';
  import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
  import { format } from 'date-fns';
  import axios from 'axios';
  import ToastNotification from '@/components/ToastNotification';
  import { mapState } from 'vuex';
  
  const token = localStorage.getItem('token');
  const jwtToken = await localStorage.getItem('jwtToken');
  console.log('here', jwtToken);
  
  const axiosInstance = axios.create({
   baseURL: 'https://abcourier.co.tz/admin-api/api/v1/',
    // baseURL: 'http://127.0.0.1:8000/api/v1/',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Jwt-Token': jwtToken,
    },
  });
  
  export default {
    components: {
      Multiselect,
      ToastNotification,
    },
    data() {
      return {
        branches: [],
        offices: [],
        selectedBranch: null,
        selectedOffice: null,
        loading: false,
        dataFetched: false,
        dispatchReport:[],
        offloadReport:[],
        office:''
      };
    },
    computed: {
      ...mapState(['token']),
    },
  
    watch: {
      selectedBranch(value) {
        if (value) {
          console.log('Branch selected:', value);
          this.fetchOffices(value.id);
        }
      },
      selectedOffice(value) {
        if (value) {
          console.log('Office selected:', value);
          this.office=value.id;
          this.fetchDispatch();
          this.fetchOffload();
        }
      },
    },

  
    mounted() {
      this.fetchBranches();
      this.fetchOffices();
      this.fetchDispatch();
      this.fetchOffload();
    },
    methods: {
      customLabel(option) {
        return option.name || option.label;
      },


  
      fetchBranches() {
        axiosInstance
          .get('masters/list-branches')
          .then((response) => {
            this.branches = response.data.data;
          })
          .catch((error) => {
            console.error('Error fetching branches:', error);
          });
      },
  
      fetchOffices(branchId) {
        axiosInstance
          .get(`masters/list-offices?branch_id=${branchId}`)
          .then((response) => {
            this.offices = response.data.data;
            console.log('Offices fetched:', this.offices);
          })
          .catch((error) => {
            this.$refs.toastNotification.showErrorToast('Error fetching offices:', error);
          });
      },
      async fetchDispatch() {
        try {
          this.loading = true;
          const params = {
            office : this.office,
          };
  
          const response = await axiosInstance.get('dispatch-summary', {
            params,
          });
  
          if (response.data && response.data.data ) {
            this.dispatchReport = response.data.data;
            this.dispatchReport.total_parcel_value = this.dispatchReport.total_parcel_value.toLocaleString();
            this.dispatchReport.total_parcels = this.dispatchReport.total_parcels.toLocaleString();
            this.dispatchReport.total_vehicles = this.dispatchReport.total_vehicles.toLocaleString();
          } else {
            throw new Error('Unexpected response structure');
          }
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

      async fetchOffload() {
        try {
          this.loading = true;
          const params = {
            office : this.office,
          };
  
          const response = await axiosInstance.get('offload-summary', {
            params,
          });
  
          if (response.data && response.data.data ) {
            this.offloadReport = response.data.data;
            this.offloadReport.total_parcel_value = this.offloadReport.total_parcel_value.toLocaleString();
            this.offloadReport.total_parcels = this.offloadReport.total_parcels.toLocaleString();
            this.offloadReport.total_vehicles = this.offloadReport.total_vehicles.toLocaleString();
          console.log(this.offloadReport)
            this.dataFetched = true;
          } else {
            throw new Error('Unexpected response structure');
          }
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
     
  
     
  
      resetSelection() {
        this.selectedBranch = null;
        this.selectedOffice = null;
        this.dispatches = [];
        this.dataFetched = false;
        this.office='';
        this.fetchDispatch();
        this.fetchOffload();
      },
  
      
     
      initialize() {
        this.initializeToasts();
      },
    },
  
  };
  </script>
  
  <style>
  .invoice-inbox {
    margin: 0 auto;
    color: #001028;
    background: #ffffff;
    font-family: 'DejaVu Sans Mono';
    font-size: 14px;
  }
  
  .table_main {
    margin-top: 14px;
  }
  
  .table_main td {
    border-top: 0.1mm solid #000000;
    border-left: 0.1mm solid #000000;
    border-right: 0.1mm solid #000000;
    border-bottom: 0.1mm solid #000000;
    font-size: 12px;
  }
  
  th {
    background-color: #eaeaea;
    text-align: center;
    border: 0.1mm solid #000000;
    font-size: 14px;
  }
  
  .table_main td.blanktotal {
    background-color: #ffffff;
    border: 0mm none #000000;
    border-top: 0mm solid #000000;
    border-right: 0mm solid #000000;
  }
  
  .td .no-top {
    background-color: #ffffff;
    border: 0mm none #000000;
    border-top: 0mm solid #000000;
  }
  .centered {
    text-align: center;
  }
  
  .spinner-border {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .breadcrumb-1 {
    align-items: end;
    display: flex;
    justify-content: end;
    background: #fcfcfc;
  }
  </style>
  