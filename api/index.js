import server from "../src/server.js"; // ajustá la ruta si tu server.js está en src/

export default function handler(req, res) {
  server(req, res);
}
