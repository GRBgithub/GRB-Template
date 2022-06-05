g,
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
export default GetMetadata;
