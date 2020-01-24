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
// good parameter names! having them equal what they are makes a ton of sense!!
const findEmployeeByName = (empName, employees) => {
  // so what is element? is it an element of any kind of array? can this be changed?
  // also, filter returns an array but the method should return a single element
  // maybe there's an array method that behaves like filter (with the matcher function)
  // but stops at the first element found? there is! take a look at documentation on the .find method
  return employees.filter((element) => {
    if (element.name === empName) {
      return element
    }
  })[0]
}

// so what is being passed in here? make sure you check to see what stuff the function is getting
// because the first parameter isn't a name anymore, it's an employee object!
// you don't have to find by name again
// other than that, same comments as above
const findManagerFor = (empName, employees) => {
  let emp = findEmployeeByName(empName, employees)
  return employees.filter((element) => {
    if (element.id === emp.managerId) {
      return element
    }
  })[0]
}

//findManagerFor('shep Jr.', employeeArr)
// correct use of filter here!, wanting to return an array
// I like your condtiional checks but what if two employees shared the same name
// is there a unique identifier for each employee you can use instead?
const findCoworkersFor = (empName, employees) => {
  let emp = findEmployeeByName(empName, employees)
  return employees.filter((element) => {
    if (element.name !== emp.name && element.managerId === emp.managerId) {
      return element
    }
  })
}

//findCoworkersFor('larry', employeeArr)

// similar idea
const findManagementChainForEmployee = (empName, employees) => {
  //recursive case - manID = 1
  if (findEmployeeByName(empName, employees).managerId === 1) {
    return findManagerFor(empName, employees)
  }
  // be careful with man here. you didn't put an identifier so it became var
  else { man = findManagerFor(empName, employees) }
  // good idea using concat and recursion!
  return [man].concat(findManagementChainForEmployee(man, employees))
}

// breaking out your smaller funcs! I like it! makes it more readable
const findTopMan = (employees) => {
  return employees.filter((element) => {
    if (!element.managerId) return element
  })[0]
}

//findTopMan(employeeArr)
// findManagementChainFor('shep Jr.', employeeArr)
// const generateManagementTree(employees){
//   return {}

// }

const generateReportsArr = (employees) => {
  employees.forEach((element) => element.reports = [])
  return employees
}

//   return employees.reduce(accum, empElem) => {
//     if (empElem.managerId){
//       empElem
//     }
//   }
// }
generateManagementTree = (oEmployees) => {
  let employees = generateReportsArr(oEmployees)
  let topMan = findTopMan(oEmployees)

  // I think the approach here is right, go through each employee
  // find their manager
  // add that employee to the manager's reports
  // ^ if you write some pseudo code like this, it goes a long way
  // and it's a good start to make sure you're on the right path
  // I'm not sure reduce is needed here and I think it may complicate things
  // but overall looks correct!
  return employees.reduce((accum, empElem) => {
    let man = findManagerFor(empElem.name, employees)
    if (empElem.managerId) {
      man.reports.push((empElem))
    }
    return accum
  }, [topMan])
}


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
