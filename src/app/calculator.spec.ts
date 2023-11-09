import { Calculator } from './calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should add two numbers and return a number', () => {
    const result = calculator.add(8, 2);
    expect(result).toBe(10);
  });

  it('should subtract two numbers and return a number', () => {
    const result = calculator.subtract(8, 2);
    expect(result).toBe(6);
  });

  it('should multiply two numbers and return a number', () => {
    const result = calculator.multiply(8, 2);
    expect(result).toBe(16);
  });

  it('should divide two numbers and return a number', () => {
    const result = calculator.divide(8, 2);
    expect(result).toBe(4);
  });

  it('should return null when dividing by zero', () => {
    const result = calculator.divide(8, 0);
    expect(result).toBeNull();
  });

  describe('Other Matchers', () => {
    it('test matchers', () => {
      let name = 'John';
      let age = 25;
      let fruits = ['apple', 'banana', 'mango', 'orange'];

      expect(name).toBeDefined();
      expect(name).toEqual('John');
      expect(age).toBeGreaterThan(20);
      expect(age + 5).toBeLessThan(35);
      expect(fruits).toContain('banana');

    });
  });

});
