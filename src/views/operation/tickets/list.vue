<template>
    <div class='layout-px-spacing apps-invoice-list'>
        <teleport to='#breadcrumb'>
            <ul class='navbar-nav flex-row'>
                <li>
                    <div class='page-header'>
                        <nav class='breadcrumb-one' aria-label='breadcrumb'>
                            <ol class='breadcrumb'>
                                <li class='breadcrumb-item'><a href='javascript:;'>Operations</a></li>
                                <li class='breadcrumb-item active' aria-current='page'><span>Parcels List</span></li>
                            </ol>
                        </nav>
                    </div>
                </li>
            </ul>
        </teleport>

        <div class='row layout-top-spacing'>
            <div class='col-xl-12 col-lg-12 col-sm-12 layout-spacing'>
                <div class='panel br-6'>
                    <div class='custom-table'>
                        <v-client-table :data='items' :columns='columns' :options='table_option'>
                            <template #beforeFilter>


                                <!-- Auto-sizing -->
                                <form>
                                    <div class='row align-items-center justify-content-center'>
                                        <div class='col-auto'>
                                            <input type='date' class='form-control mb-2' id='startDate'
                                                   v-model='startDate' placeholder='Start Date' />
                                        </div>
                                        <div class='col-auto'>
                                            <div class='input-group mb-2'>
                                                <input type='date' class='form-control' id='endDate' v-model='endDate'
                                                       placeholder='End Date' />
                                            </div>
                                        </div>
                                        <div class='col-auto'>
                                            <div class='input-group mb-2'>
                                                <multiselect v-model='destination_office' :options='offices'
                                                             :searchable='true' placeholder='Choose...'
                                                             selected-label='' select-label=''
                                                             :custom-label="customLabel"
                                                             deselect-label=''></multiselect>
