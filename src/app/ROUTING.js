/*---------------------------------------------
                RO
-----------------------------------------------*/
export default class ROUTING {
  constructor() {
    this.AddLinkListeners();
    this.load = false;
  }
  AddLinkListeners() {
    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault();
        let { href } = link;

        this.GetURL(href);
      };
    });
  }

  GetURL(url) {
    history.pushState(null, null, url);

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        var part = responseText.substring(
          responseText.lastIndexOf(`<main id="root">`) + 16,
          responseText.lastIndexOf("</main>")
        );
        document.querySelector("main").innerHTML += part;
      });
  }
}
