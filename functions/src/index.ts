import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);
const db = admin.firestore();

app.get('/users/:id', async (request, response) => {
    try {
        const userId = request.params.id;

        if (!userId) throw new Error('User ID is required');

        const user = await db.collection('users').doc(userId).get();

        if (!user.exists) {
            throw new Error('User doesnt exist.')
        }

        response.json({
            id: user.id,
            data: user.data()
        });

    } catch (error) {
        response.status(500).send(error);
    }

});
