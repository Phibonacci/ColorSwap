'use strict';

class Background {
	constructor() {
		this.sprites = [];

		for (let i = 0; i < 2; ++i) {
			this.sprites[i] = game.add.sprite(game.world.width * i, game.world.height, 'blue_land');
			this.sprites[i].anchor.setTo(0, 1);
		}
	}
	update(deltaTime) {
		for (let i = 0; i < this.sprites.length; ++i) {
			if (game.camera.x > this.sprites[i].x + this.sprites[i].width) {
				this.sprites[i].x += this.sprites[i].width * 2;
			}
		}
	}
}
