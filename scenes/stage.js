class Stage extends Phaser.State {
	create () {
		const colorA = 1;
		const colorB = 3;

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;
		game.input.gamepad.start();
		this.background = new Background();
		this.map = new Map();
		this.map.setColors(colorA, colorB);
		this.map.buildNextChunk();
		this.player1 = new Player(1, colorA);
		this.player2 = new Player(2, colorB);
		this.previousFrameTime = game.time.now;

		this.music = game.add.audio('cheerful_annoyance');
		this.music.loop = true;
		this.music.volume = 0.5;
		this.music.play();
	}
	update () {
		let delta = (game.time.now - this.previousFrameTime) / 1000;
		this.background.update(delta);
		this.map.update(delta);
		this.map.collideWith(this.player1);
		this.map.collideWith(this.player2);
		this.player1.update(delta);
		this.player2.update(delta);
		if (this.player1.switchColorRequest || this.player2.switchColorRequest) {
			let color1 = this.player1.color;
			let color2 = this.player2.color;
			this.player1.switchColor(color2);
			this.player2.switchColor(color1);
		}
		this.previousFrameTime = game.time.now;

		if (this.player1.isOutOfBounds() || this.player2.isOutOfBounds()) {
			this.music.stop();
			this.state.start('Stage');
		}
	}
}
