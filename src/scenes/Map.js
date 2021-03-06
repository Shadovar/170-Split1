class Map extends Phaser.Scene {
    constructor() {
        super("mapScene");
    }

    init(data){

        console.log("Getting level info")
        
        //As a -1 indicates that it just came from the hub, this cleanses that
        this.toHub = data.arrivingAt - 1;
        this.justArrivedAt = Math.abs(data.arrivingAt);
        this.honeyDemand = data.honeyDemand;
        console.log("Level info acquired")
    }

    
    create() {

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        //Setting controls
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Setting Background
        this.menu = this.add.image(centerX, centerY, 'TownMap').setOrigin(0.5);

        //Setting text
        this.scoreConfig = {
            fontFamily: "Courier",
            fontSize: "14px",
            color: "#000000",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
        };

        //Show current player stats
        this.playerStats = this.add.text(centerX, 60, "Honey: "+playerVariables.honey+"\nMoney: "+playerVariables.money, this.scoreConfig).setOrigin(.5,.5);


        //Creating images for paths
        let pathNull = this.add.image(0, 0, 'PathBees_Work').setOrigin(0.5);
        let path1_2 = this.add.image(centerX, centerY, 'Path1_2').setOrigin(0.5);
        let path2_5 = this.add.image(centerX, centerY, 'Path2_5').setOrigin(0.5);
        let path3_4 = this.add.image(centerX, centerY, 'Path3_4').setOrigin(0.5);
        let path4_5 = this.add.image(centerX, centerY, 'Path4_5').setOrigin(0.5);
        let pathBees_Work = this.add.image(centerX, centerY, 'PathBees_Work').setOrigin(0.5);
        let pathWork_1 = this.add.image(centerX, centerY, 'PathWork_1').setOrigin(0.5);
        let pathWork_2 = this.add.image(centerX, centerY, 'PathWork_2').setOrigin(0.5);
        let pathWork_3 = this.add.image(centerX, centerY, 'PathWork_3').setOrigin(0.5);
        let pathWork_4 = this.add.image(centerX, centerY, 'PathWork_4').setOrigin(0.5);
        
        //Creating images for locations
        let bees = this.add.image(.25*centerX, .35*centerY, 'Beehive').setOrigin(0.5);
        let work = this.add.image(.45*centerX, .65*centerY, 'Work').setOrigin(0.5);
        let house1 = this.add.image(1.5*centerX, .35*centerY, 'House').setOrigin(0.5);
        let house2 = this.add.image(centerX, centerY, 'House').setOrigin(0.5);
        let house3 = this.add.image(0.5*centerX, 1.55*centerY, 'House').setOrigin(0.5);
        let house4 = this.add.image(1.15*centerX, 1.75*centerY, 'House').setOrigin(0.5);
        let house5 = this.add.image(1.65*centerX, 1.35*centerY, 'House').setOrigin(0.5);


        //Creating Valid Paths
        this.currentPlayerLoc = this.justArrivedAt;
        //0 = Bees, 1 = Company, 2 on = respective house
        //Houses are numbered top-down, left-right
        //Number stored at [x][y] is the number of the path
        this.paths = [
            [0, 5, 0, 0, 0, 0, 0], //Paths from Bees
            [5, 0, 6, 7, 8, 9, 0], //Paths from work
            [0, 6, 0, 1, 0, 0, 0], //Paths from House 1
            [0, 7, 1, 0, 0, 0, 2], //Paths from House 2
            [0, 8, 0, 0, 0, 3, 0], //Paths from House 3
            [0, 9, 0, 0, 3, 0, 4], //Paths from House 4
            [0, 0, 0, 2, 0, 4, 0] //Paths from House 5
        ];
        this.locations = [
            bees, work, house1, house2, house3, house4, house5
        ];
        this.roads = [
            //0        1        2        3        4           5              6           7           8           9
            pathNull, path1_2, path2_5, path3_4, path4_5, pathBees_Work, pathWork_1, pathWork_2, pathWork_3, pathWork_4
        ];

        //Making images interactable
        bees.setInteractive();
        work.setInteractive();
        house1.setInteractive();
        house2.setInteractive();
        house3.setInteractive();
        house4.setInteractive();
        house5.setInteractive();

        //Setting interactive behaviors
        bees.on('pointerover', () => {this.isValidHover(0);});
        bees.on("pointerout", () => {this.unhighlightImages(0);});
        bees.on('pointerup', () => {this.isValidPlay(0);});
        work.on('pointerover', () => {this.isValidHover(1);});
        work.on("pointerout", () => {this.unhighlightImages(1);});
        work.on('pointerup', () => {this.isValidPlay(1);});
        house1.on('pointerover', () => {this.isValidHover(2);});
        house1.on("pointerout", () => {this.unhighlightImages(2);});
        house1.on('pointerup', () => {this.isValidPlay(2);});
        house2.on('pointerover', () => {this.isValidHover(3);});
        house2.on("pointerout", () => {this.unhighlightImages(3);});
        house2.on('pointerup', () => {this.isValidPlay(3);});
        house3.on('pointerover', () => {this.isValidHover(4);});
        house3.on("pointerout", () => {this.unhighlightImages(4);});
        house3.on('pointerup', () => {this.isValidPlay(4);});
        house4.on('pointerover', () => {this.isValidHover(5);});
        house4.on("pointerout", () => {this.unhighlightImages(5);});
        house4.on('pointerup', () => {this.isValidPlay(5);});
        house5.on('pointerover', () => {this.isValidHover(6);});
        house5.on("pointerout", () => {this.unhighlightImages(6);});
        house5.on('pointerup', () => {this.isValidPlay(6);});


        //Creating a player icon and putting it at the correct location
        let iconXSpacer = 40;
        let iconYSpacer = 15;
        let curLocX = this.locations[this.currentPlayerLoc].x;
        let curLocY = this.locations[this.currentPlayerLoc].y;
        this.playerIcon = this.add.image(curLocX + iconXSpacer, curLocY + iconYSpacer, 'PlayerIcon').setOrigin(0.5).setScale(.55, .55);

        //Determine if there is already a honey demand
        if(typeof this.honeyDemand == 'undefined'){
            this.honeyDemand = this.createHoneyDemand(); //create a new demand if it is needed
        }
        
        //If the current location has demand and you have sufficient supply, make the exchange
        if(this.honeyDemand[0][this.currentPlayerLoc] <= this.honey){
            //Exchange honey
            playerVariables.honey -= this.honeyDemand[0][this.currentPlayerLoc];
            this.honeyDemand[0][this.currentPlayerLoc] = 0;
            //Exchange money
            playerVariables.money += this.honeyDemand[1][this.currentPlayerLoc];
            this.honeyDemand[1][this.currentPlayerLoc] = 0;
        }

        //Update the player's stats on the screen
        this.playerStats.text = "Honey: "+playerVariables.honey+"\nMoney: "+playerVariables.money;

        //Show the demand via text
        let supplyDemandText = [this.locations.length];
        for(let m = 0; m < this.locations.length; ++m){
            if(m == 0 || m == 1){
                //If either the hive or the hub
                continue;
            }
            else{
                //console.log(this.honeyDemand[0][m]);
                supplyDemandText[m] = this.add.text(this.locations[m].x, this.locations[m].y + 50, "Honey Demand: "+this.honeyDemand[0][m]+"\nMoney Supply: "+this.honeyDemand[1][m], this.scoreConfig).setOrigin(.5,.5);
            }
        }

        //background music for the map
        this.music = this.sound.add("mapMusic");
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();

        //if it is returning to the hub, do that instead
        if(this.toHub == 0){
            console.log("At hub")
            this.music.stop();
            this.scene.start("hubScene");
        }
    }

    update() {
        //Pause Game
        if(Phaser.Input.Keyboard.JustDown(keyESCAPE)){
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", {previousScene:"mapScene"});
        }
    }

    //Checks whether there is a path connecting the selected location and the player's current location
    isValidHover(selectedLoc){
        if((selectedLoc == this.currentPlayerLoc) ||
            this.isValidPath(selectedLoc)){
                this.locations[selectedLoc].setFrame(1); //Highlights the location if it is connected
                if(selectedLoc == this.currentPlayerLoc){ //If the player is hovering over their current location
                    for(let i = 0; i < this.paths[this.currentPlayerLoc].length; ++i){
                        this.roads[this.paths[this.currentPlayerLoc][i]].setFrame(1);
                    }
                }
                else{   //Otherwise, only highlight the path connecting to their current location
                    this.roads[this.paths[this.currentPlayerLoc][selectedLoc]].setFrame(1);
                }
        }

    }

    //Checks whether the player can depart to the selected location from their current location
    isValidPlay(selectedLoc){
        if(this.isValidPath(selectedLoc)){
            this.music.stop();
            if(selectedLoc == 0) { this.scene.start('playScene', { destination:0, honeyDemand:this.honeyDemand }); }
            else if(selectedLoc == 2) { this.scene.start('playScene', { destination:2, honeyDemand:this.honeyDemand}); }
            else if(selectedLoc == 3) { this.scene.start('playScene', { destination:3, honeyDemand:this.honeyDemand }); }
            else { this.scene.start('playScene', { destination:selectedLoc, honeyDemand:this.honeyDemand}); }
            
        }
    }

    //Checks whether the selected location is connected to the player's current location
    isValidPath(selectedLoc){
        if(this.paths[this.currentPlayerLoc][selectedLoc] != 0){
            return true;
        }
        else{
            return false;
        }
    }

    //Unhighlights current building and all roads
    unhighlightImages(selectedLoc){
        this.locations[selectedLoc].setFrame(0);
        this.roads.forEach( 
            function(entry) {entry.setFrame(0); }
        );
    }

    //Highlights the path at the given index
    highlightPath(index){
        this.roads[index].setFrame(1);
    }

    //Creates an array. The first element is an array of how much honey each location desires
    //The second element is an array of how much money each is willing to pay
    createHoneyDemand(){
        let honeyDemand = [];
        let moneyReward = [];
        //For each location, create a demand
        for(let i = 0; i < this.locations.length; ++i){
            if(i == 0 || i == 1){ //If the location is the hive or the hub
                honeyDemand.push(0);
                moneyReward.push(0);
            }
            else{ //If the location is anywhere else
                let honeyAmt = Phaser.Math.Between(0, 5);
                honeyDemand.push(honeyAmt);
                if(honeyAmt != 0){ //If there is a demand, determine how much they will spend
                    let moneyAmt = Phaser.Math.Between(1, 7);
                    moneyReward.push(moneyAmt);
                }
                else{ //If there is no demand, they will not pay
                    moneyReward.push(0);
                }
            }
        };
        //Combine the two arrays in demandByLocation
        let demandByLocation = [honeyDemand, moneyReward];
        //Return the completed array
        return demandByLocation;
    }
}
