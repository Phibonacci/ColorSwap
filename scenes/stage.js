class Stage extends Phaser.State {
	create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;

		this.background = new Background();
		this.map = new Map();
		this.map.buildNextChunk();
		this.player1 = new Player(1, 1);
		this.player2 = new Player(2, 4);
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
		this.previousFrameTime = game.time.now;
	}
}
