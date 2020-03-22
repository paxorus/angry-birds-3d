Prakhar Sahay 03/21/2017
prakhar@cs.brandeis.edu

You'll have to start the Node.js server (node index.js) because Physi uses a Web worker.
The project is self-contained, so you don't need an Internet connection.

### How to Play
A tower of gray blocks and green pigs should appear. Click on the left to launch an angry bird. Hold down to make the bird angrier. When all pigs have fallen off the platform, the winning message will display. You can change the structure string in graphics.js to design your own tower.

### Code Breakdown
* graphics.js: the controller, creates an environment and a scaffold, starts the game loops (one renders and simulates the environment, the other checks whether the game has ended) and sets the event listeners
* scaffold.js: creates the tower and manages the pigs
* environment.js: an abstraction for the THREE/Physi APIs

### Visual Design
* Opacity is always nice. The WebGL Renderer has alpha: true so a background photo of a mirror lake can be seen. The floor has low opacity to give a glass-like look.
* While the cursor is held down, the balls will increase in red and decrease in blue and green, to show that they're "charging" up.
* Environment.explode() seems like a nice way to celebrate the end of the game with a bang.