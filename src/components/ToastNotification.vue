<template>
  <div ref="toastContainer"></div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'ToastNotification',
  data() {
    return {
      toast: null,
    };
  },
  mounted() {
    this.initializeToasts();
  },
  methods: {
    initializeToasts() {
      this.toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        padding: '2em',
      });
    },
    showSuccessToast(message) {
      if (this.toast) {
        this.toast.fire({
          icon: 'success',
          title: message || 'Operation successful',
        });
      } else {
        console.error('Toast not initialized');
      }
    },
    showErrorToast(message) {
      if (this.toast) {
        this.toast.fire({
          icon: 'error',
          title: message || 'Operation failed',
        });
      } else {
        console.error('Toast not initialized');
      }
    },
    showInfoToast(message) {
      if (this.toast) {
        this.toast.fire({
          icon: 'info',
          title: message || 'Operation failed',
        });
      } else {
        console.info('Toast not initialized');
      }
    },
  },
  
};
</script>

<style scoped>
</style>
