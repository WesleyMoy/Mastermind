// const http = require('http');
// const MongoClient = require('mongodb').MongoClient;

// const db = 'mastermind';
// const mongo = '7v0C9zv1EZj2mUql';
// const uri = 
// `mongodb+srv://wesley:${mongo}@cluster0.q2fzg.mongodb.net/${db}?retryWrites=true&w=majority`

// const hostname = '127.0.0.1';
// const port = 3000;

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   console.log(err);
// });

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

const {stdin, stdout} = process;

function prompt(question) {
  return new Promise((resolve, reject) => {
    stdin.resume();
    stdout.write(question);

    stdin.on('data', data => resolve(data.toString().trim()));
    stdin.on('error', err => reject(err));
  });
}

const gameState = {
  answer: 'ecfb',
  turn: 1,
};

async function start() {
  const {answer} = gameState;
  let {turn} = gameState;
  console.log('Possible answer is 4 letters consisting of a, b, c, d, e, f');
  while (turn <= 10) {
    console.log('Turn ' + turn);
    const guess = await prompt("What is your guess: ");
    if (guess === gameState.answer) {
      console.log('Correct');
      return;
    }

    let correct = [];
    let correctColor = 0;
    let color = {};
    for (idx in answer) {
      answer[idx] === guess[idx] && correct.push(idx);
    }

    for (idx in answer) {
      color[answer[idx]] = (color[answer[idx]] || 0) + 1;
    }

    for (char of guess) {
      if (color[char] > 0) {
        correctColor++;
        color[char] = color[char] - 1;
      }
    }
    
    console.log(`Correct Position & Letter: ${correct.length}, Wrong Position & Correct Letter: ${correctColor - correct.length}`);
    turn++;
  }
  process.exit();
}

start();
