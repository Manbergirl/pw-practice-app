export function printAge(age) {
  console.log(age);
}
class CustomerDetails {
  printFirstName(firstName) {
    console.log(firstName);
  }
  printLastName(secondName) {
    console.log(secondName);
  }
}
export const customerDetails = new CustomerDetails();
