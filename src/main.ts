import { Application } from "@oak/oak";
import { config } from "./config/config.ts";
import { errorMiddleware } from "./middlewares/errorHandler.ts";
import { loggerMiddleware, timingMiddleware } from "./middlewares/logger.ts";
import router from "./routes/index.ts";
import { db } from "./db/index.ts";

const port = config.port;

const app = new Application();

app.use(errorMiddleware);
app.use(loggerMiddleware);
app.use(timingMiddleware);

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `🏥 Hospital Management Service listening on: ${
      secure ? "https://" : "http://"
    }${hostname ?? "localhost"}:${port}`,
  );

  db.query.patients.findFirst().then(() =>
    console.log("Database connection successful.")
  ).catch((err) => console.error("Database connection failed:", err));
});

app.listen({ port });
