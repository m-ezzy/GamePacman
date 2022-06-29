/*
power pellets, ghost color blue glowing
each ghost has different personality
every ghost knows where pacman is
red goes directly for pacaman, straight
try finding shortest path from red to pacman from tree data structure
all biscuits to eat, that's the goal
pacman life in bottom bar
and score by eating biscuits and ghosts
multiplayer game, each player plays a ghost and one plays pacman
tunnel from sides where you go through and come out other side
sounds in game
ghosts eyes going back to home when they are eaten
*/
//alert(innerWidth+"vw");
/*some canvas element stuff*/
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//alert(innerWidth,innerHeight);
//some constants
//const unit = Math.floor((innerWidth/100));
const unit = Math.floor(innerHeight/300);
//alert(unit);

const size = 5; //radius of a circle and length of a square side
//size controls the size of walls and ghosts and pacman
//while unit controls the speed of ghosts and pacman

const radius = unit*size;
const length = radius*2;

/*some constants, variables, arrays, objects .....*/
const speed = {
	ghost:unit,    //this should be factor of canvasWidth and canvasHeight
	pacman:unit*2,   //this should be even, it's table should contain all multiples of size*2*unit
	//ghostScared:unit*10,
}
//smallest unit will be used for speed of ghosts, because they are slower than pacman

const canvasWidth = length*28;
const canvasHeight = length*31;

//setting canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;
//alert(innerWidth);

let numberWidth = 28;
let numberHeight = 31;
/*
let tunnel = {
	left:{
		x:0,
		y:Math.floor(numberHeight/2)*length,
	},
	right:{
		x:canvas.width - length,
		y:Math.floor(numberHeight/2)*length,
	},
};
*/
let animation;
let clear;

/*user input storing*/
let up = false;
let down = false;
let right = false;
let left = false;

let initialPosition = {
	pacman:{
		x:length*14,
		y:length*23,
	},
	ghost:{
		x:length*14,
		y:length*15,
	}
};

//let color = ["yellow","#ff1ab3","red","orange","blue","#990099","#006600"];

let color = {
	pacman:"yellow",
	ghost:{
		blinky:"red",
		pinky:"#ff1ab3",
		inky:"blue",
		clayde:"#ff6600",
		areScared:"#00ccff",
	},
	backGround:"black",
	text:"white",
	wall:"blue",
	biscuit:"#ffcc99",
	powerPellet:"#ffcc99",
};

/*
powerPellets = [
	{x:length*2,y:length},
	{x:length*numberWidth,y:length},
	{x:length,y:length*numberHeight},
];
*/

/*
let map = [];

for(let i=0 ; i<600 ; i++){
	map[i] = [];
	for(let j=0 ; j<300 ; j++){
		map[i][j] = 0;
	}
}
map[unit*100][unit*100] = 1;
map[unit*100][unit*101] = 1;
map[unit*100][unit*102] = 1;

map[unit*200][unit*50] = 1;
map[unit*201][unit*50] = 1;
map[unit*201][unit*49] = 1;
map[unit*201][unit*48] = 1;
map[unit*201][unit*47] = 1;
*/
/*
let walls = [];

for(let i=0 ; i<numberWidth ; i++){
	walls.push({x:i,y:0});
	walls.push({x:i,y:numberHeight - 1});
}
for(let i=1 ; i<numberHeight - 1; i++){
	if(i == tunnel.left.y/length){
		continue;
	}
	walls.push({x:0,y:i});
	walls.push({x:numberWidth - 1,y:i});
}

walls.push(
	{x:4,y:1},
	{x:4,y:2},
	{x:4,y:3},
	{x:4,y:4},
	{x:4,y:5},

	{x:8,y:1},
	{x:8,y:2},
	{x:8,y:3},
	{x:8,y:4},

	{x:19,y:5},
	{x:19,y:4},
	{x:20,y:4},
	{x:21,y:4},
	{x:22,y:4},

	{x:1,y:8},
	{x:2,y:8},

	{x:4,y:8},
	{x:4,y:9},
	{x:4,y:10},
	{x:4,y:11},
	{x:4,y:12},

	{x:14,y:7},
	{x:15,y:7},
	{x:15,y:8},
	{x:15,y:8},

	{x:20,y:9},
	{x:20,y:10},
	{x:20,y:11},
	{x:20,y:12},

	{x:21,y:12},
	{x:22,y:12},
	{x:23,y:12},
	{x:24,y:12},

	{x:15,y:12},
	{x:15,y:13},
	{x:15,y:14},

	{x:28,y:6},
);

walls.forEach(w => {
	w.x = w.x*length;
	w.y = w.y*length;
});
*/

