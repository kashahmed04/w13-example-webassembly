
//any number less than or equal to 1 is not prime so return false and we will not incremement the count in findnthprime**
//for a prime number**
//go over**
const isPrime = (num: number): boolean => {
  if (num <= 1) {
    return false;
  }
  //why do we start with 2 here and square root the number** (do we start at 2 because a prime number is any number 
  //above 1 that divides into itself or 1)**
  //a prime number is any number other than 1 or below 1 that divides into itself and 1 only**
  for (let i = 2; i <= Math.sqrt(num); i++) {
    //why do we return false here** (even number and not prime**
    if (num % i === 0) {
      return false;
    }
  }
  //we know the number is prime so return true so we can incremement the count**
  return true;
};

//this takes in a number and while the count is less than the number we put in
//then we check if isPrime then we add to the count otherwise we just add to the num then return the previous num (why)**
//how does this work**
export const findNthPrime = (n: number): number => {
  let count = 0;
  let num = 2;
  while (count < n) {
    if (isPrime(num)) {
      count++;
    }
    num++;
  }
  return num - 1;
};
