import express from "express";
import path from "path";
import compression from "compression";
import cors from "cors";
import GetPage from "./Template";
import GetRoutes from "./Routes";
import "isomorphic-fetch";
/*---------------------------------------------------------------
    GO TO ROUTES FILE TO SETUP EVERY ROUTES AND HERE META DATA
-----------------------------------------------------------------*/

const PORT = process.env.PORT || 3000;
const app = express();
const publicDir = path.resolve(__dirname, "public");
const mediasDir = path.join(publicDir, "static", "medias");
app.use(express.static(publicDir));
app.use(cors());
app.use(compression());

app.get("*", (req, res) => {
  GetRoutes(req.url).then((html) => {
    const meta = {
      title: "Home",
      url: req.url,
      preview: path.join(mediasDir, "metadata", "preview.jpg"),
      icon: path.join(mediasDir, "metadata", "icon.ico"),
    };
    res.send(GetPage({ meta, html }));
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
