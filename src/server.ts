import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import fastify from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { placeOrderRouter } from "./modules/orders/routes/place-order.route";

const app = fastify({
    logger: {
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
            },
        },
    },
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, // session authentication
});

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Places To Go API",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
    routePrefix: "/api-reference",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const port = parseInt(process.env["PORT"] ?? "3001", 10);
const host: string = process.env["HOST"] ?? "127.0.0.1";

app.register(placeOrderRouter);

app.listen({ port, host }, (err) => {
    if (err) {
        console.error("err", err);
        process.exit(1);
    }
});
