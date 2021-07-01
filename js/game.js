let config = {
    type: Phaser.CANVAS,
    width: 360,
    height: 640,
    physics: {
        default: 'arcade'
    },
    scene: {
        init: init,
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#88e288',
    audio: {
        disableWebAudio: false
    },
    autoCenter: true
};

// Déclaration de nos variables globales
let game = new Phaser.Game(config);
var nextArrow;
let successfulDropoff;

var holdSound;
var wrongSound;
var correctSound;
var finishSound;

var star;
var starScale;

var gameBg;

//
function init() {
}

function preload() {
    this.load.image('background', './assets/serpent-01.png');
    
    this.load.image('head', './assets/snakeHead-01.png');
    this.load.image('middle', './assets/snakeMiddle-01.png');
    this.load.image('end', './assets/snakeEnd-01.png');
    
    this.load.image('nextArrow', './assets/green-arrow (1).png');
    
    this.load.audio('hold', './assets/hold.wav');
    this.load.audio('wrong', './assets/wrong.wav');
    this.load.audio('correct', './assets/correct.wav');
    this.load.audio('finish', './assets/finish.wav');
    
    //---star at the end---
    this.load.image('star', './assets/green-star.png');
    
     //---background pattern---
    this.load.image('gameBg', './assets/newleaf-01.png');

}

function create() { 
    
    gameBg = this.add.image(180, 320, 'gameBg');
    gameBg.setVisible(false);
    
     //---star---
    starScale = 0.1;
    star = this.add.image(90,530, 'star');
    star.setScale(starScale);
    star.setVisible(false);
    star.setDepth(0);
    
    
    var image = this.add.image(200, 250, 'background');
    image.alpha = 0.3;
    
    holdSound = this.sound.add('hold');
    wrongSound = this.sound.add('wrong');
    correctSound = this.sound.add('correct');
    finishSound = this.sound.add('finish');
    
    //----les membres-----
    var head = this.add.image(300, 520, 'head', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(head);
    head.setName('head');
    
    successfulDropoff = 0;
    
    nextArrow = this.add.image(300, 550, 'nextArrow');
    nextArrow.setScale(0.7);
    nextArrow.setVisible(false);
    
    
    var middle = this.add.image(100, 500, 'middle', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(middle);
    middle.setName('middle');
    
    var end = this.add.image(200, 60, 'end', Phaser.Math.RND.pick(frames)).setInteractive();
    this.input.setDraggable(end);
    end.setName('end');
    
    
    //-----les drop zones----

    //  A drop zone
    var zone3 = this.add.zone(150, 190, 65, 130).setRectangleDropZone(65, 130);
    zone3.setName('head');
    
    
    //  A drop zone
    var zone4 = this.add.zone(200, 295, 120, 170).setRectangleDropZone(120, 170);
    zone4.setName('end');
    
    //  A drop zone
    var zone5 = this.add.zone(170, 330, 130, 100).setRectangleDropZone(130, 100);
    zone5.setName('middle');
    
 
    this.input.on('dragstart', function (pointer, gameObject) {

        this.children.bringToTop(gameObject);
        holdSound.play();

    }, this);

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {

    });

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {

    });

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        if(gameObject.name == dropZone.name){
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;

            gameObject.input.enabled = false;
            
            successfulDropoff++;
            correctSound.play();
        }
else{
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
    
            wrongSound.play();
        }
        

    });

    this.input.on('dragend', function (pointer, gameObject, dropped) {

        if (!dropped)
        {
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
        }
        
      if(successfulDropoff === 3){
            nextArrow.setVisible(true);
            nextArrow.setInteractive();
          finishSound.play();
          star.setVisible(true);
          gameBg.setVisible(true);
    }    
        
        nextArrow.on('pointerdown', onClick);

    });
    

}


function update() {
    if(successfulDropoff === 3){
         starScale += 0.001;
        star.setScale(starScale);
        if (starScale > 0.2){
            starScale = 0.2;
        } }
}
function onClick(){
    window.location.replace("https://games.caramel.be/shere-khan/index.html");

}