var config = {
    type: Phaser.AUTO,
    width: 3700,
    height:1280,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var bolas;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var canJump = true;



var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ciudad', 'assets/ciudad.png');
    this.load.image('ground', 'assets/suelo6.png');
    this.load.image('flotante', 'assets/flotante4.png');
    this.load.image('flotante2', 'assets/suelo2.png');
    this.load.image('suelo3', 'assets/suelo3.png');
    this.load.image('pared', 'assets/pared.png');
    this.load.image('ball-tlb', 'assets/ball-tlb.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('pinchos', 'assets/pinchos.png');
    this.load.image('pincho', 'assets/pincho.png');
    this.load.image('pincho4', 'assets/pincho4.png');
    
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{

    
    //  A simple background for our game
    this.add.image(2650, 450, 'ciudad');
    
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    
    platforms.create(400, 945, 'ground').setScale().refreshBody();
    platforms.create(1500, 945, 'ground').setScale().refreshBody();
    platforms.create(2268, 945, 'ground').setScale().refreshBody();
    platforms.create(3300, 945, 'ground').setScale().refreshBody();

    platforms.create(-47, 625, 'pared').setScale().refreshBody();
    platforms.create(3747, 625, 'pared').setScale().refreshBody();


    platforms.create(950, 500, 'flotante').setScale().refreshBody();
    platforms.create(1600, 300, 'flotante').setScale().refreshBody();
    platforms.create(3000, 260, 'flotante').setScale().refreshBody();

    platforms.create(1500, 700, 'flotante2').setScale().refreshBody();
    platforms.create(450, 700, 'flotante2').setScale().refreshBody();
    platforms.create(950, 200, 'flotante2').setScale().refreshBody();
    platforms.create(2400, 350, 'flotante2').setScale().refreshBody();
    platforms.create(3250, 690, 'flotante2').setScale().refreshBody();
    platforms.create(3450, 480, 'flotante2').setScale().refreshBody();
    platforms.create(2400, 700, 'flotante2').setScale().refreshBody();
    

    platforms.create(400, 300, 'suelo3').setScale().refreshBody();
    platforms.create(2000, 500, 'suelo3').setScale().refreshBody();
    platforms.create(2800, 575, 'suelo3').setScale().refreshBody();
    
    
    var pinchos = this.physics.add.staticGroup();
    pinchos.create(950, 987, 'pinchos').setScale().refreshBody();

    var pincho = this.physics.add.staticGroup();
    pinchos.create(2783, 987, 'pincho').setScale().refreshBody();
    pinchos.create(1950, 860, 'pincho').setScale().refreshBody();
    
    var pincho4 = this.physics.add.staticGroup();
    pinchos.create(400, 250, 'pincho4').setScale().refreshBody();
    pinchos.create(3000, 210, 'pincho4').setScale().refreshBody();
    pinchos.create(3620, 860, 'pincho4').setScale().refreshBody();
    pinchos.create(1600, 250, 'pincho4').setScale().refreshBody();
    
    //  Now let's create some ledges
    
    // The player and its settings
    player = this.physics.add.sprite(50, 850, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 10
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 20,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

// Crear el grupo de estrellas original
bolas = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 1,
    setXY: { x: 270, y: 150, stepX: 255 }
});

// Crear el grupo de estrellas duplicadas

Bolas2 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 1,
    setXY: { x: 880, y: 150, stepX: 130 }
    
});

Bolas3 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 3,
    setXY: { x: 750, y: 350, stepX: 130 }
    
});

Bolas4 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 4,
    setXY: { x: 200, y: 850, stepX: 130 }
    
});

Bolas5 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 4,
    setXY: { x: 1175, y: 850, stepX: 130 }
    
});

Bolas6 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 1,
    setXY: { x: 1425, y: 150, stepX: 350 }
    
});

Bolas7 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 2,
    setXY: { x: 1870, y: 350, stepX: 130 }
    
});

Bolas8 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 3,
    setXY: { x: 2200, y: 850, stepX: 130 }
    
});

Bolas9 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 2,
    setXY: { x: 2670, y: 350, stepX: 130 }
    
});

Bolas10 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 1,
    setXY: { x: 2825, y: 150, stepX: 350 }
    
});

Bolas11 = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 4,
    setXY: { x: 2980, y: 850, stepX: 130 }
    
});

