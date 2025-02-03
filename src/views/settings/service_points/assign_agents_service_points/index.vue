<template>
  <div class="layout-px-spacing apps-invoice-list">
    <!-- Breadcrumb -->
    <div class="row invoice layout-top-spacing layout-spacing apps-invoice">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <ul class="navbar-nav breadcrumb-1">
          <li>
            <div class="page-header">
              <nav class="breadcrumb-one" aria-label="breadcrumb">
                <ol class="breadcrumb pt-2 ml-3">
                  <li class="breadcrumb-item"><a href="javascript:;">Settings</a></li>
                  <li class="breadcrumb-item active" aria-current="page"><span>Agents Service Points</span></li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="row">
      <div class="col-md-12">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 layout-spacing">
            <!-- Add Button -->
            <div class="col-lg-12 d-flex justify-content-end">
              <button v-if="checkPermission('CAN CREATE AGENT SERVICE POINTS')" type="button" class="btn btn-info mb-1 mr-2 text-bold" data-bs-toggle="modal" data-bs-target="#slidedownModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Register
              </button>
            </div>

            <!-- Data Table -->
            <div class="panel br-6">
              <div class="custom-table">
                <div class="invoice-inbox m-2">
                  <v-client-table :data="items" :columns="columns">
                    <template v-slot:sn="props">
                      {{ getSerialNumber(props.index) }}
                    </template>
                    <template v-slot:agent_name="props">
                      {{ props.row.agent_name }}
                    </template>
                    <template v-slot:service_point_name="props">
                      {{ props.row.service_point_name }}
                    </template>
                    <template v-slot:actions="props">
                      <div class="d-flex">
                        <button v-if="checkPermission('CAN EDIT SERVICE POINTS')" class="btn btn-primariy bg-none btn-sx me-3" @click="handleEdit(props.row)">
                          <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button v-if="checkPermission('CAN DELETE SERVICE POINTS')" class="btn btn-primariy bg-none btn-sx" @click="handleDelete(props.row.id)">
                          <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 4H8l-1 1H3v2h1l1 14h14l1-14h1V5h-2l-1-1z" />
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

    <!-- Register Modal -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Assign Service Point</h5>
            <button v-if="checkPermission('CAN CREATE AGENT SERVICE POINTS')" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group mb-3">
                    <label class="form-label">Select Agent</label>
                    <multiselect v-model="selectedAgent" :options="agent_name" :searchable="true" placeholder="Select agent" track-by="id" label="name" />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group mb-3">
                    <label class="form-label">Service Point</label>
                    <multiselect v-model="selectedServicePoint" :options="service_point_name" :searchable="true" placeholder="Select Service Point" track-by="id" label="name" />
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <button type="submit" class="btn btn-primary" :disabled="loading_service_point">
                  <span v-if="loading_service_point" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!loading_service_point">Register</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

     <!-- Update Modal -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Update Agent Service Point</h5>
            <button v-if="checkPermission('CAN CREATE AGENT SERVICE POINTS')" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdate">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group mb-3">
                    <label class="form-label">Select Agent</label>
                    <multiselect v-model="selectedAgent" :options="agent_name" :searchable="true" placeholder="Select agent" track-by="id" label="name" />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group mb-3">
                    <label class="form-label">Service Point</label>
                    <multiselect v-model="selectedServicePoint" :options="service_point_name" :searchable="true" placeholder="Select Service Point" track-by="id" label="name" />
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <button type="submit" class="btn btn-primary" :disabled="loading_service_point">
                  <span v-if="loading_service_point" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!loading_service_point">Update</span>
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
import axios from 'axios';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import ToastNotification from '@/components/ToastNotification.vue';
import { userHasPermission } from '@/utils/permissions';

