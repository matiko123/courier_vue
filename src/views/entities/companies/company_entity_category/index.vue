<template>
  <div class="layout-px-spacing apps-invoice-list">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Company</a></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Entity</span></li>
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
                    <li class="breadcrumb-item"><a href="javascript:;">Company</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>Entity</span></li>
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
    </div>

    <!-- model for register branches  -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerBranchModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Register Company Entity Category</h5>
            <button type="button" data-dismiss="modal" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="company" class="form-label">Company Entity</label>
                  <multiselect v-model="selectedCompanyEntity" :options="company_entity" :searchable="true" placeholder="Select Company" :custom-label="customLabel" required />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="company" class="form-label">Entity Category</label>
                  <multiselect v-model="selectedEntityCategory" :options="entity_category" :searchable="true" placeholder="Select Entity" :custom-label="customLabel" required />
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn" data-dismiss="modal" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <div class="col-md-3 mt-1">
                  <button type="submit" class="btn btn-primary" :disabled="register">
                    <span v-if="register" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="!register">Register</span>
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
      company_entity: [],
      entity_category: [],
      items: [],
      selectedEntityCategory: null,
      selectedCompanyEntity: null,
      register: false,
      registerModalInstance: null,
      editModalInstance: null,
    };
  },

  mounted() {
    this.createData();
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

    async createData() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/company-entity-category/create');
        const data = response.data.data;
        this.company_entity = data.company_entity;
        this.entity_category = data.entity_category;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching created Data:', error.response?.data || error.message);
      }
    },

    async handleSubmit() {
      if (!this.selectedCompanyEntity || !this.selectedEntityCategory) {
        this.$refs.toastNotification.showInfoToast('Please fill in all fields.');
        return;
      }

      const postData = new FormData();
      postData.append('company_entity_id', this.selectedCompanyEntity.id);
      postData.append('entity_category_id', this.selectedEntityCategory.id);

      try {
        this.register = true;
        const response = await axios.post('https://authgateway.abooderp.com/api/v1/company-entity-category/store', postData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$refs.toastNotification.showSuccessToast('Company entity created successfully');
        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
      } catch (error) {
        console.error('Error submitting data:', error.response ? error.response.data : error.message);
        this.$refs.toastNotification.showErrorToast('Failed to create company entity. Please try again.');
      } finally {
        this.register = false;
        this.selectedCompany = null;
        this.selectedEntity = null;
        this.fetchData();
      }
    },
    async fetchData() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/company-entity-category/index');
        this.items = response.data.data;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching data:', error.response?.data || error.message);
      }
    },
  },

  computed: {
    columns() {
      return ['sn', 'entity_category_name', 'company_entity_name'];
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
        