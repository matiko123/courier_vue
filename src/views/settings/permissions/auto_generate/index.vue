<template>
  <div class="layout-px-spacing apps-invoice-list">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Settings</a></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Roles & Permissions</span></li>
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
                Create Permission
              </button>
            </div>
            <div class="panel br-6">
              <div class="custom-table">
                <div class="custom-table">
                  <div class="invoice-inbox m-2">
                    <v-client-table :data="items" :columns="columns">
                      <template v-slot:sn="props">
                        <span class="data-id centered">{{ getSerialNumber(props.index) }}</span>
                      </template>
                      <template v-slot:service_name="props">
                        <span class="inv-number centered">{{ props.row.service_name }}</span>
                      </template>
                      <template v-slot:permission_name="props">
                        <span class="inv-number centered">{{ props.row.permission_name }}</span>
                      </template>
                      <template v-slot:date="props">
                        <span class="inv-number centered">{{ props.row.date }}</span>
                      </template>
                      <template v-slot:action="props">
                        <div class="d-flex">
                          <button class="btn btn-primariy bg-none btn-sm me-3" @click="handleEdit(props.row)">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="blue"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>

                          <button class="btn btn-dangeru bg-none btn-sm" @click="handleDelete(props.row)">
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
    </div>

    <!-- Permission create Modal -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Create User Permissions</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Permission Form -->
            <form @submit.prevent="handleSubmitPermissions">
              <!-- Select Service -->
              <div class="row">
                <div class="col-md-12">
                  <div class="input-group mb-2">
                    <label for="user" class="form-label">Select Service</label>
                    <multiselect v-model="selectedService" :options="services" :searchable="true" placeholder="Select Services" :custom-label="customUserLabel" required />
                  </div>
                </div>
              </div>

              <!-- Permission Name -->
              <div class="row">
                <div class="col-md-12">
                  <div class="input-group mb-2">
                    <div class="mb-3 col-md-12">
                      <label for="permissions" class="form-label">Permission Name</label><br />
                      <input type="text" v-model="permission_name" class="form-control" id="permission_name" required />
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                <button type="submit" class="btn btn-primary me-2" :disabled="loading_permissions">
                  <span v-if="loading_permissions" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!loading_permissions">Save</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Permission Update Modal -->
    <div class="modal animated slideInDown" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" ref="editModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Update Permissions</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdate">
              <div class="mb-3">
                <label for="service" class="form-label">Select Service</label>
                <multiselect v-model="selectedService" :options="services" :searchable="true" placeholder="Select Service" track-by="id" label="name" required />
              </div>
              <div class="mb-3">
                <label for="permission_name" class="form-label">Permission Name</label>
                <input type="text" v-model="permission_name" class="form-control" id="permission_name" required />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                <button type="submit" class="btn btn-primary" :disabled="loading_permissions">
                  <span v-if="loading_permissions" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!loading_permissions">Save</span>
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

