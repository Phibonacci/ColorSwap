'use strict';

class BridgeChunk extends Chunk {
	constructor(map, chunkId) {
		super(map, chunkId);
		this.mode = Math.floor(Math.random() * 2);
		this.width = Math.floor(Math.random() * 3) + 2;
	}

	build() {
		super.addBlock('grassMid.png', 0, 0, 4);
		super.addBlock('grassRight.png', 0, 1, 4);
		super.addBlock('grassLeft.png', 0, 6, 4);
		super.addBlock('grassMid.png', 0, 7, 4);

		let c = this.mode === 0 ? this.map.color1 : this.map.color2;
		if (this.width === 2) {
			super.addBlock('stoneCliff_left.png', c, 3, 2.5);
			super.addBlock('stoneCliff_right.png', c, 4, 2.5);
		} else if (this.width === 3) {
			let startX = Math.floor(Math.random() * 2) + 2;
			super.addBlock('stoneCliff_left.png', c, startX, 2.5);
			super.addBlock('stoneMid.png', c, startX + 1, 2.5);
			super.addBlock('stoneCliff_right.png', c, startX + 2, 2.5);
		} else if (this.width === 4) {
			super.addBlock('stoneCliff_left.png', c, 2, 2.5);
			super.addBlock('stoneMid.png', c, 3, 2.5);
			super.addBlock('stoneMid.png', c, 4, 2.5);
			super.addBlock('stoneCliff_right.png', c, 5, 2.5);
		}
	}
}