export default {
  name: 'ServicePointManagement',

  components: {
    Multiselect,
    ToastNotification,
  },

  data() {
    return {
      agent_name: [],
      service_point_name: [],
      items: [],
      selectedAgent: null,
      selectedServicePoint: null,
       editingServicePoint: null,
      loading_service_point: false,
      registerModalInstance: null,
    };
  },

  computed: {
    columns() {
      return ['sn', 'agent_name', 'service_point_name', 'actions'];
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    async initialize() {
      await Promise.all([this.fetchAgents(), this.fetchServicePoint(), this.fetchData()]);
      this.initializeModals();
    },

    getSerialNumber(index) {
      return index + 1;
    },

    checkPermission(permission) {
      return userHasPermission(permission);
    },

    async fetchAgents() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/settings/agents/index');
        this.agent_name = response.data.data.map((item) => ({ id: item.agent_id, name: item.agent_name }));
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching agents: ' + error.message);
      }
    },

    async fetchServicePoint() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/service_points/index');
        this.service_point_name = response.data.data.map((item) => ({ id: item.id, name: item.service_point_name }));
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching service points: ' + error.message);
      }
    },

    async fetchData() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/service_point_agents/index');
        this.items = response.data.data || [];
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        this.$refs.toastNotification.showErrorToast('Error fetching data: ' + errorMessage);
      }
    },

    initializeModals() {
      if (this.$refs.registerModal) {
        this.registerModalInstance = new bootstrap.Modal(this.$refs.registerModal);
      }
    },

    async handleSubmit() {
      if (!this.selectedAgent || !this.selectedServicePoint) {
        this.$refs.toastNotification.showInfoToast('Please select both agent and service point');
        return;
      }

      const postData = {
        agentable_id: this.selectedAgent.id,
        service_point_id: this.selectedServicePoint.id,
      };

      console.log('Post data: ', postData);

      try {
        this.loading_service_point = true;

        await axios.post('https://abcourier.co.tz/admin-api/api/v1/service_point_agents/assign', postData);
        this.$refs.toastNotification.showSuccessToast('Service point assigned successfully');

        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
        await this.fetchData();
        this.selectedAgent = null;
        this.selectedServicePoint = null;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error assigning service point: ' + (error.response?.data?.message || error.message));
      } finally {
        this.loading_service_point = false;
      }
    },

    handleEdit(row) {
      this.editingServicePoint = row;
      this.selectedAgent = this.agent_name.find(agent => agent.name === row.agent_name);
      this.selectedServicePoint = this.service_point_name.find(point => point.name === row.service_point_name);
      this.registerModalInstance.show(); 
    },

    async handleUpdate() {
      if (!this.selectedAgent || !this.selectedServicePoint || !this.editingServicePoint) {
        this.$refs.toastNotification.showInfoToast('Please select both agent and service point');
        return;
      }

      const updateData = {
        agentable_id: this.selectedAgent.id,
        service_point_id: this.selectedServicePoint.id,
      };

      try {
        this.loading_service_point = true;

        await axios.put(`https://abcourier.co.tz/admin-api/api/v1/service_point_agents/update/${this.editingServicePoint.id}`, updateData);
        this.$refs.toastNotification.showSuccessToast('Service point updated successfully');

        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
        await this.fetchData();
        this.selectedAgent = null;
        this.selectedServicePoint = null;
        this.editingServicePoint = null; 
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error updating service point: ' + (error.response?.data?.message || error.message));
      } finally {
        this.loading_service_point = false;
      }
    },

    async handleDelete(id) {
      if (!confirm('Are you sure you want to delete this service point assignment?')) {
        return;
      }

      try {
        await axios.delete(`https://abcourier.co.tz/admin-api/api/v1/service_point_agents/delete/${id}`);
        this.$refs.toastNotification.showSuccessToast('Service point assignment deleted successfully');
        await this.fetchData();
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error deleting service point assignment: ' + (error.response?.data?.message || error.message));
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

.breadcrumb-1 {
  align-items: end;
  display: flex;
  justify-content: end;
  background: #fcfcfc;
}
</style>
        
    