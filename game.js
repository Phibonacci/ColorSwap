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
	}
	onPreload () {
		console.log("preload");
	}
	onCreate () {
		console.log("create");		
	}
	onUpdate () {
		console.log("update");
	}
}

window.onload = function () {
	game = new Prototype();
}