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
                Create User
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
                      <template v-slot:username="props">
                        <span class="inv-number centered">{{ props.row.username }}</span>
                      </template>
                      <template v-slot:phone_number="props">
                        <span class="inv-number centered">{{ props.row.phone_number }}</span>
                      </template>
                      <template v-slot:editModalInstance="props">
                        <span class="inv-number centered">{{ props.row.email }}</span>
                      </template>

                      <template v-slot:actions="props">
                        <div class="d-flex">
                          <button class="btn btn-primariy bg-none btn-sx me-3" @click="handleEdit(props.row)">
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
                          <button class="btn btn-primariy bg-none btn-sx" @click="handleDelete(props.row)">
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

    <!-- User Register Modal -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Register User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6">
                  <div class="input-group mb-2">
                    <label for="branch" class="form-label">User Name</label>
                    <div class="input-group mb-2">
                      <input type="text" id="username" class="form-control" v-model="userName" placeholder="Enter username (eg)jackson.ngowi" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group mb-2">
                    <label for="branch" class="form-label">Phone Number</label>
                    <div class="input-group mb-2">
                      <input type="number" id="phone_number" class="form-control" maxlength="10" v-model="phoneNumber" placeholder="Enter Phone number" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group mb-2">
                    <label for="branch" class="form-label">Email</label>
                    <div class="input-group mb-2">
                      <input type="email" id="email" class="form-control" v-model="email" placeholder="Enter email address" />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="input-group mb-2">
                    <label for="branch" class="form-label">Password</label>
                    <div class="input-group mb-2">
                      <input type="password" id="password" class="form-control" v-model="password" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <div class="col-md-3 mt-1">
                  <button type="submit" class="btn btn-primary me-2" :disabled="loading_users">
                    <span v-if="loading_users" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="!loading_users">Register</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" ref="editModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdate">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="userName" class="form-label">User Name</label>
                  <div class="input-group mb-2">
                    <input type="text" id="userName" class="form-control" v-model="userName" placeholder="Enter username" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="phoneNumber" class="form-label">Phone Number</label>
                  <div class="input-group mb-2">
                    <input type="text" id="phoneNumber" class="form-control" v-model="phoneNumber" placeholder="Enter phone number" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">Email</label>
                  <div class="input-group mb-2">
                    <input type="email" id="email" class="form-control" v-model="email" placeholder="Enter email address" />
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
import axios from 'axios';
import ToastNotification from '@/components/ToastNotification.vue';

export default {
  components: {
    ToastNotification,
  },
  data() {
    return {
      items: [],
      userName: '',
      phoneNumber: '',
      email: '',
      password: '',
      loading_users: false,
      update_users: false,
      editModalInstance: null,
      registerModalInstance: null,
    };
  },

  mounted() {
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

    async fetchData() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/settings/user-management/users/index');
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

    async handleSubmit() {
      if (!this.userName || !this.phoneNumber || !this.email || !this.password) {
        this.$refs.toastNotification.showInfoToast('Please fill in all fields');
        return;
      }

      const postData = {
        username: this.userName,
        phone_number: this.phoneNumber.toString(),
        email: this.email,
        password: this.password,
      };

      try {
        this.loading_users = true;
        const response = await axios.post('https://authgateway.abooderp.com/api/v1/settings/user-management/users/store', postData);
        this.$refs.toastNotification.showSuccessToast('Successfully Data Created');
        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
      } catch (error) {
        console.error('Error response:', error.response?.data || error.message);
        this.$refs.toastNotification.showErrorToast('Error creating User:', error.response?.data || error.message);
      } finally {
        this.loading_users = false;
        this.officeName = '';
        this.selectedBranch = null;
      }
    },

    handleEdit(service) {
      console.log('Selected Service:', service);

      if (!service || !service.id) {
        this.$refs.toastNotification.showErrorToast('Service ID is missing');
        return;
      }
      this.selectedService = this.services.find((s) => s.id === service.service_id);

      if (!this.selectedService) {
        console.error('Service not found');
        return;
      }

      this.permission_name = service.permission_name;

      this.$nextTick(() => {
        if (this.editModalInstance) {
          this.editModalInstance.show();
        } else {
          console.error('Edit modal instance is not defined');
        }
      });
    },

    async handleUpdate() {
      this.loading_permissions = true;
      console.log('Selected Service:', this.selectedService);
      console.log('Permission Name:', this.permission_name);
      const payload = {
        services: this.selectedService ? this.selectedService.id : null,
        permission_name: this.permission_name,
      };
      console.log('Payload for update:', payload);
      if (!this.selectedService || !this.selectedService.id) {
        console.error('Error: Selected Service is missing or invalid.');
        this.$refs.toastNotification.showErrorToast('Selected Service is missing or invalid');
        this.loading_permissions = false;
        return;
      }

      try {
        const response = await axios.put(`https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/update/${this.selectedUser.id}`, payload);
        this.$refs.toastNotification.showSuccessToast('Permission updated successfully');
        await this.fetchData();
        if (this.$refs.registerModal) {
          this.$refs.registerModal.hide();
        }
      } catch (error) {
        console.error('Error updating permission:', error.response || error.message);
        this.$refs.toastNotification.showErrorToast('Error updating permission:', error);
      } finally {
        this.loading_permissions = false;
      }
    },

    async handleDelete(user) {
      if (!user.id) {
        this.$refs.toastNotification.showErrorToast('User ID is missing');
        return;
      }

      const confirmed = confirm(`Are you sure you want to delete the user: ${user.username}?`);

      if (!confirmed) {
        return;
      }

      try {
        const response = await axios.delete(`https://authgateway.abooderp.com/api/v1/settings/user-management/users/delete/${user.id}`);

        this.$refs.toastNotification.showSuccessToast('User deleted successfully');

        await this.fetchData();
      } catch (error) {
        console.error('Error deleting user:', error.response?.data || error.message);
        this.$refs.toastNotification.showErrorToast('Error deleting user:', error.response?.data || error.message);
      }
    },
  },

  computed: {
    columns() {
      return ['sn', 'username', 'phone_number', 'email', 'actions'];
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
        
    