const app = require("express")();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

app.get("/start", (req, res) => {
  res.send("Hello World");
});

/*
How to make API requests:
curl http://localhost:8080
or we can use vsc extensions or Postman or Insomnia
*/
