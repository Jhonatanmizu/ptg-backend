import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import ScalarApiReference from "@scalar/fastify-api-reference";
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
//#region src/server.ts
const app = fastify({ logger: { transport: {
	target: "pino-pretty",
	options: {
		translateTime: "HH:MM:ss Z",
		ignore: "pid,hostname"
	}
} } }).withTypeProvider();
app.register(fastifyCors, {
	origin: "*",
	methods: [
		"GET",
		"POST",
		"PUT",
		"DELETE",
		"PATCH",
		"OPTIONS"
	],
	credentials: true
});
app.register(fastifySwagger, {
	openapi: { info: {
		title: "Places To Go API",
		version: "1.0.0"
	} },
	transform: jsonSchemaTransform
});
app.register(ScalarApiReference, { routePrefix: "/api-reference" });
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
const port = parseInt(process.env.PORT ?? "3001", 10);
const host = process.env.HOST ?? "127.0.0.1";
app.get("/checkout", async () => {
	return "checkout successful";
});
app.get("/ping", async () => {
	return "pong\n";
});
app.listen({
	port,
	host
}, (err) => {
	if (err) {
		console.error("err", err);
		process.exit(1);
	}
});
//#endregion
export {};

//# sourceMappingURL=server.mjs.map