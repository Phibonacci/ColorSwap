class Player {	
	constructor (playerId) {
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
	}
	
	initializeAnimations () {
		this.sprite.animations.add('walk', [31, 32], 5, true);
	}
	
	update(delta)
	{
		var movement = delta * 100;
		this.sprite.x += movement;
	}
	
	initializeBody () {
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.bounce.y = 0.2;
		this.sprite.body.gravity.y = 300;
	}
	
	update (delta) {
		if (this.rightKey()) {
			this.moveRight(delta);
		}
		else if (this.leftKey()) {
			this.moveLeft(delta);
		}
		else {
			this.sprite.body.velocity.x = 0;
		}
		if (this.jumpKey()) {
			this.jump(delta);
		}
	}

	reverseSprite(direction) {
		this.sprite.anchor.setTo(.5,.5);
		if (direction * this.sprite.scale.x < 0) {
			this.sprite.scale.x *= -1;
		}
	}
	
	rightKey () {
		return game.input.keyboard.isDown(Phaser.KeyCode.D) || game.input.keyboard.isDown(Phaser.KeyCode.RIGHT);
	}

	leftKey () {
		return game.input.keyboard.isDown(Phaser.KeyCode.Q) || game.input.keyboard.isDown(Phaser.KeyCode.LEFT);
	}
	
	jumpKey () {
		return game.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR) || game.input.keyboard.isDown(Phaser.KeyCode.UP);
	}
	
	movement (delta) {
		return delta * 30000;
	}
	
	moveRight (delta) {
		if (this.sprite.animations.currentAnime != 'walk') {
			this.sprite.animations.play('walk');
		}
		if (this.sprite.scale.x < 0) {
			this.reverseSprite(1);
		}
		this.sprite.body.velocity.x = this.movement(delta);
	}

	moveLeft (delta) {
		if (this.sprite.animations.currentAnime != 'walk') {
			this.sprite.animations.play('walk');
		}
		if (this.sprite.scale.x > 0) {
			this.reverseSprite(-1);
		}
		this.sprite.body.velocity.x = -this.movement(delta);
	}
	
	jump (delta) {
		if (this.sprite.body.touching.down && hitPlatform) {
			this.sprite.body.velocity.y = this.movement(delta);
		}
	}

	
	animate () {
		// frames = new FrameData();
		// frames.Add(new Frame(0,  "alienGreen_walk1.png");
	}
}
