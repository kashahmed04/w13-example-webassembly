// helper function that checks if num is prime
function isPrime(num: i32): bool {
  // 1 and anything less than 1 is not prime
  if (num <= 1) {
    return false;
  }

  // check each divisor less than the square root of num
  // if one divides evenly, num is not prime
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  // we could not find a divisor, num must be prime!
  return true;
}

// exported function to find the nth prime
// (this is kind of computationally intense on purpose)
export function findNthPrime(n: i32): i32 {
  let count = 0; // we've found zero primes so far
  let num = 2; // 2 is the first prime
  while (count < n) { // keep going until we've found n primes
    if (isPrime(num)) { // check if num is prime
      count++; // count this prime number
    }
    num++; // go to the next number
  }
  // return the number (-1, becuse of num++ at the end of the last iteration)
  return num - 1;
}