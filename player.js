class Player {
	constructor(playerId, color) {
		this.color = color;
		this.playerId = playerId;
		if (playerId == 1)
		{
			this.sprite = game.add.sprite( 2 * game.world.width / 3, game.world.height / 2, 'platformer', 'alienBlue_walk1.png');
			this.sprite.x += this.sprite.width;
		}
		else if (playerId == 2)
		{
			this.sprite = game.add.sprite(2 * game.world.width / 3, game.world.height / 2, 'platformer', 'alienYellow_walk1.png');
			this.sprite.x -= this.sprite.width;
		}
		this.initializeBody();
		this.initializeAnimations();
		this.sprite.anchor.setTo(.5,.5);
		this.movement = 400;
		this.jumpForce = 1300;
		this.initializeControls();
		this.switchColorRequest = false;
		this.switchCooldown = 2;
		this.previousSwitchTime = 0;
	}
		
	initializeControls() {
		if (this.playerId == 1) {
			this.pad = game.input.gamepad.pad1;
			this.controls = {
				right: [ Phaser.KeyCode.D ],
				left : [ Phaser.KeyCode.A, Phaser.KeyCode.Q ],
				jump : [ Phaser.KeyCode.W, Phaser.KeyCode.Z, Phaser.KeyCode.SPACEBAR ],
				switchKey : [ Phaser.KeyCode.E]
			};
		} else {
			this.pad = game.input.gamepad.pad2;
			this.controls = {
				right: [ Phaser.KeyCode.RIGHT ],
				left : [ Phaser.KeyCode.LEFT ],
				jump : [ Phaser.KeyCode.UP ],
				switchKey : [ Phaser.KeyCode.NUMPAD_0]
			};
		}
	}
	
	initializeAnimations() {
		let offset = Player.OffsetPlayers[this.color];
		this.sprite.animations.add('walk', [9 + offset, 10 + offset], 5, true);
		this.sprite.animations.add('stand', [6 + offset], 5, true);
		this.sprite.animations.add('jump', [5 + offset], 5, true);
	}
	
	initializeBody() {
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = 3500;
		this.sprite.body.onCollide =  new Phaser.Signal();
		this.sprite.body.onCollide.add(this.checkGround, this);
	}
	
	checkGround(sprite1, sprite2) {
		if (sprite1.y < sprite2.y) {
			this.canJump = 1;
		}
	}
	
	switchColor(color) {
		this.color = color;
		this.switchColorRequest = false;
		this.initializeAnimations();
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
			this.jump(delta);
		}
		if (this.switchKey()) {
			if (game.time.now / 1000 - this.previousSwitchTime > this.switchCooldown) {
				this.switchColorRequest = true;
				this.previousSwitchTime = game.time.now / 1000;
			}
		}
		
		
		if (this.sprite.body.velocity.x === 0 && this.sprite.body.velocity.y === 0
			&& this.sprite.animations.currentAnime != 'stand') {
			this.sprite.animations.play('stand');
		} else if (this.sprite.body.touching.down === false
			&& this.sprite.animations.currentAnime != 'jump') {
			this.sprite.animations.play('jump');
		}
	}

	reverseSprite(direction) {
		if (direction * this.sprite.scale.x < 0) {
			this.sprite.scale.x *= -1;
		}
	}
	
	isKeyDown(keys) {
		for (let k of keys) {
			if (game.input.keyboard.isDown(k)) {
				return true;
			}
		}
		return false;
	}
	
	rightKey() {
		return this.isKeyDown(this.controls.right)
			|| this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1;
	}

	leftKey() {
		return this.isKeyDown(this.controls.left)
			|| this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1;
	}
	
	jumpKey() {
		return this.isKeyDown(this.controls.jump)
			|| this.pad.isDown(Phaser.Gamepad.XBOX360_A)
			|| this.pad.isDown(Phaser.Gamepad.XBOX360_B);
	}

	switchKey() {
		return this.isKeyDown(this.controls.switchKey)
			|| this.pad.isDown(Phaser.Gamepad.XBOX360_X)
			|| this.pad.isDown(Phaser.Gamepad.XBOX360_Y);
	}
	
	moveRight(delta) {
		if (this.sprite.animations.currentAnime != 'walk' && this.sprite.body.touching.down) {
			this.sprite.animations.play('walk');
		}
		if (this.sprite.scale.x < 0) {
			this.reverseSprite(1);
		}
		this.sprite.body.velocity.x = this.movement;
	}

	moveLeft(delta) {
		if (this.sprite.animations.currentAnime != 'walk' && this.sprite.body.touching.down) {
			this.sprite.animations.play('walk');
		}
		if (this.sprite.scale.x > 0) {
			this.reverseSprite(-1);
		}
		this.sprite.body.velocity.x = -this.movement;
	}
	
	jump(delta) {
		if (this.sprite.body.touching.down) {
			game.sound.play('jump' + this.color, 0.2);
			this.sprite.body.velocity.y = -this.jumpForce;
			this.canJump = false;
		}
	}

	isOutOfBounds() {
		return this.sprite.y > game.world.height + this.sprite.height ||
			this.sprite.x - game.camera.x < -Math.abs(this.sprite.width) * 2;
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
	1 : 11,
	2 : 22,
	3 : 33,
	4 : 44
}
