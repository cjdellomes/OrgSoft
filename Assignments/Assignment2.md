# Reading Assignment 2

##5.1

A component based architecture structures the software system into pieces that interact with one another directly within a single program. On the other hand, a service oriented architecture constructs the system as self contained programs which offer services for one another. Component based architecture keeps its pieces all in one program whereas service oriented architecture designs its pieces as seperate entities.

##5.2

Since the application is relatively small and confined to the device, a monolithic architecture would be appropirate. The application could also use a data centric model for maintaining a table of known positions and responses, similar to modern chess engines. The application would utilize an event driven architecture with the events being player and computer moves.

##5.4

Since a chess program is similar to that of a tic tac toe program, it would be possible to mimic the previous answer and utilize a monolithic and data centric architecture. The chess program is different, however, in that it must allow for users to play across the internet, which would be best implemented as a service oriented system communicating over the internet. Thus, the chess program is a monolithic, data centric, and service oriented design.

##5.6

The ClassyDraw application could store each drawing as its own seperate file, which could be maintained and manipulated via the operating system's file management component. While the user is editing a drawing, a temporary file can be utilized to maintain work until the edits are finalized and moved to a permanent file.

##5.8

##6.1

The classes are possible shapes, so they share properties required for drawing, such as color. Some classes require certain parameters to draw, such as text value, while other classes share extra properties, such as line thickness.

| Property  | Used By |
| --------- | ------- |
| color     | All     |
| height    | All     |
| width     | All     |
| font      | Text    |
| thickness | Rectangle, Ellipses, Star, Line |

##6.2

##6.3

##6.6

