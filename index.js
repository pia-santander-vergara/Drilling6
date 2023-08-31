import express from "express";
import * as fs from "fs";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/anime/", (req, res) => {
    try {
        const data = fs.readFileSync("./anime.json", "utf-8");
        const anime = JSON.parse(data);
        res.status(200).json({ message: "Anime found", status: 200, anime });
    } catch (error) {
        res.status(404).json({ mesagge: "Data not found" });
    }
});

app.get("/anime/id/:id", (req, res) => {
    try {
        const { id } = req.params;
        const data = fs.readFileSync("./anime.json", "utf-8");
        const animes = JSON.parse(data);
        const anime = animes[id];
        res.status(200).json({ message: "Anime found", status: 200, anime });
    } catch (error) {
        req.status(404).json({ message: "Anime id not found" });
    }
});

app.get("/anime/nombre/:nombre", (req, res) => {
    try {
        const { nombre } = req.params;
        const reqNombre = nombre.toLocaleLowerCase().replace("-", " ");
        const data = fs.readFileSync("./anime.json", "utf-8");
        const animes = JSON.parse(data);

        const arrayAnime = Object.values(animes);
        const filterAnime = arrayAnime.find((anime) => {
            let nombreAnime = anime.nombre.toLocaleLowerCase();
            if (nombreAnime === reqNombre) {
                return anime;
            }
        });
        res.status(200).json({ message: "Anime found", status: 200, filterAnime });
    } catch (error) {
        res.status(404).json({ message: "Anime id not found" });
    }
});

app.post("/anime", (req, res) => {
    try {
        const newAnime = req.body;

        const data = fs.readFileSync("./anime.json", "utf-8");
        const animes = JSON.parse(data);

        const arrayAnimeId = (Object.keys(animes));
        const lastId = arrayAnimeId.length + 1;

        animes[lastId] = newAnime;

        fs.writeFileSync("./anime.json", JSON.stringify(animes), "utf-8");
        res.status(201).json({ message: "Congrats!!! anime sent succesfully", status: 201, filterAnime });
    } catch (error) {
        res.status(404).json({ message: "Anime not sent" });
    }
});

app.put("/anime", (req, res) => {
    try {
        const { id } = req.params

        const data = fs.readFileSync("./anime.json", "utf-8");
        const animes = JSON.parse(data);

        if (Object.hasOwn(animes, id)) {
            const animeUpdated = req.body;
            animes[id] = animeUpdated
            fs.writeFileSync('./anime.json', JSON.stringify(animes), "utf-8");
            res.status(202).json({ message: "Congrats!!! anime updated succesfully", status: 202, filterAnime });

        } else {

        }

    } catch (error) {
        res.status(500).json({ message: "Anime not updated" });
    }
});

app.delete('/animes/:id', (req, res) => {
    try {
        const { id } = req.params

        const data = fs.readFileSync("./anime.json", "utf-8");
        const animes = JSON.parse(data);

        if (Object.hasOwn(animes, id)) {
            delete animes[id]
            fs.writeFileSync('./anime.json', JSON.stringify(animes), "utf-8");
            res.status(203).json({ message: "Congrats!!! anime updated succesfully", status: 203, filterAnime });
        }

    } catch (error) {
        res.status(500).json({ message: "Anime not deleted" });
    }

})

app.listen(PORT, () => {
    console.log(`Listening server in port ${PORT}`);
});
