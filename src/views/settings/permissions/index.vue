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
                Assign User Permission
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
                        <span class="inv-number centered">{{ props.row.user_name }}</span>
                      </template>
                      <template v-slot:permissions="props">
                        <div class="d-flex flex-wrap">
                          <span v-for="permission in props.row.permissions" :key="permission" class="badge badge-primary text-light m-1">
                            {{ permission }}
                          </span>
                        </div>
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

    <!-- Permission create Modal -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Create User Permissions</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmitPermissions">
              <div class="row">
                <div class="col-md-12">
                  <div class="input-group mb-2">
                    <label for="user" class="form-label">Select User</label>
                    <multiselect v-model="selectedUser" :options="users" :searchable="true" placeholder="Select user" :custom-label="customUserLabel" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="input-group mb-2">
                    <label for="permissions" class="form-label">Select Permissions</label>
                    <div class="permissions-grid">
                      <div v-for="permission in permissions" :key="permission.id" class="form-check permission-item">
                        <input type="checkbox" class="form-check-input" :value="permission.id" v-model="selectedPermissions" :checked="permission.assigned" />
                        <label class="form-check-label">{{ permission.permission }}</label>
                      </div>
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
      permissions: [],
      selectedUser: null,
      selectedPermissions: [],
      loading_permissions: false,
      registerModalInstance: null,
      editModalInstance: null,
    };
  },

  mounted() {
    this.fetchUsers();
    this.fetchData();
    this.initializeModals();
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

    fetchUsers() {
      axios
        .get('https://authgateway.abooderp.com/api/v1/settings/user-management/users/index')
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching User Data:', error);
        });
    },

    fetchPermissions() {
      axios
        .get('https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/index')
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching User Data:', error);
        });
    },

    fetchUserPermissions(userId) {
      axios
        .get(`https://authgateway.abooderp.com/api/v1/settings/user-management/users/${userId}/permissions`)
        .then((response) => {
          this.permissions = response.data.all_permissions;
          const assignedPermissions = response.data.user_permissions;
          this.permissions.forEach((permission) => {
            permission.assigned = assignedPermissions.includes(permission.id);
          });

          this.selectedPermissions = assignedPermissions;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching User Permissions:', error);
        });
    },

    customUserLabel(user) {
      return user.username;
    },

    async fetchData() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/index');
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
        user_id: this.selectedUser.id,
        permission_ids: this.selectedPermissions,
      };

      try {
        const response = await axios.post('https://authgateway.abooderp.com/api/v1/settings/user-management/permissions/assign', payload);
        this.$refs.toastNotification.showSuccessToast('Permissions assigned successfully');

        await this.fetchData();

        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error assigning Permissions:', error);
      } finally {
        this.loading_permissions = false;
      }
    },
  },

  watch: {
    selectedUser(newUser) {
      if (newUser) {
        this.fetchUserPermissions(newUser.id);
      }
    },
  },

  computed: {
    columns() {
      return ['sn', 'username', 'permissions'];
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

.permissions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

.permission-item {
  display: flex;
  align-items: center;
}

.permission-item .form-check-input {
  margin-right: 8px;
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
        
    