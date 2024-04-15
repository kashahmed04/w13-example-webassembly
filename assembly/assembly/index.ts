// helper function that checks if num is prime
// web assembly has a stricter number types available to it so we use this to define number instead
function isPrime(num: i32): bool {
  // 1 and anything less than 1 is not prime
  if (num <= 1) {
    return false;
  }

  // check each divisor less than the square root of num
  // if one divides evenly, num is not prime
  // we use math.squareroot because if we think about prime numbers when multiplied by the squre root of itself it gives us
  // the prime number
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  // we could not find a divisor, num must be prime!
  return true;
}

//if we put a negative number in for n the program would break
export function findNthPrime(n: i32): i32 {
  let count = 0; // we've found zero primes so far
  let num = 2; // 2 is the first prime
  while (count < n) {
    // keep going until we've found n primes
    if (isPrime(num)) {
      // check if num is prime
      count++; // count this prime number
    }
    num++; // go to the next number
    //keeps incrementing until count is greater than n (we have found the nth prime number)
  }
  // return the number (-1, becuse of num++ at the end of the last iteration)
  //return the prime number after this loop since we did num++ if the conditon is met we don't go back in so subtract 1 from
  //the num
  return num - 1;
}
