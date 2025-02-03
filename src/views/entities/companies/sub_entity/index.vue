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
                    <li class="breadcrumb-item active" aria-current="page"><span>Sub Entity</span></li>
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
                  <!-- Your table or other content here -->
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

    <!-- Modal for Registering Sub entity -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerBranchModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Register Company Sub Entity</h5>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="company_entity" class="form-label">Company Entity <span class="text-danger">*</span></label>
                  <div class="input-group mb-2">
                    <multiselect v-model="selectedCompanyEntity" :options="company_entities" :searchable="true" placeholder="Select Company Entity" :custom-label="customLabel" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="entity" class="form-label">Entity <span class="text-danger">*</span></label>
                  <div class="input-group mb-2">
                    <multiselect v-model="selectedEntity" :options="entities" :searchable="true" placeholder="Select Entity" :custom-label="customLabel" />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="sub_agent" class="form-label">Sub Agent <span class="text-danger">*</span></label>
                  <div class="input-group mb-2">
                    <multiselect v-model="selectedSubAgent" :options="sub_agents" :searchable="true" placeholder="Select Sub Agent" :custom-label="customLabel" />
                  </div>
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
      company_entities: [],
      entities: [],
      sub_agents: [],
      items: [],
      selectedCompanyEntity: null,
      selectedEntity: null,
      selectedSubAgent: null,
      register: false,
    };
  },
  mounted() {
    this.fetchCreatedData();
    this.fetchData();
    this.$nextTick(() => {
      this.initializeModals();
    });
  },
  methods: {
    customLabel(option) {
      return option.name;
    },
    initializeModals() {
      if (this.$refs.registerBranchModal) {
        this.registerModalInstance = new bootstrap.Modal(this.$refs.registerBranchModal);
      }
    },
    getSerialNumber(index) {
      return index + 0;
    },
    async fetchCreatedData() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/company-sub-entity/create');
        const data = response.data.data;
        this.company_entities = data.company_entities;
        this.entities = data.entities;
        this.sub_agents = data.sub_agents;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching Entity:', error.response?.data || error.message);
      }
    },
    async handleSubmit() {
      if (!this.selectedCompanyEntity || !this.selectedEntity || !this.selectedSubAgent) {
        this.$refs.toastNotification.showInfoToast('Please fill in all required fields.');
        return;
      }

      const postData = {
        company_entity_id: this.selectedCompanyEntity.id,
        entity_id: this.selectedEntity.id,
        sub_agent_id: this.selectedSubAgent.id,
      };

      try {
        this.register = true;
        const response = await axios.post('https://authgateway.abooderp.com/api/v1/company-sub-entity/store', postData);
        this.$refs.toastNotification.showSuccessToast('Company Sub Entity registered successfully');
        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
        this.resetForm();
      } catch (error) {
        console.error('Error submitting data:', error.response ? error.response.data : error.message);
        this.$refs.toastNotification.showErrorToast('Failed to register company sub entity. Please try again.');
      } finally {
        this.register = false;
      }
    },
    resetForm() {
      this.selectedCompanyEntity = null;
      this.selectedEntity = null;
      this.selectedSubAgent = null;
    },
    async fetchData() {
      try {
        const response = await axios.get('https://authgateway.abooderp.com/api/v1/company-sub-entity/index');
        this.items = response.data.data;
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error fetching Entity:', error.response?.data || error.message);
      }
    },
  },
  computed: {
    columns() {
      return ['sn', 'company_sub_entity_name', 'company_entity_name'];
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
  vertical-align: -0.125em;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border 0.75s linear infinite;
  animation: spinner-border 0.75s linear infinite;
}
.breadcrumb-1 {
  align-items: end;
  display: flex;
  justify-content: end;
  background: #fcfcfc;
}
</style>
