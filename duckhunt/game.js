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
			ctx.drawImage(img, 0, 270, 88, 125, 30, 70, 281, 400);
			
			// Draw grass/road/bushes
			ctx.drawImage(img, 0, 720, 900, 180, 0, 400, 800, 100);

			// Draw sniffing dog
			ctx.drawImage(img, 0, 0, 60, 44, 170, 400, 120, 88);

			// Draw 5 birds
			ctx.drawImage(img, 0, 115, 40, 40, 310, 290, 80, 80);
			ctx.drawImage(img, 40, 150, 40, 40, 400, 150, 80, 80);
			ctx.drawImage(img, 130, 150, 40, 40, 300, 50, 80, 80);
			ctx.drawImage(img, 206, 110, 40, 40, 600, 40, 80, 80);
			ctx.drawImage(img, 295, 193, 40, 40, 600, 200, 80, 80);
		};
		img.src = 'assets/duckhunt.png';
	}
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}
}