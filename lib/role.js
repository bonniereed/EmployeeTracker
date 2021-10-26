class Role {
    constructor(id, emp_role, salary) {
        this.id = id;
        this.emp_role = emp_role;
        this.salary = salary;
    }
    getId() {
        return this.id;
    }
    getDepartmentName() {
        return this.emp_role;
    }
    getSalary() {
        return this.salary;
    }
}
module.exports = Role;
