import type { CanvasAddonMountContext } from "../generated/mywallpaper-runtime";
import { card, el } from "./ui";
import "./style.css";
export function mount(context: CanvasAddonMountContext) {
  const view = card(context, "Tâches");
  let values = context.layer.settings.get(),
    state = context.layer.deviceSettings.get();
  const render = () => {
    view.header.textContent = String(values.title || "Tâches");
    view.body.replaceChildren();
    const lines = String(state.tasks ?? "")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 30);
    let done = 0;
    lines.forEach((line, index) => {
      const checked = /^\[x\]\s*/i.test(line),
        label = line.replace(/^\[(?:x| )\]\s*/i, ""),
        row = el("label", "", "entry"),
        input = el("input"),
        text = el("span", label, checked ? "done" : "");
      input.type = "checkbox";
      input.checked = checked;
      input.onchange = () => {
        lines[index] = (input.checked ? "[x] " : "[ ] ") + label;
        state = { tasks: lines.join("\n") };
        render();
        void context.layer.deviceSettings.set(state).catch(() => {
          view.caption.textContent = "Tâches non enregistrées";
          view.caption.classList.add("error");
        });
      };
      row.append(input, text);
      view.body.append(row);
      if (checked) done++;
    });
    if (!lines.length)
      view.body.append(
        el("div", "Ajoutez vos tâches dans les réglages.", "empty"),
      );
    view.caption.textContent = done + " / " + lines.length + " · cet appareil";
  };
  const stop = context.layer.settings.subscribe((next) => {
      values = next;
      render();
    }),
    stopDevice = context.layer.deviceSettings.subscribe((next) => {
      state = next;
      render();
    });
  render();
  return () => {
    stop();
    stopDevice();
    view.section.remove();
  };
}
