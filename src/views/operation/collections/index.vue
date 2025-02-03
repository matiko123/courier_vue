<template>
  <div class="layout-px-spacing">
    <!-- Breadcrumb -->
    <div class="row invoice layout-top-spacing layout-spacing apps-invoice">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <ul class="navbar-nav breadcrumb-1">
          <li>
            <div class="page-header">
              <nav class="breadcrumb-one" aria-label="breadcrumb">
                <ol class="breadcrumb pt-2 ml-3">
                  <li class="breadcrumb-item"><a href="javascript:;">Operation</a></li>
                  <li class="breadcrumb-item active" aria-current="page"><span>Sales Collection</span></li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row layout-top-spacing">
      <div class="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
        <div class="panel br-6">
          <form class="d-flex justify-content-center mb-4">
            <div class="row justify-content-center">
              <div class="col-auto">
                <input type="date" class="form-control" v-model="startDate" placeholder="Start Date" required />
              </div>
              <div class="col-auto">
                <button class="btn btn-danger me-2" @click.prevent="resetSelection">Reset</button>
                <button class="btn btn-secondary" @click.prevent="fetchData">
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
                  <span v-if="!loading_print">Fetch</span>
                </button>
              </div>
            </div>
          </form>

          <div class="data-container px-4">
            <div class="row mb-2">
              <div class="col-md-2">
                <label class="form-label">Agent Name</label>
              </div>
              <div class="col-md-2">
                <label class="form-label">Total Parcels</label>
              </div>
              <div class="col-md-2">
                <label class="form-label">Actual Amount</label>
              </div>
              <div class="col-md-2">
                <label class="form-label">Received Amount</label>
              </div>
              <div class="col-md-2">
                <label class="form-label">Status</label>
              </div>
              <div class="col-md-2">
                <label class="form-label">Action</label>
              </div>
            </div>
            <!-- Data Rows -->
            <div v-for="(item, index) in items" :key="index" class="row mb-2 data-row">
              <div class="col-md-2">
                <input :value="item.agent_name" class="form-control" disabled />
              </div>
              <div class="col-md-2">
                <input :value="item.total_parcels_count" class="form-control" disabled />
              </div>
              <div class="col-md-2">
                <input :value="item.total_agent_sales" class="form-control" disabled />
              </div>
              <div class="col-md-2">
                <input :value="item.received_amount" class="form-control" />
              </div>
              <div class="col-md-2">
                <input :value="getStatus(item)" class="form-control" disabled />
              </div>
              <div class="col-md-2">
                <button class="btn btn-success btn-sm">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ToastNotification ref="toastNotification" />
  </div>
</template>
  
  <script>
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { format } from 'date-fns';
import axios from 'axios';
import ToastNotification from '@/components/ToastNotification';

export default {
  components: {
    Multiselect,
    ToastNotification,
  },
  data() {
    return {
      startDate: '',
      items: [],
      loading: false,
      loading_print: false,
      dataFetched: false,
      columns: ['agent_name', 'branch_name', 'office_name', 'agent_contacts', 'total_parcels_count', 'total_agent_sales'],
    };
  },
  created() {
    const token = localStorage.getItem('token');
    const jwtToken = localStorage.getItem('jwtToken');

    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api/v1/',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Jwt-Token': jwtToken,
      },
    });

    this.fetchBranches();
  },
  methods: {
    validateFields() {
      if (!this.startDate) {
        this.$refs.toastNotification.showErrorToast('Date field is required');
        return false;
      }
      return true;
    },
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
      this.axiosInstance
        .get('masters/list-branches')
        .then((response) => {
          this.branches = response.data.data;
        })
        .catch((error) => {
          console.error('Error fetching branches:', error);
        });
    },

    // status
    getStatus(item) {
      if (!item.received_amount || item.received_amount === 0) {
        return 'Pending';
      } else if (item.total_agent_sales === item.received_amount) {
        return 'Complete';
      } else {
        return 'Partial Payment';
      }
    },
    async fetchData() {
      if (!this.startDate) {
        this.$refs.toastNotification.showErrorToast('Start date is required!');
        return;
      }

      try {
        this.loading_print = true;
        const params = new URLSearchParams({ start_date: this.startDate }).toString();
        const url = `${this.axiosInstance.defaults.baseURL}collection/sales/index?${params}`;

        const response = await this.axiosInstance.get(url);
        if (response.data && response.data.success) {
          this.items = response.data.data;
        } else {
          this.$refs.toastNotification.showErrorToast('No data found for the selected date.');
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
        this.$refs.toastNotification.showErrorToast(`Error: ${error.message}`);
      } finally {
        this.loading_print = false;
      }
    },
    resetSelection() {
      this.startDate = '';
      this.items = [];
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

.breadcrumb-1 {
  align-items: end;
  display: flex;
  justify-content: end;
  background: #fcfcfc;
}

.data-row {
  transition: all 0.3s ease;
}

.data-row:hover {
  background-color: #f8f9fa !important;
}

.form-label {
  font-weight: 500;
  color: #6c757d;
}

.spin {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>