<!--                                                <pre class="language-json"><code>{{ destination_office }}</code></pre>-->
                                            </div>
                                        </div>
                                        <div class='col-auto' >
                                            <button class='btn btn-danger' @click.prevent="resetSelection">Reset</button>
                                            <button class='btn btn-primary' @click.prevent='fetchData'>Search</button>
                                        </div>
                                    </div>
                                </form>


                            </template>
                            <!-- <template #h__id>
                                <div class="checkbox-outline-primary custom-control custom-checkbox">
                                    <input variant="primary" type="checkbox" class="custom-control-input" :id="props.row.id" />
                                    <label class="custom-control-label" :for="props.row.id"></label>
                                </div>
                            </template> -->


                            <template #id='props'>
                                <div class='checkbox-outline-primary custom-control custom-checkbox'>
                                    <input variant='primary' type='checkbox' class='custom-control-input'
                                           :id="'chk' + props.row.parcel_id"
                                           @change='selcted_row(props.row.parcel_id)' />
                                    <label class='custom-control-label' :for="'chk' + props.row.parcel_id"></label>
                                </div>
                            </template>
                            <template #invoice='props'>
                                <router-link to='/apps/invoice/preview'>
                                    <span class='inv-number'>#{{ props.row.tracking_number }}</span>
                                </router-link>
                            </template>
                            <template #name='props'>
                                <div class='d-flex'>
                                    <p class='align-self-center mb-0 admin-name'>{{ props.row.parcel_type }}</p>
                                </div>
                            </template>
                            <template #email='props'>
                                <span class='inv-email'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        class='feather feather-mail'
                                    >
                                        <path
                                            d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
                                        <polyline points='22,6 12,13 2,6'></polyline>
                                    </svg>
                                    {{ props.row.receiver.name }}
                                </span>
                            </template>
                            <template #date='props'>
                                <span class='inv-date'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='24'
                                        height='24'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        stroke-width='2'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        class='feather feather-calendar'
                                    >
                                        <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
                                        <line x1='16' y1='2' x2='16' y2='6'></line>
                                        <line x1='8' y1='2' x2='8' y2='6'></line>
                                        <line x1='3' y1='10' x2='21' y2='10'></line>
                                    </svg>
                                    {{ props.row.destination }}
                                </span>
                            </template>
                            <template #amount='props' class='text-right'> ${{ props.row.rate }}</template>
                            <template #status='props'>
                                <span class='badge inv-status'
                                      :class="'badge-' + props.row.status.class">{{ props.row.status.key }}</span>
                            </template>

                            <template #actions='props'>
                                <div class='mb-4 me-2 custom-dropdown dropdown btn-group'>
                                    <a class='btn dropdown-toggle btn-icon-only' href='#' role='button' id='pendingTask'
                                       data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            style='width: 24px; height: 24px'
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            stroke='currentColor'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            class='feather feather-more-horizontal'
                                        >
                                            <circle cx='12' cy='12' r='1'></circle>
                                            <circle cx='19' cy='12' r='1'></circle>
                                            <circle cx='5' cy='12' r='1'></circle>
                                        </svg>
                                    </a>

                                    <ul class='dropdown-menu dropdown-menu-end' aria-labelledby='pendingTask'>
                                        <li>
                                            <router-link href='javascript:void(0);' to='/apps/invoice/edit'
                                                         class='dropdown-item action-edit'
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='24'
                                                    height='24'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    class='feather feather-edit-3'
                                                >
                                                    <path d='M12 20h9'></path>
                                                    <path
                                                        d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'></path>
                                                </svg>
                                                Edit
                                            </router-link>
                                        </li>
                                        <li>
                                            <a href='javascript:void(0);' @click='delete_row(props.row)'
                                               class='dropdown-item action-delete'
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='24'
                                                    height='24'
                                                    viewBox='0 0 24 24'
                                                    fill='none'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                    class='feather feather-trash'
                                                >
                                                    <polyline points='3 6 5 6 21 6'></polyline>
                                                    <path
                                                        d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </v-client-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import '@/assets/sass/apps/invoice-list.scss';

    // Import the multiselect CSS (if not already imported)
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import { useMeta } from '@/composables/use-meta';

    useMeta({ title: 'Active Tickets' });



    const destination_office = ref(null);

    const offices = ref([]);
    // Function to format the server response to match Multiselect options
    const formatOffices= (offices) => {
        return offices.map(office => ({
            value: office.id,
            label: `${office.name} (${office.branch})`
        }));
    };
    // Custom label function to format the display of selected options
    const customLabel = (option) => {
        return `${option.label}`;
    };
    // Get today's date and format it as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    // Function to fetch options from the server
    const fetchOffices = async () => {
        try {
            const response = await axios.get('https://courier.iosuite.org/api/v1/masters/offices');
            offices.value = formatOffices(response.data.data);

        } catch (error) {
            console.error('Error fetching options:', error);
        }
    };
    // Method to reset the selection
    const resetSelection = () => {
        destination_office.value = null;
    };
    const today = formatDate(new Date());
    const startDate = ref(today); // Initialize with default value
    const endDate = ref(today); // Initialize with default value

    
    const items = ref([]);
    const perPage = ref(10); // Initialize with default perPage value
    const columns = ref(['id', 'receiver', 'destination_office', 'tracking_number', 'parcel_type', 'rate', 'created_at', 'status']);
    const table_option = ref({
        headings: {
            id: (h, row, index) => {
                return '#';
            }
        },
        perPage: perPage.value,
        perPageValues: [5, 10, 20, 50],
        skin: 'table table-hover',
        columnsClasses: { actions: 'actions text-center' },
        pagination: { nav: 'scroll', chunk: 5 },
        texts: {
            count: 'Showing {from} to {to} of {count}',
            filter: '',
            filterPlaceholder: 'Search...',
            limit: 'Results:'
        },
        resizableColumns: false,
        sortable: ['tracking_number', 'parcel_type', 'email', 'date', 'amount', 'status'],
        sortIcon: {
            base: 'sort-icon-none',
            up: 'sort-icon-asc',
            down: 'sort-icon-desc'
        }
    });

    const selected_rows = ref([]);

    const bind_data = async (startDate, endDate, perPage,destination_office) => {
        try {
            const response = await axios.get('https://courier.iosuite.org/api/v1/parcels/index', {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    limit: 1000,
                    destination_office_id: destination_office ? destination_office.value : 'ALL'
                }
            });
            items.value = response.data.data.map(item => {
                item.rate = formatRate(item.rate); // Format rate
                return item;
            });
            // items.value = response.data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const formatRate = (rate) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            style: 'currency',
            currency: 'TSH'
        }).format(rate);
    };

    const fetchData = () => {
        bind_data(startDate.value, endDate.value, perPage.value, destination_office.value);
    };


    // Fetch options when the component is mounted
    onMounted(() => {
        // Optionally, you can provide default values for the date range here
        const defaultStartDate = startDate.value; // or any suitable default value
        const defaultEndDate = endDate.value; // or any suitable default value
        bind_data(defaultStartDate, defaultEndDate, perPage.value);
        fetchOffices();
    });

    

    const delete_row = (item) => {
        if (confirm('Are you sure want to delete selected row ?')) {
            if (item) {
                items.value = items.value.filter((d) => d.id != item.id);
            } else {
                items.value = items.value.filter((d) => !selected_rows.value.includes(d.id));
            }
        }
    };

    //checkbox selection
    const selcted_row = (val) => {
        selected_rows.value.push(val);
        return;
    };

</script>
<style>
    /* Custom styles to ensure right alignment */
    .table .text-right {
        text-align: right;
    }

</style>
