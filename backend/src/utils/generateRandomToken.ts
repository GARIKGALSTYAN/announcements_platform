import crypto from "crypto";


export function generateRandomToken(): Promise<string> {
  return new Promise((res, rej) => {
    crypto.randomBytes(62, function(err, buffer) {
      if (err) {
        rej(err);
      } else {
        const token = buffer.toString('hex');
        res(token);
      }
    });
  });
}
