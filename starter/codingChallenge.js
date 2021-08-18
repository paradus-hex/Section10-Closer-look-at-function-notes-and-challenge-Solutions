//codingChallenge1
//working with functions
//call,bind and higher order functions?
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        'What is your favourite programming language?\n0: JavaScript\n1:Python\n2:Rust\n3:C++\n(Write option number)'
      )
    );
    if (answer >= 0 && answer <= 3) {
      this.answers[answer]++; //the problem arises in eventhandler because of this keyword
      console.log(answer);
    } else {
      alert('Wrong Input! Try Again.');
    }
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    type === 'array'
      ? console.log(this.answers)
      : console.log(`Poll results are: `, ...this.answers.join(', '));
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const arr1 = {
  answers: [5, 2, 3],
};

poll.displayResults.call(arr1);
poll.displayResults.call(arr1, 'string');

//codingChallenge2
//Immediately Invoked Function expression
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})(); //notice that it's a IIFE-Immediately Invoked function Expression
