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
                    <li class="breadcrumb-item active" aria-current="page"><span>Sales summary</span></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>Report</span></li>
                  </ol>
                </nav>
              </div>
            </li>
          </ul>
          <!-- end of breadcrumb -->
          <div class="panel br-6">
            <div class="row">
              <div class="col-xl-12">
                <div class="invoice-container">
                  <div class="invoice-inbox p-4">
                    <form>
                      <div class="row">
                        <!-- Branch selection -->
                        <div class="d-none col-md-3">
                          <div class="col-auto">
                            <div class="input-group mb-2">
                              <multiselect v-model="selectedBranch" :options="branches" :searchable="true" placeholder="Select Branch" :custom-label="customLabel" @change="fetchOffices"></multiselect>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Date selection -->
                        <div class="col-xl-2 col-md-3 col-sm-6">
                          <div class="col-auto">
                            <input type="date" class="form-control mb-2" id="startDate" v-model="startDate" placeholder="Start Date" />
                          </div>
                        </div>
  
                        <div class="col-xl-2 col-md-3 col-sm-6">
                          <div class="col-auto">
                            <input type="date" class="form-control" required id="endDate" v-model="endDate" placeholder="End Date" />
                          </div>
                        </div>
  
                        <div class="col-xl-6 col-md-3 col-sm-6">
                          <div class="buttons p-2">
                            <button class="btn btn-danger me-2" @click.prevent="resetSelection">Reset</button>
                            <button class="btn btn-primary me-2 d-none" @click.prevent="fetchData" :disabled="loading">
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
                              <span v-if="!loading">Search</span>
                            </button>
                            <button class="btn btn-secondary" @click.prevent="printData">
                              <span v-if="loading_print" role="status" aria-hidden="true">
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
                              <span v-if="!loading_print">Print</span>
                            </button>
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
  
      <div v-if="dataFetched" class="panel br-6">
        <div class="col-xl-12 mb-3">
          <div class="custom-table">
            <div class="invoice-inbox p-4">
              <v-client-table :data="items" :columns="columns">
                <template #sn="props">
                  <span class="data-id centered">{{ getSerialNumber(props.index) }}</span>
                </template>
                <template #tracking_number="props">
                  <div class="d-flex">
                    <p class="align-self-center centered mb-0 admin-name">#{{ props.row.tracking_number }}</p>
                  </div>
                </template>
                <template #sender="props">
                  <div class="d-flex">
                    <p class="align-self-center centered mb-0 admin-name">{{ props.row.sender.name.toUpperCase() }}</p>
                  </div>
                </template>
                <template #parcel_type="props">
                  <div class="d-flex">
                    <p class="align-self-center centered mb-0 admin-name">{{ props.row.parcels[0].parcel_type.toUpperCase() }}</p>
                  </div>
                </template>
                <template #receiver="props">
                  <div class="d-flex">
                    <p class="align-self-center centered mb-0 admin-name">{{ props.row.parcels[0].receiver_detail.name.toUpperCase() }}</p>
                  </div>
                </template>
                <template #total_amount="props">
                  <div class="d-flex">
                    <p class="align-self-start mb-0 admin-name">
                      {{ formatNumber(props.row.parcels[0].total_amount) }}
                    </p>
                  </div>
                </template>
  
                <template #created_at="props">
                  <div class="d-flex">
                    <p class="align-self-center centered mb-0 admin-name">{{ formatDate(props.row.created_at) }}</p>
                  </div>
                </template>
              </v-client-table>
            </div>
          </div>
        </div>
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
    //baseURL: 'http://127.0.0.1:8000/api/v1/',
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
        selectedBranch: null,
        startDate: '',
        endDate: '',
        items: [],
        loading: false,
        loading_print: false,
        dataFetched: false,
      };
    },
    computed: {
      ...mapState(['token']),
      columns() {
        return ['sn', 'tracking_number', 'sender', 'parcel_type', 'receiver', 'total_amount', 'created_at'];
      },
    },
  
    mounted() {
      this.fetchBranches();
    },
    methods: {
      customLabel(option) {
        return option.name || option.label;
      },
  
      getSerialNumber(index) {
        return index + 0;
      },
  
      formatDate(dateString) {
        return format(new Date(dateString), 'HH:mm:ss');
      },
  
      formatNumber(amount) {
        if (amount === null || amount === undefined) return '0';
        return parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
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
  
  
      resetSelection() {
        this.selectedBranch = null;
        this.startDate = '';
        this.endDate = '';
        this.items = [];
        this.dataFetched = false;
      },
  
      async fetchData() {
        try {
          this.loading = true;
          this.dataFetched = false;
          const params = {
            start_date: this.startDate,
            end_date: this.endDate,
            branch_id: this.selectedBranch.id,
          };
  
          const response = await axiosInstance.get('collection/summary/generate', {
            params,
          });
  
          if (response.data && response.data.data && response.data.data.parcel_items) {
            this.items = response.data.data.parcel_items;
            this.dataFetched = true;
            this.$refs.toastNotification.showSuccessToast('Sales data fetched');
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
      async printData() {
        try {
          this.loading_print = true;
          const params = new URLSearchParams({
            start_date: this.startDate,
            end_date: this.endDate,
            
           
          }).toString();
  
          const url = `${axiosInstance.defaults.baseURL}collection/summary/generate?${params}`;
          if (url) {
            window.open(url, '_blank');
            this.$refs.toastNotification.showSuccessToast('Printing sales report.');
          }
        } catch (error) {
          console.error('Error printing sales report:', error);
          this.$refs.toastNotification.showErrorToast(`Error printing sales report: ${error.message}`);
        } finally {
          this.loading_print = false;
        }
      },
      initialize() {
        this.initializeToasts();
      },
    },
  
    computed: {
      columns() {
        return ['sn', 'tracking_number', 'sender', 'parcel_type', 'receiver', 'total_amount', 'created_at'];
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
  