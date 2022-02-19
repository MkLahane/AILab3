class Perceptron {
  constructor(num_inputs, label1, label2) {
    this.weights = new Array(num_inputs + 1);
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] = random(0, 1);
    }
    this.label1 = label1;
    this.label2 = label2;
    this.lr = 0.01;
  }
  getOutput(input) {
    let dotProduct = 0;
    console.assert(
      input.length === this.weights.length,
      "inputs and weights should be of same length"
    );
    for (let i = 0; i < input.length; i++) {
      dotProduct += input[i] * this.weights[i];
    }
    return this.activation(dotProduct);
  }
  activation(value) {
    if (value < 0) return this.label2;
    else return this.label1;
  }
  train(inputs, outputs, epochs = 10) {
    console.assert(
      inputs.length === outputs.length,
      "inputs and outputs should be of same length"
    );
    for (let epoch = 1; epoch <= epochs; epoch++) {
      let avgError = 0;
      for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        let output = outputs[i];
        let prediction = this.getOutput([...input, 1]);
        let error = output - prediction;
        this.updateWeights(error, [...input, 1]);
        avgError += error;
      }
      //console.log("Epoch:", epoch, " Avg error:", avgError / inputs.length);
    }
  }
  predict(input) {
    return this.getOutput([...input, 1]);
  }
  updateWeights(error, input) {
    for (let i = 0; i < this.weights.length; i++) {
      this.weights[i] += error * this.lr * input[i];
    }
  }
}
