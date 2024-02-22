const express = require("express");
const app = express();
const webpush = require('web-push');
const cors = require("cors")

const port = 3000;

// Public Key:
// BLc5KPuZfVtKxxl-MXK6PT7ZqE583WlLcG500Y2BU_AbjNzjoR1Rz2yB_vVIugoQH17k22v1YS5pepNxiH-Y9nk

// Private Key:
// yb8FoXcxJBSXX9xF1sO07UfYN-oUKDNjPIkbfrhBkgA
const apiKeys = {
    publicKey: "BLc5KPuZfVtKxxl-MXK6PT7ZqE583WlLcG500Y2BU_AbjNzjoR1Rz2yB_vVIugoQH17k22v1YS5pepNxiH-Y9nk",
    privateKey: "yb8FoXcxJBSXX9xF1sO07UfYN-oUKDNjPIkbfrhBkgA"
}

webpush.setVapidDetails(
    'mailto:gauravteli134@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})

const subDatabse = [];


app.post("/save-subscription", (req, res) => {
    subDatabse.push(req.body);
    res.json({ status: "Success", message: "Subscription saved!" })
})

app.get("/send-notification", (req, res) => {
    webpush.sendNotification(subDatabse[0], "Hello world");
    res.json({ "statue": "Success", "message": "Message sent to push service" });
})

app.listen(port, () => {
    console.log("Server running on port 3000!");
})