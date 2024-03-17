/*Kennedy Ninh & Hayden Perusek       300X HW5-2        3/17/2024*/
/*In this assignment, we have built a full-stack application with a Node/Express backend and a
simple HTML/CSS/JavaScript frontend.*/


//By: Hayden Perusek
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 

// Import jokebook data
let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
    {
        'joke': 'Why did the student eat his homework?',
        'response': 'Because the teacher told him it was a piece of cake!'
    },
    {
        'joke': 'What kind of tree fits in your hand?',
        'response': 'A palm tree'
    },
    {
        'joke': 'What is worse than raining cats and dogs?',
        'response': 'Hailing taxis'
    }
];
let lameJoke = [
    {
        'joke': 'Which bear is the most condescending?',
        'response': 'Pan-DUH'
    },
    {
        'joke': 'What would the Terminator be called in his retirement?',
        'response': 'The Exterminator'
    }
];

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public'));

// Jokebook Categories endpoint
app.get('/jokebook/categories', (req, res) => {
    res.json(categories);
});

// Jokes in a category endpoint
app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    let jokes;
    if (categories.includes(category)) {
        if (category === 'funnyJoke') {
            jokes = funnyJoke;
        } else if (category === 'lameJoke') {
            jokes = lameJoke;
        }
        const limit = req.query.limit ? parseInt(req.query.limit) : jokes.length;
        res.json(jokes.slice(0, limit));
    } else {
        res.status(400).json({ 'error': `no category listed for ${category}` });
    }
});

//By: Kennedy Ninh
// Add a new joke endpoint
app.post('/jokebook/joke/new', (req, res) => {
    const { category, joke, response } = req.body;
    if (!category || !joke || !response || !categories.includes(category)) {
        res.status(400).json({ 'error': 'invalid or insufficient user input' });
    } else {
        const newJoke = { joke, response };
        if (category === 'funnyJoke') {
            funnyJoke.push(newJoke);
        } else if (category === 'lameJoke') {
            lameJoke.push(newJoke);
        }
        res.json(newJoke);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
