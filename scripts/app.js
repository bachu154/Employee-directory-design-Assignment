// Main application logic for Employee Directory Dashboard

const employees = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Brown",
    email: "alice.b@example.com",
    department: "HR",
    role: "Manager",
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob.s@example.com",
    department: "IT",
    role: "Developer",
  },
  {
    id: 3,
    firstName: "Carol",
    lastName: "Johnson",
    email: "carol.j@example.com",
    department: "Marketing",
    role: "Specialist",
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Wilson",
    email: "david.w@example.com",
    department: "Finance",
    role: "Analyst",
  },
  {
    id: 5,
    firstName: "Emma",
    lastName: "Davis",
    email: "emma.d@example.com",
    department: "IT",
    role: "Senior Developer",
  },
  {
    id: 6,
    firstName: "Frank",
    lastName: "Miller",
    email: "frank.m@example.com",
    department: "Sales",
    role: "Representative",
  },
  {
    id: 7,
    firstName: "Grace",
    lastName: "Taylor",
    email: "grace.t@example.com",
    department: "HR",
    role: "Coordinator",
  },
  {
    id: 8,
    firstName: "Henry",
    lastName: "Anderson",
    email: "henry.a@example.com",
    department: "Marketing",
    role: "Manager",
  },
  {
    id: 9,
    firstName: "Ivy",
    lastName: "Thomas",
    email: "ivy.t@example.com",
    department: "Finance",
    role: "Senior Analyst",
  },
  {
    id: 10,
    firstName: "Jack",
    lastName: "Jackson",
    email: "jack.j@example.com",
    department: "IT",
    role: "DevOps Engineer",
  },
]

const departments = ["All", "HR", "IT", "Marketing", "Finance", "Sales"]
const roles = [
  "All",
  "Manager",
  "Developer",
  "Specialist",
  "Analyst",
  "Senior Developer",
  "Representative",
  "Coordinator",
  "Senior Analyst",
  "DevOps Engineer",
  "Content Creator",
]

class EmployeeDirectoryApp {
  constructor() {
    this.employees = [...employees] // Use a copy of the mock data
    this.filteredAndSortedEmployees = [...this.employees]
    this.currentPage = 1
    this.itemsPerPage = 10
    this.searchTerm = ""
    this.sortBy = "firstName" // Default sort
    this.filterState = {
      firstName: "",
      department: "All",
      role: "All",
    }
    this.editingEmployeeId = null // To track which employee is being edited

    this.init()
  }

  init() {
    this.bindEventListeners()
    this.applyFiltersAndSort() // Initial render
  }

  bindEventListeners() {
    // Search input
    document.querySelector('[data-testid="search-input"]')?.addEventListener("input", (e) => {
      this.searchTerm = e.target.value
      this.applyFiltersAndSort()
    })

    // Sort dropdown
    document.querySelector('[data-testid="sort-select"]')?.addEventListener("change", (e) => {
      this.sortBy = e.target.value
      this.applyFiltersAndSort()
    })

    // Items per page dropdown
    document.querySelector('[data-testid="items-per-page"]')?.addEventListener("change", (e) => {
      this.itemsPerPage = Number.parseInt(e.target.value)
      this.currentPage = 1 // Reset to first page on items per page change
      this.renderEmployeeCards()
      this.updatePaginationControls()
    })

    // Add Employee button
    document.querySelector('[data-action="add-employee"]')?.addEventListener("click", () => {
      this.openAddEditModal(null)
    })

    // Event delegation for Edit/Delete buttons on employee cards
    document.querySelector(".grid")?.addEventListener("click", (e) => {
      const target = e.target
      const editButton = target.closest('[data-action="edit"]')
      const deleteButton = target.closest('[data-action="delete"]')

      if (editButton) {
        const id = Number.parseInt(editButton.dataset.id || "0")
        this.openAddEditModal(id)
      } else if (deleteButton) {
        const id = Number.parseInt(deleteButton.dataset.id || "0")
        this.deleteEmployee(id)
      }
    })

    // Filter modal buttons (Apply, Clear)
    document.querySelector('[data-action="apply-filter"]')?.addEventListener("click", () => {
      this.filterState.firstName = document.querySelector('[data-filter="firstName"]')?.value || ""
      this.filterState.department = document.querySelector('[data-filter="department"]')?.value || "All"
      this.filterState.role = document.querySelector('[data-filter="role"]')?.value || "All"
      this.applyFiltersAndSort()
      // Close filter modal/sidebar here (UI specific)
    })

    document.querySelector('[data-action="clear-filter"]')?.addEventListener("click", () => {
      this.filterState =
        { firstName: "", department: "All", role: "All" }(
          // Clear filter input fields in UI
          document.querySelector('[data-filter="firstName"]'),
        ).value =
        ""(document.querySelector('[data-filter="department"]')).value =
        "All"(document.querySelector('[data-filter="role"]')).value =
          "All"
      this.applyFiltersAndSort()
    })

    // Add/Edit form buttons (Save, Cancel)
    document.querySelector('[data-action="save-employee"]')?.addEventListener("click", () => {
      this.saveEmployee()
    })
    document.querySelector('[data-action="cancel-form"]')?.addEventListener("click", () => {
      // Close add/edit modal here (UI specific)
    })

    // Pagination controls
    document.querySelector('[data-action="prev-page"]')?.addEventListener("click", (e) => {
      e.preventDefault()
      if (this.currentPage > 1) {
        this.currentPage--
        this.renderEmployeeCards()
        this.updatePaginationControls()
      }
    })
    document.querySelector('[data-action="next-page"]')?.addEventListener("click", (e) => {
      e.preventDefault()
      const totalPages = Math.ceil(this.filteredAndSortedEmployees.length / this.itemsPerPage)
      if (this.currentPage < totalPages) {
        this.currentPage++
        this.renderEmployeeCards()
        this.updatePaginationControls()
      }
    })
    document.querySelector(".pagination-content")?.addEventListener("click", (e) => {
      const target = e.target
      const pageLink = target.closest("[data-page]")
      if (pageLink) {
        e.preventDefault()
        this.currentPage = Number.parseInt(pageLink.dataset.page || "1")
        this.renderEmployeeCards()
        this.updatePaginationControls()
      }
    })
  }

