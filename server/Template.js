import React from "react";
import ReactDOMServer from "react-dom/server";
import Alert from "../src/components/layout/Alert";
import Background from "../src/components/layout/Background";
import Cursor from "../src/components/layout/Cursor";
import Footer from "../src/components/layout/Footer";
import Header from "../src/components/layout/Header";
import Loader from "../src/components/layout/Loader";
import Transistor from "../src/components/layout/Transistor";
const GetPage = ({ meta, html }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      ${GetMetadata(meta)}
      <link rel="stylesheet" href="main.css">
    </head>
    <body>
      ${ReactDOMServer.renderToString(<Cursor />)}
      ${ReactDOMServer.renderToString(<Alert />)}
      ${ReactDOMServer.renderToString(<Loader />)}
      ${ReactDOMServer.renderToString(<Transistor />)}
      ${ReactDOMServer.renderToString(<Header />)}
      <main id="root">${html}</main>
      ${ReactDOMServer.renderToString(<Footer />)}
      ${ReactDOMServer.renderToString(<Background />)}
    </body>
    <noscript><div class="iss-w"><div class="iss">Please enable JavaScript to view this website.</div></div></noscript>
    <script defer src="main.js"></script>
  </html>
  `;
};

const DefaultMetadata = {
  title: "GRB - Template",
  author: "GRB - Régis Grumberg",
  description: "GRB - Creative Template",
  keywords: "GRB Régis Grumberg Template",
  preview: {},
  icon: {},
  url: "",
};

const GetMetadata = (props) => {
  const meta = { ...DefaultMetadata, ...props };
  return `
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${meta.title}</title>
      <link rel="icon" type="image/ico" href="${meta.icon?.src}" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="keywords" content="${meta.keywords}" />
      <meta name="author" content="${meta.author}" />
      <meta name="description" content="${meta.description}"/>

 
      <meta itemProp="name" content="${meta.title}" />
      <meta itemProp="description"  content="${meta.description}" />
      <meta itemProp="image" content="${meta.preview?.src}" />

    
      <meta property="og:url" content="${meta.url}" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="${meta.title}" />
      <meta property="og:description" content="${meta.description}"/>
      <meta property="og:image" content="${meta.preview?.src}" />


      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${meta.title}" />
      <meta name="twitter:description" content="${meta.description}" />
      <meta name="twitter:image" content="${meta.preview?.src}" />
    `;
};

export default GetPage;
