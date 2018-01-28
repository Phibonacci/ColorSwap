class Stage extends Phaser.State {
	create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;
		game.input.gamepad.start();
		this.background = new Background();
		this.map = new Map();
		this.map.buildNextChunk();
		this.player1 = new Player(1, 2);
		this.player2 = new Player(2, 4);
		this.previousFrameTime = game.time.now;
	}
	update () {
		let delta = (game.time.now - this.previousFrameTime) / 1000;
		this.background.update(delta);
		this.map.update(delta);
		this.map.collideWith(this.player1);
		this.map.collideWith(this.player2);
		this.player1.update(delta);
		this.player2.update(delta);
		this.previousFrameTime = game.time.now;
	}
}
