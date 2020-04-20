class Sizes {
  constructor(value) {
    this.privateValue = value;
  }

  get value() {
    return this.privateValue;
  }

  get minimum() {
    if (this.privateValue._ != null) {
      return this.privateValue._;
    }
    const firstKeyThatStartsAtMinimum = Object.keys(this.privateValue).find(
      (k) => k.charAt(0) === '_'
    );
    return this.privateValue[firstKeyThatStartsAtMinimum];
  }

  size(key) {
    if (key === '_') {
      return this.minimum;
    }
    return this.privateValue[key];
  }
}

export default Sizes;
