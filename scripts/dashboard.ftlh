<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory Dashboard</title>
    <!-- Tailwind CSS CDN for basic styling -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Custom styles for Freemarker simulation if needed */
        .badge {
            display: inline-flex;
            align-items: center;
            border-radius: 9999px;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            font-size: 0.75rem; /* text-xs */
            font-weight: 500; /* font-medium */
        }
        .bg-blue-100 { background-color: #dbeafe; } .text-blue-800 { color: #1e40af; }
        .bg-green-100 { background-color: #dcfce7; } .text-green-800 { color: #166534; }
        .bg-purple-100 { background-color: #ede9fe; } .text-purple-800 { color: #6b21a8; }
        .bg-orange-100 { background-color: #fff7ed; } .text-orange-800 { color: #9a3412; }
        .bg-red-100 { background-color: #fee2e2; } .text-red-800 { color: #991b1b; }
        .bg-gray-100 { background-color: #f3f4f6; } .text-gray-800 { color: #1f2937; }
    </style>
</head>
<body class="bg-gray-50 font-sans antialiased">

    <!-- Header Section -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <h1 class="text-3xl font-bold text-gray-900">Employee Directory</h1>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
                <!-- Search Bar -->
                <div class="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input type="text" placeholder="Search by name or email..." class="pl-10 w-full sm:w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-testid="search-input">
                </div>

                <!-- Filter Button (Simulated) -->
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2" data-action="open-filter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    Filter
                </button>

                <!-- Sort Dropdown (Simulated) -->
                <select class="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-testid="sort-select">
                    <option value="firstName">First Name</option>
                    <option value="department">Department</option>
                </select>

                <!-- Add Employee Button -->
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 gap-2" data-action="add-employee">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    Add Employee
                </button>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Results Summary (Placeholder) -->
        <div class="mb-6">
            <p class="text-sm text-gray-600">Showing X-Y of Z employees</p>
        </div>

        <!-- Employee Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <#list employees as employee>
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500" data-employee-id="${employee.id}">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex-1">
                            <h3 class="font-semibold text-lg text-gray-900 mb-1">
                                ${employee.firstName} ${employee.lastName}
                            </h3>
                            <p class="text-sm text-gray-500 font-mono">ID: ${employee.id}</p>
                        </div>
                        <div class="flex gap-1">
                            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 p-0 hover:bg-blue-50" data-action="edit" data-id="${employee.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit text-blue-600"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>
                            </button>
                            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700" data-action="delete" data-id="${employee.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </button>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <p class="text-sm text-gray-600 break-all">${employee.email}</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="badge
                                <#if employee.department == 'HR'>bg-blue-100 text-blue-800</#if>
                                <#if employee.department == 'IT'>bg-green-100 text-green-800</#if>
                                <#if employee.department == 'Marketing'>bg-purple-100 text-purple-800</#if>
                                <#if employee.department == 'Finance'>bg-orange-100 text-orange-800</#if>
                                <#if employee.department == 'Sales'>bg-red-100 text-red-800</#if>">
                                ${employee.department}
                            </span>
                        </div>
                        <p class="text-sm font-medium text-gray-700">${employee.role}</p>
                    </div>
                </div>
            </div>
            </#list>
        </div>

        <!-- Pagination Bar (Simulated) -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg border">
            <div class="flex items-center gap-2">
                <label for="items-per-page" class="text-sm font-medium">Items per page:</label>
                <select id="items-per-page" class="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-testid="items-per-page">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <nav class="flex items-center space-x-1 pagination-content">
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground" data-action="prev-page">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-blue-500 data-[active=true]:text-white" data-page="1">1</button>
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground" data-page="2">2</button>
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground" data-page="3">3</button>
                <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0 hover:bg-accent hover:text-accent-foreground" data-action="next-page">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </button>
            </nav>
        </div>
    </main>

    <!-- Add/Edit Employee Modal Form (Simulated) -->
    <div id="add-edit-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 class="text-xl font-bold mb-4">Add/Edit Employee</h2>
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label for="modal-firstName" class="block text-sm font-medium text-gray-700">First Name *</label>
                        <input type="text" id="modal-firstName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-field="firstName">
                        <p class="text-red-600 text-xs mt-1 error-message" data-error="firstName"></p>
                    </div>
                    <div>
                        <label for="modal-lastName" class="block text-sm font-medium text-gray-700">Last Name *</label>
                        <input type="text" id="modal-lastName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-field="lastName">
                        <p class="text-red-600 text-xs mt-1 error-message" data-error="lastName"></p>
                    </div>
                </div>
                <div>
                    <label for="modal-email" class="block text-sm font-medium text-gray-700">Email *</label>
                    <input type="email" id="modal-email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-field="email">
                    <p class="text-red-600 text-xs mt-1 error-message" data-error="email"></p>
                </div>
                <div>
                    <label for="modal-department" class="block text-sm font-medium text-gray-700">Department *</label>
                    <select id="modal-department" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-field="department">
                        <option value="">Select department</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <p class="text-red-600 text-xs mt-1 error-message" data-error="department"></p>
                </div>
                <div>
                    <label for="modal-role" class="block text-sm font-medium text-gray-700">Role *</label>
                    <select id="modal-role" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-field="role">
                        <option value="">Select role</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Specialist">Specialist</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Representative">Representative</option>
                        <option value="Coordinator">Coordinator</option>
                        <option value="Senior Analyst">Senior Analyst</option>
                        <option value="DevOps Engineer">DevOps Engineer</option>
                        <option value="Content Creator">Content Creator</option>
                    </select>
                    <p class="text-red-600 text-xs mt-1 error-message" data-error="role"></p>
                </div>
                <div class="flex gap-2 pt-4">
                    <button class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2" data-action="save-employee">Save</button>
                    <button class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" data-action="cancel-form">Cancel</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Filter Modal/Sidebar (Simulated) -->
    <div id="filter-sidebar" class="fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out p-6 hidden">
        <h2 class="text-xl font-bold mb-4">Filter Employees</h2>
        <div class="space-y-6">
            <div>
                <label for="filter-firstName" class="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="filter-firstName" placeholder="Filter by first name..." class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-filter="firstName">
            </div>
            <div>
                <label for="filter-department" class="block text-sm font-medium text-gray-700">Department</label>
                <select id="filter-department" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-filter="department">
                    <option value="All">All</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                </select>
            </div>
            <div>
                <label for="filter-role" class="block text-sm font-medium text-gray-700">Role</label>
                <select id="filter-role" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-filter="role">
                    <option value="All">All</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                    <option value="Specialist">Specialist</option>
                    <option value="Analyst">Analyst</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Representative">Representative</option>
                    <option value="Coordinator">Coordinator</option>
                    <option value="Senior Analyst">Senior Analyst</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Content Creator">Content Creator</option>
                </select>
            </div>
            <div class="flex gap-2 pt-4">
                <button class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2" data-action="apply-filter">Apply</button>
                <button class="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" data-action="clear-filter">Clear</button>
            </div>
            <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700" data-action="close-filter">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
    </div>

    <!-- Include JavaScript files -->
    <script src="js/data.js"></script>
    <script src="js/app.js"></script>
    <!-- You would add search.js, filter.js, form.js, pagination.js here if modularized -->
</body>
</html>
