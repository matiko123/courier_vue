<template>
  <div :class="[$store.state.layout_style, $store.state.menu_style]">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>
  
  <script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import '@/assets/sass/app.scss';
import { useMeta } from '@/composables/use-meta';

useMeta({ title: 'ABS | COURIER' });

const store = useStore();
const router = useRouter();

const layout = computed(() => {
  return store.getters.layout === 'auth' ? 'authLayout' : 'appLayout';
});

const checkTokenExpiration = () => {
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  const currentTime = Math.floor(Date.now() / 1000);
  if (tokenExpiry && currentTime >= parseInt(tokenExpiry)) {
    store.commit('logout');
    router.push({ name: 'Login' });
  }
};

let tokenCheckInterval;

onMounted(() => {
  tokenCheckInterval = setInterval(checkTokenExpiration, 50000);
});

onUnmounted(() => {
  clearInterval(tokenCheckInterval);
});
</script>
  
  <script>
import authLayout from './layouts/auth-layout.vue';
import appLayout from './layouts/app-layout.vue';

export default {
  components: {
    appLayout,
    authLayout,
  },
  methods: {
    updateActivity() {
      this.$store.dispatch('updateLastActionTime');
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.updateActivity);
    window.addEventListener('click', this.updateActivity);
  },
};
</script>
  