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
var stars;
var duplicatedStar
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

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


    platforms.create(950, 700, 'flotante').setScale().refreshBody();

    platforms.create(1500, 500, 'flotante2').setScale().refreshBody();
    platforms.create(400, 500, 'flotante2').setScale().refreshBody();
    
    platforms.create(950, 987, 'pinchos').setScale().refreshBody();
    platforms.create(2783, 987, 'pincho').setScale().refreshBody();
    

    platforms.create(950, 300, 'suelo3').setScale().refreshBody();
    platforms.create(1700, 200, 'flotante').setScale().refreshBody();
    //  Now let's create some ledges
    
    

    
    // The player and its settings
    player = this.physics.add.sprite(50, 250, 'dude');

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
stars = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 2,
    setXY: { x: 500, y: 350, stepX: 110 }
});

// Crear el grupo de estrellas duplicadas
duplicatedStars = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 2,
    setXY: { x: 1200, y: 350, stepX: 110 }
    
});

triplicatedStars = this.physics.add.group({
    key: 'ball-tlb',
    repeat: 2,
    setXY: { x: 2000, y: 350, stepX: 110 }
    
});


    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { 
        fontSize: '32px', 
        fill: "rgb(41, 198, 238)",
        stroke: "black",
        strokeThickness: 6,
        fontWeight: 900,
    });
    scoreText.setScrollFactor(0);

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(duplicatedStars, platforms);
    this.physics.add.collider(triplicatedStars, platforms);
    this.physics.add.collider(stars, duplicatedStars);
    this.physics.add.collider(stars, triplicatedStars);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, function(player, star) {
        collectStar(player, star);
    }, null, this);

    // Llamada a la función collectStar para las estrellas duplicadas
    this.physics.add.overlap(player, duplicatedStars, function(player, duplicatedStar) {
        collectStar(player, duplicatedStar);
    }, null, this);

    // Llamada a la función collectStar para las estrellas triplicadas
    this.physics.add.overlap(player, triplicatedStars, function(player, triplicatedStar) {
        collectStar(player, triplicatedStar);
    }, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    // 
    function collectStar(player, star) {
        star.disableBody(true, true);
    
        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);
    
        if (stars.countActive(true) === 0 || duplicatedStars.countActive(true) === 0 || triplicatedStars.countActive(true) === 0) {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
    
            duplicatedStars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
    
            triplicatedStars.children.iterate(function (child) {
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

    if (cursors.up.isDown)
    {
        player.setVelocityY(-340);
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






function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    gameOver = true;

    this.add
    .text(200, 250, "Game Over", {
        fontSize: "230px",
        fill: "rgb(41, 198, 238)",
        stroke: "black",
        strokeThickness: 7,
        fontWeight: 9000,
        margin: "5px",
        
        
    })
    .setScrollFactor(0)
    
}