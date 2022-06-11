let mana, money, infamy, treasures, astolfo,
DungeonDoorX = 1100,
DungeonDoorY = 70,
roomStatus=['unlock','lock','lock','lock','lock'],
roomTraps=['none','none','none','none','none'],
roomMonsters=['none','none','none','none','none']

function Room (id, status, monster, trap, posX, posY){
    this.id = id
    this.status = status
    this.monster = monster
    this.trap = trap
    this.posX = posX
    this.posY = posY
    
    if(status == 'lock'){
        lock = new component(posX, posY, 80, 80, 'lock.png', 'image')
    }
    if(monster != 'none'){
        monster = new component(posX, posY, 80, 80, monster+'.png', 'image')
    }
    if(trap == 'spikes'){
        spikes = new component(1000 - 240*roomID, 460, 160, 60, 'Long_Spike_Row.png', 'image')
    }
    if(trap == 'darts'){
        darts = new component(posX, posY, 80, 100,  'darts.png','image')
    }

}

window.onload = function() {
    StartGame();
    console.log("Started")

    mana = 10
    money = 100
    infamy = 0
    treasures = 0
}
function StartGame(){
    myGameArea.start();
    DungeonDoor = new component (DungeonDoorX, DungeonDoorY, 80, 80, 'unnamed.png', 'image');
    Room[0] = new Room(0, roomStatus[0], roomMonsters[0], roomTraps[0], 1040, 300)
    Room[1] = new Room(1, roomStatus[1], roomMonsters[1], roomTraps[1], 800, 300)
    Room[2] = new Room(2, roomStatus[2], roomMonsters[2], roomTraps[2], 560, 300)
    Room[3] = new Room(3, roomStatus[3], roomMonsters[3], roomTraps[3], 318, 300)
    Room[4] = new Room(4, roomStatus[4], roomMonsters[4], roomTraps[4], 78, 300)

    manaDoc = document.getElementById('mana')
    moneyDoc = document.getElementById('money')
    infamyDoc = document.getElementById('infamy')
    treasuresDoc = document.getElementById('treasures')

    moneyDoc.innerHTML = money
    manaDoc.innerHTML = mana
    infamyDoc.innerHTML = infamy
    treasuresDoc.innerHTML = treasures
}
let myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 500;
        this.canvas.id = 'gameCanvas'
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0
        this.interval = setInterval(updateGameArea, 20)
        document.getElementById('GS').appendChild(this.canvas);
    },
    stop : function(){
        clearInterval(this.Interval)
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

function component(x, y, width, height, color, type){
    this.type = type
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function(){
        this.x += this.speedX;

    }
    if(type == 'image'){
        this.image = new Image()
        this.image.onload = function() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
          }.bind(this);
        this.image.src = color
    }else{
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ctx = myGameArea.context;
}
function OpenShop(id){
    document.getElementById(id).style.left = '160px'
    document.getElementById(id).style.top = '50px'
    document.getElementById(id).style.backgroundColor = '#50566d'
    document.getElementById(id).style.padding = '0px 20px 20px 20px' //top right bottom left
    document.getElementById(id).style.display = 'block'
}
function CloseShop(id){
    document.getElementById(id).style.display = 'none'
}
function StartRaid(){
    let posX = 10, posY = 70
    astolfo = new component (posX, posY, 80, 80, 'astolfo.png', 'image');
    astolfo.speedX += 10
    while (posX < DungeonDoorX) {
        posX += 10
        myGameArea.clear()
        StartGame()
        astolfo.newPos()
        astolfo.update()
        //astolfo = new component (posX, posY, 80, 80, 'astolfo.png', 'image');
    }
}
function MonsterPlacement(item){
    roomID = prompt('Please write the number of the room','0')
    if(Room[roomID].status == 'lock'){
        alert('This Room is locked')
    }else{
        if(Room[roomID].monster != 'none'){
            alert('This Room already has a '+Room[roomID].monster)
        }else{
            Room[roomID].monster = item
            roomMonsters[roomID] = item
            monster = new component(Room[roomID].posX, Room[roomID].posY, 80, 80, item+'.png', 'image')
            if(item == 'slime'){
                if(money < 10){
                    alert('Money is not enough')
                }else{
                    money = money - 10
                }
            }
            if(item == 'goblin'){
                if(money < 20){
                    alert('Money is not enough')
                }else{
                    money = money - 20
                }
            }
        }
    }
}
function TrapPlacement(item){
    roomID = prompt('Please write the number of the room', '0')
    if(Room[roomID].status == 'lock'){
        alert('This Room is locked')
    } else{
        if(Room[roomID].trap != 'none'){
            alert('This Room already has '+Room[roomID].trap)
        } else{
            Room[roomID].trap = item
            roomTraps[roomID] = item
            if(item == 'spikes'){
                if(money < 5){
                    alert('Money is not enough')
                }else{
                    money = money - 5
                    spikes = new component(1000 - 240*roomID, 460, 160, 60, 'Long_Spike_Row.png', 'image')
                }
            }
            if(item == 'darts'){
                if(money < 5){
                    alert('Money is not enough')
                }else{
                    money = money - 5
                    darts = new component(Room[roomID].posX, Room[roomID].posY, 80, 100,  'darts.png','image')
                }
            }
        }
    }
}
function RoomUnlock(roomID){
    if(Room[roomID].status == 'unlock'){
        alert('You already have this room')
    }else{
        Room[roomID].status = 'unlock'
        roomStatus[roomID] = 'unlock'
        money = money - 50
        myGameArea.clear()
        StartGame()
    }
}
function updateGameArea(){
    moneyDoc.innerHTML = money
    manaDoc.innerHTML = mana
    infamyDoc.innerHTML = infamy
    treasuresDoc.innerHTML = treasures
}