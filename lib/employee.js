class Employee {
    constructor(id, first_name, last_name) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
    }
    getId() {
        return this.id;
    }
    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
}
module.exports = Employee;
