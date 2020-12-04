const sequelize = require("../db");
const  TodosModel = require("../models/todo");
const express  = require("express");


const todoController = express.Router();

todoController.post('/', async (req,res) =>{
    // create a new Todo here

    let { name,priority,description,duedate } = req.body;
    try{
        let newTodo = await Todo.create({
          name,
          priority:parseInt(priority),
          description,
          duedate 

        },{
              fields:["name","priority","description","duedate"]
        });
        if(newTodo){
            res.json({
                result:'ok',
                data:newTodo
            });
        } else{
            res.json({
                result:'failed',
                data:{},
                message:`Insert a new Todo failed`
            });
        }
        
    } catch(error){
        res.json({
            result:'failed',
            data:{},
            message:`Insert a new Todo failed.Error:${error}`
        });

    }
    //Update data in DB
    todoController.put ('./:id', async(req,res) =>{
        const{id} = req.params;
        const{ name, priority, description, duedate } = req.body;
        try {
            let todos = await Todo.findAll({
                attributes: ['id', 'name', 'priority', 'description', 'duedate'],
                where:{
                    id
                }
            });
            if(todos.length > 0){
                todos.forEach(async (todo) => {
                    await todo.update({
                        name: name? name: todo.name,
                        priority: priority ? priority: todo.priority,
                        description: description ? description: todo.description,
                        duedate: duedate ? duedate : todo.duedate

                    });
                });
                res.json({
                    result:'OK',
                    data:todos,
                    message:"update a Todo successfully"
                });
            } else{
                res.json({
                    result:'failed',
                    data:{},
                    message:"Cannot find Todo to update"
                });

            }
        } catch(error) {
             res.json({
                result:'failed',
                data:{},
                message:`Cannot update a Todo. Error:${error}`
             });
        }
    });
// Delete a Todo

todoController.delete('./:id', async(req,res) =>{
    const{id} = req.params;
    try{
        await Task.destroy({
            where:{
                todoid: id
            }
        });
        let numberOfDeleteRows = await Todo.destroy({
            where:{
                id
            }
        });
        res.json({
            result:'OK',
            message:"Delete a Todo successfuly",
            count:numberOfDeleteRows
        })
    } catch (error){
        res.json({
            result:'failed',
            data:{},
            message:`Delete a Todo failed.Error:${error}`
        });
    }
});
//Query all data from DB
todoController.get('/', async(req,res) =>{
    try{
        const todos = await Todo.findAll({
            attributes: ['id', 'name', 'priority', 'description', 'duedate'],
        });
        res.json({
            result:'OK',
            data:todos,
            message:"query List of Todo successfully"
        });
    } catch (error) {
        res.json({
            result:'failed',
            data:[],
            length: 0,
            message:`query List of Todos failed.Error:${error}`

    });
}
});
});

// Get by Id?
todoController.get('/:id', async(req,res) =>{
    const {id} = req.params;
    try{
        let todos = await Todo.findAll({
            attributes: ['name', 'priority', 'description', 'duedate'],
            where: {
                id: id
            },
            include:{
                model:Task,
                as:'tasks',
                required:false
            }
        });
        if(todos.length > 0){
        res.json({
            result:'OK',
            data:todos [0],
            message:"query List of Todo successfully"
        });
    } else  {
        res.json({
            result:'failed',
            data:{},
            message:"Cannot find Todo to show"

    });

    }
} catch (error){
   res.json ({
       result:'failed',
       data:{},
       message:`query list of Todos(by id failed.Error:${error})`
   });
}
});



module.exports = todoController;