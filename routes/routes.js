//Dependencies
const heroe = require('../models/heroe');

//Router
var routes = (app) => {

    app.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        
        next();
    });

    app.get('/',(req,res) => {
        res.send('Hello world!');
    });

    app.get('/heroes', (req,res) => {

        if(req.query.name){
            heroe.findByNameLike(req.query.name, (err,results) => {
                res.json(results);
            });
        }else{
            heroe.findAll((err, results) => {
                res.json(results);
            });
        }
    });

    app.get('/heroes/:id', (req,res) => {
        heroe.findById(req.params.id, (err,results) => {
            res.json(results);
        });
    });

    app.post('/heroes', (req,res) => {
        const heroeData = new heroe.Heroe(req.body.name);
        heroe.save(heroeData, (err,results) => {
            res.json(results);
        });
    });

    app.put('/heroes/:id', (req,res) => {
        const heroeData = new heroe.Heroe(req.body.name);
        heroe.update(req.params.id, heroeData, (err,results) => {
            res.json(results);
        });
    });

    app.delete('/heroes/:id', (req,res) => {
        heroe.deleteById(req.params.id, (err,results) => {
            res.json(results);
        });
    });
};


module.exports = routes;