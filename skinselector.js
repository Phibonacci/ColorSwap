'use strict';

class SkinSelector {
    constructor(players) {
        this.selectionOver = false;
        this.skins = [];
        let i = 0;
        for (let key in Player.Colors) {
            this.skins.push(new Skin(Player.Colors[key], game.world.width * (i + 1) / (Object.keys(Player.Colors).length + 1), i));
            i++;
        }
        this.selectors = [];
        this.selectors[0] = new Selector(players[0], this.skins[0]);
        this.selectors[1] = new Selector(players[1], this.skins[2]);
    }

    nextFreeSkin(start, direction) {
        for (let i = (this.skins.length + start + direction) % this.skins.length; i != start; i = (this.skins.length + i + direction) % this.skins.length) {
            if (this.skins[i].taken === false) {
                return this.skins[i];
            }
        }
        return null;
    }

    nextFreeSkinLeftToRight(start) {
        return this.nextFreeSkin(start, 1);
    }

    nextFreeSkinRightToLeft(start) {
        return this.nextFreeSkin(start, -1);
    }

    update() {
        for (let selector of this.selectors) {
            if (selector.player.rightKey() && !selector.skin.selected) {
                let nextSkin = this.nextFreeSkinLeftToRight(selector.skin.id);
                selector.setSkin(nextSkin);
            } else if (selector.player.leftKey() && !selector.skin.selected) {
                let nextSkin = this.nextFreeSkinRightToLeft(selector.skin.id);
                selector.setSkin(nextSkin);
            } else if (selector.player.switchKey()) {
                selector.selectSkin();
            }
        }
        if (this.selectors.every(s => s.skin.selected)) {
            this.selectionOver = true;
        } else {
            this.selectionOver = false;
        }
    }
}
