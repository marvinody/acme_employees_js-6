const employees = [
  { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 },
  { id: 3, name: 'curly', managerId: 1 },
  { id: 5, name: 'groucho', managerId: 3 },
  { id: 6, name: 'harpo', managerId: 5 },
  { id: 8, name: 'shep Jr.', managerId: 4 },
  { id: 99, name: 'lucy', managerId: 1 }
]

const findEmployeeByName = (empName, employees) => {
  return employees.filter((element) => {
    if (element.name === empName) {
      return element
    }
  })[0]
}

const findManagerFor = (empName, employees) => {
  let emp = findEmployeeByName(empName, employees)
  return employees.filter((element) => {
    if (element.id === emp.managerId) {
      return element
    }
  })[0]
}

//findManagerFor('shep Jr.', employeeArr)

const findCoworkersFor = (empName, employees) => {
  let emp = findEmployeeByName(empName, employees)
  return employees.filter((element) => {
    if (element.name !== emp.name && element.managerId === emp.managerId) {
      return element
    }
  })
}

//findCoworkersFor('larry', employeeArr)

const findManagementChainFor = (empName, employees) => {
  //recursive case - manID = 1
  if (findEmployeeByName(empName, employees).managerId === 1) {
    return findManagerFor(empName, employees)
  }
  else { man = findManagerFor(empName, employees) }
  return [man].concat(findManagementChainFor(man.name, employees))
}


//findManagementChainFor('shep Jr.', employeeArr)


const spacer = (text) => {
  if (!text) {
    return console.log('')
  }
  const stars = new Array(5).fill('*').join('')
  console.log(`${stars} ${text} ${stars}`)
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees))//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees))//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees))/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('')

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees))//[  ]
spacer('')

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees))/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('')


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2))

spacer('')

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees))
