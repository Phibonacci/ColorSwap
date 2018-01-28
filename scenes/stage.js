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
		this.transmitters = [];
	}
	update () {
		let delta = (game.time.now - this.previousFrameTime) / 1000;
		this.background.update(delta);
		this.map.update(delta);
		this.map.collideWith(this.player1);
		this.map.collideWith(this.player2);
		this.player1.update(delta);
		this.player2.update(delta);
		
		if (this.player1.switchColorRequest) {
			this.transmitters.push(new Transmitter(this.player1, this.player2));
			this.player1.switchColorRequest = false;
		} else if (this.player2.switchColorRequest) {
			this.transmitters.push(new Transmitter(this.player2, this.player1));
			this.player2.switchColorRequest = false;
		}
		
		let hasDestroyedTransmitter = false;
		for (let t of this.transmitters) {
			t.update(delta);
			if (t.destroyMe) {
				hasDestroyedTransmitter = true;
			}
		}

		if (hasDestroyedTransmitter) {
			console.log(this.transmitters.length);
			this.transmitters = this.transmitters.filter(x => !x.destroyMe);
			console.log(this.transmitters.length);
		}
		
		this.previousFrameTime = game.time.now;

		if (this.player1.isOutOfBounds() || this.player2.isOutOfBounds()) {
			this.music.stop();
			this.state.start('Stage');
		}
	}
}
