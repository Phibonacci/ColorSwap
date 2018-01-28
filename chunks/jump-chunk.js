'use strict';

class JumpChunk extends Chunk {
	constructor(map, chunkId) {
		super(map, chunkId);
		this.mode = Math.floor(Math.random() * 2);
	}

	build() {
		for (let x = 0; x < 8; ++x) {
			let sprite;
			switch (x)
			{
				case 0:
				case 1:
				case 6:
				case 7:
					super.addBlock('grassMid.png', 0, x, 4);
					break;
				case 2:
					super.addBlock('grassRight.png', 0, x, 4);
					break;
				case 3:
				case 4:
					let texture = x == 3 ? 'snowLeft.png' : 'snowRight.png';
					let color = this.mode === 0 ? 1 : 4;
					super.addBlock(texture, color, x, 4);
					break;
				case 5:
					super.addBlock('grassLeft.png', 0, x, 4);
					break;
			}
		}
	}
}
