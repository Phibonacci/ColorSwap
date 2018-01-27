class Player {	
	constructor (playerId) {
		if (playerId == 1)
		{
			this.sprite = window.game.add.sprite(64, 64, 'platformer_complete', 'alienBlue_walk1.png');
		}
		else if (playerId == 2)
		{
			this.sprite = window.game.add.sprite(64, 64, 'platformer_complete', 'alienYellow_walk1.png');
		}
	}
	
	update(delta)
	{
		console.log(delta);
		var movement = delta * 100;
		this.sprite.x += movement;
	}
	
	animate () {
		// frames = new FrameData();
		// frames.Add(new Frame(0,  "alienGreen_walk1.png");
		// this.sprite.animation.add('walk', Phaser.Animation.generateFrameNames('platformer_complete', ))
	}
}
