const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/todo');
const User = require('./models/User');
const cors = require('cors');
const bcrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateJwt = require('./authenticateJwt')

require('dotenv').config();


// Initialize the app
const app = express();

app.use(cors())

// Middleware for parsing JSON and URL-encoded data
app.use(express.json()); // 

app.use(express.urlencoded({ extended: true })) // handle form data

app.set('view engine', 'ejs')

// Get all todos
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single todo by ID
app.get('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
    const todo = new Todo(req.body);

    try {
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a todo by ID
app.put('/api/todos/:id', async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const updateUser = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updateUser) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        console.log("Updated Todo:", updateUser);
        res.status(201).json(updateUser);
    } catch (err) {
        console.error('Update error:', err);
        res.status(400).json({ message: err.message });
    }
});


// Delete a todo by ID
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/form', (req, res) => {
    res.render('form')
})







// app.use((req,res) => {
//     res.status(404).render('404')
// })


// app.use('/',(req,res) => {
//     res.send("backend is running at 5000 port")
// })




app.post('/api/auth/register', async (req, res) => {

    const { username, password } = req.body;

    const hashPassword = await bcrpt.hash(password, 10);

    const data = new User({ username: username, password: hashPassword })

    const tabledata = await data.save()

    res.send(tabledata)

})

app.post('/api/auth/login',async (req, res) => {

    const { username, password } = req.body;
    
    const userExist = await User.findOne({username})

    if(!userExist){

        return res.status(400).json({message : 'invalid user'})

    }

    const isMatch = await bcrpt.compare(password,userExist.password) // false

    if(!isMatch){

        return res.status(400).json({message : 'invalid password'})

    }

    const token = jwt.sign({username : userExist.username},"sadhik123",{expiresIn : '1h'})

    res.json({token})


})

app.get('/api/auth/protected',authenticateJwt,(req,res) => {
    res.json({message : 'this is valid token',
        username : req.user.username
    })
})



// Connect to MongoDB Atlas using the environment variable
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Start the server using the environment variable for PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
