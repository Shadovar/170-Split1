class Sprinkler {
    constructor(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.type = "Sprinkler";
    }

    addToScene(scene, initx, inity) {
        this.image = scene.add.image(initx, inity + 15, "sprinkler");
        this.image.setOrigin(.5, .5).setScale(.25, .25);
        this.image.depth = this.image.y/10 - 3;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    setPos(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
    } 
    
    watering() {
        //console.log("watering");
        if(playerVariables.money >= .5) {
            playerVariables.money -= .5;
            let range = 1;
            for (let row = this.gridy - range; row <= this.gridy + range; row++) {
                if (row > -1 && row < gardenGrid.length) {
                    for (let col = this.gridx - range; col <= this.gridx + range; col++) {
                        if (col > -1 && col < gardenGrid[0].length) {
                            //console.log("location: "+col+', '+row);
                            let loc = gardenGrid[row][col];
                            loc.water = true;
                            if(loc.item instanceof Flower) {
                                loc.item.addWater();
                                //console.log("watering flower at: "+col+', '+row+"\nwater: "+gardenGrid[row][col].water);
                            }
                        }
                    }
                }
            }
        }
    }

    destroy() {
        this.image.destroy();
    }
}