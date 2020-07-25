const inquirer = require("inquirer")
const ORM = require('../services/orm');
const orm = new ORM();
const Role = require('../models/role');
const Employee = require('../models/employee');
const roleModel = new Role(orm)
const employeeModel = new Employee(orm)

async function buildQuestions() {
    const roles = await roleModel.getAll()
    const employees = await employeeModel.getAll()
    const questions = [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the employees role',
            choices: roles.map(
                role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                }
            )
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the employees manager',
            choices: employees.map(
                employee => {
                    return {
                        name: `${employee.first_name}, ${employee.last_name}`,
                        value: employee.id
                    }
                }
            ).concat([{
                name: 'no manager',
                value: -1
            }])
        }
    ]
    return questions
}

const NewEmployeePrompt = async () => inquirer.prompt(await buildQuestions())

module.exports = NewEmployeePrompt