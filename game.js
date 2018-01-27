'use strict';

var game;

class Prototype extends Phaser.Game {
	constructor () {
		super(1024, 600);
		this.state.add('game', {
			preload: () => this.onPreload(),
			create: () => this.onCreate(),
			update: () => this.onUpdate()
		}, true);
		this.sprite = null;
	}
	onPreload () {
		game.load.atlasXML('platformer_complete', 'assets/platformer_complete.png', 'assets/platformer_complete.xml');
	}
	onCreate () {
		this.sprite = game.add.sprite(64, 64, 'platformer_complete', 'alienBlue_walk1.png');
	}
	onUpdate () {
		this.sprite.angle += 0.5;
	}
}

window.onload = function () {
	game = new Prototype();
}