<template>
  <div class="form full-form auth-cover">
    <div class="login-title">
      <div class="logo-left">
        <div class="logo">
          <img src="../../assets/images/Abood.png" alt="Abood Logo" />
        </div>
      </div>
      <div class="logo-right">
        <h4>ABS COURIER</h4>
      </div>
    </div>
    <div class="form-container">
      <div class="form-form">
        <div class="form-form-wrap">
          <div class="form-container">
            <div class="form-content">
              <h1 class="login-head">Login</h1>
              <div class="login-panel">
                <form class="text-start" @submit.prevent="handleSubmit">
                  <div class="form">
                    <div id="username-field" class="field-wrapper input">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-user"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <input type="text" class="form-control" v-model="username" required placeholder="Username" />
                    </div>

                    <div id="password-field" class="field-wrapper input mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-lock"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="password" required placeholder="Password" />
                    </div>
                    <div class="d-sm-flex justify-content-between">
                      <div class="field-wrapper toggle-pass d-flex align-items-center">
                        <p class="d-inline-block">Show Password</p>
                        <label class="switch s-primary mx-2">
                          <input type="checkbox" class="custom-control-input" v-model="showPassword" />
                          <span class="slider round"></span>
                        </label>
                      </div>
                      <div class="field-wrapper">
                        <button :disabled="isSubmitting" type="submit" class="btn btn-primary">
                          <span class="d-flex align-items-center">
                            <span v-if="isSubmitting" role="status" aria-hidden="true">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-loader spin me-2"
                              >
                                <line x1="12" y1="2" x2="12" y2="6"></line>
                                <line x1="12" y1="18" x2="12" y2="22"></line>
                                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                <line x1="2" y1="12" x2="6" y2="12"></line>
                                <line x1="18" y1="12" x2="22" y2="12"></line>
                                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                              </svg>
                            </span>
                            <span v-if="!isSubmitting"> Log In</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- <div v-if="error" class="error">{{ error }}</div> -->
                </form>
              </div>
            </div>
          </div>
          <div class="login-footer">
            <span class="text-center">Abood Bus Services &copy; {{ new Date().getFullYear() }}</span>
          </div>
        </div>
      </div>
      <div class="form-image">
        <div class="l-image"></div>
      </div>
    </div>
    <ToastNotification ref="toastNotification" />
  </div>
</template>

<style scoped>
.login-title {
  background: rgb(255, 255, 255);
  border-radius: 10px;
  display: flex;
  box-shadow: 1px 3px 4px 4px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 600px;
  position: absolute;
  top: 5%;
  left: 35%;
  transform: translateX(-10%);
  z-index: 1000;
}

.logo-left,
.logo-right {
  display: flex;
  align-items: center;
}

.logo-right > h4 {
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
}

.logo > img {
  max-width: 190px;
  max-height: 190px;
}

.login-head {
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
}

.login-panel {
  background: rgb(255, 255, 255);
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 1px 3px 4px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 400px;
  text-align: center;
}

.login-footer {
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-bottom: 30px;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.login-button {
  font-size: 16px;
}

.error {
  color: red;
  margin-top: 1rem;
}

.spinner-container {
  display: inline-flex;
  align-items: center;
}

.feather-loader.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg); 
  }
}
</style>

<script>
import axios from 'axios';
import { useMeta } from '/src/composables/use-meta';
import '/src/assets/sass/authentication/auth.scss';
import { mapActions } from 'vuex';
import ToastNotification from '@/components/ToastNotification.vue';
import bcrypt from 'bcryptjs';

