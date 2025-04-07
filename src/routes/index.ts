import { Router } from "@oak/oak";
import patientRouter from "./patient.route.ts";

const router = new Router();

router.use(patientRouter.routes());
router.use(patientRouter.allowedMethods());

router.get("/health", (ctx) => {
  ctx.response.body = { status: "OK", timestamp: new Date() };
  ctx.response.status = 200;
});

export default router;
