'use strict';

class Stage extends Phaser.State {
	init(players) {
		this.players = players;
		this.player1 = players[0];
		this.player2 = players[1];
	}

	create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.world.enableBody = true;
		game.input.gamepad.start();
		this.background = new Background();
		this.map = new Map();
		this.map.setColors(this.player1.color, this.player2.color);
		this.map.buildNextChunk();
		this.previousFrameTime = game.time.now;

		this.music = game.add.audio('cheerful_annoyance');
		this.music.loop = true;
		this.music.volume = 0.5;
		this.music.play();
		this.transmitters = [];
		this.player1.synchronize();
		this.player2.synchronize();
	}
	
	render() {
		for (let t of this.transmitters) {
			t.render();
		}
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
			this.transmitters = this.transmitters.filter(x => !x.destroyMe);
		}
		
		this.previousFrameTime = game.time.now;

		if (this.player1.isOutOfBounds() || this.player2.isOutOfBounds()) {
			this.music.stop();
			this.state.start('Stage', true, false, this.players);
		}
	}
}
