const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  const getHash = (data) =>
    crypto.createHash("sha3-512").update(data).digest("hex");

  const parseEvent = (event) => {
    if (!event) {
      return TRIVIAL_PARTITION_KEY;
    }
    if (event.partitionKey) {
      return event.partitionKey;
    }

    const data = JSON.stringify(event);
    return getHash(data);
  };

  let candidate = parseEvent(event);

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? getHash(candidate)
    : candidate;
};
