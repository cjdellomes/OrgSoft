# Reading Assignment 3

## 7.1

The original function's comments only explain what the code does, not why the code does things. The actions performed are already apparent in the code, so the comments provide no useful information. A better comment section would be a short description of the function.

```
// Use Euclid's algorithm to calculate the GCD.
private long GCD(long a, long b) {
    a = Math.Abs(a);
    b = Math.Abs(b);
    for (; ; ) {
        long remainder = a % b;
        if (remainder == 0) return b;
        a = b;
        b = remainder;
    };
}
```

## 7.2

The comments could have been created to help the programmer think through the algorithm's implementation. The comments could have also been made after the function was created in an attempt to explain the algorithm's steps.

## 7.4

Offensive programming could be used to validate input and output (e.x. making sure the input values a and b are greater than 0) by throwing exceptions in the event of an error.

## 7.5

Error handling should be included in the code that calls the GCD function rather than within the function itself. The GCD function should throw an exception to be handled by the calling code.

## 7.7

Instructions:
1. Locate the car
2. Unlock and open the car
3. Get in the car
4. Start the car
5. Exit the driveway
6. Turn right at the end of the driveway
7. Turn right at the first intersection and drive forward
8. Turn right at the first intersection with stoplights and drive forward
9. Turn right at the first intersection with stoplights and drive forward
10. Turn left into the parking lot
11. Locate an empty parking space
12. Park the car
13. Open and exit the car
14. Lock the car
15. Walk into the supermarket

Assumptions:
1. The car is parked with the head pointed towards the street
2. Seat and mirrors are pre adjusted
3. The car has fuel
4. The car functions properly
5. The parking lot has empty spots
6. The supermarket is open for business
7. The user knows how to operate an automatic transmission car

## 8.1

```
from random import randint

def test_is_relatively_prime (a, b):
    a = abs(a);
    b = abs(b);

    if (a === 1 || b === 1) return True
    if (a === 0 || b === 0) return False

    min = Math.min
    factor = 2
    while (factor <= min):
        if ((a % factor === 0) && (b % factor === 0)) return False
        factor += 1

    return true;

for x in xrange(1000):
    assert test_is_relatively_prime(randint()) == is_relatively_prime(randint())
```

## 8.3
Since it is unknown how the isRelativelyPrime method works, the test code written is black box testing. An exhaustive test would be possible by testing evey value between a very large number and its negative counterpart (e.x. 1 trillion and -1 trillion). However, this would be a large number of pairs to test and unnecessarily excessive.

## 8.5
```
from random import randint
from fractions import gcd

def is_relatively_prime (a, b):
    if (a == 0) return ((b == 1) || (b == -1))
    if (b == 0) return ((a == 1) || (a == -1))

    gcd = gcd(a, b)
    return ((gcd == 1) || (gcd == -1))

def test_is_relatively_prime (a, b):
    a = abs(a);
    b = abs(b);

    if (a === 1 || b === 1) return True
    if (a === 0 || b === 0) return False

    min = Math.min
    factor = 2
    while (factor <= min):
        if ((a % factor === 0) && (b % factor === 0)) return False
        factor += 1

    return true;

for x in xrange(1000):
    assert test_is_relatively_prime(randint()) == is_relatively_prime(randint())
```

## 8.9
Exhaustive testing counts as black box testing because knowledge of how the tested code works is not necessary.

## 8.11
First, calculate three Lincoln indexes, one for each pair of testers.

1. (Alice, Bob): 5 * 4 / 2 = 10
2. (Alice, Carmen): 5 * 5 / 2 = 12.5
3. (Bob, Carmen): 4 * 5 / 1 = 20

This gives us an average of (10 + 12.5 + 20) / 3 = 14 bugs as well as a worst case of 20 bugs.

## 8.12
If the testers have no bugs in common, index is divided by 0, which gives us an undefined number of bugs. A lower bound for the number of bugs could found by assuming the testers found one bug in common instead of 0. This assumption gives us 5 * 6 / 1 = 30 bugs.