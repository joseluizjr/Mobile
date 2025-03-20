/* eslint-disable @typescript-eslint/no-explicit-any */
class MockGenerator {
  getMultiples(amount: number, properties: any) {
    const array = [];

    for (let i = 0; i < amount; i++) {
      const objetoClone = { ...properties };
      array.push(objetoClone);
    }

    return array;
  }
}

const mockGenerator = new MockGenerator();

export default mockGenerator;
