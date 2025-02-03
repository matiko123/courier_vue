<template>
  <div class="layout-px-spacing apps-invoice-list">
    <!-- Main form -->
    <div class="row invoice layout-top-spacing layout-spacing apps-invoice">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <ul class="navbar-nav breadcrumb-1">
          <li>
            <div class="page-header">
              <nav class="breadcrumb-one" aria-label="breadcrumb">
                <ol class="breadcrumb pt-2 ml-3">
                  <li class="breadcrumb-item"><a href="javascript:;">Settings</a></li>
                  <li class="breadcrumb-item active" aria-current="page"><span>Service -Points</span></li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="row layout-top-spacing">
          <div class="col-xl-12 layout-spacing">
            <div class="col-lg-12 d-flex justify-content-end">
              <button v-if="checkPermission('CAN CREATE SERVICE POINTS')" type="button" class="btn btn-info mb-1 mr-2 text-bold" data-bs-toggle="modal" data-bs-target="#slidedownModal">
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
                      <template v-slot:office_name="props">
                        <span class="inv-number centered">{{ props.row.office_name }}</span>
                      </template>
                      <template v-slot:service_point_name="props">
                        <div class="d-flex">
                          <p class="align-self-center centered mb-0 admin-name">{{ props.row.service_point_name }}</p>
                        </div>
                      </template>
                      <template v-slot:actions="props">
                        <div class="d-flex">
                        <button v-if="checkPermission('CAN DELETE SERVICE POINTS')" class="btn btn-primariy bg-none btn-sx me-3" @click="handleEdit(props.row)">
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
                        <button v-if="checkPermission('CAN DELETE SERVICE POINTS')" class="btn btn-primariy bg-none btn-sx" @click="handleDelete(props.row.id)">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="red" 
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
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
    </div>

    <!-- Office Register Modal -->
    <div class="modal animated slideInDown" id="slidedownModal" tabindex="-1" role="dialog" aria-labelledby="slidedownModalLabel" aria-hidden="true" ref="registerModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="slidedownModalLabel">Register Service Point</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-12">
                  <div class="input-group mb-2">
                    <label for="company" class="form-label">Select Office</label>
                    <multiselect v-model="selectedOffice" :options="offices" :searchable="true" placeholder="Select office" :custom-label="customLabel" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="input-group mb-2">
                    <label for="branch" class="form-label">Service point Name</label>
                    <div class="input-group mb-2">
                      <input type="text" id="service_point" class="form-control" v-model="servicePointName" placeholder="Enter service point name" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"><i class="flaticon-cancel-12"></i> Discard</button>
                <div class="col-md-3 mt-1">
                  <button type="submit" class="btn btn-primary me-2" :disabled="loading_service_point">
                    <span v-if="loading_service_point" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-if="!loading_service_point">Register</span>
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
            <h5 class="modal-title" id="editModalLabel">Edit Service Point</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleUpdate">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="branch" class="form-label">Select Office</label>
                  <multiselect v-model="selectedOffice" :options="offices" :searchable="true" placeholder="Select Office" :custom-label="customLabel" track-by="id" label="name" />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="servicePointName" class="form-label">Service Point Name</label>
                  <div class="input-group mb-2">
                    <input type="text" id="servicePointName" class="form-control" v-model="servicePointName" placeholder="Enter service point name" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Discard</button>
                <button type="submit" class="btn btn-primary" :disabled="update_service_point">
                  <span v-if="update_service_point" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span v-if="!update_service_point">Update</span>
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
  components: {
    Multiselect,
    ToastNotification,
  },
  data() {
    return {
      offices: [],
      servicePointName: '',
      selectedOffice: null,
      items: [],
      loading_service_point: false,
      update_service_point: false,
      selectedOfficeId: null,
      editModalInstance: null,
      registerModalInstance: null,
    };
  },

  mounted() {
    this.fetchOffices();
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

    checkPermission(permission) {
      return userHasPermission(permission);
    },

    fetchOffices() {
      axios
        .get('https://abcourier.co.tz/admin-api/api/v1/masters/offices')
        .then((response) => {
          this.offices = response.data.data;
        })
        .catch((error) => {
          this.$refs.toastNotification.showErrorToast('Error fetching offices:', error);
        });
    },

    async fetchData() {
      try {
        const response = await axios.get('https://abcourier.co.tz/admin-api/api/v1/service_points/index');
        this.items = response.data.data;
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
      if (!this.servicePointName || !this.selectedOffice) {
        this.$refs.toastNotification.showInfoToast('Please fill in all fields');
        return;
      }

      const postData = {
        name: this.servicePointName,
        office_id: this.selectedOffice.id,
      };

      try {
        this.loading_service_point = true;
        const response = await axios.post('https://abcourier.co.tz/admin-api/api/v1/service_points/store', postData);
        this.$refs.toastNotification.showSuccessToast('Successfully Data Created');
        if (this.registerModalInstance) {
          this.registerModalInstance.hide();
        }
      } catch (error) {
        console.error();
        this.$refs.toastNotification.showErrorToast('Error creating office:', error.response?.data || error.message);
      } finally {
        this.loading_service_point = false;
        this.servicePointName = '';
        this.selectedOffice = null;
        this.fetchData();
      }
    },

    handleEdit(servicePoint) {
      this.servicePointName = servicePoint.service_point_name;
      this.selectedOffice = this.offices.find((office) => office.name === servicePoint.office_name);
      this.selectedOfficeId = servicePoint.id;

      this.$nextTick(() => {
        if (this.editModalInstance) {
          this.editModalInstance.show();
        }
      });
    },

    async handleUpdate() {
      if (!this.selectedOffice || !this.selectedOfficeId) {
        this.$refs.toastNotification.showInfoToast('Please select an office and ensure the office ID is set.');
        return;
      }

      const updateData = {
        name: this.servicePointName,
        office_id: this.selectedOffice.id,
      };

      try {
        this.update_service_point = true;

        const url = `https://abcourier.co.tz/admin-api/api/v1/service_points/update/${this.selectedOfficeId}`; // Use selectedOfficeId correctly

        const response = await axios.put(url, updateData);

        this.$refs.toastNotification.showSuccessToast('Service Point data updated.');

        if (this.editModalInstance) {
          this.editModalInstance.hide();
        }
        this.fetchData();
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error updating service point:', error.response?.data || error.message);
      } finally {
        this.update_service_point = false;
        this.servicePointName = '';
        this.selectedOffice = null;
      }
    },

    async handleDelete(servicePointId) {
      const confirmDelete = confirm('Are you sure you want to delete this service point?');

      if (!confirmDelete) {
        return;
      }

      try {
        const url = `https://abcourier.co.tz/admin-api/api/v1/service_points/delete/${servicePointId}`;
        await axios.delete(url);

        this.$refs.toastNotification.showSuccessToast('Service Point deleted successfully.');
        this.fetchData();
      } catch (error) {
        this.$refs.toastNotification.showErrorToast('Error deleting service point:', error.response?.data || error.message);
      }
    },
  },

  computed: {
    columns() {
      return ['sn', 'office_name', 'service_point_name', 'actions'];
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
        
    