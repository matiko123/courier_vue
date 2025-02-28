<template>
  <div>
    <!--  BEGIN NAVBAR  -->
    <div class="header-container fixed-top">
      <header class="header navbar navbar-expand-sm">
        <ul class="navbar-item theme-brand flex-row text-center">
          <li class="nav-item theme-logo bg-light rounded-5 p-2">
            <router-link to="/">
              <!-- <img src="@/assets/images/logo.svg" class="navbar-logo" alt="logo" /> -->
              <img src="@/assets/images/Abood.png" class="navbar-logo" alt="logo" />
            </router-link>
          </li>
          <li class="nav-item theme-text">
            <router-link to="/" class="nav-link"> ABS COURIER</router-link>
          </li>
        </ul>
        <div class="d-none horizontal-menu">
          <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom" @click="$store.commit('toggleSideBar', !$store.state.is_show_sidebar)">
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
              class="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </a>
        </div>
        <ul class="navbar-item flex-row ms-md-0 ms-auto">
          <li class="nav-item align-self-center search-animated" :class="{ 'show-search': $store.state.is_show_search }">
            <svg
              @click="$store.commit('toggleSearch', !$store.state.is_show_search)"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-search toggle-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <form class="form-inline search-full form-inline search" :class="{ 'input-focused': $store.state.is_show_search }">
              <div class="search-bar">
                <input type="text" class="form-control search-form-control ms-lg-auto" placeholder="Search..." />
              </div>
            </form>
          </li>
        </ul>

        <div class="navbar-item flex-row ms-md-auto">
          <div class="dark-mode d-none d-flex align-items-center">
            <a v-if="$store.state.dark_mode == 'light'" href="javascript:;" class="d-flex align-items-center" @click="toggleMode('dark')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-sun"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              <span class="ms-2">Light</span>
            </a>
            <a v-if="$store.state.dark_mode == 'dark'" href="javascript:;" class="d-flex align-items-center" @click="toggleMode('system')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-moon"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
              <span class="ms-2">Dark</span>
            </a>
            <a v-if="$store.state.dark_mode == 'system'" href="javascript:;" class="d-flex align-items-center" @click="toggleMode('light')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-airplay"
              >
                <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
                <polygon points="12 15 17 21 7 21 12 15"></polygon>
              </svg>
              <span class="ms-2">System</span>
            </a>
          </div>

          <div class="dropdown nav-item language-dropdown btn-group">
            <a href="javascript:;" id="ddllang" data-bs-toggle="dropdown" aria-expanded="false" class="btn dropdown-toggle btn-icon-only nav-link">
              <img v-if="selectedLang" :src="require(`@/assets/images/flags/${selectedLang.code}.png`)" class="flag-width" alt="flag" />
            </a>
            <ul class="dropdown-menu" aria-labelledby="ddllang">
              <perfect-scrollbar>
                <li v-for="item in countryList" :key="item.code">
                  <a href="javascript:;" class="dropdown-item d-flex align-items-center" :class="{ active: $i18n.locale === item.code }" @click.prevent="changeLanguage(item)">
                    <img :src="require(`@/assets/images/flags/${item.code}.png`)" class="flag-width" alt="" /> <span>{{ item.name }}</span>
                  </a>
                </li>
              </perfect-scrollbar>
            </ul>
          </div>
          <div class="media-body">
            <h5 class="usr-name" v-if="userData('username')">{{ userData('username') }}</h5>
          </div>

          <div class="dropdown nav-item notification-dropdown btn-group d-none">
            <a href="javascript:;" id="ddlnotify" data-bs-toggle="dropdown" aria-expanded="false" class="btn dropdown-toggle btn-icon-only nav-link">
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
                class="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span class="badge badge-success"></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="ddlnotify">
              <li role="presentation">
                <a href="javascript:;" class="dropdown-item">
                  <div class="media server-log">
                    <div class="media-aside align-self-start">
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
                        class="feather feather-server"
                      >
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6" y2="6"></line>
                        <line x1="6" y1="18" x2="6" y2="18"></line>
                      </svg>
                    </div>
                    <div class="media-body">
                      <div class="data-info">
                        <h6 class="">Server Rebooted</h6>
                        <p class="">45 min ago</p>
                      </div>

                      <div class="icon-status">
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
                          class="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li role="presentation">
                <hr role="separator" aria-orientation="horizontal" size="0" class="dropdown-divider" />
              </li>
              <li role="presentation">
                <a href="javascript:;" class="dropdown-item">
                  <div class="media">
                    <div class="media-aside align-self-start">
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
                        class="feather feather-heart"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </div>
                    <div class="media-body">
                      <div class="data-info">
                        <h6>Licence Expiring Soon</h6>
                        <p>8 hrs ago</p>
                      </div>
                      <div class="icon-status">
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
                          class="feather feather-x"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
              <li role="presentation">
                <hr role="separator" aria-orientation="horizontal" size="0" class="dropdown-divider" />
              </li>
              <li role="presentation">
                <a href="javascript:;" class="dropdown-item">
                  <div class="media file-upload">
                    <div class="media-aside align-self-start">
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
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div class="media-body">
                      <div class="data-info">
                        <h6>Kelly Portfolio.pdf</h6>
                        <p>670 kb</p>
                      </div>
                      <div class="icon-status">
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
                          class="feather feather-check"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <div class="dropdown nav-item user-profile-dropdown btn-group">
            <a href="javascript:;" id="ddluser" data-bs-toggle="dropdown" aria-expanded="false" class="btn dropdown-toggle btn-icon-only user nav-link">
              <img src="@/assets/images/profile-16.webp" alt="avatar" />
            </a>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="ddluser">
              <li role="presentation" class="d-none">
                <router-link to="/users/profile" class="dropdown-item">
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
                  Profile
                </router-link>
              </li>
              <li role="presentation">
                <router-link to="/logout" class="dropdown-item">
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
                    class="feather feather-log-out"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sign Out
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
    <!--  END NAVBAR  -->
    <!--  BEGIN NAVBAR  -->
    <div class="sub-header-container">
      <header class="header navbar navbar-expand-sm">
        <a href="javascript:void(0);" class="sidebarCollapse" data-placement="bottom" @click="$store.commit('toggleSideBar', !$store.state.is_show_sidebar)">
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
            class="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </a>

        <!-- Horizontal Menu -->

        <!-- Portal vue/Teleport for Breadcrumb -->
        <div id="breadcrumb" class="vue-portal-target"></div>
      </header>
    </div>
    <!--  END NAVBAR  -->
    <!--  BEGIN TOPBAR  -->
    <div class="topbar-nav header navbar" role="banner">
      <nav class="topbar horizontal-menu">
        <ul class="list-unstyled menu-categories" id="topAccordion">
          <li class="menu single-menu">
            <a href="javascript:;" class="dropdown-toggle autodroprown">
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
                <span>
                  <router-link to="/">{{ $t('dashboard') }} </router-link></span
                >
              </div>
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
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul class="collapse submenu list-unstyled d-none">
              <li class="d-none">
                <router-link to="/"> {{ $t('sales') }}</router-link>
              </li>
              <li class="d-none">
                <router-link to="/index2">{{ $t('analytics') }}</router-link>
              </li>
              <li class="d-none">
                <router-link to="/index2">{{ $t('ab_courior') }}</router-link>
              </li>
              <li class="d-none">
                <router-link to="/index2">{{ $t('abs_courior') }}</router-link>
              </li>
            </ul>
          </li>

          <li class="menu single-menu">
            <a href="javascript:;" class="dropdown-toggle">
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

                <span>{{ $t('out_ward_operation') }}</span>
              </div>
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
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul class="collapse submenu list-unstyled">
              <li>
                <router-link v-if="userHasPermission('CAN SHIPMENTS')" to="/operation/shipments">Shipments</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN CONSOLIDATION')" to="/operation/consolidations">Consolidations</router-link>
              </li>
              <li>
                <router-link to="/operation/dispatches">Dispatches</router-link>
              </li>
              <li>
                <router-link to="/operation/manifest">Manifest</router-link>
              </li>
              <li>
                <router-link to="/operation/undispatch">Un-dispatches</router-link>
              </li>
              <li class="d-none">
                <router-link v-if="userHasPermission('CAN VIEW COLLECTION POINTSxx')" to="/operation/dispatches/parcel-movements">Collection Point</router-link>
              </li>
              <li class="d-none">
                <router-link v-if="userHasPermission('READ MANIFESTxx')" to="/operation/manifests">Manifests</router-link>
              </li>
              <li class="d-none">
                <router-link v-if="userHasPermission('CAN PICKUPxx')" to="/components/accordions">Pick Ups</router-link>
              </li>
            </ul>
          </li>

          <li class="menu single-menu">
            <a href="javascript:;" class="dropdown-toggle">
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

                <span>{{ $t('in_ward_operation') }}</span>
              </div>
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
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul class="collapse submenu list-unstyled">
              <!-- <li class="d-none">
                <router-link v-if="userHasPermission('CAN INWARD SHIPMENTS')" to="/components/tabs">Inward Shipments</router-link>
              </li> -->
              <li>
                <router-link v-if="userHasPermission('CAN UN-CONSOLIDATION')" to="/operation/un-consolidations">Un-consolidations</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN OFFLOAD')" to="/operation/offloads">Offloads</router-link>
                <!-- <router-link v-if="userHasPermission('CAN OFFLOAD')" to="/components/tabs">Offloads</router-link> -->
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN DELIVERY')" to="/components/accordions">Deliveries</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN CHECK-OUT')" to="/components/accordions">Checkouts</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW SALES COLLECTION')" to="/operation/collections">Sales Collection</router-link>
              </li>
            </ul>
          </li>

          <!-- <li class="menu single-menu">
            <a href="javascript:;" class="dropdown-toggle">
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

                <span>{{ $t('general_reports') }}</span>
              </div>
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
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul class="collapse submenu list-unstyled">
              <li>
                <router-link v-if="hasPermission('CAN VIEW SALES')" to="/operation/report/sales">Sales Report</router-link>
              </li>
              <li>
                <router-link v-if="hasPermission('CAN VIEW ROUTE SALES')"  to="/operation/report/routes/sales">Routes Sales Report</router-link>
              </li>
              <li>
                <router-link v-if="hasPermission('CAN VIEW AGENT SALES')"  to="/operation/report/agent/sales">Agent Sales Report</router-link>
              </li>
              <li>
                <router-link v-if="hasPermission('CAN VIEW COLLECTION-POINT')"  to="/operation/report/collections">Collection Report</router-link>
              </li>
              <li>
                <router-link v-if="hasPermission('CAN DISPATCH')"  to="/operation/report/dispatches">Dispatch Report</router-link>
              </li>
            </ul>
          </li> -->
          <li class="menu single-menu">
            <a href="javascript:;" class="dropdown-toggle" v-if="userHasPermission('CAN VIEW REPORT')">
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
                <span>{{ $t('general_reports') }}</span>
              </div>
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
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul class="collapse submenu list-unstyled">
              <li>
                <router-link v-if="userHasPermission('CAN VIEW AGENTS SALES')" to="/operation/report/sales">Sales Report</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW SALES SUMMARY REPORT')" to="/operation/report/sales/summary">Sales Summary Report</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW ROUTE SALES REPORT')" to="/operation/report/routes/sales">Routes Sales Report</router-link>
              </li>
              <!-- <li>
                <router-link  to="/operation/report/agent/sales">Agent Sales Report</router-link>
              </li> -->
              <li>
                <router-link v-if="userHasPermission('CAN VIEW COLLECTION POINTS')" to="/operation/report/collections">Collection Report</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW DISPATCH REPORT')" to="/operation/report/collections/dispatch">Dispatch Report</router-link>
              </li>

              <li>
                <!-- <router-link v-if="userHasPermission('CAN VIEW REPORT')" to="/operation/report/offloads-dispatch">Offloading vs Dispatch</router-link> -->
                <router-link v-if="userHasPermission('CAN VIEW REPORT')" to="/operation/report/vehicle-summary">Offloading vs Dispatch</router-link>
              </li>
            </ul>
          </li>

          <li class="menu single-menu">
            <a href="javascript:;" class="dropdown-toggle" v-if="userHasPermission('CAN VIEW TRANSACTION')">
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

                <span v-if="userHasPermission('CAN VIEW TRANSACTION')">{{ $t('transactions') }}</span>
              </div>
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
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul class="collapse submenu list-unstyled">
              <li>
                <router-link v-if="userHasPermission('CAN READ CASH PAYMENTS')" to="/elements/alerts">Cash Payments</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW ACCOUNT RECEIVABLE')" to="/elements/avatar">Account Receivable</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW PAYMENTS')" to="/elements/badges">Payments</router-link>
              </li>
            </ul>
          </li>

          <li class="menu single-menu">
            <a href="javascript:;" class="dropdown-toggle" v-if="userHasPermission('CAN VIEW COMPANIES')">
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
                <span v-if="userHasPermission('CAN VIEW COMPANIES')">{{ $t('entities') }}</span>
              </div>
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
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul class="collapse submenu list-unstyled">
              <li>
                <a class="dropdown-toggle" href="#appInvoice" data-bs-parent="#apps" data-bs-toggle="collapse" role="button" aria-expanded="false">
                  Companies
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
                    <router-link v-if="userHasPermission('CAN VIEW COMPANIES')" to="/entities/companies/agents" @click="toggleMobileMenu">Entities</router-link>
                  </li>
                  <li>
                    <router-link v-if="userHasPermission('CAN VIEW COMPANY ENTITY')" to="/entities/companies/company_entity" @click="toggleMobileMenu">Company Entity</router-link>
                  </li>
                  <li>
                    <router-link v-if="userHasPermission('CAN VIEW COMPANY ENTITY CATEGORY')" to="/entities/companies/company_entity_category" @click="toggleMobileMenu"
                      >Company Entity Category</router-link
                    >
                  </li>
                  <li>
                    <router-link v-if="userHasPermission('CAN VIEW ENTITY COMPANY DETAILS')" to="/entities/companies/entity_company_details" @click="toggleMobileMenu"
                      >Detailed Information</router-link
                    >
                  </li>
                </ul>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW CUSTOMERS')" to="/entities/customers">Customers</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW SUB ENTITY')" to="/entities/companies/sub_entity">Sub Entities</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW CONTACTS')" to="/tables/basic">Contacts</router-link>
              </li>
            </ul>
          </li>

          <li class="menu single-menu">
            <a href="javascript:;" class="dropdown-toggle">
              <div class="side-menu-item">
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
                <span>{{ $t('settings') }}</span>
              </div>
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
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </a>
            <ul class="collapse submenu list-unstyled">
              <li>
                <router-link v-if="userHasPermission('CAN VIEW BRANCHES')" to="/settings/branches">Branches</router-link>
              </li>
              <li>
                <router-link v-if="userHasPermission('CAN VIEW OFFICES')" to="/settings/offices">Offices</router-link>
              </li>

              <li>
                <a
                  class="dropdown-toggle"
                  href="#servicePoints"
                  data-bs-parent="#apps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  v-if="userHasPermission('CAN VIEW SERVICE POINTS')"
                >
                  Service Points
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
                <ul id="servicePoints" class="collapse list-unstyled sub-submenu">
                  <li>
                    <router-link v-if="userHasPermission('CAN VIEW SERVICE POINTS')" to="/settings/service_points/list">Service Points</router-link>
                  </li>
                  <li>
                    <router-link v-if="userHasPermission('CAN VIEW AGENT SERVICE POINTS')" to="/settings/agents_service_points/list">Assign Agent Service Points</router-link>
                  </li>
                </ul>
              </li>

              <li>
                <a class="dropdown-toggle" href="#agentManagements" data-bs-parent="#apps" data-bs-toggle="collapse" role="button" aria-expanded="false" v-if="userHasPermission('CAN VIEW AGENTS')">
                  Agents Management
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
                <ul id="agentManagements" class="collapse list-unstyled sub-submenu">
                  <li>
                    <router-link v-if="userHasPermission('CAN ASSIGN OFFICE AGENTS')" to="/settings/assign/agents-office">Assign Agent Office</router-link>
                  </li>
                  <li>
                    <router-link v-if="userHasPermission('CAN VIEW AGENTS')" to="/settings/agents"> Create New Agent </router-link>
                  </li>
                </ul>
              </li>
              <li>
                <a class="dropdown-toggle" href="#userManagement" data-bs-parent="#apps" data-bs-toggle="collapse" role="button" aria-expanded="false" v-if="userHasPermission('CAN VIEW USERS')">
                  User Management
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
                <ul id="userManagement" class="collapse list-unstyled sub-submenu">
                  <li>
                    <router-link v-if="userHasPermission('CAN VIEW USERS')" to="/settings/users">Users</router-link>
                  </li>
                  <li>
                    <a
                      class="dropdown-toggle"
                      href="#appInvoice"
                      v-if="userHasPermission('CAN VIEW ROLES & PERMISSIONS')"
                      data-bs-parent="#apps"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                    >
                      Roles & Permissions
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
                        <router-link v-if="userHasPermission('CAN VIEW ROLES & PERMISSIONS')" to="/settings/user_management/permissions/list">Create Permissions</router-link>
                      </li>
                      <li>
                        <router-link v-if="userHasPermission('CAN ASSIGN USER PERMISSION')" to="/settings/user_management/permissions">Assign Users</router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    <!--  END TOPBAR  -->
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

