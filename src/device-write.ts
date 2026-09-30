import type { CanvasAddonMountContext } from "../generated/mywallpaper-runtime";
type Values = ReturnType<
  CanvasAddonMountContext["layer"]["deviceSettings"]["get"]
>;
/** Advertise durable state only after the host commits it. */
export function deviceWriter(
  context: CanvasAddonMountContext,
  receive: (values: Values) => void,
  status: (pending: boolean, error: string) => void,
  failure: string,
) {
  let pending = false,
    disposed = false;
  const run = async (next: Values) => {
    if (pending || disposed) return;
    pending = true;
    let error = "";
    status(true, error);
    try {
      await context.layer.deviceSettings.set(next);
      if (!disposed) receive(context.layer.deviceSettings.get());
    } catch {
      error = failure;
      if (!disposed) receive(context.layer.deviceSettings.get());
    } finally {
      pending = false;
      if (!disposed) status(false, error);
    }
  };
  return {
    write: (next: Values) => {
      void run(next);
    },
    dispose: () => {
      disposed = true;
    },
  };
}
