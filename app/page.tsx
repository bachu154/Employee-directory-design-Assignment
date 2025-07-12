"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Filter, Plus, Edit, Trash2, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock employee data
const mockEmployees = [
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
  {
    id: 11,
    firstName: "Kate",
    lastName: "White",
    email: "kate.w@example.com",
    department: "Sales",
    role: "Manager",
  },
  {
    id: 12,
    firstName: "Liam",
    lastName: "Harris",
    email: "liam.h@example.com",
    department: "Marketing",
    role: "Content Creator",
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

type Employee = {
  id: number
  firstName: string
  lastName: string
  email: string
  department: string
  role: string
}

type FormErrors = {
  firstName?: string
  lastName?: string
  email?: string
  department?: string
  role?: string
}

export default function EmployeeDirectoryDashboard() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("firstName")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isAddEditOpen, setIsAddEditOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  // Filter states
  const [filterFirstName, setFilterFirstName] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("All")
  const [filterRole, setFilterRole] = useState("All")

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({})

  // Validation function
  const validateForm = () => {
    const errors: FormErrors = {}

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required"
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required"
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }

    if (!formData.department) {
      errors.department = "Department is required"
    }

    if (!formData.role) {
      errors.role = "Role is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    const filtered = employees.filter((employee) => {
      const matchesSearch =
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFirstName =
        filterFirstName === "" || employee.firstName.toLowerCase().includes(filterFirstName.toLowerCase())

      const matchesDepartment = filterDepartment === "All" || employee.department === filterDepartment

      const matchesRole = filterRole === "All" || employee.role === filterRole

      return matchesSearch && matchesFirstName && matchesDepartment && matchesRole
    })

    // Sort employees
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "firstName":
          return a.firstName.localeCompare(b.firstName)
        case "department":
          return a.department.localeCompare(b.department)
        default:
          return 0
      }
    })

    return filtered
  }, [employees, searchTerm, sortBy, filterFirstName, filterDepartment, filterRole])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEmployees = filteredAndSortedEmployees.slice(startIndex, startIndex + itemsPerPage)

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      role: "",
    })
    setFormErrors({})
    setIsAddEditOpen(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      role: employee.role,
    })
    setFormErrors({})
    setIsAddEditOpen(true)
  }

  const handleDeleteEmployee = (id: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id))
    }
  }

  const handleSaveEmployee = () => {
    if (!validateForm()) {
      return
    }

    if (editingEmployee) {
      // Edit existing employee
      setEmployees(employees.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...formData } : emp)))
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: Math.max(...employees.map((e) => e.id)) + 1,
        ...formData,
      }
      setEmployees([...employees, newEmployee])
    }
    setIsAddEditOpen(false)
  }

  const handleApplyFilters = () => {
    setCurrentPage(1)
    setIsFilterOpen(false)
  }

  const handleClearFilters = () => {
    setFilterFirstName("")
    setFilterDepartment("All")
    setFilterRole("All")
    setCurrentPage(1)
  }

  const getDepartmentColor = (department: string) => {
    const colors: { [key: string]: string } = {
      HR: "bg-blue-100 text-blue-800",
      IT: "bg-green-100 text-green-800",
      Marketing: "bg-purple-100 text-purple-800",
      Finance: "bg-orange-100 text-orange-800",
      Sales: "bg-red-100 text-red-800",
    }
    return colors[department] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-6 gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Employee Directory</h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                  data-testid="search-input"
                />
              </div>

              {/* Filter Button */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent" data-action="open-filter">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Employees</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div>
                      <Label htmlFor="filter-name">First Name</Label>
                      <Input
                        id="filter-name"
                        placeholder="Filter by first name..."
                        value={filterFirstName}
                        onChange={(e) => setFilterFirstName(e.target.value)}
                        data-filter="firstName"
                      />
                    </div>
                    <div>
                      <Label htmlFor="filter-department">Department</Label>
                      <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                        <SelectTrigger data-filter="department">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="filter-role">Role</Label>
                      <Select value={filterRole} onValueChange={setFilterRole}>
                        <SelectTrigger data-filter="role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleApplyFilters} className="flex-1" data-action="apply-filter">
                        Apply
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        className="flex-1 bg-transparent"
                        data-action="clear-filter"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48" data-testid="sort-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="firstName">First Name</SelectItem>
                  <SelectItem value="department">Department</SelectItem>
                </SelectContent>
              </Select>

              {/* Add Employee Button */}
              <Button onClick={handleAddEmployee} className="gap-2" data-action="add-employee">
                <Plus className="h-4 w-4" />
                Add Employee
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedEmployees.length)} of{" "}
            {filteredAndSortedEmployees.length} employees
          </p>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {paginatedEmployees.map((employee) => (
            <Card
              key={employee.id}
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500"
              data-employee-id={employee.id}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {employee.firstName} {employee.lastName}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">ID: {employee.id}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditEmployee(employee)}
                      className="h-8 w-8 p-0 hover:bg-blue-50"
                      data-action="edit"
                      data-id={employee.id}
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="h-8 w-8 p-0 hover:bg-red-50"
                      data-action="delete"
                      data-id={employee.id}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 break-all">{employee.email}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getDepartmentColor(employee.department)}>{employee.department}</Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{employee.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <Label htmlFor="items-per-page" className="text-sm font-medium">
              Items per page:
            </Label>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-20" data-testid="items-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) setCurrentPage(currentPage - 1)
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  data-action="prev-page"
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(pageNum)
                      }}
                      isActive={currentPage === pageNum}
                      data-page={pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  data-action="next-page"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Add/Edit Employee Modal */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Enter first name"
                  className={formErrors.firstName ? "border-red-500" : ""}
                  data-field="firstName"
                />
                {formErrors.firstName && (
                  <Alert className="mt-1 py-2">
                    <AlertDescription className="text-sm text-red-600">{formErrors.firstName}</AlertDescription>
                  </Alert>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Enter last name"
                  className={formErrors.lastName ? "border-red-500" : ""}
                  data-field="lastName"
                />
                {formErrors.lastName && (
                  <Alert className="mt-1 py-2">
                    <AlertDescription className="text-sm text-red-600">{formErrors.lastName}</AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
                className={formErrors.email ? "border-red-500" : ""}
                data-field="email"
              />
              {formErrors.email && (
                <Alert className="mt-1 py-2">
                  <AlertDescription className="text-sm text-red-600">{formErrors.email}</AlertDescription>
                </Alert>
              )}
            </div>

            <div>
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger className={formErrors.department ? "border-red-500" : ""} data-field="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments
                    .filter((dept) => dept !== "All")
                    .map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {formErrors.department && (
                <Alert className="mt-1 py-2">
                  <AlertDescription className="text-sm text-red-600">{formErrors.department}</AlertDescription>
                </Alert>
              )}
            </div>

            <div>
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                <SelectTrigger className={formErrors.role ? "border-red-500" : ""} data-field="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles
                    .filter((role) => role !== "All")
                    .map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {formErrors.role && (
                <Alert className="mt-1 py-2">
                  <AlertDescription className="text-sm text-red-600">{formErrors.role}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSaveEmployee} className="flex-1" data-action="save-employee">
                {editingEmployee ? "Update" : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAddEditOpen(false)}
                className="flex-1"
                data-action="cancel-form"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
