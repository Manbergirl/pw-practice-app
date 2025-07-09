//object = обекти

var customer = {
    //!ключ и стойност
  firstName: "Bebito",
  lastName: "Sashko",
  years: 31,
  street: "parchevich",
  issMaried: false,
  dayOfBirth: "08.21.1993",
  cars: ["mazda","opel","tesla"]
};
console.log(customer);

//Опция с точка
customer.firstName = "Беа";
console.log(customer["firstName"]);

//Опция с скоба 
customer["lastName"] = "Bea"
console.log(`${customer.firstName} ${customer.lastName}`)

//арей - масив
//започваме с индекс 0 
var car = ["mazda","opel","tesla"]
console.log(customer.cars[2])

