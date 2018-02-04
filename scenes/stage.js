'use strict';

class Stage extends Phaser.State {
	init(players, bestScore) {
		this.score = 0;
		this.bestScore = bestScore;
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
		
		this.textScore = game.add.text(game.world.centerX, 50, Math.round(this.score));
		this.textScore.score = Math.round(this.bestScore);
		this.textScore.font = 'Luckiest Guy';
		this.textScore.fill = '#FF8181';
		this.textScore.fontSize = 100;
		this.textScore.anchor.set(0.5);

		this.textBestScore = game.add.text(game.world.width - 300, 50, "Best: " + Math.round(this.bestScore));
		this.textBestScore.score = Math.round(this.bestScore);
		this.textBestScore.font = 'Luckiest Guy';
		this.textBestScore.fill = '#FF8181';
		this.textBestScore.fontSize = 50;

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
	
	refreshScore(text, score, prefix) {
		let scoreRounded = Math.round(score);
		if (text.score != scoreRounded) {
			text.text = prefix + scoreRounded;
			text.score = scoreRounded;
		}
	}

	update () {
		let delta = (game.time.now - this.previousFrameTime) / 1000;
		if (this.bestScore < this.score) {
			this.bestScore = this.score;
		}
		this.textScore.position.x = game.camera.x + game.world.centerX;
		this.textBestScore.position.x = game.camera.x + game.world.width - 300;
		this.score += delta * 5;
		this.refreshScore(this.textScore, this.score, null);
		this.refreshScore(this.textBestScore, this.bestScore, 'Best: ');		
		this.textScore.text = Math.round(this.score);
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
			this.state.start('Stage', true, false, this.players, this.bestScore);
		}
	}
}
