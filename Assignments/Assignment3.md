# Reading Assignment 3

##7.1

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

##7.2

The comments could have been created to help the programmer think through the algorithm's implementation. The comments could have also been made after the function was created in an attempt to explain the algorithm's steps.

##7.4

Offensive programming could be used to validate input and output (e.x. making sure the input values a and b are greater than 0) by throwing exceptions in the event of an error.

##7.5

Error handling should be included in the code that calls the GCD function rather than within the function itself. The GCD function should throw an exception to be handled by the calling code.

##7.7

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