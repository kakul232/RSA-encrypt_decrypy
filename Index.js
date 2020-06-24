const crypto = require("crypto");
const fs = require("fs");

exports.encrypt = (toEncrypt) => {
  const publicKey = fs.readFileSync(`./rsa/public_key.pem`, "utf8");
  const buffer = Buffer.from(toEncrypt, "utf8");
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

exports.decrypt = (toDecrypt) => {
  const private_key = fs.readFileSync(`./rsa/private_key.pem`, "utf8");
  if (!toDecrypt) return toDecrypt;
  const buffer = Buffer.from(toDecrypt, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: private_key.toString(),
      passphrase: "",
    },
    buffer
  );
  return decrypted.toString("utf8");
};
exports.generateKeys = () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "",
    },
  });

  fs.writeFileSync("./rsa/keys/private_key.pem", privateKey);
  fs.writeFileSync("./rsa/keys/public_key.pem", publicKey);
};

this.generateKeys();
