
const options = {
  length: 64,
  allowRepeats: false,
};

const alpha = 'abcdefghijklmnopqrstuvwxyz';
const numeric = '1234567890'
const special = '_=+!@#$%^&*()[]{}';

function processArgs() {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-l' || arg === '--length') {
      const parsed = parseInt(args[i + 1]);
      if (isNaN(parsed)) throw new Error('--length must be a number');
      if (parsed < 32) throw new Error('--length must be at least 32');
      options.length = parsed;
    }
    if (arg === '-r' || arg === '--allow-repeats') {
      options.allowRepeats = true;
    }
    if (arg === '-h' || arg === '--help') {
      console.log('Usage: node passgen.js [options]');
      console.log('Options:');
      console.log('  -l, --length <number>    length of the password (default: 64)');
      console.log('  -r, --allow-repeats      allow repeating characters in the password (default: false)');
      console.log('  -h, --help               display help message');
      process.exit(2);
    }
  }
}

function generate() {
  let output = '';
  let lastChar = '';
  const lookup = alpha + alpha.toUpperCase() + numeric + special;
  const getNextChar = () => lookup[Math.floor(Math.random() * lookup.length)];
  while (output.length < options.length) {
    const char = getNextChar();
    if (!char) throw new Error('got an undefined char');
    if (char === lastChar && !options.allowRepeats) break;
    output = output + char;
  }
  return output;
}

function printRed(msg) {
  console.log('\x1b[31m%s\x1b[0m', msg);
}

function main() {
  try {
    processArgs();
    const pass = generate();
    console.log(pass);
  } catch (err) {
    printRed(err.message);
    process.exit(1);
  }
}

main();
