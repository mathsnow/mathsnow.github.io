            class particle{
constructor(colour, x,y,radius){
  this.colour = colour;
  this.r = radius;
  this.m = this.r;
  this.x = x;
  this.y = y;
  this.xvel = 0;
  this.yvel = 0;
  this.xacc = 0;
  this.yacc = 0;
}
mov(){
    this.xvel += this.xacc;
    this.yvel += this.yacc;
    this.x += this.xvel;
    this.y += this.yvel;
    
}
draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
}
resolveEdgeCollision() {
        // Detect collision with right wall.
        if (this.x + this.r > canvas.width) {
            // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
            this.x = canvas.width - this.r;
            this.xvel = -this.xvel;
            // this.ax = -this.ax;
        }

        // Detect collision with bottom wall.
        else if (this.y + this.r > canvas.height) {
            this.y = canvas.height - this.r;
            this.yvel = -this.yvel;
            // this.ay = -this.ay;
        }

        // Detect collision with left wall.
        else if (this.x - this.r < 0) {
            this.x  = this.r;
            this.xvel = -this.xvel;
            // this.ax = -this.ax;
        }
        // Detect collision with top wall.
        else if (this.y - this.r < 0) {
            this.y = this.r;
            this.yvel = -this.yvel;
            // this.ay = -this.ay;
        }
}

resolveParticleCollision(o2,Dx,Dy,D){
    let nx = Dx/D;
    let ny = Dy/D;

    let k = -2 * ((o2.xvel - this.xvel) * nx + (o2.yvel - this.yvel) * ny) / (1/this.m + 1/o2.m);
    this.xvel -= k * nx / this.m;  // Same as before, just added "k" and switched to "m" instead of "s/2"
    this.yvel -= k * ny / this.m;
    o2.xvel += k * nx / o2.m;
    o2.yvel += k * ny / o2.m;
    }

}



            
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var particles = [];
window.onload = function(){
    
    for (let x=0;x<3;x++){
        particles.push(new particle("red",Math.floor(Math.random() * 101),Math.floor(Math.random() * 101),10));
        particles[x].xvel=Math.random()*10;
        particles[x].yvel=Math.random()*10;
    }
    
      


function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
 for (let n=0; n<3;n++){
    particles[n].resolveEdgeCollision();
    for (let c=n;c<3;c++){
        let Dx = particles[n].x-particles[c].x;
        let Dy = particles[n].y-particles[c].y;
        let D = Math.sqrt(Math.pow(Dx,2)+Math.pow(Dy,2));
        if (D<1) D=1;

        if (D < particles[n].r+particles[c].r){
        particles[n].resolveParticleCollision(particles[c],Dx,Dy,D);
        }
        }
        }
    
    for (let x=0;x<3;x++){
    particles[x].mov();
    particles[x].draw();
 }
}
 setInterval(update, 1000/60);


}
