<template>
  <div class="layout-px-spacing">
    <!-- Main form -->
    <div class="row invoice layout-top-spacing layout-spacing apps-invoice">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <ul class="navbar-nav breadcrumb-1">
          <li>
            <div class="page-header">
              <nav class="breadcrumb-one" aria-label="breadcrumb">
                <ol class="breadcrumb pt-2 ml-3">
                  <li class="breadcrumb-item"><a href="javascript:;">Operation</a></li>
                  <li class="breadcrumb-item active" aria-current="page"><span>Agent Sales</span></li>
                  <li class="breadcrumb-item active" aria-current="page"><span>Report</span></li>
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
          <div class="custom-table">
            <v-client-table :data="items" :columns="columns">
              <template #beforeFilter>
                <form @submit.prevent="printData">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-auto">
                      <input type="date" class="form-control mb-2" id="startDate" v-model="startDate" placeholder="Start Date" required />
                    </div>
                    <div class="col-auto">
                      <input type="date" class="form-control mb-2" id="endDate" v-model="endDate" placeholder="End Date" required />
                    </div>
                    <div class="col-auto">
                      <multiselect
                        v-model="selectedBranch"
                        :options="branches"
                        :searchable="true"
                        placeholder="Select Branch"
                        :custom-label="customLabel"
                        @change="fetchOffices(selectedBranch.id)"
                        required
                      />
                    </div>
                    <div class="col-auto">
                      <multiselect
                        v-model="selectedOffice"
                        :options="offices"
                        :searchable="true"
                        placeholder="Select Office"
                        :custom-label="customLabel"
                        @change="fetchAgents(selectedOffice.id)"
                        required
                      />
                    </div>
                    <div class="col-auto">
                      <multiselect v-model="selectedAgent" :options="agents" :searchable="true" placeholder="Select Agents" :custom-label="customLabel" required track-by="value" />
                    </div>
                    <div class="col-auto">
                      <button type="button" class="btn btn-danger me-2" @click="resetSelection">Reset</button>
                      <button type="submit" class="btn btn-secondary" :disabled="loading_print">
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
                        <span v-else>Print</span>
                      </button>
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
      branches: [],
      offices: [],
      agents: [],
      items: [],
      selectedBranch: null,
      selectedOffice: null,
      selectedAgent: null,
      startDate: '',
      endDate: '',
      loading_print: false,
      columns: [
        { label: 'Serial', field: 'serial', filterable: false },
        { label: 'Date', field: 'date' },
        { label: 'Collection Point', field: 'collection_point' },
      ],
    };
  },

  created() {
    this.axiosInstance = axios.create({
      baseURL: 'https://abcourier.co.tz/admin-api/v1/',
      //baseURL: 'http://localhost:8000/api/v1/',
    });
    this.fetchBranches();
  },

  watch: {
    selectedBranch(value) {
      if (value) {
        this.fetchOffices(value.id);
      }
    },
    selectedOffice(value) {
      if (value) {
        this.fetchAgents(value.id);
      }
    },
  },

  methods: {
    validateFields() {
      if (!this.startDate || !this.endDate || !this.selectedBranch) {
        this.$refs.toastNotification.showErrorToast('All fields are required');
        return false;
      }
      return true;
    },
    customLabel(option) {
      return option.name || option.label;
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

    fetchOffices(branchId) {
      this.axiosInstance
        .get(`masters/list-offices?branch_id=${branchId}`)
        .then((response) => {
          this.offices = response.data.data;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast(`Error fetching offices: ${error}`);
        });
    },

    fetchAgents(officeId) {
      this.axiosInstance
        .get(`masters/list-agents?office_id=${officeId}`)
        .then((response) => {
          this.agents = response.data.data.map((agent) => ({
            label: agent.agent_name,
            value: agent.agent_id,
          }));
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching agents:', error);
        });
    },

    resetSelection() {
      this.selectedBranch = null;
      this.selectedOffice = null;
      this.selectedAgent = null;
      this.startDate = '';
      this.endDate = '';
    },
    async printData() {
      if (!this.validateFields()) {
        return;
      }

      try {
        this.loading_print = true;

        const params = new URLSearchParams({
          start_date: this.startDate,
          end_date: this.endDate,
          branch_id: this.selectedBranch.id,
          office_id: this.selectedOffice.id,
          agent_id: this.selectedAgent ? this.selectedAgent.value : null,
        }).toString();

        const url = `${this.axiosInstance.defaults.baseURL}reports/agent-manifest?${params}`;

        console.log(`Request URL: ${url}`);

        const response = await this.axiosInstance.get(url);

        if (response.data.url) {
          window.open(response.data.url, '_blank');
          this.$refs.toastNotification.showSuccessToast('Printing Agent sales report.');
        } else {
          console.error('Error printing Agent sales report: No URL returned from server');
          this.$refs.toastNotification.showErrorToast('Error printing Agent sales report: No URL returned from server');
        }
      } catch (error) {
        console.error('Error printing Agent sales report:', error);

        if (error.response) {
          console.error('Response Data:', error.response.data);
          console.error('Response Status:', error.response.status);
          console.error('Response Headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request Data:', error.request);
        } else {
          console.error('Error Message:', error.message);
        }

        this.$refs.toastNotification.showErrorToast(`Error printing Agent sales report: ${error.message}`);
      } finally {
        this.loading_print = false;
      }
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
.summary-table {
  margin-bottom: 2rem;
}
.summary-table h2 {
  margin-bottom: 1rem;
}
</style>
  