const admin = require("firebase-admin"),
    fs = require('fs'),
    firebaseConfig = JSON.parse(fs.readFileSync('../users-dd33f-firebase-adminsdk-grzwy-b88b64a0a1.json', 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: "https://users-dd33f.firebaseio.com"
});
module.exports = admin.firestore();
