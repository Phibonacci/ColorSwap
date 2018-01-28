class Transmitter {
	constructor(playerSource, playerTarget) {
		this.playerSource = playerSource;
		this.playerTarget = playerTarget;
		this.sprite = game.add.sprite(playerSource.sprite.x, playerSource.sprite.y, 'platformer', 'star.png');
		game.physics.arcade.enable(this.sprite);
		this.direction = playerTarget.sprite.x - playerSource.sprite.x;
		if (this.direction > 0) {
			this.sprite.body.velocity.x = 400;
		} else {
			this.sprite.body.velocity.x = -400;
		}
		this.destroyMe = false;
	}
	
	overlapCheck(objectA, objectB) {
		let color1 = this.playerSource.color;
		let color2 = this.playerTarget.color;
		this.playerSource.switchColor(color2);
		this.playerTarget.switchColor(color1);
		this.sprite.destroy();
		this.destroyMe = true;
	}
	
	update(delta) {
		game.physics.arcade.overlap(this.sprite, this.playerTarget.sprite, this.overlapCheck, null, this);
	}
}