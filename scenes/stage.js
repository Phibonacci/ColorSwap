class Stage extends Phaser.State {
	create () {
		this.background = new Background();
		this.map = new Map();
		this.player1 = new Player(1);
		this.player2 = new Player(2);
		//this.game.keyboard.
		this.previousFrameTime = game.time.now;
	}
	update () {
		let delta = (game.time.now - this.previousFrameTime) / 1000;
		this.background.update(delta);
		this.map.update(delta);
		this.player1.update(delta);
		this.previousFrameTime = game.time.now;
	}
}
