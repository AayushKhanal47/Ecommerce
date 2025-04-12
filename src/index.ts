import express, {Express, Request, Response} from "express";
import {PORT} from './secrets'
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddlerware } from "./middleware/errrors";
import { SignUpSchema } from "./schema/users";

const app = express();
app.use(express.json())
app.use('/api', rootRouter)
export const prismaClient = new PrismaClient({
    log:['query']
})

app.use(errorMiddlerware)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
