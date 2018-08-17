import Clappe from "./Clappe";

const html = document.body.innerHTML;

function isMedium() {
  return /medium/.test(document.head.getAttribute("prefix"));
}

function isUserLogged() {
  const loggedRegex = /"isAuthenticated":([a-z]*)/;
  return html.match(loggedRegex) && html.match(loggedRegex)[1] === "true";
}

if (isMedium() && isUserLogged()) {
  console.info(
    "%c 👏 Clappe installed!",
    "border: 1px solid black; color: black"
  );
  new Clappe(html).install();
}
