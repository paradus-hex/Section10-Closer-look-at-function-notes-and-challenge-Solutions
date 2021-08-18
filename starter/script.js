'use strict';
/////////////////////////////
//Deafult function parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5 way for default parameters values
  //numPaseengers= numPaseengers || 1
  //price = price ||199;

  const booking = {
    flightNum, //enhanced object literal syntax ES6
    numPassengers,
    price,
  };
  console.log(booking);

  bookings.push(booking);
};
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', undefined, 1000); //when you want to skip a value

//passing values by value vs reference.
// How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'; //this doesn't change the string(primitive value) because it's not a reference
  passenger.name = 'Mr. ' + passenger.name; //this changes the property of the object(reference type) because it was passed by reference.

  if (passenger.passport === 24739479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

// newPassport(jonas);
// checkIn(flight, jonas);

////////////////////////
//Higher order functions importance
//Creates abstraction. Instead of doing everything in a single block, it breaks it up into smaller levels making the  code more readable and comprehensible.For example, in this instance the transformer function is the higher level function and the upperFristWord function is lower level. The transformer function doesn't care about how the transformation works, it just callbacks the lower function to carry out the task. That's what creates abstracton in the code.
//low level function (will be used for callback)
const upperFirstWord = function (str) {
  const [first, ...other] = str.split(' ');
  return [first.toUpperCase(), ...other].join(' ');
};
//higher order function
const transformer = function (str, fn) {
  console.log(`Orginal sring: ${str}`);
  console.log(`Transformed string:${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best', upperFirstWord);

//Functions returning functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
greet('Hey')('Jonas'); //works
//real use
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Yaseen');

//Challenege: same thing with arrow functions
const arrowGreet = arrowGreeting => arrowName =>
  console.log(`${arrowGreeting} ${arrowName}`);

const arrowGreeterHey = arrowGreet('Hey');
arrowGreeterHey('YASEEN');

/////////////////////////////////////////////
//Using same function for different object
//Call and Apply meyhods

//object1
const lufthansa = {
  airline: 'Lufathansa',
  iataCode: 'LH',
  bookings: [],
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

//we need book function for Similar object to object1. So we do this:

const bookXerox = lufthansa.book;

const euroWings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
//Notice how eoruwings doesn't have the book function. Now here's the funny part

//lufthansa
lufthansa.book(238, 'Jonas Schemden');

//euroWings
lufthansa.book.call(euroWings, 987, 'Yaseen');
bookXerox.call(euroWings, 987, 'Yaseen Nur'); //Same bookXerox=lufthasna.book
//this applies the method of lufthansa on euro wings even if we have not created a method in eurowings itself.
//Caution: The properties of lufthansa and eurowings has to be eaxtly same for this to work!

//the apply  ethod
//same as call method but takes array as data
//is obsolete after ES6 because of spread opearator
const bookingData = [87, 'Anny Sultana'];
bookXerox.apply(euroWings, bookingData);
bookXerox.call(euroWings, ...bookingData);

//Bind Method:Binds 'this' keyword and if needed arguments of a function to another function denoted by a variable
//.bind(this,arg1,arg2)parameter list
//here we create a function which will always have this=euroWings set

const bookEW = lufthansa.book.bind(euroWings); //this=euroWings
bookEW(23, 'Yaseen');

//setting airlines number
const bookEW23 = bookXerox.bind(euroWings, 23);
bookEW23('Yaseen Nur');

//Important concept of Bind with event listeners
lufthansa.planes = 300; //crates a property planes as there is np plane proeprty previously on lufthansa
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//Binding with eventlistener
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //sets this.lufthansa

//Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVATBD = addTax.bind(null, 0.15); //here this=null as there no use of this keyword. then we set rate to .15.
//equivalent of const addVATBD=value=.value+value*0.15

const arrowTax = vat => value => console.log(value + value * vat);

const vatBD = arrowTax(0.15);
vatBD(100);
