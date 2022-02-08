# Forte
The authors who created are Keith Ellingwood III, Niha Gaddam, Taylor Jackson, and Sebastian Augusto Pasion. This React App allows users to submit event cards of upcoming house shows, as well as discuss various topics regarding music with other users. 

## Checkpoint 2

### UML Class Diagram
<img src="images/P1_Checkpoint2_UML_Class_Diagram.jpg">

### UML Sequence Diagram
<img src="images/P1_Checkpoint2_UML_Sequence_Diagram.png">

## Checkpoint 3
To run the tests, open a terminal and input the following code:

    npm run test

This will run the tests automatically, showing the number of tests passed or failed, as well as what each individual test is.

These unit tests cover most of the Events.js module, except for a large chunk in the New Events function (lines 215-238). This is because we were unable to test the part of New Events that actually pushed user-provided information to a Firebase realtime database. Besides this chunk, the only untested code were lines that either were included in the final project as an accident (console.log statements), variables that are not utilized, or situations that cannot occur.

<p>
<img src="images/P1_Checkpoint3_Coverage.PNG">
</p>