bolas.children.iterate(function (child) {
    //  Give each bola a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.0, 0.1));
});

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { 
        fontSize: '50px', 
        fill: "rgb(41, 198, 238)",
        stroke: "black",
        strokeThickness: 6,
        fontWeight: 900,
    });
    scoreText.setScrollFactor(0);

    //  Collide the player and the bola with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(bolas, platforms);
    this.physics.add.collider(Bolas2, platforms);
    this.physics.add.collider(Bolas3, platforms);
    this.physics.add.collider(Bolas4, platforms);
    this.physics.add.collider(Bolas5, platforms);
    this.physics.add.collider(Bolas6, platforms);
    this.physics.add.collider(Bolas7, platforms);
    this.physics.add.collider(Bolas8, platforms);
    this.physics.add.collider(Bolas9, platforms);
    this.physics.add.collider(Bolas10, platforms);
    this.physics.add.collider(Bolas11, platforms);
    this.physics.add.collider(bolas, bolas);
    this.physics.add.collider(bolas, Bolas2);
    this.physics.add.collider(bolas, Bolas3);
    this.physics.add.collider(bolas, Bolas4);
    this.physics.add.collider(bolas, Bolas5);
    this.physics.add.collider(bolas, Bolas6);
    this.physics.add.collider(bolas, Bolas7);
    this.physics.add.collider(bolas, Bolas8);
    this.physics.add.collider(bolas, Bolas9);
    this.physics.add.collider(bolas, Bolas10);
    this.physics.add.collider(bolas, Bolas11);

    //  Checks to see if the player overlaps with any of the bolas, if he does call the collectStar function
    this.physics.add.overlap(player, bolas, function(player, bolas) {
        collectBolas(player, bolas);
    }, null, this);

    // Llamada a la función collectbolas para las estrellas duplicadas
    this.physics.add.overlap(player, Bolas2, function(player, Bolas2) {
        collectBolas(player, Bolas2);
    }, null, this);

    // Llamada a la función collectbolas para las bolas triplicadas
    this.physics.add.overlap(player, Bolas3, function(player, Bolas3) {
        collectBolas(player, Bolas3);
    }, null, this);

    this.physics.add.overlap(player, Bolas4, function(player, Bolas4) {
        collectBolas(player, Bolas4);
    }, null, this);
    
    this.physics.add.overlap(player, Bolas5, function(player, Bolas5) {
        collectBolas(player, Bolas5);
    }, null, this);
    
    this.physics.add.overlap(player, Bolas6, function(player, Bolas6) {
        collectBolas(player, Bolas6);
    }, null, this);
    
    this.physics.add.overlap(player, Bolas7, function(player, Bolas7) {
        collectBolas(player, Bolas7);
    }, null, this);
    
    this.physics.add.overlap(player, Bolas8, function(player, Bolas8) {
        collectBolas(player, Bolas8);
    }, null, this);
    
    this.physics.add.overlap(player, Bolas9, function(player, Bolas9) {
        collectBolas(player, Bolas9);
    }, null, this);
    
    this.physics.add.overlap(player, Bolas10, function(player, Bolas10) {
        collectBolas(player, Bolas10);
    }, null, this);
    
    this.physics.add.overlap(player, Bolas11, function(player, Bolas11) {
        collectBolas(player, Bolas11);
    }, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
    this.physics.add.collider(player, pinchos, hitBomb, null, this);
    this.physics.add.collider(player, pincho, hitBomb, null, this);
    this.physics.add.collider(player, pincho4, hitBomb, null, this);
    
    function collectBolas(player, bolas) {
        bolas.disableBody(true, true);
    
        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);
    
        checkAllGroupsEmpty();
    }
    
    // Con esta funcion se logra que no se reinicien las bolas solo al recoger el grupo bolas y si se reinicen al coger todos los grupos//
    function checkAllGroupsEmpty() {
        if (
            bolas.countActive(true) === 0 &&
            Bolas2.countActive(true) === 0 &&
            Bolas3.countActive(true) === 0 &&
            Bolas4.countActive(true) === 0 &&
            Bolas5.countActive(true) === 0 && 
            Bolas6.countActive(true) === 0 && 
            Bolas7.countActive(true) === 0 &&
            Bolas8.countActive(true) === 0 &&
            Bolas9.countActive(true) === 0 &&
            Bolas10.countActive(true) === 0 &&
            Bolas11.countActive(true) === 0 
            ) {
            // A new batch of bolas to collect
            bolas.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
    
            Bolas2.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
    
            Bolas3.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            Bolas4.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            Bolas5.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            Bolas6.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            Bolas7.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            Bolas8.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            Bolas9.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            Bola10.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            Bola11.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
            
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-500,500), 20);
            bomb.allowGravity = false;
        }
    }
}  


function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.up.isDown && player.body.touching.down && canJump) {
        player.setVelocityY(-370);
        player.anims.play('up', false)
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }

    

    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }

    
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    this.cameras.main.scrollX = player.x - 400;
}

function hitBomb(player, entity) {
    if (entity.texture.key === 'bomb' || entity.texture.key === 'pinchos' || entity.texture.key === 'pincho' || entity.texture.key === 'pincho4') {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play("turn");
        gameOver = true;




        var gameOverText = this.add.text(config.width / 4.5, config.height / 2, 'Game Over', {
            fontSize: '72px',
            fill: '#fff',
            fontSize: "250px",
            fill: "rgb(41, 198, 238)",
            stroke: "black",
            strokeThickness: 7,
            
            
        });
        
        gameOverText.setOrigin(0.5);
        gameOverText.setPosition(config.width / 1.4 - gameOverText.width / 0.8, config.height / 1.3 - gameOverText.height / 0.5);
        gameOverText.setScrollFactor(0);
        
            
            
    }
}


