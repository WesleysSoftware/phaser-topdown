// Phaser configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // backgroundColor: '#FFF',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


//intializing game
const game = new Phaser.Game(config);





// variables
let wallCount = 1000







function preload() {
    // Load the sprite sheet (provide correct dimensions and frame size)
    this.load.spritesheet('character', '/link.jpg', {
        frameWidth: 25,  // Change this to your frame width
        frameHeight: 35  // Change this to your frame height
    });
    this.load.image('bomb', '/bomb.png')
    this.load.image('wall', '/wall.png')
}

function create() {
    // Create a sprite using the sprite sheet, setup collides with window, create cursor keys for input
    character = this.physics.add.sprite(400, 300, 'character')
    character.setCollideWorldBounds(true)
    this.cursors = this.input.keyboard.createCursorKeys();
   
    
    //walls creation, adding walls collider, and updating the display on how many we have in our inventory
    walls = this.physics.add.staticGroup()
    this.physics.add.collider(character, walls)
    wallCountDisplay = this.add.text(0, 20, "Walls: " + wallCount)
}

function update() {
    //setting velocity to 0,0 so that it is up/down depsplay
    character.setVelocityY(0)
    character.setVelocityX(0)
    
    //top-left text display
    let versionNo = '0.0.6'
    let topText = this.add.text(0, 0, "Zombie Survival: " + versionNo)
    

    //player movement position, speed, and movement handler
    let pX = character.x
    let pY = character.y
    let playerSpeed = 200

    if (this.cursors.left.isDown) {
        character.setVelocityX(-playerSpeed);
    } 
    else if (this.cursors.right.isDown) {
        character.setVelocityX(playerSpeed);
    } else if (this.cursors.up.isDown) {
        character.setVelocityY(-playerSpeed);
    } else if (this.cursors.down.isDown) {
        character.setVelocityY(playerSpeed);
    } 



    //------------------------------------------//
    //---------------WALL LOGIC-----------------//
    //------------------------------------------//
    const setWalls = () => {
        // create a wall on my player's position with a smaller scale and a proper collission box, reduce wall count, then adjust existing HUD
        walls.create(pX, pY, 'wall').setScale(.25).setSize(25, 25).setOffset(43, 45)
        wallCount--;
        wallCountDisplay.setText("Walls: " + wallCount);

    }
    
    if(this.cursors.space.isDown && wallCount > 0 ) {
       setWalls()
    }
}