  applyFiltersAndSort() {
    let tempEmployees = [...this.employees]

    // 1. Search
    if (this.searchTerm) {
      tempEmployees = tempEmployees.filter(
        (emp) =>
          emp.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          emp.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(this.searchTerm.toLowerCase()),
      )
    }

    // 2. Filters
    if (this.filterState.firstName) {
      tempEmployees = tempEmployees.filter((emp) =>
        emp.firstName.toLowerCase().includes(this.filterState.firstName.toLowerCase()),
      )
    }
    if (this.filterState.department !== "All") {
      tempEmployees = tempEmployees.filter((emp) => emp.department === this.filterState.department)
    }
    if (this.filterState.role !== "All") {
      tempEmployees = tempEmployees.filter((emp) => emp.role === this.filterState.role)
    }

    // 3. Sort
    tempEmployees.sort((a, b) => {
      if (this.sortBy === "firstName") {
        return a.firstName.localeCompare(b.firstName)
      } else if (this.sortBy === "department") {
        return a.department.localeCompare(b.department)
      }
      return 0
    })

    this.filteredAndSortedEmployees = tempEmployees
    this.currentPage = 1 // Reset to first page after filter/sort
    this.renderEmployeeCards()
    this.updatePaginationControls()
  }

  renderEmployeeCards() {
    // This method would dynamically render the employee cards
    // based on this.filteredAndSortedEmployees and pagination.
    // In a Freemarker context, this would involve re-rendering the template
    // with updated data. In a pure JS context, you'd manipulate the DOM.

    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const employeesToRender = this.filteredAndSortedEmployees.slice(startIndex, endIndex)

    console.log("Rendering employees:", employeesToRender)
    // Example: Update a div with employee cards HTML
    // const employeeGrid = document.querySelector('.grid.grid-cols-1');
    // if (employeeGrid) {
    //   employeeGrid.innerHTML = employeesToRender.map(emp => `
    //     <div class="card" data-employee-id="${emp.id}">...</div>
    //   `).join('');
    // }
  }

  updatePaginationControls() {
    const totalPages = Math.ceil(this.filteredAndSortedEmployees.length / this.itemsPerPage)
    console.log(`Current Page: ${this.currentPage}, Total Pages: ${totalPages}`)
    // Update pagination links/buttons active states and visibility
  }

  openAddEditModal(id) {
    if (id === null) {
      this.editingEmployeeId = null
      console.log("Opening Add Employee Modal - Clear form fields")
      // Logic to clear form fields and open modal
    } else {
      this.editingEmployeeId = id
      const employee = this.employees.find((emp) => emp.id === id)
      console.log("Opening Edit Employee Modal - Pre-fill form with:", employee)
      // Logic to pre-fill form fields with employee data and open modal
    }
  }

  saveEmployee() {
    // Get form data from UI elements
    const formData = {
      firstName: document.querySelector('[data-field="firstName"]')?.value || "",
      lastName: document.querySelector('[data-field="lastName"]')?.value || "",
      email: document.querySelector('[data-field="email"]')?.value || "",
      department: document.querySelector('[data-field="department"]')?.value || "",
      role: document.querySelector('[data-field="role"]')?.value || "",
    }

    if (!this.validateForm(formData)) {
      console.log("Form validation failed.")
      return
    }

    if (this.editingEmployeeId) {
      // Update existing employee
      this.employees = this.employees.map((emp) => (emp.id === this.editingEmployeeId ? { ...emp, ...formData } : emp))
      console.log("Employee updated:", formData)
    } else {
      // Add new employee
      const newId = this.employees.length > 0 ? Math.max(...this.employees.map((e) => e.id)) + 1 : 1
      this.employees.push({ id: newId, ...formData })
      console.log("New employee added:", formData)
    }

    this.applyFiltersAndSort() // Re-render list
    // Close modal here
  }

  deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.employees = this.employees.filter((emp) => emp.id !== id)
      this.applyFiltersAndSort() // Re-render list
      console.log("Employee deleted:", id)
    }
  }

  validateForm(formData) {
    let isValid = true
    // Clear previous errors (UI specific)
    // Example: document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (!formData.firstName.trim()) {
      console.error("First name is required.")
      // Display error in UI for firstName
      isValid = false
    }
    if (!formData.lastName.trim()) {
      console.error("Last name is required.")
      // Display error in UI for lastName
      isValid = false
    }
    if (!formData.email.trim()) {
      console.error("Email is required.")
      // Display error in UI for email
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      console.error("Invalid email format.")
      // Display error in UI for email
      isValid = false
    }
    if (!formData.department) {
      console.error("Department is required.")
      // Display error in UI for department
      isValid = false
    }
    if (!formData.role) {
      console.error("Role is required.")
      // Display error in UI for role
      isValid = false
    }
    return isValid
  }
}

// Initialize the application when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new EmployeeDirectoryApp()
})
