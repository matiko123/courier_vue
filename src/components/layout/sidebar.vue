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

        <!--Outward Operations starts-->
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
                  class="feather feather-corner-right-up"
                >
                  <polyline points="10 9 15 4 20 9"></polyline>
                  <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
                </svg>
              <span>{{ $t('Outward Operation') }}</span>
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
              <router-link to="/apps/chat" @click="toggleMobileMenu">Schedules</router-link>
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
        <!-- outward operations ends -->
         <!-- inward operation starts-->
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
                  class="feather feather-corner-right-down"
                >
                  <polyline points="10 15 15 20 20 15"></polyline>
                  <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                </svg>
              <span>{{ $t('Inward Operation') }}</span>
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
              <router-link to="/apps/chat" @click="toggleMobileMenu">Schedules</router-link>
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
          <!-- inward operation ends -->
           <!-- general reports starts -->
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
                  class="feather feather-file-text"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              
              <span>{{ $t('General Reports') }}</span>
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
              <router-link to="/apps/chat" @click="toggleMobileMenu">Schedules</router-link>
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
            <!-- general reports ends -->
             <!-- transactions starts -->
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
                  class="feather feather-repeat"
                >
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              
              <span>{{ $t('Transactions') }}</span>
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
              <router-link to="/apps/chat" @click="toggleMobileMenu">Schedules</router-link>
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
              <!-- transactions ends -->
               <!-- entries starts -->
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
                  class="feather feather-list"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3" y2="6"></line>
                  <line x1="3" y1="12" x2="3" y2="12"></line>
                  <line x1="3" y1="18" x2="3" y2="18"></line>
                </svg>
              
              <span>{{ $t('Entries') }}</span>
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
              <router-link to="/apps/chat" @click="toggleMobileMenu">Schedules</router-link>
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
                <!-- entries ends -->

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
                    d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
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
