// Your work goes here...

function draw() {
	canvas = document.getElementById('game');

	if (canvas.getContext) {
		ctx = canvas.getContext('2d');

		// Draw sky
		ctx.fillStyle = '#87CEEB';
		ctx.fillRect (0, 0, 800, 500);

		// Draw dirt
		ctx.fillStyle = '#C96A1B';
		ctx.fillRect (0, 500, 800, 100);

		var img = new Image();
		img.onload = function() {
			// Draw tree
			ctx.drawImage(img, 0, 270, 88, 125, 50, 70, 281, 400);
			
			// Draw grass/road/bushes
			ctx.drawImage(img, 0, 720, 900, 180, 0, 400, 800, 100);
		};
		img.src = 'assets/duckhunt.png';
	}
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}
}