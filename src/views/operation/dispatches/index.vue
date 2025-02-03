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
                  <li class="breadcrumb-item active" aria-current="page"><span>Dispatch</span></li>
                  <li class="breadcrumb-item active" aria-current="page"><span>Report</span></li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
        <!-- end of breadcrumb -->
        <div class="panel br-6">
          <div class="custom-table m-3 p-4">
            <form>
              <div class="row">
                <div class="col-md-3">
                  <div class="input-group mb-2">
                    <multiselect v-model="selectedBranch" :options="branches" :searchable="true" placeholder="Select branch" :custom-label="customLabel" @change="fetchOffices" />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="input-group mb-2">
                    <multiselect v-model="selectedOffice" :options="offices" :searchable="true" placeholder="Select Destination office" :custom-label="customLabel" />
                  </div>
                </div>
                <div class="col-md-3">
                  <input type="date" class="form-control mb-2" id="startDate" v-model="startDate" placeholder="Start Date" />
                </div>
                <div class="col-md-3">
                  <div class="input-group mb-2">
                    <input type="date" class="form-control" id="endDate" v-model="endDate" placeholder="End Date" />
                  </div>
                </div>

                <div class="col-md-3 mt-1">
                  <button class="btn btn-danger me-2" @click.prevent="resetSelection">Reset</button>
                  <button class="btn btn-primary me-2" @click.prevent="fetchData" :disabled="loading_dispatch">
                    <span v-if="loading_dispatch" role="status" aria-hidden="true">
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
                    <span v-if="!loading_dispatch">Search</span>
                  </button>
                  <button class="btn btn-secondary" @click.prevent="printData" :disabled="print_dispatch">
                    <span v-if="print_dispatch" role="status" aria-hidden="true">
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
                    <span v-if="!print_dispatch">Print</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataFetched" class="panel">
      <div class="col-xl-12 mb-3">
        <div class="custom-table">
          <div class="invoice-inbox p-4">
            <v-client-table :data="items" :columns="columns">
              <template #sn="props">
                <span class="data-id centered">{{ getSerialNumber(props.index) }}</span>
              </template>
              <template #tracking_number="props">
                <span class="inv-number centered">#{{ props.row.tracking_number }}</span>
              </template>
              <template #vehicle="props">
                <div class="d-flex">
                  <p class="align-self-center centered mb-0 admin-name">{{ props.row.vehicle }}</p>
                </div>
              </template>
              <template #departure_date="props">
                <div class="d-flex">
                  <p class="align-self-center centered mb-0 admin-name">{{ props.row.departure_date }}</p>
                </div>
              </template>
              <template #total_parcel_dispatches="props">
                <div class="d-flex">
                  <p class="align-self-center centered mb-0 admin-name">{{ props.row.total_parcel_dispatches }}</p>
                </div>
              </template>
              <template #date="props">
                <div class="d-flex">
                  <p class="align-self-center centered mb-0 admin-name">{{ props.row.date }}</p>
                </div>
              </template>
              <template #time="props">
                <div class="d-flex">
                  <p class="align-self-center centered mb-0 admin-name">{{ props.row.time }}</p>
                </div>
              </template>
              <template #custodian="props">
                <div class="d-flex">
                  <p class="align-self-center centered mb-0 admin-name">{{ props.row.custodian }}</p>
                </div>
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
import { onMounted, ref, reactive, watch } from 'vue';
import axios from 'axios';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import ToastNotification from '@/components/ToastNotification.vue';

const token = localStorage.getItem('token');
console.log(token);
const axiosInstance = axios.create({
  baseURL: 'https://abcourier.co.tz/admin-api/api/v1/',
  // headers: {
  //   Authorization: `Bearer ${token}`,
  //   'Content-Type': 'application/json',
  // },
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
      startDate: '',
      endDate: '',
      items: [],
      loading_dispatch: false,
      print_dispatch: false,
      dataFetched: false,
    };
  },
  watch: {
    selectedBranch(value) {
      if (value) {
        this.fetchOffices(value.id);
      }
    },
  },
  mounted() {
    this.fetchBranches();
  },
  methods: {
    customLabel(option) {
      return option.name;
    },
    getSerialNumber(index) {
      return index + 0;
    },
    formatDate(dateString) {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
    },
    fetchBranches() {
      axiosInstance
        .get('/masters/list-branches')
        .then((response) => {
          this.branches = response.data.data;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching branches:', error);
        });
    },
    fetchOffices(branchId) {
      axiosInstance
        .get(`/masters/list-offices?branch_id=${branchId}`)
        .then((response) => {
          this.offices = response.data.data;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching offices:', error);
        });
    },
    resetSelection() {
      this.selectedBranch = null;
      this.selectedOffice = null;
      this.startDate = '';
      this.endDate = '';
      this.items = [];
      this.dataFetched = false;
    },
    async fetchData() {
      try {
        this.loading_dispatch = true;
        this.dataFetched = false;

        const params = {
          start_date: this.startDate,
          end_date: this.endDate,
          office_id: this.selectedOffice ? this.selectedOffice.id : 'ALL',
          branch_id: this.selectedBranch ? this.selectedBranch.id : 'ALL',
        };
        //const token = '16c78879-12d5-43e6-9b06-1a16376c8900';
        // const scope_token = localStorage.getItem('token');
        // console.log(scope_token);
        // if (!scope_token) {
        //   throw new Error('No scope token found in local storage.');
        // }

        // console.log('This is the returned token:', scope_token);

        const response = await axiosInstance.get('/parcels/dispatches/index', {
          params,
          // headers: {
          //   Authorization: `Bearer ${scope_token}`,
          // },
        });

        if (response.data && response.data.data) {
          this.items = response.data.data;
          this.dataFetched = true;
          this.$refs.toastNotification.showSuccessToast('Successfully fetched data.');
        } else {
          throw new Error('Invalid response data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        this.$refs.toastNotification.showErrorToast('Error fetching data: ' + error.message);
      } finally {
        this.loading_dispatch = false;
      }
    },

    async printData() {
      try {
        this.print_dispatch = true;

        const params = new URLSearchParams({
          start_date: this.startDate,
          end_date: this.endDate,
          office_id: this.selectedOffice ? this.selectedOffice.id : 'ALL',
          branch_id: this.selectedBranch ? this.selectedBranch.id : 'ALL',
        }).toString();

        const url = `https://abcourier.co.tz/admin-api/api/v1/reports/dispatch-pdf?${params}`;

        window.open(url, '_blank');
      } catch (error) {
        this.$refs.toastNotification.showSuccessToast('Error printing data:', error);
      } finally {
        this.print_dispatch = false;
      }
    },
  },
  computed: {
    columns() {
      return ['sn', 'tracking_number', 'vehicle', 'departure_date', 'total_parcel_dispatches', 'date', 'time', 'custodian'];
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
  