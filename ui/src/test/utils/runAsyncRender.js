import { act } from "react-dom/test-utils";

export default async (comp) => {
  await act(async () => {
    await Promise.resolve(comp);
    await new Promise((resolve) => setImmediate(resolve));
    comp.update();
  });
};
