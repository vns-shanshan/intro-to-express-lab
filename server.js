const express = require("express");

const app = express();
const port = 3000;

// ---------- 1. Be Polite, Greet the User ----------
app.get("/greetings/:username", function (req, res) {
    res.send(`Hello there, ${req.params.username}`)
});
// ------------------ -----------------------

// ---------- 2. Rolling the Dice ----------
app.get("/roll/:number", function (req, res) {
    if (isNaN(req.params.number)) {
        res.send(`You must specify a number.`);
    } else {
        const number = parseInt(req.params.number);
        const randomNum = Math.floor(Math.random() * number);

        if (randomNum >= 0 && randomNum < req.params.number) {
            res.send(`You rolled a ${randomNum}`);
        }
    }
});
// ------------------ -----------------------

// ---------- 3. I Want THAT One! ----------
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get("/collectibles/:index", function (req, res) {
    const collectibleIdx = req.params.index;
    const collectible = collectibles[collectibleIdx];

    if (collectibleIdx > collectibles.length - 1) {
        res.send(`This item is not yet in stock. Check back soon!`);
    } else {
        res.send(`So, you want the ${collectible.name}? For ${collectible.price}, it can be yours!`);
    }
});
// ------------------ -----------------------

// ---------- 4. Filter Shoes by Query Parameters ----------
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get("/shoes", function (req, res) {

    const minPrice = req.query.min_price;
    const maxPrice = req.query.max_price;
    const type = req.query.type;

    let filteredShoes = shoes;


    if (minPrice) {
        filteredShoes = filteredShoes.filter((shoe) => {
            return shoe.price >= minPrice;
        });
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter((shoe) => {
            return shoe.price <= maxPrice;
        });
    }

    if (type) {
        filteredShoes = filteredShoes.filter((shoe) => {
            return shoe.type === type;
        });
    }

    res.send(filteredShoes);
});

// ------------------ -----------------------

app.listen(port, function () {
    console.log(`Express app listening on port ${port}`);
});