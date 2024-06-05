const fs = require("fs");
const fastify = require("fastify")();
const { coinCount } = require("./p3-module.js");

fastify.get("/", (request, reply) => {
  let filepath = `${__dirname}/ index.html`;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      reply.code(500).send(err);
    } else {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset = utf-8")
        .send(data);
    }
  });
});

fastify.get("/coin", (request, reply) => {
  const { denom = 0, count = 0 } = request.query;
  const denomToInteger = parseInt(denom);
  const countToInteger = parseInt(count);
  const coinValue = coinCount({ denom: denomToInteger, count: countToInteger });

  reply
    .code(200)
    .header("Content-Type", "text/html; charset = utf-8")
    .send(
      `<h2> Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

fastify.get("/coins", (request, reply) => {
  const {option} = request.query;

  switch(parseInt(option)) {
    case 1:
        coinValue = coinCount({denom: 5, count:3}, {denom: 10, count: 2})
        break
    case 2: 
        coinValue = coinCount(...coins)
        break
    case 3:
        coinValue = coinCount(coins)
        break
    default:
        coinValue = 0

    reply 
        .code(200)
        .header("Content-Type", "text/html; charset = utf-8")
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`)
  }
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
