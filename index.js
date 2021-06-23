const http = require('http');
const fetch = require('node-fetch');
const cron = require('node-cron');
const crypto = require('crypto');
const {sendMailNotification} = require('./mailer');

const strings = ["הזמנה", "מוקדמת", "בכורה", "הזמן כרטיסים לסרט זה", "order-movie", "for-movie-page row"];

function findDiff(str1, str2){ 
    let diff= "";
    str2.split('').forEach(function(val, i){
      if (val != str1.charAt(i))
        diff += val ;         
    });
    return diff;
}

let md5 = crypto.createHash('md5').update('md5').digest("hex");
let prevMd5 = crypto.createHash('md5').update('md5').digest("hex");
let sourceCode = '';
let prevSourceCode = '';
cron.schedule('* * * * *', async () => {
    const res = await fetch(
        "https://www.cinema-city.co.il/movie/2985",
        {
            method: "GET",
        }
    );
    sourceCode = await res.text();
    let diff = findDiff(sourceCode, prevSourceCode);
    md5 = crypto.createHash('md5').update(sourceCode).digest("hex");
    if((md5 != prevMd5) && (strings.some(str => diff.includes(str)))){
        sendMailNotification(diff);
    }
    prevMd5 = md5;
    prevSourceCode = sourceCode;
    console.log('Running every minute', md5, diff);
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


