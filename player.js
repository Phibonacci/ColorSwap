class Player {
	constructor(playerId, color) {
		this.color = color;
		this.playerId = playerId;
		if (playerId == 1)
		{
			this.sprite = window.game.add.sprite(64, 64, 'platformer', 'alienBlue_walk1.png');
		}
		else if (playerId == 2)
		{
			this.sprite = window.game.add.sprite(64, 64, 'platformer', 'alienYellow_walk1.png');
		}
		this.initializeBody();
		this.initializeAnimations();
		this.sprite.anchor.setTo(.5,.5);
	}
	
	initializeAnimations() {
		this.sprite.animations.add('walk', [31, 32], 5, true);
		this.sprite.animations.add('stand', [28], 5, true);
	}
	
	initializeBody() {
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.bounce.y = 0.2;
		this.sprite.body.gravity.y = 600;
		this.sprite.body.onCollide =  new Phaser.Signal();
		this.sprite.body.onCollide.add(this.checkGround, this);
	}
	
	checkGround(sprite1, sprite2) {
		if (sprite1.y < sprite2.y) {
			this.canJump = 1;
		}
	}
	
	update(delta) {
		this.sprite.body.velocity.x = 0;
		if (this.rightKey()) {
			this.moveRight(delta);
		}
		if (this.leftKey()) {
			this.moveLeft(delta);
		}
		if (this.jumpKey()) {
			console.log("jump key");
			this.jump(delta);
		}
		if (this.sprite.body.velocity.x === 0 && this.sprite.body.velocity.y === 0) {
			this.sprite.animations.play('stand');
		}
	}

	reverseSprite(direction) {
		if (direction * this.sprite.scale.x < 0) {
			this.sprite.scale.x *= -1;
		}
	}
	
	rightKey() {
		return game.input.keyboard.isDown(Phaser.KeyCode.D) || game.input.keyboard.isDown(Phaser.KeyCode.RIGHT);
	}

	leftKey() {
		return game.input.keyboard.isDown(Phaser.KeyCode.Q) || game.input.keyboard.isDown(Phaser.KeyCode.LEFT);
	}
	
	jumpKey() {
		return game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) || game.input.keyboard.isDown(Phaser.KeyCode.UP);
	}
	
	movement(delta) {
		return delta * 30000;
	}
	
	moveRight(delta) {
		if (this.sprite.animations.currentAnime != 'walk') {
			this.sprite.animations.play('walk');
		}
		if (this.sprite.scale.x < 0) {
			this.reverseSprite(1);
		}
		this.sprite.body.velocity.x = this.movement(delta);
	}

	moveLeft(delta) {
		if (this.sprite.animations.currentAnime != 'walk') {
			this.sprite.animations.play('walk');
		}
		if (this.sprite.scale.x > 0) {
			this.reverseSprite(-1);
		}
		this.sprite.body.velocity.x = -this.movement(delta);
	}
	
	jump(delta) {
		if (this.canJump) {
			this.sprite.body.velocity.y = -this.movement(delta) / 2;
			this.canJump = false;
		}
	}
}

Player.Colors = {
	blue: 1,
	green: 2,
	pink: 3,
	yellow: 4
}

Player.SpriteColors = {
	blue: 0x8db5e7,
	green: 0x6fc4a9,
	pink: 0xf19cb7,
	yellow: 0xffcc00
}

Player.OffsetPlayers = {
	blue   : 11,
	green  : 22,
	pink   : 33,
	yellow : 44
}
