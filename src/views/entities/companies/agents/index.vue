<template>
  <div class="layout-px-spacing apps-invoice-list">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Companies</a></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Agents</span></li>
              </ol>
            </nav>
          </div>
        </li>
      </ul>
    </teleport>

    <div class="row">
      <div class="col-md-12">
        <div class="row layout-top-spacing">
          <!-- breadcrumb -->
          <ul class="navbar-nav breadcrumb-1">
            <li>
              <div class="page-header">
                <nav class="breadcrumb-one" aria-label="breadcrumb">
                  <ol class="breadcrumb pt-2 ml-3">
                    <li class="breadcrumb-item"><a href="javascript:;">Companies</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>Agents</span></li>
                  </ol>
                </nav>
              </div>
            </li>
          </ul>
          <!-- end of breadcrumb -->
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
                <div class="invoice-inbox m-2">
                  <v-client-table :data="items" :columns="columns">
                    <template v-slot:sn="props">
                      <span class="data-id centered">{{ getSerialNumber(props.index) }}</span>
                    </template>
                  </v-client-table>
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
            <h5 class="modal-title" id="slidedownModalLabel">Register Entity</h5>
            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="branch" class="form-label">Name</label>
                  <div class="input-group mb-2">
                    <input type="text" id="branch" class="form-control" v-model="EntityName" placeholder="Enter branch name" required />
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="branch" class="form-label">Abbreviation</label>
                  <div class="input-group mb-2">
                    <input type="text" id="abbreviaton" class="form-control" v-model="Abbreviation" placeholder="Enter Abbreviation" required />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="company" class="form-label">Company</label>
                  <multiselect v-model="selectedCompany" :options="company" :searchable="true" placeholder="Select Company" :custom-label="customLabel" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="company" class="form-label">Type</label>
                  <multiselect v-model="selectedType" :options="typeOptions" :searchable="true" placeholder="Select Type" :custom-label="customLabel" required />
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="avatar_url" class="form-label">Upload Avatar</label>
                  <input type="file" id="avator_url" class="form-control" @change="onFileChange" />
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <label for="branch" class="form-label">Descriptions</label>
                <div class="input-group mb-2">
                  <textarea id="descriptions" v-model="Description" placeholder="Enter Descriptions" class="form-control" cols="20" rows="3"></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <div class="col-md-3 mt-1">
                  <button type="submit" class="btn btn-primary" :disabled="register_entity">
                    <span v-if="register_entity" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="!register_entity">Register</span>
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
      items: [],
      type: [],
      Description: '',
      selectedCompany: null,
      Abbreviation: '',
      EntityName: '',
      avatar_url: null,
      register_entity: false,
      update_branch: false,
      registerModalInstance: null,
      editModalInstance: null,
      selectedType: null,
      typeOptions: [
        { value: 'COMPANY', name: 'Company' },
        { value: 'INDIVIDUAL', name: 'Individual' },
        { value: 'ESTATE', name: 'Estate' },
      ],
    };
  },

  mounted() {
    this.fetchCompany();
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
      if (this.$refs.registerBranchModal) {
        this.registerModalInstance = new bootstrap.Modal(this.$refs.registerBranchModal);
      }
    },

    async fetchCompany() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/entities/create');
        this.company = response.data.data;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching companies:', error.response?.data || error.message);
      }
    },

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatar_url = file;
      }
    },

    async handleSubmit() {
      if (!this.EntityName || !this.selectedType || !this.selectedCompany) {
        this.$refs.toastNotification.showErrorToast('Please fill in all required fields.');
        return;
      }

      const formData = new FormData();
      formData.append('name', this.EntityName);
      formData.append('abbreviation', this.Abbreviation);
      formData.append('type', this.selectedType.value);
      formData.append('company', this.selectedCompany.name);
      formData.append('description', this.Description);
      if (this.avatar_url) {
        formData.append('avatar', this.avatar_url);
      }

      this.register_entity = true;

      try {
        const response = await axios.post('https://authgateway.abooderp.com/api/v1/entities', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.$refs.toastNotification.showSuccessToast('Entity registered successfully!');
        this.fetchData(); 
        this.registerModalInstance.hide();
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error registering entity:', error.response?.data || error.message);
      } finally {
        this.register_entity = false;
      }
    },

    async fetchData() {
      try {
      //  https://authgateway.abooderp.com
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/entities/index');
        this.items = response.data.data;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching data:', error.response?.data || error.message);
      }
    },
  },
  computed: {
    columns() {
      return ['sn', 'uuid', 'code', 'name', 'abbreviation', 'type', 'description'];
    }
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
.is-invalid {
  border-color: red;
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
.breadcrumb-1 {
  align-items: end;
  display: flex;
  justify-content: end;
  background: #fcfcfc;
}
</style>
    