'use strict';

class JumpChunk {
	constructor(chunkId) {
		this.chunkId = chunkId;
		this.deltaX = game.world.width * chunkId;
		this.ground = [];
		this.isDestroyed = false;
		this.mode = Math.floor(Math.random() * 3);
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
				case 3:
				case 4:
					if (this.mode == 1) {
						let sprite = game.add.sprite(this.deltaX + i * 128, 128 * 4, 'platformer', 'snowCenter_rounded.png');
						sprite.tint = Player.Colors.blue;
						this.ground.push(sprite);
						break;
					} else if (this.mode == 2) {
						let sprite = game.add.sprite(this.deltaX + i * 128, 128 * 4, 'platformer', 'snowCenter_rounded.png');
						sprite.tint = Player.Colors.yellow;
						this.ground.push(sprite);
						break;
					}
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
		for (let i = 0; i < this.ground.length; ++i) {
			game.physics.arcade.enable(this.ground[i]);
			this.ground[i].body.moves = false;
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

	collideWith(sprite) {
		for (let i = 0; i < this.ground.length; ++i) {
			game.physics.arcade.collide(sprite, this.ground[i], null, null, this);
		}
	}
}
