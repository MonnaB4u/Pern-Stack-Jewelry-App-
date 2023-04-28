const express = require("express")
const pool = require("./db")
const { v4: uuidv4 } = require('uuid');
const cors = require("cors");
const bodyParser = require('body-parser')


const app = express()

app.use(cors())
app.use(express.json()); //for post we need it
app.use(express.urlencoded({ extended: true })); //if we work with form data
app.use(cors());
app.use(bodyParser.json());



const uuid = uuidv4();
const PORT = 5000;

app.listen(PORT, (req, res) => {
    console.log(`Server is running: ${PORT}`)

})
app.get('/', (req, res) => {
    res.send('Hello World!')
})

async function run() {
    try {

        //GET /cloths
        app.get("/cloths", async (req, res) => {
            try {
                const allCloths = await pool.query("SELECT * FROM allcloths")
                res.send(allCloths.rows)
            } catch (err) {
                res.send('Error: ' + err.message)
            }
        })

        //GET /cloths:id
        app.get("/cloths/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const allCloths = await pool.query("SELECT * FROM allcloths WHERE id =$1", [id]);
                res.send(allCloths.rows)
            } catch (error) {
                res.send({ error: error.message })
            }
        })

        //POST /createCloths
        app.post('/createCloths', async (req, res) => {

            try {
                const { name, img, price } = req.body
                let id = uuid;
                const cloths = await pool.query(`INSERT INTO allcloths(id,name,img,price) VALUES ($1,$2,$3,$4) RETURNING * `, [id, name, img, price]);
                res.status(201).json({ message: `cloths was created`, data: cloths })
            } catch (err) {
                res.send('Error: ' + err.message)
            }

        })

        //Delete /cloths:id
        app.delete('/deleteCloths/:id', async (req, res) => {
            const id = req.params.id;
            const data = pool.query("DELETE FROM allcloths WHERE id=$1", [id])
            res.status(200).json({ message: "Book has been deleted", data: data.rows })
        })
        // UPDATE /cloths:id

        /// Create fitness
        app.post('/createFitness', async (req, res) => {
            try {
                const { name, img, price } = req.body
                let id = uuid;
                const fitness = await pool.query(`INSERT INTO fitness(id,name,img,price) VALUES ($1,$2,$3,$4) RETURNING * `, [id, name, img, price]);
                res.status(201).json({ message: `fitness was created`, data: fitness })
            } catch (err) {
                res.send('Error: ' + err.message)
            }
        })

        //GET /fitness
        app.get("/fitness", async (req, res) => {
            try {
                const allCloths = await pool.query("SELECT * FROM fitness")
                res.send(allCloths.rows)

            } catch (err) {
                res.send('Error: ' + err.message)
            }
        })

        //GET /fitness:id
        app.get("/fitness/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const allBooks = await pool.query("SELECT * FROM fitness WHERE id =$1", [id]);
                res.send(allBooks.rows)
            } catch (error) {
                res.send({ error: error.message })
            }
        })

        //Delete /cloths:id
        app.delete('/deletefitness/:id', async (req, res) => {
            const id = req.params.id;
            const data = pool.query("DELETE FROM fitness WHERE id=$1", [id])
            res.status(200).json({ message: "Book has been deleted", data: data.rows })
        })

        /// Create sunglass
        app.post("/createsunglass", async (req, res) => {
            try {
                let id = uuid;
                const { name, img, price } = req.body
                const data = await pool.query("INSERT INTO sunglass(id, name, img, price) VALUES ($1,$2,$3,$4) RETURNING *", [id, name, img, price])
                res.status(200).json({ message: "Created", clothsdata: data.rows })
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
        })

        //GET /sunglass
        app.get("/sunglass", async (req, res) => {
            try {
                const allCloths = await pool.query("SELECT * FROM sunglass")
                res.send(allCloths.rows)

            } catch (err) {
                res.send('Error: ' + err.message)
            }
        })

        //GET /sunglass:id
        app.get("/sunglass/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const allBooks = await pool.query("SELECT * FROM sunglass WHERE id =$1", [id]);
                res.send(allBooks.rows)
                // res.status(200).json({ message: `got  ${allBooks.rows}`, data: allBooks.rows })
            } catch (error) {
                res.send({ error: error.message })
            }
        })

        //Delete:id
        app.delete('/deletesunglass/:id', async (req, res) => {
            const id = req.params.id;
            const data = pool.query("DELETE FROM sunglass WHERE id=$1", [id])
            res.status(200).json({ message: "Book has been deleted", data: data.rows })
        })

        /// Create jewelry
        app.post('/createjewelry', async (req, res) => {
            try {
                let id = uuid;
                const { name, img, price } = req.body
                const data = await pool.query("INSERT INTO jewelry(id, name, img, price) VALUES ($1,$2,$3,$4) RETURNING *", [id, name, img, price])
                res.status(200).json({ message: "Created", clothsdata: data.rows })
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
        })

        //GET /sunglass
        app.get("/jewelry", async (req, res) => {
            try {
                const alljewelry = await pool.query("SELECT * FROM jewelry")
                res.send(alljewelry.rows)

            } catch (err) {
                res.send('Error: ' + err.message)
            }
        })

        //GET /sunglass:id
        app.get("/jewelry/:id", async (req, res) => {
            try {
                const id = req.params.id;
                const alljewelry = await pool.query("SELECT * FROM jewelry WHERE id =$1", [id]);
                res.send(alljewelry.rows)
            } catch (error) {
                res.send({ error: error.message })
            }
        })

        //Delete:id
        app.delete('/deletejewelry/:id', async (req, res) => {
            const id = req.params.id;
            const data = pool.query("DELETE FROM jewelry WHERE id=$1", [id])
            res.status(200).json({ message: "Book has been deleted", data: data.rows })
        })
        // all data full join

        // app.post('/orderStatus', async (req, res) => {
        //     try {
        //         let id = uuid;
        //         const { name, img, price, email, customername, location } = await req.body
        //         const data = await pool.query("INSERT INTO orderstatus(id, name, img, price,email,customername,location) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [id, name, img, price, email, customername, location])
        //         res.status(200).json({ message: "Created", clothsdata: data.rows })
        //     } catch (err) {
        //         res.status(500).json({ message: err.message })
        //     }
        // })

        app.post('/orderStatus', async (req, res) => {
            try {
                let id = uuid;
                const { name, img, price, email, customername, location, quantity, shipping, status } = await req.body;
                const data = await pool.query("INSERT INTO orderstatus(id, name, img, price,email,customername,location,quantity,shipping,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *", [id, name, img, price, email, customername, location, quantity, shipping, status]);
                res.status(200).json({ message: "Created", clothsdata: data.rows });
                console.log("created");
            } catch (err) {
                if (!err) {
                    console.log("created");
                }
                res.status(500).json({ message: err.message });
            }
        });


        app.get('/orders', async (req, res) => {
            try {
                const data = await pool.query('SELECT * FROM orderstatus')
                res.send(data.rows)
            } catch (err) {
                res.status(500).json({ message: err.message })
            }
        })

        app.delete('/deleteorders/:id', async (req, res) => {
            const id = req.params.id;
            const data = pool.query("DELETE FROM orderstatus WHERE id=$1", [id])
            res.status(200).json({ message: "Book has been deleted", data: data.rows })
        })

        // app.put('/orderstatusUpdate/:id', async (req, res, next) => {
        //     try {
        //         const id = req.params.id;
        //         const { name, img, price, email, customername, location, quantity, shipping, status } = req.body;
        //         const updateStatus = await pool.query("UPDATE orderstatus SET  name=$1, img=$2, price=$3,email=$4,customername=$5,location=$6,quantity=$7,shipping=$8,status=$9 WHERE id=$10 RETURNING * ", [name, img, price, email, customername, location, quantity, shipping, status,id])
        //         res.status(200).json({ message: `Update completed`, data: updateStatus.rows })
        //     } catch (error) {
        //         res.send({ error: error.message })
        //     }
        // })

           app.put('/orderstatusUpdate/:id', async (req, res, next) => {
            try {
                const id = req.params.id;
                const { status } = req.body;
                const updateStatus = await pool.query("UPDATE orderstatus SET status=$1 WHERE id=$2 RETURNING * ", [status,id])
                res.status(200).json({ message: `Update completed`, data: updateStatus.rows })
            } catch (error) {
                res.send({ error: error.message })
            }
        })


    } finally {
    }
}
run().catch(console.dir);


