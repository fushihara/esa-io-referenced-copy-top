const styleRuleInsertLog: WeakSet<Document> = new WeakSet();
const randomId = `css-${Math.random().toString(16).substr(2)}`;
main();
function main() {
  const elements = document.querySelectorAll<HTMLAnchorElement>("#references a");
  const list: {title: string; href: string}[] = [];
  for (let e of elements) {
    const link = e.href;
    // #64: プログラミング/Docker一般 #docker
    const innerText = String(e.innerText)
      .replace(/^#\d+: /, "")
      .replace(/#.+/, "");
    list.push({href: link, title: innerText});
  }
  insertStyleRule();
  if (0 < list.length) {
    const div = document.createElement("div");
    div.classList.add(randomId);
    div.append(getSpanElement("Referenced From"));
    for (let v of list) {
      div.append(getAnchorElement(v.title, v.href));
      if (list.indexOf(v) != list.length - 1) {
        div.append(getSpanElement("/"));
      }
    }
    document.querySelector(".posts-title").insertBefore(div, document.querySelector(".post-title"));
  }
}
function getSpanElement(innerText: string) {
  const e = document.createElement("span");
  e.innerText = innerText;
  return e;
}
function getAnchorElement(innerText: string, href: string) {
  const e = document.createElement("a");
  e.innerText = innerText;
  e.href = href;
  return e;
}
function insertStyleRule() {
  if (styleRuleInsertLog.has(document)) {
    return;
  }
  styleRuleInsertLog.add(document);
  const styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  styleEl.sheet.insertRule(`.${randomId} { word-break: break-word;}`);
  styleEl.sheet.insertRule(`.${randomId} > * { margin:0 2px;}`);
}
