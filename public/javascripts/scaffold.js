/**
 * Creates a tower of blocks with green "pigs" that you can knock down.
 * Requires a Three/Physi environment.
 *
 * @author Prakhar Sahay 03/21/2017
 */

function Scaffold(string) {
	// convert multi-line string to 2D grid of characters
	var grid = string.split("\n").map(function (row) {return row.split("")});
	var height = grid.length;
	var width = grid[0].length;

	this.pigs = [];

	this.wall = function (pos) {
		pos[0] -= width / 2;// center all blocks horizontally
		env.addBox([1, 2, 1], pos);
	};

	this.flat = function (pos, length) {
		length = length || 2;
		pos[0] -= width / 2;
		env.addBox([length, 1, 1], pos);
	};

	this.pig = function (pos) {
		pos[0] -= width / 2;
		var pig = env.addSphere(0.5, pos, 0x4BF442);
		this.pigs.push(pig);
	};

	// return whether all pigs have fallen off
	this.check = function () {
		return this.pigs.every(function (pig) {
			return pig.position.y < 0;
		});
	};

	// start a little above the floor
	var altitude = 1.25;

	// build from ground up, last row -> first row
	for (var row = height - 1; row >= 0; row --) {
		for (var col = 0; col < width; col ++) {
			var char = grid[row][col];

			if (char == "-") {
				this.flat([col, altitude, 0]);
			} else if (char == "|") {
				this.wall([col, altitude, 0]);
			} else if (char == "o") {
				this.pig([col, altitude - 0.5, 0]);
			} else if (parseInt(char, 10)) {
				this.flat([col, altitude, 0], char);
			}
		}
		// lazily assume that the rows alternate between walls and flats
		altitude += 1.5;
	}
}


