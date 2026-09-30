import type { CanvasAddonMountContext } from "../generated/mywallpaper-runtime";
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text = "",
  className = "",
) {
  const node = document.createElement(tag);
  node.textContent = text;
  node.className = className;
  return node;
}
export function card(context: CanvasAddonMountContext, title: string) {
  const section = el("section", "", "card"),
    header = el("header", title, "label"),
    body = el("div", "", "body"),
    caption = el("p", "", "caption");
  section.setAttribute("aria-label", title);
  section.append(header, body, caption);
  context.layer.root.replaceChildren(section);
  return { section, header, body, caption };
}
