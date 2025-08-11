const fs = require('fs');
const crypto = require('crypto');

const envPath = '.env';
const secret = crypto.randomBytes(64).toString('hex');

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

const updatedEnv = envContent.replace(
  /^JWT_SECRET=.*$/m,
  `JWT_SECRET=${secret}`
);

if (!updatedEnv.includes('JWT_SECRET=')) {
  fs.appendFileSync(envPath, `\nJWT_SECRET=${secret}\n`);
} else {
  fs.writeFileSync(envPath, updatedEnv);
}

console.log('JWT_SECRET успешно сгенерирован');