const store = useStore();
const i18n = useI18n();

const selectedLang = ref(null);
const countryList = ref(store.state.countryList);

const userHasPermission = (permission) => {
  const storedData = sessionStorage.getItem('user-permission');
  if (storedData) {
    try {
      const permissionsData = JSON.parse(storedData);
      if (permissionsData && permissionsData.scopes) {
        for (const scope of permissionsData.scopes) {
          if (scope.permissions && scope.permissions.includes(permission)) {
            return true;
          }
        }
      }
    } catch (error) {
      console.error('Error parsing stored permissions:', error);
      return false;
    }
  }
  return false;
};

const userData = (key) => {
  try {
    const userInfo = JSON.parse(sessionStorage.getItem('user-permission'));

    if (userInfo && userInfo.user && userInfo.user[key]) {
      return userInfo.user[key];
    }
    return null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

const toggleMode = (mode) => {
  console.log('Toggling mode to:', mode);
  window.$appSetting.toggleMode(mode);
};

const changeLanguage = (item) => {
  selectedLang.value = item;
  window.$appSetting.toggleLanguage(item);
  i18n.locale.value = item.code;
};
</script>

<style>
.usr-name {
  font-weight: 700;
  color: #ffffff;
}

.side-menu-item {
  max-width: 700px;
}
</style>