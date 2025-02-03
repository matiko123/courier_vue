<template>
  <div class="layout-px-spacing apps-invoice-list">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="javascript:;">Entity</a></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Companies</span></li>
                <li class="breadcrumb-item active" aria-current="page"><span>Details</span></li>
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
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:;">Entities</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>Companies</span></li>
                    <li class="breadcrumb-item active" aria-current="page"><span>Details</span></li>
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

    <!-- Modal for Registering Branches -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerBranchModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Register Entity Company Details</h5>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="entity_name" class="form-label">Entity Name <span class="text-danger">*</span></label>
                  <div class="input-group mb-2">
                    <multiselect v-model="selectedEntity" :options="entity" :searchable="true" placeholder="Select Entity" :custom-label="customLabel" />
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="business_name" class="form-label">Business Name <span class="text-danger">*</span></label>
                  <div class="input-group mb-2">
                    <input type="text" id="business_name" class="form-control" v-model="BusinessName" placeholder="Enter Business Name" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="tin" class="form-label">TIN <span class="text-danger">*</span></label>
                  <input type="number" id="tin" class="form-control" v-model="TINNUMBER" placeholder="Enter TIN Number" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="vin" class="form-label">VIN</label>
                  <input type="number" id="vin" class="form-control" v-model="VINNumber" placeholder="Enter VIN Number" />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="business_licence" class="form-label">Business Licence</label>
                  <input type="text" id="business_licence" class="form-control" v-model="BusinessLicence" placeholder="Enter Business Licence" />
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <button type="submit" class="btn btn-primary" :disabled="register">
                  <span v-if="register" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!register">Register</span>
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
      entity: [],
      items: [],
      selectedEntity: null,
      register: false,
      BusinessName: '',
      TINNUMBER: '',
      VINNumber: '',
      BusinessLicence: '',
      register_entity: false,
      columns: ['sn', 'entity_name', 'business_name', 'business_licence', 'tin', 'vin'],
    };
  },

  mounted() {
    this.fetchEntity();
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

    async fetchEntity() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/entity-company-details/create');
        this.entity = response.data.data;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching Entity:', error.response?.data || error.message);
      }
    },

    async handleSubmit() {
      if (!this.BusinessName || !this.selectedEntity) {
        this.$refs.toastNotification.showInfoToast('Please fill in all required fields.');
        return;
      }

      const postData = new FormData();
      postData.append('business_name', this.BusinessName);
      postData.append('tin', this.TINNUMBER);
      postData.append('vin', this.VINNumber);
      postData.append('business_licence', this.BusinessLicence);
      postData.append('entity_id', this.selectedEntity.id);

      try {
        this.register = true;
        const response = await axios.post('https://authgateway.abooderp.com/api/v1/entity-company-details/store', postData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$refs.toastNotification.showSuccessToast('Entity company details created successfully');
        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
      } catch (error) {
        console.error('Error submitting data:', error.response ? error.response.data : error.message);
        this.$refs.toastNotification.showErrorToast('Failed to create entity company details . Please try again.');
      } finally {
        this.register = false;
        this.BusinessName = '';
        this.selectedEntity = null;
        this.TINNUMBER = '';
        this.VINNumber = '';
        this.BusinessLicence = '';
        this.avatar_url = null;
        this.fetchEntity();
        // this.fetchData();
      }
    },
    async fetchData() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/entity-company-details/index');
        this.items = response.data.data;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching data:', error.response?.data || error.message);
      }
    },

    // computed: {
    //   columns() {
    //     return ['sn', 'entity_name', 'business_name', 'business_licence', 'tin', 'vin'];
    //   },
    // },
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
.btn-primary.bg-none {
  border: 1px solid rgb(85, 144, 246);
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
}
.btn-primary.bg-none > svg {
  width: auto;
}

.breadcrumb-1 {
  align-items: end;
  display: flex;
  justify-content: end;
  background: #fcfcfc;
}
</style>
  