class Stage extends Phaser.State {
	create () {
		this.player1 = window.game.add.sprite(64, 64, 'platformer_complete', 'alienBlue_walk1.png');
		this.player2 = window.game.add.sprite(64, 64, 'platformer_complete', 'alienGreen_walk1.png');
	}
	update () {
		this.player1.angle += 0.5;
	}
}
