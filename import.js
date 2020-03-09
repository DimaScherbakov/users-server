// Imports
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config/config.js');
const serviceAccount = require('./config/serviceAccount.json');

// JSON To Firestore
const jsonToFirestore = async () => {
    try {
        console.log('Initialzing Firebase');
        await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
        console.log('Firebase Initialized');

        // await firestoreService.restore('./json-data/users_statistic.json');
        await firestoreService.restore('./json-data/users2.json');
        console.log('Upload Success');
    }
    catch (error) {
        console.log(error);
    }
};

jsonToFirestore();
