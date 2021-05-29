const http = require('http');
const fs = require('fs');
const requests = require('requests')


const homeFile = fs.readFileSync("home.html","utf-8");

const replaceVal = (tempval, orgVal) =>{
        const x = Math.round(orgVal.main.temp-273)
        const y = Math.round(orgVal.main.temp-273)
        const z= Math.round(orgVal.main.temp-273)
        
    let temperature = tempval.replace("{%tempval%}",x)
     temperature = temperature.replace("{%tempmin%}",y)
     temperature = temperature.replace("{%tempmax%}",z)
     temperature = temperature.replace("{%location%}",orgVal.name)
     temperature = temperature.replace("{%country%}",orgVal.sys.country)
     return temperature
}


const server = http.createServer((req,res)=>{
    if(req.url ='/'){
        requests(`http://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=52ed388aa1656ce2812dfbad5458821e`)
.on('data', (chunk) => {
    const objdata = JSON.parse(chunk)
    const arrdata = [objdata]
//   console.log(arrdata[0].main.temp-273)
  const realTimeData = arrdata.map(val => replaceVal(homeFile,val)).join("");
  res.write(realTimeData)
// console.log(realTimeData)
})
.on('end',  (err)=> {
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
        
    }
});
const port = 3421;
server.listen(port,()=>{
    console.log(`server is running at : http://localhost:${port}`)
})