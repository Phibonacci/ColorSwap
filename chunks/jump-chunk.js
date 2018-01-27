'use strict';

class JumpChunk {
	constructor(chunkId) {
		this.chunkId = chunkId;
		this.deltaX = game.world.width * chunkId;
		this.ground = [];
		this.isDestroyed = false;
	}

	build() {
		for (let i = 0; i < 8; ++i) {
			switch (i)
			{
				case 0:
				case 1:
					this.ground.push(game.add.sprite(this.deltaX + i * 128, 128 * 4, 'platformer', 'grassMid.png'));
					break;
				case 2:
					this.ground.push(game.add.sprite(this.deltaX + i * 128, 128 * 4, 'platformer', 'grassRight.png'));
					break;
				case 5:
					this.ground.push(game.add.sprite(this.deltaX + i * 128, 128 * 4, 'platformer', 'grassLeft.png'));
					break;
				case 6:
				case 7:
					this.ground.push(game.add.sprite(this.deltaX + i * 128, 128 * 4, 'platformer', 'grassMid.png'));
					break;
			}
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
