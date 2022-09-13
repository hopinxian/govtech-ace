import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import { processTeamRanking } from "./team-ranking.js";

const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.post("/teamRanking", (req, res) => {
  return processTeamRanking(req, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
