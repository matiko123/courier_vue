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
                  <li class="breadcrumb-item active" aria-current="page"><span>Assign Agent Office</span></li>
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
                <form @submit.prevent="handleAssignData">
                  <div class="row align-items-center justify-content-center">
                    <div class="col-auto">
                      <multiselect v-model="selectedAgent" :options="agents" :searchable="true" placeholder="Select Agent" :custom-label="customLabel" required />
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
                      <multiselect
                        v-model="selectedSalesOpt"
                        :options="sales_options"
                        :searchable="true"
                        placeholder="Select Sales Options"
                        :custom-label="customLabel"
                        label="label"
                        track-by="id"
                        required
                      />
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
                        <span v-else>Assign</span>
                      </button>
                    </div>
                  </div>
                </form>
              </template>
              <template v-slot:sn="{ index }">
                {{ getSerialNumber(index) }}
              </template>
              <template v-slot:agent_name="{ row }">
                {{ row.agent_name }}
              </template>
              <template v-slot:branch_name="{ row }">
                {{ row.branch_name }}
              </template>
              <template v-slot:office_name="{ row }">
                {{ row.office_name }}
              </template>
              <template v-slot:sales_options="{ row }">
                <span v-if="row.salesOpts === 1">TICKET</span>
                <span v-else-if="row.salesOpts === 2">COURIER</span>
                <span v-else-if="row.salesOpts === 3">TICKET & COURIER</span>
                <span v-else>Unknown</span>
              </template>

              <template v-slot:actions="props">
                <div class="d-flex">
                  <button v-if="checkPermission('CAN EDIT AGENTS')" class="btn btn-primariy bg-none btn-sx me-3" @click="handleEdit(props.row)">
                    <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button v-if="checkPermission('CAN DELETE AGENTS')" class="btn btn-primariy bg-none btn-sx" @click="handleDelete(props.row)">
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </template>
            </v-client-table>
          </div>
        </div>
      </div>
    </div>

    <!-- modal for edit assigned agents office -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" ref="editModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Agent Office</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdate">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="agentName" class="form-label">Agent Name</label>
                  <div class="input-group mb-2">
                    <multiselect v-model="selectedAgent" :options="agents" :searchable="true" placeholder="Select Agent" :custom-label="customLabel" required />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="branch" class="form-label">Branch</label>
                  <div class="input-group mb-2">
                    <multiselect v-model="editingAgent.branch" :options="branches" label="name" track-by="id" :searchable="true" placeholder="Select Branch" @change="onBranchChange" />
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="address" class="form-label">Office Name</label>
                  <div class="input-group mb-2">
                    <multiselect v-model="selectedOffice" :options="offices" :searchable="true" placeholder="Select Office" :custom-label="customLabel" required />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="salesOpt" class="form-label">Sales Options</label>
                  <div class="input-group mb-2">
                    <multiselect
                      v-model="selectedSalesOpt"
                      :options="sales_options"
                      :searchable="true"
                      placeholder="Select Sales Options"
                      :custom-label="customLabel"
                      label="label"
                      track-by="id"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                <button type="submit" class="btn btn-primary" :disabled="update_users">
                  <span v-if="update_users" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!update_users">Update</span>
                </button>
              </div>
            </form>
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
import { userHasPermission } from '@/utils/permissions';

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
      sales_options: [],
      items: [],
      editingAgent: null,
      editingAgent: {
        branch: null,
      },
      selectedBranch: null,
      selectedOffice: null,
      selectedAgent: null,
      selectedSalesOpt: null,
      startDate: '',
      endDate: '',
      loading_print: false,
    };
  },

  created() {
    this.axiosInstance = axios.create({
      baseURL: 'https://abcourier.co.tz/admin-api/api/v1/',
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
  },
  mounted() {
    this.fetchAgents();
    this.fetchSalesOptions();
    this.fetchData();
    if (this.editingAgent && this.editingAgent.branch) {
      this.fetchOffices(this.editingAgent.branch.id);
    }
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
      return option.name || option.label || `${option.id} - ${option.label}`;
    },
    getSerialNumber(index) {
      return index + 0;
    },

    onBranchChange(selectedBranch) {
      if (selectedBranch && selectedBranch.id) {
        this.fetchOffices(selectedBranch.id);
      }
    },

    formatDate(dateString) {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
    },

    checkPermission(permission) {
      return userHasPermission(permission);
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
          if (!this.offices.length) {
            this.$refs.toastNotification.showInfoToast('No offices found for the selected branch');
          }
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast(`Error fetching offices: ${error.message}`);
        });
    },

    fetchAgents() {
      this.axiosInstance
        .get(`settings/agents/index`)
        .then((response) => {
          this.agents = response.data.data.map((agent) => ({
            agent_id: agent.agent_id,
            label: agent.agent_name,
            value: agent.agent_id,
          }));
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching agents:', error);
        });
    },

    fetchSalesOptions() {
      this.axiosInstance
        .get('settings/agents/sales-options')
        .then((response) => {
          this.sales_options = Object.keys(response.data.data).map((key) => ({
            id: Number(key),
            label: response.data.data[key],
          }));
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching sales options: ' + error.message);
        });
    },

    resetSelection() {
      this.selectedBranch = null;
      this.selectedOffice = null;
      this.selectedAgent = null;
      this.selectedSalesOpt = null;
    },

    async fetchData() {
      try {
        const response = await this.axiosInstance.get('settings/agents/agent-office');
        this.items = response.data.data;
        this.$refs.toastNotification.showSuccessToast('Successfully fetched data');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        console.error('Error fetching data:', error);
        this.$refs.toastNotification.showErrorToast('Error fetching data: ' + errorMessage);
      }
    },

    async handleAssignData() {
      if (!this.selectedBranch || !this.selectedOffice || !this.selectedSalesOpt || !this.selectedAgent) {
        this.$refs.toastNotification.showInfoToast('Please fill in all fields');
        return;
      }

      const postData = {
        agent_id: this.selectedAgent.agent_id,
        office_id: this.selectedOffice.id,
        branch_id: this.selectedBranch.id,
        sales_options: this.selectedSalesOpt.id,
      };

      try {
        this.loading_agent = true;
        const response = await this.axiosInstance.post('settings/agents/assign-agent', postData);
        this.$refs.toastNotification.showSuccessToast('Agent has been assigned successfully');
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Failed to assign agent. Please try again.');
      } finally {
        this.resetSelection();
        await this.fetchData();
        this.loading_agent = false;
      }
    },

    resetSelection() {
      this.selectedAgent = null;
      this.selectedBranch = null;
      this.selectedOffice = null;
      this.selectedSalesOpt = null;
    },

    handleEdit(row) {
      this.editingAgent = { ...row };
      const editModal = new bootstrap.Modal(this.$refs.editModal);
      editModal.show();
    },

    async handleUpdate() {
      this.update_users = true;
      try {
        const response = await this.axiosInstance.put(`settings/agents/update/${this.editingAgent.id}`, {
          agent_id: this.selectedAgent.agent_id,
          branch_id: this.selectedBranch.id,
          office_id: this.selectedOffice.id,
          sales_option: this.selectedSalesOpt.id,
        });
        this.fetchData();
        this.$refs.toastNotification.showSuccessToast('Agent office updated successfully');
        this.resetEditForm();
      } catch (error) {
        console.error('Error updating agent office:', error);
        this.$refs.toastNotification.showErrorToast('Error updating agent office: ' + error.message);
      } finally {
        this.update_users = false; // Reset loading state
      }
    },

    async handleDelete(row) {
      const confirmDelete = confirm('Are you sure you want to delete this agent assignment?');
      if (confirmDelete) {
        try {
          await this.axiosInstance.delete(`settings/agents/delete/${row.id}`);
          this.fetchData(); // Refresh data
          this.$refs.toastNotification.showSuccessToast('Agent assignment deleted successfully');
        } catch (error) {
          console.error('Error deleting agent assignment:', error);
          this.$refs.toastNotification.showErrorToast('Error deleting agent assignment: ' + error.message);
        }
      }
    },

    resetEditForm() {
      this.editingAgent = {};
      this.selectedAgent = null;
      this.selectedBranch = null;
      this.selectedOffice = null;
      this.selectedSalesOpt = null;
    },
  },

  computed: {
    columns() {
      return ['sn', 'agent_name', 'branch_name', 'office_name', 'sales_options', 'actions'];
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
    