export default {
  components: {
    Multiselect,
    ToastNotification,
  },
  data() {
    return {
      items: [],
      users: [],
      services: [],
      permissions: [],
      selectedService: null,
      permission_name: '',
      selectedUser: null,
      selectedPermissions: [],
      loading_permissions: false,
      registerModalInstance: null,
      editModalInstance: null,
      editingPermissionId: null,
    };
  },

  mounted() {
    this.fetchData();
    this.fetchServices();
    this.initializeModals();
    this.editModalInstance = new bootstrap.Modal(this.$refs.editModal);
  },
  methods: {
    customLabel(option) {
      return option.name || label.name;
    },
    getSerialNumber(index) {
      return index + 0;
    },

    initializeModals() {
      if (this.$refs.editModal && this.$refs.registerModal) {
        this.editModalInstance = new bootstrap.Modal(this.$refs.editModal);
        this.registerModalInstance = new bootstrap.Modal(this.$refs.registerModal);
      }
    },

    fetchServices() {
      axios
        .get('https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/service')
        .then((response) => {
          this.services = response.data.data;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching Data:', error);
        });
    },

    customUserLabel(option) {
      return option.name;
    },

    async fetchData() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/list');
        this.items = response.data.items || response.data.data;
        this.$refs.toastNotification.showSuccessToast('Successfully fetching data');
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        this.$refs.toastNotification.showErrorToast('Error fetching data:', errorMessage);
      }
    },

    initializeModals() {
      if (this.$refs.editModal && this.$refs.registerModal) {
        this.editModalInstance = new bootstrap.Modal(this.$refs.editModal);
        this.registerModalInstance = new bootstrap.Modal(this.$refs.registerModal);
      }
    },

    async handleSubmitPermissions() {
      this.loading_permissions = true;

      const payload = {
        service_id: this.selectedService.id,
        permission_name: this.permission_name,
      };

      try {
        const response = await axios.post('https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/store', payload);
        this.$refs.toastNotification.showSuccessToast('Permission saved successfully');

        await this.fetchData(); 

        if (this.registerModalInstance) {
          this.registerModalInstance.hide(); 
        }

        this.selectedService = null; 
        this.permission_name = '';
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error saving Permission:', error);
      } finally {
        this.loading_permissions = false;
      }
    },

    handleEdit(permission) {
      if (!permission || !permission.id) {
        this.$refs.toastNotification.showErrorToast('Permission ID is missing');
        return;
      }
      this.editingPermissionId = permission.id;
      this.fetchPermissionDetails(permission.id);
    },
    async fetchPermissionDetails(id) {
      try {
        const response = await axios.get(`https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/edit/${id}`);
        const { service_id, service_name, permissions_name } = response.data.data;
        this.selectedService = this.services.find((s) => s.id === service_id);
        this.permission_name = permissions_name;
        this.openEditModal();
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching permission details:', error);
      }
    },
    openEditModal() {
      this.$nextTick(() => {
        if (this.$refs.editModal) {
          this.editModalInstance = new bootstrap.Modal(this.$refs.editModal);
          this.editModalInstance.show();
        } else {
          console.error('Edit modal element is not defined');
        }
      });
    },
    async handleUpdate() {
      this.loading_permissions = true;
      if (!this.selectedService || !this.selectedService.id) {
        this.$refs.toastNotification.showErrorToast('Please select a service.');
        this.loading_permissions = false;
        return;
      }
      if (!this.editingPermissionId) {
        this.$refs.toastNotification.showErrorToast('Permission ID is missing.');
        this.loading_permissions = false;
        return;
      }
      const payload = {
        service_id: this.selectedService.id,
        permission_name: this.permission_name,
      };
      try {
        const response = await axios.put(`https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/update/${this.editingPermissionId}`, payload);
        if (response.data.code === 200) {
          this.$refs.toastNotification.showSuccessToast(response.data.message);
          await this.fetchData();
          if (this.editModalInstance) {
            this.editModalInstance.hide();
          }
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        let errorMessage = 'Error updating permission';
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }
        this.$refs.toastNotification.showErrorToast(errorMessage);
      } finally {
        this.loading_permissions = false;
        this.editingPermissionId = null;
      }
    },
  
    async handleDelete(permission) {
      if (!permission.id) {
        this.$refs.toastNotification.showErrorToast('Permission ID is missing');
        return;
      }
      const confirmed = confirm(`Are you sure you want to delete the permission: ${permission.permission}?`);
      if (!confirmed) {
        return;
      }
      try {
        const response = await axios.delete(`https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/delete/${permission.id}`);
        if (response.data.code === 200) {
          this.$refs.toastNotification.showSuccessToast(response.data.message);
          await this.fetchData();
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        let errorMessage = 'Error deleting permission';
        if (error.response) {
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }
        console.error('Error deleting permission:', errorMessage);
        this.$refs.toastNotification.showErrorToast(errorMessage);
      }
    },

  },

  computed: {
    columns() {
      return ['sn', 'service_name', 'permission_name', 'date', 'action'];
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
          
      