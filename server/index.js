import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { RenderApp } from "../src/ui/ui";
import GetMetadata from "./metadata";
const PORT = 3000;

const app = express();
const publicDir = path.resolve(__dirname, "public");
const mediasDir = path.join(publicDir, "static", "medias");
app.use(express.static(publicDir));

app.get("*", (req, res) => {
  const metadata = GetMetadata({
    url: req.url,
    preview: path.join(mediasDir, "metadata", "preview.jpg"),
    icon: path.join(mediasDir, "metadata", "icon.ico"),
  });
  const app = ReactDOMServer.renderToString(<RenderApp />);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${metadata}
    </head>
    <body>
      <div id="root">${app}</div>
    </body>
    <noscript><div class="iss-w"><div class="iss">Please enable JavaScript to view this website.</div></div></noscript>
     <script defer src="main.js"></script>
  </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
