'use strict';

class Skin {
	constructor(colorId, x, id) {
		this.colorId = colorId;
		this.id = id;
		let offset = Player.OffsetPlayers[colorId];
		this.sprite = game.add.sprite(x, game.world.height * 7 / 20, 'platformer', Player.OffsetPlayers[colorId] + 3);
		this.sprite.anchor.set(0.5, 0);
		this.taken = false;
		this.selected = false;
		this.initializeAnimations();
	}

	initializeAnimations() {
		let offset = Player.OffsetPlayers[this.colorId];
		this.sprite.animations.add('walk', [9 + offset, 10 + offset], 5, true);
		this.sprite.animations.add('police_snapshot', [3 + offset], 5, true);
		this.sprite.animations.add('stand', [6 + offset], 5, true);
		this.sprite.animations.add('jump', [5 + offset], 5, true);
	}
	
	reset() {
		this.selected = false;
		this.taken = false;
		this.sprite.animations.play('stand');
	}

	hover() {
		this.taken = true;
		this.sprite.animations.play('walk');
	}

	select() {
		game.sound.play('jump' + this.colorId, 0.2);
		if (!this.selected) {
			this.selected = true;
			this.sprite.animations.play('police_snapshot');
		} else {
			this.selected = false;
			this.sprite.animations.play('walk');
		}
	}

	update() {

	}
}
