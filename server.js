const http = require('http')
const { nextTick } = require('process')

const hostname = '0.0.0.0'
const port = 3000
const notes = [];

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "*");
    
  if (req.method === 'POST') {
    let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    notes.push(data);
    console.log(notes);
    res.end();
  });
  } else if (req.method === 'GET') {
    res.end(JSON.stringify(notes));
  }

  res.end();
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})