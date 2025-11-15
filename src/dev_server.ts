import index from "./index.html";

Bun.serve({
  development: true,
  routes: {
    "/": index,
  },
});
