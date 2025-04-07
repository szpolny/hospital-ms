import { isHttpError, Middleware, Status } from "@oak/oak";

export const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let message = "Internal Server Error";
    let status = Status.InternalServerError;

    if (isHttpError(err)) {
      status = err.status;
      message = err.message;
    } else if (err instanceof Error) {
      console.error("Unhandled Error:", err);
    } else {
      console.error("Unknown error type:", err);
    }

    ctx.response.status = status;
    ctx.response.body = { message };
    ctx.response.type = "json";

    if (err instanceof Error) {
      console.error(`Caught Error: ${status} - ${message}`, err.stack);
    } else {
      console.error(`Caught Error: ${status} - ${message}`);
    }
  }
};
