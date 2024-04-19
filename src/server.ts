import { createApp } from "./app";
import { getConfig } from "./utils/config";
import * as http from "http";
import { Server } from "socket.io";

const { PORT } = getConfig();

createApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
});