export default {
  components: {
    ToastNotification,
  },
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      error: null,
      isSubmitting: false,
      responseData: {},
    };
  },
  computed: {
    //first
  },
  methods: {
    ...mapActions(['authenticate']),
    // async handleSubmit() {
    //   if (this.isSubmitting) return;

    //   this.isSubmitting = true;
    //   try {
    //     const API_URL = 'https://courierapi.iosuite.org/api/v1/';
    //     const response = await axios.post(`${API_URL}login`, {
    //       username: this.username,
    //       password: this.password,
    //     });

    //     if (response.status === 200) {
    //       const scopes = response.data.data.scopes;
    //       const jwtToken = response.data.data.cookie.value;
    //       localStorage.setItem('jwtToken', jwtToken);
    //       // if (scopes.length > 0 && jwtToken) {
    //       //   const scopeToken = scopes[0].scope_token;
    //       //   localStorage.setItem('scopeToken', scopeToken);

    //       //   console.log("Successfully saved");
    //       //   this.authenticate(scopeToken);
    //       //   this.$router.push({ name: 'Home' });
    //       //   this.$refs.toastNotification.showSuccessToast('Login Successfully');
    //       // } else {
    //       //   throw new Error('No scope or JWT token found in response');
    //       // }

    //       if (scopes.length > 0 && jwtToken) {
    //         const scopeToken = scopes[0].scope_token;
    //         localStorage.setItem('scopeToken', scopeToken);

    //         console.log('Successfully saved');
    //         this.authenticate(scopeToken);
    //         this.$router.push(this.$route.query.redirect || { name: 'Home' });
    //         this.$refs.toastNotification.showSuccessToast('Login Successfully');
    //       } else {
    //         throw new Error('No scope or JWT token found in response');
    //       }
    //     } else {
    //       throw new Error('No scope found in response');
    //     }
    //   } catch (error) {
    //     this.$refs.toastNotification.showErrorToast('Login Error', error);
    //   } finally {
    //     this.isSubmitting = false;
    //   }
    // },

    // Add this function to decode the JWT
    parseJwt(token) {
      if (!token || typeof token !== 'string') {
        console.error('Invalid token provided:', token);
        throw new Error('Invalid token format');
      }
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          console.error('Token does not have three parts:', token);
          throw new Error('Invalid token structure');
        }
        const base64Url = parts[1];
        if (!base64Url) {
          throw new Error('Invalid token payload');
        }

        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );

        const parsed = JSON.parse(jsonPayload);
        console.log('Successfully parsed JWT payload:', parsed);
        return parsed;
      } catch (error) {
        console.error('Error parsing JWT:', error);
        throw new Error('Failed to parse JWT: ' + error.message);
      }
    },

    handleToken(token) {
      if (!token || typeof token !== 'string') {
        console.error('Invalid token provided:', token);
        throw new Error('Invalid token format');
      }
      console.log('Token received:', token);
      return token;
    },

    async handleSubmit() {
      if (this.isSubmitting) return;
      this.isSubmitting = true;
      try {
        const API_URL = 'https://abcourier.co.tz/admin-api/api/v1/';
        const response = await axios.post(`${API_URL}login`, {
          username: this.username,
          password: this.password,
        });

        console.log('Received response:', response);
        if (response.status === 200) {
          const { data } = response.data;
          this.responseData = response.data;

          sessionStorage.setItem('user-permission', JSON.stringify(data));
          console.log('Response data:', data);
          if (!data || !data.cookie || !data.cookie.value || !data.scopes) {
            console.error('Invalid response structure:', data);
            throw new Error('Invalid response structure');
          }
          const token = data.cookie.value;
          console.log('Token received:', token);
          let handledToken;
          try {
            handledToken = this.handleToken(token);
          } catch (error) {
            console.error('Error handling token:', error);
            throw new Error('Invalid token received from server');
          }
          const scopes = data.scopes;
          if (scopes.length > 0 && handledToken) {
            sessionStorage.setItem('token', handledToken);
            this.authenticate(handledToken);
            this.$router.push(this.$route.query.redirect || { name: 'Home' });
            this.$refs.toastNotification.showSuccessToast('Login Successful');
          } else {
            throw new Error('No scope or token found in response');
          }
        } else {
          throw new Error(`Failed to login: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
          errorMessage = `Server error: ${error.response.status} ${error.response.statusText}`;
        } else if (error.request) {
          console.error('Error request:', error.request);
          errorMessage = 'No response received from server';
        } else {
          console.error('Error message:', error.message);
          errorMessage = error.message;
        }

        this.$refs.toastNotification.showErrorToast('Login Error', errorMessage);
      } finally {
        this.isSubmitting = false;
      }
    },

    logout({ commit }) {
      commit('logout');
    },
    checkTokenExpiration() {
      const now = new Date().getTime();
      if (this.tokenExpiry && now >= this.tokenExpiry) {
        this.$store.dispatch('logout');
        this.$router.push({ name: 'Login' });
      }
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.updateActivity);
    window.addEventListener('click', this.updateActivity);
    this.tokenCheckInterval = setInterval(this.checkTokenExpiration, 300000);
  },
  beforeDestroy() {
    clearInterval(this.tokenCheckInterval);
  },
};
</script>
