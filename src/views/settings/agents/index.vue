<template>
  <div class="layout-px-spacing apps-invoice-list">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Settings</a></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Register Agents</span></li>
              </ol>
            </nav>
          </div>
        </li>
      </ul>
    </teleport>

    <div class="row">
      <div class="col-md-12">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 layout-spacing">
            <div class="col-lg-12 d-flex justify-content-end">
              <button type="button" class="btn btn-info mb-1 mr-2 text-bold" data-bs-toggle="modal" data-bs-target="#slidedownModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Create New Agent
              </button>
            </div>
            <div class="panel br-6">
              <div class="custom-table">
                <div class="invoice-inbox m-2">
                  <v-client-table :data="items" :columns="columns">
                    <template v-slot:sn="props">
                      <span class="data-id centered">{{ getSerialNumber(props.index) }}</span>
                    </template>
                    <template v-slot:agent_name="props">
                      <span class="inv-number centered">{{ props.row.agent_name }}</span>
                    </template>
                    <template v-slot:branch_name="props">
                      <span class="inv-number centered">{{ props.row.branch_name }}</span>
                    </template>
                    <template v-slot:phone="props">
                      <span class="inv-number centered">{{ props.row.agent_phone }}</span>
                    </template>
                    <template v-slot:role="props">
                      <span class="inv-number centered">{{ props.row.agent_role }}</span>
                    </template>
                    <template v-slot:address="props">
                      <span class="inv-number centered">{{ props.row.agent_address }}</span>
                    </template>
                    <template v-slot:date="props">
                      <span class="inv-number centered">{{ props.row.date }}</span>
                    </template>
                    <template v-slot:actions="props">
                      <div class="d-flex">
                        <button class="btn btn-primary bg-none btn-sx me-3" @click="handleEdit(props.row)">
                          <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button class="btn btn-primary bg-none btn-sx" @click="handleDelete(props.row)">
                          <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
import { userHasPermission } from '@/utils/permissions';


const axiosInstance = axios.create({
  baseURL: 'https://abcourier.co.tz/admin-api/api/v1/',
  //baseURL: 'http://127.0.0.1:8000/api/v1/',
});

