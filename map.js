'use strict';

class Map {
	constructor() {
		game.camera.bounds = null;
		this.chunks = [];
		this.currentChunk = 0;
		this.buildNextChunk();
	}

	update(deltaTime) {
		game.camera.x += deltaTime * 250.0;
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
		if (this.chunks.length <= 1) {
			this.buildNextChunk();
		}
	}

	collideWith(sprite) {
		for (let i = 0; i < this.chunks.length; ++i) {
			this.chunks[i].collideWith(sprite);
		}
	}

	buildNextChunk() {
		let next = this.createRandomChunk();
		next.build();
		this.chunks.push(next);
		this.currentChunk++;
	}

	createRandomChunk() {
		if (Math.random() < 0.5) {
			return new JumpChunk(this.currentChunk);
		} else {
			return new EmptyChunk(this.currentChunk)
		}
	}
}
