class Stage extends Phaser.State {
	create () {
		this.player1 = new Player(1);
		this.player2 = new Player(2);
		//this.game.keyboard.
		this.previousFrameTime = game.time.now;
	}
	update () {
		let delta = (game.time.now - this.previousFrameTime) / 1000;
		this.player1.update(delta);
		this.previousFrameTime = game.time.now;
	}
}
