'use strict';

class EmptyChunk {
	constructor(chunkId) {
		this.chunkId = chunkId;
		this.deltaX = game.world.width * chunkId;
		this.ground = [];
		this.isDestroyed = false;
	}

	build() {
		for (let i = 0; i < 8; ++i) {
			this.ground[i] = game.add.sprite(this.deltaX + i * 128, 128 * 4, 'platformer', 'grassMid.png');
		}
	}

	update() {
		if (this.isDestroyed) return;

		if (game.camera.x > this.deltaX + game.world.width) {
			this.destroy();
		}
	}

	destroy() {
		if (this.isDestroyed) return;

		this.isDestroyed = true;
		for (let i = 0; i < this.ground.length; ++i) {
			this.ground[i].destroy();
		}
	}
}
