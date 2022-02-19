class DataLogic {
  constructor() {
    this.inputData = [
      [1, 4],
      [2, 0.75],
      [3, 7.25],
      [4, 7],
      [5, 12.5],
      [4.75, 3.25],
      [3.75, 10],
      [2.75, 3],
      [1.75, 3],
      [0.75, 12.5],
      [1.25, 9],
      [2.25, 5.25],
      [3.25, 5.25],
      [4.25, 2],
      [5.25, 10],
      [4.5, 6],
      [3.5, 9],
      [2.5, 14],
      [1.5, 1],
      [0.5, 2],
      [1.9, 4],
      [2.9, 3],
      [3.9, 13],
      [4.9, 2],
      [5, 4],
    ];
    this.outputData = [
      1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2,
    ];
    this.nn = new NeuralNetwork(2, 3, 1);
    this.xRange = [0, 0];
    this.yRange = [0, 0];
    ///find the mins and maxs to map the data on rendering window
    for (let input of this.inputData) {
      let [x, y] = input;
      if (x >= this.xRange[1]) {
        this.xRange[1] = x;
      }
      if (x < this.xRange[0]) {
        this.xRange[0] = x;
      }
      if (y >= this.yRange[1]) {
        this.yRange[1] = y;
      }
      if (y < this.yRange[0]) {
        this.yRange[0] = y;
      }
    }
    for (let i = 0; i < this.inputData.length; i++) {
      this.inputData[i][0] = map(
        this.inputData[i][0],
        this.xRange[0],
        this.xRange[1],
        0,
        1
      );
      this.inputData[i][1] = map(
        this.inputData[i][1],
        this.yRange[0],
        this.yRange[1],
        0,
        1
      );
      this.outputData[i] = this.outputData[i] === 1 ? 0 : 1;
    }
    this.neurons = [];
    for (let i = 0; i < this.inputData.length; i++) {
      let input = this.inputData[i];
      let output = this.outputData[i];
      let [x, y] = input;
      let px = this.mapX(x);
      let py = this.mapY(y);
      this.neurons.push(new Neuron(px, py, 15, output));
    }
    this.num_epochs = 100;
    this.currentError = 0;
    //this.perceptron.train(this.inputData, this.outputData, 100);
  }
  mapX(x) {
    return map(x, 0, 1, 20, width - 20);
  }
  mapY(y) {
    return map(y, 0, 1, height - 20, 20);
  }
  getY(x) {
    let w1 = this.perceptron.weights[0];
    let w2 = this.perceptron.weights[1];
    let b = this.perceptron.weights[2];
    let slope = -(b / w2) / (b / w1);
    let yIntercept = -b / w2;
    return slope * x + yIntercept;
  }
  show() {
    textSize(15);
    fill(50, 150);
    noStroke();
    text("Click to see how this model is performing!", 400, 780);
    for (let neuron of this.neurons) {
      neuron.showLabel();
    }
    fill(0);
    noStroke();
    textSize(30);
    text("Avg Error:" + roundValue(this.currentError), 20, 780);
    let sum_errors = 0;
    for (let i = 0; i < this.num_epochs; i++) {
      let dataIndex = floor(random(0, this.inputData.length));
      sum_errors += this.nn.train(this.inputData[dataIndex], [
        this.outputData[dataIndex],
      ]);
    }
    this.currentError = sum_errors / this.num_epochs;
  }
  update(mx, my) {
    const { prediction } = this.predict(mx, my);

    this.neurons.push(new Neuron(mx, my, 15, prediction));
  }
  predict(x, y) {
    x = map(x, 0, width, 0, 1);
    y = map(y, 0, height, 1, 0);
    return this.nn.predict([x, y]);
  }
}
