'use strict';

class Prototype extends Phaser.Game {

	constructor () {
		super(1024, 640, Phaser.CANVAS, 'gameArea', null);
		
		this.state.add('Loading', Loading, false);
		//this.state.add('Menu', Menu, false);
		this.state.add('Stage', Stage, false);

		//Sets the initial state where the game starts in.
		this.state.start('Loading');
	}
}

window.onload = function () {
	window.game = new Prototype();
}
