import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { sessionMiddleware } from "./middleware/sessionConfig.js";
import { generalLimiter, authLimiter } from "./middleware/rateLimiters.js";

import authRoutes from "./routes/authRoutes.js";
import tarotRoutes from "./routes/tarotRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(helmet());

app.use(sessionMiddleware);

app.use(generalLimiter);

app.use("/images", express.static("./public/images"));

app.use("/auth", authLimiter);
app.use(authRoutes);
app.use(tarotRoutes);
app.use(signupRoutes);
app.use(profileRoutes);

app.use(express.static(path.join(__dirname, "../client/dist")));

app.all("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = Number(process.env.PORT) || 8080;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
  const session = socket.request.session;
  const username =
    socket.handshake.auth.username || session?.username || "anonymous";

  console.log("User connected:", username, socket.id);

  socket.username = username;

  io.emit("user-joined", { username });

  socket.on("chat-message", (data) => {
    const session = socket.request.session;
    const role = session?.role || "user";

    console.log("Chat message from", username, ":", data.text);

    io.emit("new-message", {
      username: socket.username,
      role,
      text: data.text,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", username || "anonymous", socket.id);

    io.emit("user-left", { username });
  });
});

httpServer.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
