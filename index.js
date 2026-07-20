const express = require('express')
const app = express();
const port = 3000;
const db = require('./models');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log('Server is running on port 3000');
})

db.sequelize.sync()
    .then((result) => {
        app.listen(3000, () => {
            console.log('Server started');
        })
    })
    .catch((err) => {
        console.log(err);
    })

app.post('/komik', async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.komik.create(data);
        res.send(komik);
    } catch (err) {
        res.status(err);
    }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.komik.findAll();
        res.send(komik);
    } catch (err) {
        res.status(err);
    }
});