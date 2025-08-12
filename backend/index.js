const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
const nodemailer = require('nodemailer');



const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.khtuk.mongodb.net/?retryWrites=true&w=majority`;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'pythonmara@gmail.com ',
        // pass: 'gsgh vptj jzqe dfwq',
        user: 'arisokcenas336@gmail.com',
        pass: 'qrog rmqe frje dgbu',
    },
});


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        app.post('/send-otp', (req, res) => {
            const { to, subject, message } = req.body;

            const mailOptions = {
                from: 'arisokcenas336@gmail.com',
                to,
                subject,
                text: message,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error: 'Failed to send OTP' });
                }
                res.status(200).json({ message: 'OTP sent successfully' });
            });
        });
        app.post('/register', async (req, res) => {
            try {
                console.log("Received registration request with data:", req.body);

                const { firstName, lastName, email, photoURL } = req.body;

                if (!firstName || !lastName || !email) {
                    console.log("Missing required fields: firstName, lastName, or email");
                    return res.status(400).json({ message: "First name, last name, and email are required" });
                }

                const fullName = `${firstName} ${lastName}`;
                const newUser = {
                    fullName,
                    email,
                    photoURL: photoURL || "default-url",
                    userRole: "Tourist",
                    registrationDate: new Date(),
                };

                console.log("Prepared new user data:", newUser);

                const database = client.db("traveloraIJSA");
                const collection = database.collection("users");

                const existingUser = await collection.findOne({ email });
                if (existingUser) {
                    console.log(`User with email ${email} already exists`);
                    return res.status(400).json({ message: "User with this email already exists" });
                }


                const result = await collection.insertOne(newUser);
                console.log("User successfully inserted into the database:", result);

                res.status(201).json({
                    message: "User registered successfully",
                    userId: result.insertedId,
                });
            } catch (error) {
                console.error("Error registering user:", error);
                res.status(500).json({ message: "Error registering user", error: error.message });
            }
        });
        app.get('/users', async (req, res) => {
            try {
                const { email } = req.query;
                if (!email) {
                    return res.status(400).json({ message: "Email is required" });
                }

                const database = client.db("traveloraIJSA");
                const collection = database.collection("users");

                const user = await collection.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                res.json(user);
            } catch (error) {
                res.status(500).json({ message: 'Server error' });
            }
        });
        app.get('/users/all', async (req, res) => {
            try {
                const { search, role } = req.query;
                console.log('Query Parameters:', { search, role });

                const database = client.db("traveloraIJSA");
                const collection = database.collection("users");

                const query = {};
                if (search) {
                    query.$or = [
                        { name: { $regex: new RegExp(search, "i") } },
                        { email: { $regex: new RegExp(search, "i") } }
                    ];
                }
                if (role) {
                    query.userRole = role;
                }

                console.log('Final Query:', query);

                const users = await collection.find(query).toArray();
                console.log('Fetched Users:', users);

                res.json(users);
            } catch (error) {
                console.error("Error fetching users:", error.message);
                res.status(500).json({ message: "Failed to fetch users.", error: error.message });
            }
        });


        app.delete('/users/delete', async (req, res) => {
            try {

                const { email } = req.body;

                if (!email) {
                    return res.status(400).json({ message: 'Email is required' });
                }

                const database = client.db("traveloraIJSA");
                const usersCollection = database.collection("users");
                const tourguideCollection = database.collection("tourguides");

                const deleteUser = await usersCollection.deleteOne({ email });

                if (deleteUser.deletedCount > 0) {
                    return res.status(200).json({ message: 'User deleted from users collection' });
                }

                const deleteGuide = await tourguideCollection.deleteOne({ email });

                if (deleteGuide.deletedCount > 0) {
                    return res.status(200).json({ message: 'User deleted from purguige collection' });
                }

                return res.status(404).json({ message: 'User not found in any collection' });

            } catch (error) {
                console.error("Error deleting user:", error.message);
                res.status(500).json({ message: "Failed to delete user.", error: error.message });
            }
        });

    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }

}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING')
})
app.listen(port, () => {
    console.log(`SIMPLE crud is running on port: ${port}`)

})