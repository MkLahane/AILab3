class NotLogic {
  constructor() {
    this.nn = new NeuralNetwork(1, 2, 1);
    this.training_data = [
      {
        inputs: [0],
        targets: [1],
      },
      {
        inputs: [1],
        targets: [0],
      },
    ];
    this.input1 = new Neuron(200, 300, 30);
    this.hiddenNeuron1 = new Neuron(400, 250, 20);
    this.hiddenNeuron2 = new Neuron(400, 350, 20);
    this.outputNeuron = new Neuron(600, 300, 30);
    this.hiddenOutput = new Array(2).fill(0);
    this.currentError = 0;
    this.num_epochs = 5;
  }
  show() {
    this.input1.makeArrow(this.hiddenNeuron1.pos.x, this.hiddenNeuron1.pos.y);
    this.input1.makeArrow(this.hiddenNeuron2.pos.x, this.hiddenNeuron2.pos.y);

    this.hiddenNeuron1.makeArrow(
      this.outputNeuron.pos.x,
      this.outputNeuron.pos.y
    );
    this.hiddenNeuron2.makeArrow(
      this.outputNeuron.pos.x,
      this.outputNeuron.pos.y
    );

    this.input1.show();
    this.hiddenNeuron1.drawHidden(this.hiddenOutput[0]);
    this.hiddenNeuron2.drawHidden(this.hiddenOutput[1]);
    this.outputNeuron.show();
    fill(0);
    noStroke();
    textSize(30);
    text("Avg Error:" + roundValue(this.currentError), 20, 750);
    let sum_errors = 0;
    for (let i = 0; i < this.num_epochs; i++) {
      let data = random(this.training_data);
      sum_errors += this.nn.train(data.inputs, data.targets);
    }
    this.currentError = sum_errors / this.num_epochs;
    this.setOutput();
  }
  update(mx, my) {
    if (this.input1.isMouseOver(mx, my)) {
      this.input1.setOn(!this.input1.on);
    }
  }
  setOutput() {
    let input = [this.input1.on ? 1 : 0];
    let { hiddenOutput, prediction } = this.nn.predict(
      input,
      this.hiddenOutput
    );
    this.outputNeuron.setOn(prediction === 1 ? true : false);
    this.hiddenOutput = hiddenOutput;
  }
}
