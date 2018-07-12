//Dependencies
const mysql = require('mysql');

//Create connection and settings
const con = mysql.createConnection({
    host: 'localhost',
    database: 'db_heroes',
    user: 'root',
    password: 'admin'
});

let heroeRepo = {};


heroeRepo.Heroe = class {
    constructor(name, id = null){
        this.name = name;
        this.id = id;
    }
};

heroeRepo.findAll = (callback) => {
    if(con){
        let sql = 'SELECT * FROM heroes';
        con.query(sql,(err,results) => {
            if(err){
                throw error;
            }else{
                callback(null,results);
            }
        });
    }
};

heroeRepo.findById = (id,callback) => {
    if(con){
        let sql = `SELECT * FROM heroes WHERE id=${id} LIMIT 1`;

        con.query(sql,(err,rows) => {
            if(err)
                throw err;
            else
                callback(null,rows[0]);
        });
    }
};

heroeRepo.findByNameLike = (term, callback) => {
    if(con){
        let sql = 'SELECT * FROM heroes WHERE name like ?';
        con.query(sql,term + '%',(err,rows) => {
            if(err)
                throw err;
            else
                callback(null,rows);
        })
    }
};

heroeRepo.save = (heroeData,callback) => {
    if(con){
        let sql = 'INSERT INTO heroes SET ?';
        con.query(sql,heroeData, (err,results) => {
            if (err) {
                throw err;
            } else {
                callback(null,{
                    id: results.insertId,
                    name: heroeData.name
                });
            }
        });
    }
}

heroeRepo.update = (id,heroeData, callback) => {
    if(con){
        let sql = `
            UPDATE heroes SET
            name=${con.escape(heroeData.name)}
            WHERE id=${con.escape(id)}
        `;

        con.query(sql,(err,results) => {
            if(err)
                throw err;
            else
                callback(null,results);
        });
    }
};


heroeRepo.deleteById = (id, callback) => {
    if(con){
        let sql = `DELETE FROM heroes WHERE id=${con.escape(id)}`;
        con.query(sql,(err,results) => {
            if(err)
                throw err;
            else
                callback(null,results);
        });
    }
};

module.exports = heroeRepo;

