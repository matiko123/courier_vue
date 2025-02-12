<template>
    <!--  BEGIN SIDEBAR  -->
    <div class="sidebar-wrapper sidebar-theme">
      <nav ref="menu" id="sidebar">
        <div class="shadow-bottom"></div>
  
        <perfect-scrollbar class="list-unstyled menu-categories" tag="ul" :options="{ wheelSpeed: 0.5, swipeEasing: !0, minScrollbarLength: 40, maxScrollbarLength: 300, suppressScrollX: true }">
          <li class="menu">
            <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#dashboard" aria-controls="dashboard" aria-expanded="false">
              <div class="">
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
                  class="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>{{ $t('dashboard') }}</span>
              </div>
              <div>
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
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </a>
  
            <ul id="dashboard" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
              <li>
                <router-link to="/" @click="toggleMobileMenu">
                  {{ $t('sales') }}
                </router-link>
              </li>
              <li>
                <router-link to="/index2" @click="toggleMobileMenu">
                  {{ $t('analytics') }}
                </router-link>
              </li>
            </ul>
          </li>
  
          <li class="menu">
            <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#apps" aria-controls="apps" aria-expanded="false">
              <div class="">
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
                  class="feather feather-cpu"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
                <span>{{ $t('operation') }}</span>
              </div>
              <div>
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
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </a>
            <ul id="apps" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
              <li>
                <router-link to="/apps/chat" @click="toggleMobileMenu">Scheduleso</router-link>
              </li>
              <li>
                <router-link to="/operation/report/sales" @click="toggleMobileMenu">Sales</router-link>
              </li>
              <li>
                <router-link to="/operation/dispatches" @click="toggleMobileMenu">Manifests</router-link>
              </li>
              <li>
                <a class="dropdown-toggle" href="#appInvoice" data-bs-parent="#apps" data-bs-toggle="collapse" role="button" aria-expanded="false">
                  Tickets
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
                    class="feather feather-chevron-right"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </a>
  
                <ul id="appInvoice" class="collapse list-unstyled sub-submenu">
                  <li>
                    <router-link to="/operation/consolidations" @click="toggleMobileMenu">Active</router-link>
                  </li>
                  <li>
                    <router-link to="/apps/invoice/preview" @click="toggleMobileMenu">Reschedules</router-link>
                  </li>
                  <li>
                    <router-link to="/apps/invoice/add" @click="toggleMobileMenu">Cancelled</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
  
          <li class="menu">
            <a class="dropdown-toggle" data-bs-toggle="collapse" data-bs-target="#setup" aria-controls="setup" aria-expanded="false">
              <div class="menu-item">
                <!-- Settings Icon -->
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
                  class="feather feather-settings"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path
                    d="M19.4 15.4a3.5 3.5 0 0 0 .6-2.3v-1a3.5 3.5 0 0 0-.6-2.3l1.6-1.6a1 1 0 0 0 .2-1.2l-1.4-2.4a1 1 0 0 0-1.2-.5l-2.8 1.6a6.1 6.1 0 0 0-2.5-1.1l-.4-3.1a1 1 0 0 0-1-1H8.4a1 1 0 0 0-1 1l-.4 3.1a6.1 6.1 0 0 0-2.5 1.1l-2.8-1.6a1 1 0 0 0-1.2.5L.2 7.4a1 1 0 0 0 .2 1.2l1.6 1.6a3.5 3.5 0 0 0-.6 2.3v1a3.5 3.5 0 0 0 .6 2.3l-1.6 1.6a1 1 0 0 0-.2 1.2l1.4 2.4a1 1 0 0 0 1.2.5l2.8-1.6a6.1 6.1 0 0 0 2.5 1.1l.4 3.1a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1l.4-3.1a6.1 6.1 0 0 0 2.5-1.1l2.8 1.6a1 1 0 0 0 1.2-.5l1.4-2.4a1 1 0 0 0-.2-1.2l-1.6-1.6z"
                  ></path>
                </svg>
                <span>{{ $t('Settings') }}</span>
              </div>
              <div>
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
                  class="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </a>
            <ul id="setup" class="collapse submenu list-unstyled" data-bs-parent="#sidebar">
              <li>
                <router-link to="/settings/branches" @click="toggleMobileMenu">Branches</router-link>
              </li>
              <li>
                <router-link to="/settings/offices" @click="toggleMobileMenu">Offices</router-link>
              </li>
            </ul>
          </li>
        </perfect-scrollbar>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useStore } from 'vuex';
  const store = useStore();
  
  const menu_collapse = ref('dashboard');
  
  onMounted(() => {
    const selector = document.querySelector('#sidebar a[href="' + window.location.pathname + '"]');
    if (selector) {
      const ul = selector.closest('ul.collapse');
      if (ul) {
        let ele = ul.closest('li.menu').querySelectorAll('.dropdown-toggle');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      } else {
        selector.click();
      }
    }
  });
  
  const toggleMobileMenu = () => {
    if (window.innerWidth < 991) {
      store.commit('toggleSideBar', !store.state.is_show_sidebar);
    }
  };
  </script>
  