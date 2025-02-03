<template>
  <div class="layout-px-spacing apps-invoice-list">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Settings</a></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Offices</span></li>
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
                Register
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
                      <template v-slot:branch_id="props">
                        <span class="inv-number centered">{{ props.row.company_name }}</span>
                      </template>
                      <template v-slot:name="props">
                        <div class="d-flex">
                          <p class="align-self-center centered mb-0 admin-name">{{ props.row.office_name }}</p>
                        </div>
                      </template>
                      <template v-slot:actions="props">
                        <button class="btn btn-primariy bg-none btn-sx" @click="handleEdit(props.row)">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
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

    <!-- Office Register Modal -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Register Office</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-12">
                  <div class="input-group mb-2">
                    <label for="company" class="form-label">Select Branches</label>
                    <multiselect v-model="selectedBranch" :options="branches" :searchable="true" placeholder="Select branch" :custom-label="customLabel" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="input-group mb-2">
                    <label for="branch" class="form-label">Office Name</label>
                    <div class="input-group mb-2">
                      <input type="text" id="office_name" class="form-control" v-model="officeName" placeholder="Enter office name" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <div class="col-md-3 mt-1">
                  <button type="submit" class="btn btn-primary me-2" :disabled="loading_office">
                    <span v-if="loading_office" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="!loading_office">Register</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Update Office -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" ref="editModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Office</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdate">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="officeName" class="form-label">Office Name</label>
                  <div class="input-group mb-2">
                    <input type="text" id="officeName" class="form-control" v-model="officeName" placeholder="Enter office name" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="branch" class="form-label">Branch Name</label>
                  <multiselect v-model="selectedBranch" :options="branches" :searchable="true" placeholder="Select Branch" :custom-label="customLabel" track-by="id" label="name" />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                <button type="submit" class="btn btn-primary" :disabled="update_office">
                  <span v-if="update_office" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!update_office">Update</span>
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
      branches: [],
      officeName: '',
      selectedBranch: null,
      items: [],
      loading_office: false,
      update_office: false,
      selectedOffice: null,
      selectedOfficeId: null,
      editModalInstance: null,
      registerModalInstance: null,
    };
  },

  mounted() {
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

    fetchBranches() {
      axios
        .get('https://abcourier.co.tz/admin-api/api/v1/masters/list-branches')
        .then((response) => {
          this.branches = response.data.data;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching branches:', error);
        });
    },

    async fetchData() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/settings/office/index');
        this.items = response.data.items;
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
      if (!this.officeName || !this.selectedBranch) {
        this.$refs.toastNotification.showInfoToast('Please fill in all fields');
        return;
      }

      const postData = {
        name: this.officeName,
        branch_id: this.selectedBranch.id,
      };

      try {
        this.loading_office = true;
        const response = await axios.post('https://abcourier.co.tz/admin-api/api/v1/settings/office/create', postData);
        this.$refs.toastNotification.showSuccessToast('Successfully Data Created');
        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
      } catch (error) {
        console.error();
        this.$refs.toastNotification.showErrorToast('Error creating office:', error.response?.data || error.message);
      } finally {
        this.loading_office = false;
        this.officeName = '';
        this.selectedBranch = null;
        this.fetchData();
      }
    },

    handleEdit(office) {
      if (!office || !office.id) {
        this.$refs.toastNotification.showErrorToast('Office object is missing or does not have an ID');
        return;
      }

      this.selectedOffice = office;
      this.officeName = office.office_name;
      this.selectedBranch = this.branches.find((branch) => branch.name === office.branch_name);
      this.selectedOfficeId = office.id;

      this.$nextTick(() => {
        if (this.editModalInstance) {
          this.editModalInstance.show();
        }
      });
    },

    async handleUpdate() {
      if (!this.selectedBranch || !this.selectedOfficeId) {
        this.$refs.toastNotification.showInfoToast('Please select a branch and make sure office id is set.');
        return;
      }

      const updateData = {
        name: this.officeName,
        branch_id: this.selectedBranch.id,
      };

      try {
        this.update_office = true;

        const officeId = this.selectedOfficeId;
        const url = `https://abcourier.co.tz/admin-api/api/v1/settings/office/update/${officeId}`;

        const response = await axios.put(url, updateData);

        this.$refs.toastNotification.showSuccessToast('Office data updated:');

        if (this.editModalInstance) {
          this.editModalInstance.hide();
        }
        this.fetchData();
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error updating office:', error.response?.data || error.message);
      } finally {
        this.update_office = false;
        this.officeName = '';
        this.selectedBranch = null;
      }
    },
  },

  computed: {
    columns() {
      return ['sn', 'branch_name', 'name', 'actions'];
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
      
  