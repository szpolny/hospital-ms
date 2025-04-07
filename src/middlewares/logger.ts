import { Middleware } from "@oak/oak";

export const loggerMiddleware: Middleware = async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(
    `${ctx.request.method} ${ctx.request.url} - ${ctx.response.status} - ${rt}`,
  );
};

export const timingMiddleware: Middleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
};
