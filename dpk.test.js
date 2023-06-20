const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the provided partitionKey when given a valid string", () => {
    const input = { partitionKey: "test-key" };
    const output = deterministicPartitionKey(input);
    expect(output).toBe("test-key");
  });

  it("Handles non-string partition keys and converts them to a string", () => {
    const input = { partitionKey: 1234 };
    const output = deterministicPartitionKey(input);
    expect(output).toBe("1234");
  });

  it("Generates a crypto hash for objects without a partitionKey property", () => {
    const input = { data: "test-data" };
    const dataString = JSON.stringify(input);
    const expectedHash = crypto
      .createHash("sha3-512")
      .update(dataString)
      .digest("hex");
    const output = deterministicPartitionKey(input);
    expect(output).toEqual(expectedHash);
  });
});
