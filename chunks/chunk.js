'use strict';

class Chunk {
	constructor(map, chunkId) {
		this.map = map;
		this.chunkId = chunkId;
		this.deltaX = game.world.width * chunkId;
		this.isDestroyed = false;
		this.blocks = [];
	}

	update(deltaTime) {
		if (this.isDestroyed) return;

		if (game.camera.x > this.deltaX + game.world.width) {
			this.destroy();
		}
	}

	addBlock(type, color, x, y) {
		let sprite = this.map.group.create(this.deltaX + x * 128, y * 128, 'platformer', type);
		sprite.color = color;
		switch (color) {
			case 1:
				sprite.tint = Player.SpriteColors.green;
				break;
			case 2:
				sprite.tint = Player.SpriteColors.red;
				break;
			case 3:
				sprite.tint = Player.SpriteColors.blue;
				break;
			case 4:
				sprite.tint = Player.SpriteColors.yellow;
				break;
		}
		game.physics.arcade.enable(sprite);
		sprite.body.moves = false;
		sprite.body.friction = 0;
		this.blocks.push(sprite);
	}

	destroy() {
		if (this.isDestroyed) return;

		this.isDestroyed = true;
		for (let i = 0; i < this.blocks.length; ++i) {
			this.blocks[i].destroy();
		}
	}

	collideWith(player) {
		for (let i = 0; i < this.blocks.length; ++i) {
			if (this.blocks[i].color === 0 || player.color === this.blocks[i].color) {
				game.physics.arcade.collide(player.sprite, this.blocks[i], null, null, this);
			}
		}
	}
}