export default {
  components: {
    Multiselect,
    ToastNotification,
    
  },
  data() {
    return {
      items: [],
      selectedAgent: null,
      address: '',
      agents: [],
      phoneNumber: '',
      branches: [],
      selectedBranch: null,
      password: '',
      loading_users: false,
      update_users: false,
      editModalInstance: null,
      registerModalInstance: null,
      editingAgent: {
        id: null,
        name: '',
        msisdn: '',
        branch: null,
        address: '',
      },
    };
  },

  mounted() {
    console.log('Component mounted');
    this.fetchAgents();
    this.fetchBranches();
    this.fetchData();
    this.$nextTick(() => {
      this.initializeModals();
    });
  },
  methods: {
    customLabel(option) {
      return option.name;
    },
    getSerialNumber(index) {
      return index + 0;
    },

    checkPermission(permission) {
      return userHasPermission(permission);
    },

    fetchBranches() {
      axiosInstance
        .get('masters/list-branches')
        .then((response) => {
          console.log('Branches fetched:', response.data.data);
          this.branches = response.data.data;
        })
        .catch((error) => {
          console.error('Error fetching branches:', error);
        });
    },

    fetchAgents() {
      axiosInstance
        .get('https://aboodbus.co.tz/api/agents')
        .then((response) => {
          this.agents = response.data;
        })
        .catch((error) => {
          console.error('Error fetching agents:', error);
        });
    },

    async fetchData() {
      console.log('Fetching agent data...');
      try {
        const response = await axiosInstance.get('settings/agents/index');
        console.log('Agent data fetched:', response.data.data);
        this.items = response.data.data;
        this.$refs.toastNotification.showSuccessToast('Successfully fetching data');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        console.error('Error fetching data:', error);
        this.$refs.toastNotification.showErrorToast('Error fetching data:', errorMessage);
      }
    },

    initializeModals() {
      console.log('Initializing modals...');
      if (this.$refs.editModal && this.$refs.registerModal) {
        this.editModalInstance = new bootstrap.Modal(this.$refs.editModal);
        this.registerModalInstance = new bootstrap.Modal(this.$refs.registerModal);
      } else {
        console.error('Edit or Register modal references are missing.');
      }
    },

    async handleSubmit() {
      console.log('Handling submit...');
      if (!this.selectedAgent || !this.phoneNumber || !this.selectedBranch || !this.address || !this.password) {
        this.$refs.toastNotification.showInfoToast('Please fill in all fields');
        return;
      }

      const postData = {
        name: this.selectedAgent,
        msisdn: this.phoneNumber,
        branch_id: this.selectedBranch.id,
        address: this.address,
        password: this.password,
      };
      try {
        this.loading_users = true;
        const response = await axiosInstance.post('settings/agents/store', postData);
        console.log('Agent created response:', response.data);
        this.$refs.toastNotification.showSuccessToast('Agents created successfully');
        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Failed to create agent. Please try again.');
      } finally {
        this.selectedAgent = '';
        this.phoneNumber = '';
        this.selectedBranch = null;
        this.address = '';
        this.password = '';
        await this.fetchData();
        this.loading_users = false;
      }
    },

    handleEdit(agent) {
      this.editingAgent = {
        id: agent.agent_id,
        name: agent.agent_name,
        msisdn: agent.agent_phone,
        branch: this.branches.find((b) => b.name === agent.branch_name),
        address: agent.agent_address,
      };

      this.$nextTick(() => {
        if (this.editModalInstance) {
          this.editModalInstance.show();
        } else {
          console.error('Edit modal instance is not defined');
        }
      });
    },

    async handleUpdate() {
      console.log('Handling update for agent ID:', this.editingAgent.id);
      if (!this.editingAgent.id) {
        this.$refs.toastNotification.showErrorToast('Agent ID is missing');
        return;
      }

      const payload = {
        name: this.editingAgent.name,
        msisdn: this.editingAgent.msisdn,
        branch_id: this.editingAgent.branch.id,
        address: this.editingAgent.address,
      };

      try {
        this.update_users = true;

        const response = await axiosInstance.put(`settings/agents/update/${this.editingAgent.id}`, payload);
        this.$refs.toastNotification.showSuccessToast('Agent updated successfully');
        await this.fetchData();
        if (this.editModalInstance) {
          this.editModalInstance.hide();
        }
      } catch (error) {
        console.error('Error updating agent:', error);
        this.$refs.toastNotification.showErrorToast('Error updating agent:', error.response?.data?.message || error.message);
      } finally {
        this.update_users = false;
      }
    },

    async handleDelete(agent) {
      if (!agent.agent_id) {
        this.$refs.toastNotification.showErrorToast('Agent ID is missing');
        return;
      }
      const confirmed = confirm(`Are you sure you want to delete the agent: ${agent.agent_name}?`);
      if (!confirmed) {
        return;
      }
      try {
        const response = await axiosInstance.delete(`settings/agents/delete/${agent.agent_id}`);
        this.$refs.toastNotification.showSuccessToast('Agent deleted successfully');
        await this.fetchData();
      } catch (error) {
        console.error('Error deleting agent:', error);
        this.$refs.toastNotification.showErrorToast('Error deleting agent:', error.response?.data?.message || error.message);
      }
    },
  },

  computed: {
    columns() {
      return ['sn', 'agent_name', 'branch_name', 'phone', 'role', 'address', 'date', 'actions'];
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
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
  text-align: center;
  justify-content: center;
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

.form-label {
  color: #000000;
  font-size: 15px;
  font-weight: 600;
  opacity: 90%;
}

.btn-primariy.bg-none {
  border: 1px solid rgb(85, 144, 246);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
}

.btn-primariy.bg-none > svg {
  width: auto;
}
</style>
          
      