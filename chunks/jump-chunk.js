'use strict';

class JumpChunk extends Chunk {
	constructor(map, chunkId) {
		super(map, chunkId);
		this.mode = Math.floor(Math.random() * 2);
		this.size = Math.floor(Math.random() * 2);
	}

	build() {
		let jumpStartX = 3 - this.size;
		let jumpEndX = 4 + this.size;
		for (let x = 0; x < 8; ++x) {
			if (x >= jumpStartX && x <= jumpEndX) {
				let texture =
					x == jumpStartX ? 'snowLeft.png' :
					x == jumpEndX ? 'snowRight.png' :
					'snowMid.png';
				let color = this.mode === 0 ? 1 : 4;
				super.addBlock(texture, color, x, 4);
			} else {
				let texture =
					x == jumpStartX - 1 ? 'grassRight.png' :
					x == jumpEndX + 1 ? 'grassLeft.png' :
					'grassMid.png';
				super.addBlock(texture, 0, x, 4);
			}
		}
	}
}