//empty = 0
//walls = 1
//biscuit = 2
//powerPellets = 3

value = {
	empty:0,
	wall:1,
	biscuit:2,
	powerPellets:3,
};

map = [[]];
map = [
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	[1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
	[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
	[1,3,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,3,1],
	[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
	
	[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],	
	[1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
	[1,2,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,2,1],
	[1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
	
	[1,1,1,1,1,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1],
	[0,0,0,0,0,1,2,1,1,1,1,1,0,1,1,0,1,1,1,1,1,2,1,0,0,0,0,0],
	[0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
	[0,0,0,0,0,1,2,1,1,0,1,1,1,0,0,1,1,1,0,1,1,2,1,0,0,0,0,0],
	[1,1,1,1,1,1,2,1,1,0,1,0,0,0,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
	[0,0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
	[1,1,1,1,1,1,2,1,1,0,1,0,0,1,0,0,0,1,0,1,1,2,1,1,1,1,1,1],
	[0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
	[0,0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,0,0,0,0,0],
	[0,0,0,0,0,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,0,0,0,0,0],
	[1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1],
	
	[1,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1],
	[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
	[1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1],
	[1,3,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,3,1],
	[1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
	[1,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
	
	[1,2,2,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,1,1,2,2,2,2,2,2,1],
	[1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
	[1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1],
	[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

let walls = [];
for(let i=0 ; i<map.length ; i++){
	for(let j=0 ; j<map[0].length ; j++){
		if(map[i][j] == 1){
			walls.push({x:length*j,y:length*i});
		}
	}
}
class Coordinates{
	constructor(x,y,signx,signy){
		this.x = x;
		this.y = y;
	}
}
class CoordinatesAndDirection{
	constructor(x,y,signx,signy){
		this.x = x;
		this.y = y;
		this.sign = {
			x:signx,
			y:signy,
		};
	}
}
class Root{ //All Basic Common //should be an extension of position/coordinates class
	constructor(color,shape,x,y){
		this.color = color;
		this.shape = shape;
		this.x = x;
		this.y = y;
	}
	draw(){
		if(this.shape == "circle"){
			ctx.beginPath();
			ctx.arc(this.x + radius,this.y + radius,radius,0,Math.PI*2,true);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
		else{
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x,this.y,length,length);
		}
	}
}
//alert(map[0].length);
class Food extends Root{
	constructor(color,shape,x,y){
		super(color,shape,x,y);
		this.eaten = 0;
	}
}
class Character extends Root{
	constructor(color,shape,x,y,signx,signy,speed,state){
		super(color,shape,x,y);
		this.sign = {
			x:signx,
			y:signy
		};
		this.speed = speed;
		this.invinsible = state; //state
		this.initialPosition = {
			x:x,
			y:y,
		};
	}
	update(){
		this.x = this.x + this.sign.x*this.speed;
		this.y = this.y + this.sign.y*this.speed;
	}
	thereIsWallAt(x,y){
		walls.forEach(w => {
			/*
			if((x - w.x == length || x - w.x == -length) && y == w.y){
				return 1;
			}
			else if((y - w.y == length || y - w.y == -length) && x == w.x){
				return 1;
			}
			*/
			if(x == w.x && y == w.y){
				return 1;
			}
		});
		return 0;
	}
	thereIsNoWallAt(x,y){
		walls.forEach(w => {
			if(x == w.x && y == w.y){
				return 0;
			}
		});
		return 1;
	}
	goingInTheTunnel(){
		if(this.y == length*14){
			if(this.x < 0){ //made mistake here, i was checking this.x <= 0, but this.x was done zero in next condition
				this.x = canvas.width;
				//console.log(this);
			}
			if(this.x > canvas.width){
				this.x = 0;
				//console.log(this);
			}
		}
	}
	collidedWithAWall(){
		walls.forEach(w => {
			if(this.sign.y == 0 && w.x - this.x == length*this.sign.x && this.y == w.y){
				return 1;
			}
			if(this.sign.x == 0 && w.y - this.y == length*this.sign.y && this.x == w.x){
				return 1;
			}
		});
		return 0;
	}
	thereIsIntersectionAt(x,y,signx,signy){
		let ans = [];
		
		if(signx == 0){
			if(this.thereIsWallAt(x + length,y) == 0){
				ans.push({signx:1,signy:0});
			}
			if(this.thereIsWallAt(x - length,y) == 0){
				ans.push({signx:-1,signy:0});
			}
		}
		else if(signy == 0){
			if(this.thereIsWallAt(x,y + length) == 0){
				ans.push({signx:0,signy:1});
			}
			if(this.thereIsWallAt(x,y - length) == 0){
				ans.push({signx:0,signy:-1});
			}
		}
		if(ans[0] == undefined){
			ans.push({signx:-1,signy:-1});
		}
		return ans;
	}
}
class Pacman extends Character{
	constructor(color,shape,x,y,signx,signy,speed,state){
		super(color,shape,x,y,signx,signy,speed,state);
		this.biscuitsEaten = 0;
		this.ghostsEaten = 0;
		this.canPassThroughWall = 0;
		this.canEatGhosts = 0;
	}
	collisionWithWall(){
		/*
		for(let i=0 ; i<walls.length ; i++){
			if(this.x + length >= walls[i].x && this.x <= walls[i].x + length && this.y + length >= walls[i].y && this.y <= walls[i].y + length){
				this.sign.x = 0;
				this.sign.y = 0;
			}
		}
		*/
		walls.forEach(w => {
			if(this.sign.x == 1 && w.x - this.x == length && this.y == w.y){
				this.sign.x = 0;
				//this.giveMeNewDirection();
			}
			else if(this.sign.x == -1 && this.x - w.x == length && this.y == w.y){
				this.sign.x = 0;
				//this.giveMeNewDirection();
			}
			else if(this.sign.y == 1 && w.y - this.y == length && this.x == w.x){
				this.sign.y = 0;
				//this.giveMeNewDirection();
			}
			else if(this.sign.y == -1 && this.y - w.y == length && this.x == w.x){
				this.sign.y = 0;
				//this.giveMeNewDirection();
			}
		});
	}
	collisionWithGhost(){
		ghost.forEach(g => {
			if(this.invinsible == 0){
				if((this.x - g.x == length || this.x - g.x == -length) && this.y == g.y){
					this.x = this.initialPosition.x;
					this.y = this.initialPosition.y;
					
					this.sign.x = 0;
					this.sign.y = 0;
					return;
				}
				else if((this.y - g.y == length || this.y - g.y == -length) && this.x == g.x){
					this.x = this.initialPosition.x;
					this.y = this.initialPosition.y;

					this.sign.x = 0;
					this.sign.y = 0;
					return;
				}
			}
			else{
				if((this.x - g.x == length || this.x - g.x == -length) && this.y == g.y){
					(pacman.ghostsEaten)++;
					g.x = g.initialPosition.x;
					g.y = g.initialPosition.y;
					g.sign.x = 1;
					g.sign.y = 0;
				}
				else if((this.y - g.y == length || this.y - g.y == -length) && this.x == g.x){
					(pacman.ghostsEaten)++;
					g.x = g.initialPosition.x;
					g.y = g.initialPosition.y;
					g.sign.x = 1;
					g.sign.y = 0;
				}
			}
		});
		/*
		ghost.forEach(g => {
			if(this.sign.x == 1 && g.x - this.x == length && this.y == g.y){
				this.sign.x = 0;
				//this.giveMeNewDirection();
			}
			else if(this.sign.x == -1 && this.x - g.x == length && this.y == g.y){
				this.sign.x = 0;
				//this.giveMeNewDirection();
			}
			else if(this.sign.y == 1 && g.y - this.y == length && this.x == g.x){
				this.sign.y = 0;
				//this.giveMeNewDirection();
			}
			else if(this.sign.y == -1 && this.y - g.y == length && this.x == g.x){
				this.sign.y = 0;
				//this.giveMeNewDirection();
			}
		});
		*/
	}
	eatsBiscuits(){
		biscuits.forEach(b => {
			if(b.eaten == 0){
				if((this.x - b.x == length || this.x - b.x == -length) && this.y == b.y){
					b.eaten = 1;
					this.biscuitsEaten++;
					return;
				}
				else if((this.y - b.y == length || this.y - b.y == -length) && this.x == b.x){
					b.eaten = 1;
					this.biscuitsEaten++;
					return;
				}
			}
		});
	}
	eatsPowerPellets(){
		powerPellets.forEach(p => {
			if(p.eaten == 0){
				if(((this.x - p.x == length || this.x - p.x == -length) && this.y == p.y) || ((this.y - p.y == length || this.y - p.y == -length) && this.x == p.x)){
					p.eaten = 1;
					this.invinsible = 1;
					ghost.forEach(g => {
						g.state = 0;
						g.color = color.ghost.areScared;
					});
					clearTimeout(clear);
					clear = setTimeout(timeoutPacmanPower,20000);
					return;
				}
			}
		});
	}
}
class Ghost extends Character{
	constructor(color,shape,x,y,signx,signy,speed,state,name){
		super(color,shape,x,y,signx,signy,speed,state);
		this.name = name;
		this.canEatPacman = 1;
	}
	giveMeNewDirection(){
		//console.log(this.sign);
		let a = [];
		let isThereWall = 0;
		let answer;
		/*
		this.sign.x = 1;
		this.sign.x = -1;
		this.sign.y = 1;
		this.sign.y = -1;
		*/

		if(this.sign.x == 0){
			a.push({x:0,y:-this.sign.y});
			
			walls.forEach(w => {
				if(this.x - w.x == length && this.y == w.y){
					isThereWall = 1;
					return;
				}
			});
			if(isThereWall == 0){
				a.push({x:-1,y:0});
			}

			isThereWall = 0;
			
			walls.forEach(w => {
				if(w.x - this.x == length && this.y == w.y){
					isThereWall = 1;
					return;
				}
			});
			if(isThereWall == 0){
				a.push({x:1,y:0});
			}
			/*
			isThereWall = this.isThereWallAt(this.x - length,this.y);
			if(isThereWall == 0){
				a.push({x:-1,y:0});
			}
			isThereWall = this.isThereWallAt(this.x + length,this.y);
			if(isThereWall == 0){
				a.push({x:1,y:0});
			}
			*/
			answer = randomInt(0,a.length-1);
			this.sign.x = a[answer].x;
			this.sign.y = a[answer].y;
		}
		else{
			a.push({x:-this.sign.x,y:0});
			
			walls.forEach(w => {
				if(this.y - w.y == length && this.x == w.x){
					isThereWall = 1;
					return;
				}
			});
			if(isThereWall == 0){
				a.push({x:0,y:-1});
			}

			isThereWall = 0;
			
			walls.forEach(w => {
				if(w.y - this.y == length && this.x == w.x){
					isThereWall = 1;
					return;
				}
			});
			if(isThereWall == 0){
				a.push({x:0,y:1});
			}
			/*
			isThereWall = this.isThereWallAt(this.x,this.y - length);
			if(isThereWall == 0){
				a.push({x:0,y:-1});
			}
			isThereWall = this.isThereWallAt(this.x,this.y + length);
			if(isThereWall == 0){
				a.push({x:0,y:1});
			}
			*/
			//console.log(a.length);
			answer = randomInt(0,a.length-1);
			this.sign.x = a[answer].x;
			this.sign.y = a[answer].y;
			//console.log(answer);
			//console.log(a[answer].x);
		}
	}
	/*
	collisionGhostBorder(){
		if(this.x<radius || this.x>canvas.width-radius || this.y<radius || this.y>canvas.height-radius){
			return 1;
		}
		return 0;
	}
	collisionWithBorder(){
		//console.log(this.sign);
		if(this.x <= 0 && this.sign.x == -1){
			this.giveMeNewDirection();
		}
		else if(this.x >= canvas.width-length && this.sign.x == 1){
			this.giveMeNewDirection();
		}
		else if(this.y <= 0 && this.sign.y == -1){
			this.giveMeNewDirection();
		}
		else if(this.y >= canvas.height-length && this.sign.y == 1){
			this.giveMeNewDirection();
		}
		return 0;
	}
	*/
	collisionWithWall(){
		walls.forEach(w => {
			if(this.sign.x == 1 && w.x - this.x == length && this.y == w.y){
				this.giveMeNewDirection();
			}
			else if(this.sign.x == -1 && this.x - w.x == length && this.y == w.y){
				this.giveMeNewDirection();
			}
			else if(this.sign.y == 1 && w.y - this.y == length && this.x == w.x){
				this.giveMeNewDirection();
			}
			else if(this.sign.y == -1 && this.y - w.y == length && this.x == w.x){
				this.giveMeNewDirection();
			}
		});

		/*
		for(let i=0 ; i<walls.length ; i++){
			if(this.x + length >= walls[i].x && this.x <= walls[i].x + length && this.y + length >= walls[i].y && this.y <= walls[i].y + length){
				//this.sign.x = -1;
				this.giveMeNewDirection();
			}
		}
		*/
	}
	collisionWithPacman(){
		if((this.x - pacman.x <= length && this.x - pacman.x >= -length) && this.y == pacman.y){
			return 1;
		}
		if((this.y - pacman.y <= length && this.y - pacman.y >= -length) && this.x == pacman.x){
			return 1;
		}
		return 0;
	}
}
//let ans = [];
//alert(ans[0]);
class Blinky extends Ghost{
	constructor(color,shape,x,y,signx,signy,speed,state,name){
		super(color,shape,x,y,signx,signy,speed,state,name);
		//this.currentPath = [];
		this.allPossiblePaths = [];
		this.shortestPath = [];
		this.temp = [];
	}
	isAtPerfectPosition(){
		for(let i=0 ; i<28 ;i++){
			for(let j=0 ; j<31 ; j++){
				if(this.x == length*i && this.y == length*j){
					return 1;
				}
			}
		}
		return 0;
	}
	checksEveryPath(x,y,signx,signy,pathUptilNow){
		//let nextx,nexty;
		//let pathUptilNowNew = [];
		//nextx = x + length*signx;
		//nexty = y + length*signy;

		/*
		pathUptilNow.forEach(i => {
			pathUptilNowNew.push({x:i.x,y:i.y});
		});
		*/
		//console.log(pathUptilNow);
		count++;

		if(count == 5){
			return;
		}

		if(this.collidedWithAWall()){
			return;
		}
		if(this.collisionWithPacman()){
			if(this.shortestPath.length == 0){
				this.shortestPath = this.shortestPath.concat(pathUptilNow);
				/*
				pathUptilNow.forEach(p => {
					this.shortestPath.push({x:p.x,y:p.y});
					//this.shortestPath.push(i);
					//console.log(this.shortestPath);
				});
				*/
				return;
			}
			else if(pathUptilNow.length < this.shortestPath.length){
				this.shortestPath = [];
				pathUptilNow.forEach(p => {
					this.shortestPath.push({x:p.x,y:p.y});
					//this.shortestPath.push(i);
				});
				return;
			}
		}

		let pathUptilNowNew = [];
		pathUptilNowNew = pathUptilNowNew.concat(pathUptilNow);
		pathUptilNowNew.push({x:x,y:y});

		//if(this.thisIsAnIntersection()){

		if(signx == 0){
			if(this.thereIsNoWallAt(x,y + length*signy)){
				this.checksEveryPath(x,y + length*signy,0,signy,pathUptilNowNew);
			}
			if(this.thereIsNoWallAt(x + length,y)){
				console.log(pathUptilNowNew);
				this.checksEveryPath(x + length,y,1,0,pathUptilNowNew);
			}
			if(this.thereIsNoWallAt(x - length,y)){
				//console.log(6);
				this.checksEveryPath(x - length,y,-1,0,pathUptilNowNew);
			}
		}
		else if(signy == 0){
			if(this.thereIsNoWallAt(x + length*signx,y)){
				this.checksEveryPath(x + length*signx,y,signx,0,pathUptilNowNew);
			}
			if(this.thereIsNoWallAt(x,y + length)){
				//console.log(5);
				this.checksEveryPath(x,y + length,0,1,pathUptilNowNew);
			}
			if(this.thereIsNoWallAt(x,y - length)){
				//console.log(6);
				this.checksEveryPath(x,y - length,0,-1,pathUptilNowNew);
			}
		}
		//}
		//return;

		/*
		let ans = [];
		ans = this.thereIsIntersectionAt(x,y);
		if(ans[0].x == -1){
			console.log(ans);
			this.checksEveryPath(x + length*signx,y + length*signy,signx,signy,pathUptilNow);
		}
		else{
			ans.forEach(a => {
				console.log(2);
				this.checksEveryPath(x,y,a.signx,a.signy,pathUptilNow);
			});
			//this.checksEveryPath(1,0);
			//this.checksEveryPath(-1,0);
			//this.checksEveryPath(0,1);
			//this.checksEveryPath(0,-1);
		}
		*/
		/*
		walls.forEach(w => {
			if(this.isThereWallAt(nextx,nexty)){
				return [w.x,w.y];
			}
		});
		*/
	}
	findAnyPathToPacman(){
	}
	changeSign(){
		if(this.x != this.shortestPath[1].x){
		let signx = (this.x > this.shortestPath[1].x)?-1:1;
		this.sign.x = signx;
		this.sign.y = 0;
		return;
		}

		let signy = (this.y > this.shortestPath[1].y)?-1:1;
		this.sign.x = 0;
		this.sign.y = signy;

		/*
		for(let i=0 ; i<this.shortestPath.length ; i++){
			let p = this.shortestPath[i];
			if(this.x == this.shortestPath[i].x && this.y == this.shortestPath[i].y){
				if(this.sign.x == 0 && this.shortestPath[i].x < this.shortestPath[i+1].x){
					this.sign.x = 1;
					this.sign.y = 0;
				}
				else if(this.sign.x == 0 && this.shortestPath[i].x > this.shortestPath[i+1].x){
					this.sign.x = -1;
					this.sign.y = 0;
				}
				else if(this.sign.y == 0 && this.shortestPath[i].y < this.shortestPath[i+1].y){
					this.sign.x = 0;
					this.sign.y = 1;
				}
				else if(this.sign.y == 0 && this.shortestPath[i].y > this.shortestPath[i+1].y){
					this.sign.x = 0;
					this.sign.y = -1;
				}
			}
		}
		*/		
	}
}

let biscuits = [];
for(let i=0 ; i<31 ; i++){
	for(let j=0 ; j<28 ; j++){
		if(map[i][j] == value.biscuit){
			biscuits.push(new Food(color.biscuit,"circle",length*j,length*i));
		}
	}
}

let powerPellets = [];
powerPellets.push(
	new Food(color.powerPellet,"circle",length,length*3),
	new Food(color.powerPellet,"circle",length*26,length*3),
	new Food(color.powerPellet,"circle",length,length*23),
	new Food(color.powerPellet,"circle",length*26,length*23),
);

let pacman = new Pacman(color.pacman,"circle",length*14,length*23,0,0,speed.pacman,0);

let ghost = [];
ghost.push(
	//new Ghost(color.ghost.blinky,"circle",length*14,length*15,0,-1,speed.ghost,1,"blinky"),
	new Ghost(color.ghost.pinky,"circle",length*14,length*15,0,-1,speed.ghost,1,"pinky"),
	new Ghost(color.ghost.inky,"circle",length*14,length*15,0,-1,speed.ghost,1,"inky"),
	new Ghost(color.ghost.clayde,"circle",length*14,length*15,0,-1,speed.ghost,1,"clayde"),
);

let blinky = new Blinky(color.ghost.blinky,"circle",length*14,length*15,0,-1,speed.ghost,1,"blinky");

document.body.addEventListener("keydown",onKeydown);
function onKeydown(event){
	/*
	if(event.keyCode == 38){
		//addNewPath("up");
		pacman.sign.x = 0;
		pacman.sign.y = -1;
		//up=true;
	}
	if(event.keyCode==40){
		//addNewPath("down");
		pacman.sign.x = 0;
		pacman.sign.y = 1;
		//down=true;
	}
	if(event.keyCode==37){
		//addNewPath("left");
		pacman.sign.x = -1;
		pacman.sign.y = 0;
		//left=true;
	}
	if(event.keyCode==39){
		//addNewPath("right");
		pacman.sign.x = 1;
		pacman.sign.y = 0;
		//right=true;
	}
	*/
	/*
	let isThereWall = 0;
	if(event.keyCode == 38){
		isThereWall = 0;
		walls.forEach(w => {
			if(pacman.y - w.y == length){
				for(let i=0 ; i<size*2 ; i++){
					if(pacman.x == w.x + unit*i){
						isThereWall = 1;
					}
				}
			}
		});
		if(isThereWall == 0){
			pacman.sign.x = 0;
			pacman.sign.y = -1;
		}
	}
	if(event.keyCode==40){
		isThereWall = 0;
		walls.forEach(w => {
			if(pacman.y - w.y == -length){
				for(let i=0 ; i<size*2 ; i++){
					if(pacman.x == w.x + unit*i){
						isThereWall = 1;
					}
				}
			}
		});
		if(isThereWall == 0){
			pacman.sign.x = 0;
			pacman.sign.y = 1;
		}
	}
	if(event.keyCode==37){
		isThereWall = 0;
		walls.forEach(w => {
			if(pacman.x - w.x == length){
				for(let i=0 ; i<size*2 ; i++){
					if(pacman.y == w.y + unit*i){
						isThereWall = 1;
					}
				}
			}
		});
		if(isThereWall == 0){
			pacman.sign.x = -1;
			pacman.sign.y = 0;
		}
	}
	if(event.keyCode==39){
		isThereWall = 0;
		walls.forEach(w => {
			if(pacman.x - w.x == -length){
				for(let i=0 ; i<size*2 ; i++){
					if(pacman.y == w.y + unit*i){
						isThereWall = 1;
					}
				}
			}
		});
		if(isThereWall == 0){
			pacman.sign.x = 1;
			pacman.sign.y = 0;
		}
	}
	*/
	if(event.keyCode == 38){
		if(pacman.x % length == 0 && pacman.thereIsNoWallAt(pacman.x,pacman.y - length)){
			pacman.sign.x = 0;
			pacman.sign.y = -1;
		}
	}
	if(event.keyCode==40){
		if(pacman.x % length == 0 && pacman.thereIsNoWallAt(pacman.x,pacman.y + length)){
			pacman.sign.x = 0;
			pacman.sign.y = 1;
		}
	}
	if(event.keyCode==37){
		if(pacman.y % length == 0 && pacman.thereIsNoWallAt(pacman.x - length,pacman.y)){
			pacman.sign.x = -1;
			pacman.sign.y = 0;
		}
	}
	if(event.keyCode==39){
		if(pacman.y % length == 0 && pacman.thereIsNoWallAt(pacman.x + length,pacman.y)){
			//console.log(pacman.thereIsNoWallAt(pacman.x + length,pacman.y));
			pacman.sign.x = 1;
			pacman.sign.y = 0;
		}
	}
}

let startCalculating = 1;
let maximum = length*5;
let sx,sy,ex,ey;
document.getElementById("canvas").addEventListener("touchstart",onTouchStart);
function onTouchStart(event){
	sx = event.touches[0].clientX;
	sy = event.touches[0].clientY;
}

document.getElementById("canvas").addEventListener("touchend",onTouchEnd);
function onTouchEnd(event){
	ex = event.touches[0].clientX;
	ey = event.touches[0].clientY;

	if(sx - ex <= maximum && sx - ex >= -maximum && sy > ey){
		pacman.sign.x = 0;
		pacman.sign.y = -1;
	}
	else if(sx - ex <= maximum && sx - ex >= -maximum && sy < ey){
		pacman.sign.x = 0;
		pacman.sign.y = 1;
	}
	else if(sy - ey <= maximum && sy - ey >= -maximum && sx > ex){
		pacman.sign.x = -1;
		pacman.sign.y = 0;
	}
	else if(sy - ey <= maximum && sy - ey >= -maximum && sx < ex){
		pacman.sign.x = 1;
		pacman.sign.y = 0;
	}
}

let count = 0;

//if i put requestAnimationFrame at ending of function then cancelAnimation frame doesn't doesn't work
//cancelAnimationFrame does not work like return statement
function gameLoop(){
	ctx.beginPath();
	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.textAlign = "start";
	ctx.font = innerWidth/30 + "px georgia";
	ctx.fillStyle = color.text;
	ctx.fillText("score: " + pacman.biscuitsEaten,0,length*12);

	//drawing walls
	ctx.fillStyle = color.wall;
	walls.forEach(w => {
		ctx.beginPath();
		ctx.fillRect(w.x,w.y,length,length);
	});
	/*
	for(let i=0 ; i<map.length ; i++){
		for(let j=0 ; j<map[0].length ; j++){
			if(map[i][j] == 1){
				ctx.beginPath();
				ctx.fillRect(length*j,length*i,length,length);
			}
		}
	}
	*/

	//drawing biscuits
	biscuits.forEach(b => {
		if(b.eaten == 0){
			ctx.beginPath();
			ctx.arc(b.x + radius,b.y + radius,radius/3,0,Math.PI*2,true);
			ctx.fillStyle = b.color;
			ctx.fill();
		}
	});
	/*
	biscuits.forEach(b => {
		if(b.eaten == 0){
			b.draw();
		}
	});
	*/
	//drawing power pellets
	powerPellets.forEach(p => {
		if(p.eaten == 0){
			p.draw();
		}
	});

	pacman.draw();
	
	ghost.forEach(g => {
		g.draw();
	});
	
	//blinky.draw();

	pacman.collisionWithWall();
	pacman.update();
	pacman.eatsBiscuits();
	pacman.eatsPowerPellets();
	pacman.collisionWithGhost();
	pacman.goingInTheTunnel();

	ghost.forEach(g => {
		//g.draw();
		g.update();
		g.collisionWithWall();
		g.goingInTheTunnel();
	});

	blinky.update();
	let arr = [];
	if(blinky.isAtPerfectPosition()){
		count = 0;
		blinky.checksEveryPath(blinky.x,blinky.y,blinky.sign.x,blinky.sign.y,arr);
		blinky.changeSign();
	}

	if(pacman.biscuitsEaten == biscuits.length){
		alert("Level Complete! Go To The Next Level.....");
	}
	/*
	if(snakeBorderCollision()){
		cancelAnimationFrame(animation);
		return;
	}

	if(snakeSnakeCollision()){
		cancelAnimationFrame(animation);
		return;
	}

	if(snakeFoodCollision()){
		addNewCircle();
		relocationOfFood();
	}
	*/
	animation=requestAnimationFrame(gameLoop);
}
function randomInt(min,max){
	return Math.round(Math.random()*(max-min)+min);
}
function timeoutPacmanPower(){
	pacman.invinsible = 0;
	ghost.forEach(g => {
		g.state = 1;
		if(g.name == "blinky"){
			g.color = color.ghost.blinky;
		}
		else if(g.name == "pinky"){
			g.color = color.ghost.pinky;
		}
		else if(g.name == "inky"){
			g.color = color.ghost.inky;
		}
		else if(g.name == "clayde"){
			g.color = color.ghost.clayde;
		}
	});
}

gameLoop();
