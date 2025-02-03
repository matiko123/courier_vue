<template>
<div class="text-center logout_spinner">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'Logout',
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      try {
        const token = sessionStorage.getItem('token');
        console.log('Token before logout:', token);
        
        if (token) {
          await axios.post('https://courierapi.iosuite.org/api/v1/user-masters/logout', {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        
        sessionStorage.clear();
        
        this.logout();
        
        console.log('Session storage after logout:', sessionStorage.getItem('token'));
        
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.error('Logout error:', error.response ? error.response.data : error.message);
        sessionStorage.clear();
        this.logout();
        this.$router.push({ name: 'Login' });
      }
    },
  },
  created() {
    this.handleLogout();
  },
};
</script>

<style>
.logout_spinner{
  position: absolute;
  display: flex;
  top: 40%;
  left: 50%;
}
</style>