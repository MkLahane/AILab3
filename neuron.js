class Neuron {
  constructor(x, y, r, label = 0) {
    this.pos = createVector(x, y);
    this.r = r;
    this.on = false;
    this.label = label;
  }
  setOn(on) {
    this.on = on;
  }
  show() {
    if (this.on) {
      noStroke();
      fill(0);
      ellipse(this.pos.x, this.pos.y, this.r * 1.5);
    } else {
      noStroke();
      fill(255);
      ellipse(this.pos.x, this.pos.y, this.r * 1.5);
    }
    noFill();
    stroke(0);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
  drawHidden(val) {
    let opacity = map(val, 0, 1, 50, 150);
    fill(0, opacity);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
  showLabel() {
    if (this.label === 1) {
      noStroke();
      fill(255, 0, 0);
      ellipse(this.pos.x, this.pos.y, this.r * 1.5);
    } else {
      noStroke();
      fill(0, 255, 0);
      ellipse(this.pos.x, this.pos.y, this.r * 1.5);
    }
    noFill();
    stroke(0);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
  isMouseOver(mx, my) {
    let d = dist(this.pos.x, this.pos.y, mx, my);
    return d < this.r;
  }
  makeArrow(tox, toy) {
    strokeWeight(2);
    stroke(0, 50);
    line(this.pos.x, this.pos.y, tox, toy);
  }
}
