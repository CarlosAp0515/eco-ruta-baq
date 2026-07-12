import express from "express";

const app = express();

app.use(express.json());

app.post("/register", (req, res) => {
    console.log(req.body);

    res.json({
        mensaje: "Usuario registrado"
    });
});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});