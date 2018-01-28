'use strict';

class Map {
	constructor() {
		game.camera.bounds = null;
		this.group = game.add.group();
		this.chunks = [];
		this.currentChunk = 0;
		this.speed = 150.0;
		this.acceleration = 6.0;
	}

	setColors(color1, color2) {
		this.color1 = color1;
		this.color2 = color2;
	}

	update(deltaTime) {
		game.camera.x += deltaTime * this.speed;
		this.speed += deltaTime * this.acceleration;

		let hasDestroyedChunk = false;
		for (let i = 0; i < this.chunks.length; ++i) {
			this.chunks[i].update();
			if (this.chunks[i].isDestroyed) {
				hasDestroyedChunk = true;
			}
		}
		if (hasDestroyedChunk) {
			this.chunks = this.chunks.filter(x => !x.isDestroyed);
		}
		if (this.chunks.length <= 2) {
			this.buildNextChunk();
		}
	}

	collideWith(player) {
		for (let i = 0; i < this.chunks.length; ++i) {
			this.chunks[i].collideWith(player);
		}
	}

	buildNextChunk() {
		let next = this.createRandomChunk();
		next.build();
		this.chunks.push(next);
		this.currentChunk++;
	}

	createRandomChunk() {
		let type = Math.floor(Math.random() * 3);
		if (this.currentChunk == 0) {
			type = 0;
		}
		switch (type) {
			case 0:
				return new EmptyChunk(this, this.currentChunk);
			case 1:
				return new JumpChunk(this, this.currentChunk);
			case 2:
				return new WallChunk(this, this.currentChunk);
			case 3:
				return new BridgeChunk(this, this.currentChunk);
		}
	}
}
