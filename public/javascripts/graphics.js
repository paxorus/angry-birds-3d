/**
 * Main script, controls the scaffold and environment.
 * 
 * @author Prakhar Sahay 03/21/2017
 */

Physi.scripts.worker = "javascripts/lib/physijs_worker.js";
Physi.scripts.ammo = "ammo.js";

var MAX_CHARGE = 1500;

var env = new Environment();

var structure
 = "     -     \n"
 + "    |o|    \n"
 + "   - - -   \n"
 + "  | | | |  \n"
 + "     8     \n"
 + " |o|   |o| \n"
 + " - -   - - \n"
 + "| | |o| | |";

var scaffold = new Scaffold(structure);


// animation loop
var stop = false;
function animate() {
	if (stop) {
		return;
	}
	env.simulate();
	env.render();
	requestAnimationFrame(animate);
}
animate();

var periodicCheck = setInterval(function () {
	if (scaffold.check()) {// game is over
		env.disable();// disable user interaction
		clearInterval(periodicCheck);// stop checking whether the game is over
		env.explode();// Easter egg
		document.getElementById("win-message").style.display = "block";// display win message
	}
}, 500);

env.listen("mousedown", function (event) {
	// find out where the user clicked, based on camera angle
	var point = env.project(event.pageX, event.pageY);
	if (!point || point.y <= 0.5) {
		return;
	}

	// create a striker ball
	window.striker = env.addSphere(0.5, [point.x, point.y, 0], 0x0088FF);
	striker.mass = 0;
	striker.startTime = new Date();

	// change color over time, giving appearance of "charging" the striker
	var color = striker.material.color;
	function charge() {
		var progress = (new Date() - striker.startTime) / MAX_CHARGE;
		color.r = progress;
		color.g = 1 - progress;
		color.b = 1 - progress;

		if (striker.mass === 0) {
			requestAnimationFrame(charge);
		}
	}
	charge();
});

env.listen("mouseup", function (event) {
	// release the striker ball
	if (!window.striker) {
		return;
	}
	striker.mass = 1e4;
	// held down longer -> more power, but there is a cap of MAX_CHARGE
	var velocity = Math.min((new Date() - striker.startTime), MAX_CHARGE) / 20;
	striker.setLinearVelocity(new THREE.Vector3(velocity, 0, 0));
});