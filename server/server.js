const express = require('express')
const app  = express()
const cors = require('cors')
const Todo = require('./models/')
const sequelize = require('sequelize')


app.use(cors())
app.use(express.json())

// get all tasks
app.get('/' , async (req , res) => {
    
    try {
        const allTodo = await Todo.sequelize.query('SELECT * FROM todos', {
            type: sequelize.QueryTypes.SELECT
        });
        res.json(allTodo);
    } catch (err) {
        res.json(err)
    } 
})

// Post a new todo 
app.post('/post' , async (req , res) => {
    const  title  = req.body.title
    const create = await Todo.sequelize.query(`insert into todos (title , status) values ('${title}','') `)
    
    const allTodo = await Todo.sequelize.query('SELECT * FROM todos', {
        type: sequelize.QueryTypes.SELECT
    });
    res.json(allTodo);
})

//Delete a todo
app.delete('/delete/:id' , async (req , res) => {
    const id = req.params.id; 
    const DeleteItem = await Todo.sequelize.query(`delete from todos where id = '${id}' `)
    if(DeleteItem) {
       
        const allTodo = await Todo.sequelize.query('SELECT * FROM todos', {
            type: sequelize.QueryTypes.SELECT
        });
        res.json(allTodo);
    }else{
        res.sendStatus(500)
    }

    
})

//Update a todo
app.put('/update/:id' , async(req , res) => {
    const id = req.params.id;
    const newData = req.body.new;
    const check = await Todo.sequelize.query(`select * from todos where id  = '${id}' and status = 'active' `)
    if(check[0][0] != null) {
        // checked
        const updated = await Todo.sequelize.query(`update todos set status = '' where id = '${id}' `)
    }else{
        const Updated = await Todo.sequelize.query(`update todos set status = '${newData}' where id = '${id}' `)
    }

    const allTodo = await Todo.sequelize.query('SELECT * FROM todos', {
        type: sequelize.QueryTypes.SELECT
    });
    res.json(allTodo);


   
    
    
})

Todo.sequelize.sync().then(() => {
    app.listen(3001 , () => {
        console.log('Server stating [http://localhost:3001]');
    })
})
