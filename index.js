const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/users", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.send({ id: user.id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send({ users });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
