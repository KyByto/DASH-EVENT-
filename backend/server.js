const usersDB = {
    users: require('./models/Users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;

const express = require('express');
const app = express();

const cors = require('cors');
const nodemailer = require('nodemailer');
const corsOptions = require('./config/corsOption');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '', // use your gmail
        pass: '' // use your password
    }
});

app.post('/register/email', async (req, res) => {
    try {
        const { email } = req.body;
        const emailLW = email.toLowerCase();

        const found = usersDB.users.find(user => user.email === emailLW);

        if (found) {
            res.sendStatus(404);
            return;
        }

        const newUser = {
            id: Date.now(),
            email: emailLW,
            password: '',
            name: '',
            phone: '',
            country: '',
        };

        const newUsers = [...usersDB.users, newUser];
        usersDB.setUsers(newUsers);

        await fsPromises.writeFile('./models/Users.json', JSON.stringify(newUsers));

        const mailOptions = {
            from: '', //use your email
            to: emailLW,
            subject: 'Welcome to Your App',
            text: 'Thank you for registering on Your App!'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.json(newUser.id).status(200);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3500, () => {
    console.log('Server is running on port 3500');
});
