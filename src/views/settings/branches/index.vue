<template>
  <div class="layout-px-spacing apps-invoice-list">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Settings</a></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Branches</span></li>
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
                      <template v-slot:entity_id="props">
                        <span class="inv-number centered">{{ props.row.company_name }}</span>
                      </template>
                      <template v-slot:city_id="props">
                        <div class="d-flex">
                          <p class="align-self-center centered mb-0 admin-name">{{ props.row.city_name }}</p>
                        </div>
                      </template>
                      <template v-slot:name="props">
                        <div class="d-flex">
                          <p class="align-self-center centered mb-0 admin-name">{{ props.row.branch_name }}</p>
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

    <!-- model for register branches  -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerBranchModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Register Branch</h5>
            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="branch" class="form-label">Branch Name</label>
                  <div class="input-group mb-2">
                    <input type="text" id="branch" class="form-control" v-model="branchName" placeholder="Enter branch name" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="company" class="form-label">Company</label>
                  <multiselect v-model="selectedCompany" :options="company" :searchable="true" placeholder="Select Company" :custom-label="customLabel" />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="city" class="form-label">City</label>
                  <multiselect v-model="selectedCity" :options="city" :searchable="true" placeholder="Select City" :custom-label="customLabel" />
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <div class="col-md-3 mt-1">
                  <button type="submit" class="btn btn-primary" :disabled="register_branch">
                    <span v-if="register_branch" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="!register_branch">Register</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for update branches -->
    <div class="modal animated slideInDown" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" ref="editBranchModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Branch</h5>
            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdate">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="branch" class="form-label">Branch Name</label>
                  <div class="input-group mb-2">
                    <input type="text" id="branch" class="form-control" v-model="branchName" placeholder="Enter branch name" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="company" class="form-label">Company</label>
                  <multiselect v-model="selectedCompany" :options="company" :searchable="true" placeholder="Select Company" :custom-label="customLabel" track-by="entity_id" label="name" />
                </div>
                <div class="col-md-12 mb-3">
                  <label for="city" class="form-label">City</label>
                  <multiselect v-model="selectedCity" :options="city" :searchable="true" placeholder="Select City" :custom-label="customLabel" track-by="city_id" label="name" />
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <div class="col-md-3 mt-1">
                  <button type="submit" class="btn btn-primary" :disabled="update_branch">
                    <span v-if="update_branch" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="!update_branch">Update</span>
                  </button>
                </div>
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
      company: [],
      city: [],
      branchName: '',
      selectedCompany: null,
      selectedCity: null,
      items: [],
      register_branch: false,
      update_branch: false,
      selectedBranch: null,
      registerModalInstance: null,
      editModalInstance: null,
    };
  },

  mounted() {
    this.fetchCompany();
    this.fetchCity();
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

    initializeModals() {
      if (this.$refs.editBranchModal && this.$refs.registerBranchModal) {
        this.editModalInstance = new bootstrap.Modal(this.$refs.editBranchModal);
        this.registerModalInstance = new bootstrap.Modal(this.$refs.registerBranchModal);
      }
    },

    async fetchCompany() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/masters/companies');
        this.company = response.data.data;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching companies:', error.response?.data || error.message);
      }
    },

    async fetchCity() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/masters/cities');
        this.city = response.data.data;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching cities:', error.response?.data || error.message);
      }
    },

    async fetchBranches() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/masters/branches');
        this.branches = response.data.map((branch) => ({
          id: branch.id,
          branch_name: branch.branch_name,
          city_id: branch.city_id,
          entity_id: branch.entity_id,
        }));
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching branches:', error);
      }
    },

    async fetchData() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/settings/branch/index');
        this.items = response.data.items;
        //this.$refs.toastNotification.showSuccessToast('Successfully fetched data');
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching data:', error.response?.data || error.message);
      }
    },

    async handleSubmit() {
      if (!this.branchName || !this.selectedCompany || !this.selectedCity) {
        this.$refs.toastNotification.showInfoToast('Please fill in all fields.');
        return;
      }

      const postData = {
        name: this.branchName,
        city_id: this.selectedCity.id,
        entity_id: this.selectedCompany.id,
      };

      try {
        this.register_branch = true;
        const response = await axios.post('https://abcourier.co.tz/admin-api/api/v1/settings/branch/create', postData);
        this.$refs.toastNotification.showSuccessToast('Branch created successfully');
        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
      } catch (error) {
        this.$refs.toastNotification.showErrorToast("'Failed to create branch. Please try again.'");
      } finally {
        this.register_branch = false;
        this.branchName = '';
        this.selectedCompany = null;
        this.selectedCity = null;
        this.fetchData();
      }
    },
    handleEdit(branch) {
      this.selectedBranch = branch;
      this.branchName = branch.branch_name;

      this.selectedCompany = this.company.find((company) => company.id === branch.entity_id);
      this.selectedCity = this.city.find((city) => city.id === branch.city_id);

      this.selectedBranchId = branch.id;

      this.$nextTick(() => {
        if (this.editModalInstance) {
          this.editModalInstance.show();
        } else {
          this.$refs.toastNotification.showErrorToast('Edit modal instance is not initialized.');
        }
      });
    },

    async handleUpdate() {
      const updateData = {
        name: this.branchName,
        city_id: this.selectedCity.id,
        entity_id: this.selectedCompany.id,
      };

      try {
        this.update_branch = true;

        const branchId = this.selectedBranch.id;
        const response = await axios.put(`https://abcourier.co.tz/admin-api/api/v1/settings/branch/update/${branchId}`, updateData);

        this.$refs.toastNotification.showSuccessToast('Branch updated Successfully');

        if (this.editModalInstance) {
          this.editModalInstance.hide();
        }

        this.fetchData();
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Failed to update branch. Please try again.');
      } finally {
        this.update_branch = false;
        this.branchName = '';
        this.selectedCompany = null;
        this.selectedCity = null;
        this.selectedBranch = null;
      }
    },
  },

  computed: {
    columns() {
      return ['sn', 'branch_name', 'city_name', 'company_name', 'actions'];
    },
  },
};
</script>
  <style scoped>
.invoice-inbox {
  margin: 0 auto;
  color: #001028;
  background: #ffffff;
  font-family: 'DejaVu Sans Mono';
  font-size: 14px;
}

.centered {
  text-align: center;
}

.spinner-border {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: text-bottom;
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
  