<<<<<<< HEAD
const http=require("http"),fs=require("fs"),path=require("path"),server=http.createServer(((e,t)=>{let r="."+e.url;"./"===r&&(r="./index.html");const n={".html":"text/html",".css":"text/css",".js":"text/javascript"}[String(path.extname(r)).toLowerCase()]||"application/octet-stream";fs.readFile(r,((e,r)=>{e?"ENOENT"===e.code?(t.writeHead(404),t.end("404 Not Found")):(t.writeHead(500),t.end("500 Internal Server Error")):(t.writeHead(200,{"Content-Type":n}),t.end(r,"utf-8"))}))})),port=3e3;server.listen(3e3,(()=>{console.log("Server running at http://localhost:3000/")}));
=======
//TEST ON LOCAL--USE HTTP-SERVER INSTEAD

const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") {
    filePath = "./index.html";
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType =
    {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
    }[extname] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404);
        res.end("404 Not Found");
      } else {
        res.writeHead(500);
        res.end("500 Internal Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
>>>>>>> main
