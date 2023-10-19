import  express  from "express";
import cors from 'cors'
import mysql from 'mysql'

const app = express();
app.use(cors())
app.use(express.json())


/////connection create kiye///
 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "manage"
})

app.get('/getallemployee', (req,res) =>{
   
    const sql = "select * from student";
    db.query(sql, (err, data) => {
        //console.log(data) // yaha console krwaye to data vscode k console m dikha
        if(err) return res.json("error")
        return res.json(data);
    })
})

app.post('/create', (req, res)=> {
    const sql = "insert into student (`name`, `email`) values (?,?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, values, (err, data) => {
        // console.log(err)
       if(err) return res.json("error")
       return res.json(data);
    })
})

app.delete('/student/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM student WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Error: "delete employee error in sql"});
        return res.json({Status: "Success"})
    })
})


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM student Where email = ? AND  password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE student SET name = ?, email = ?  WHERE id = ?";
    db.query(sql, [req.body.name, req.body.email,  id], (err, result) => {
        if (err) return res.json({ Error: "Update employee error in SQL" });
        return res.json({ Status: "Success" });
    });
});


app.listen(4004, () => {
    console.log("server running in 4004")
})