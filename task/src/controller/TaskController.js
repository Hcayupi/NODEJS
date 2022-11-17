function index(req, res){

    req.getConnection((err,conn)=>{
        conn.query('SELECT * FROM task',(err, task)=>{
            if(err){
                res.json(err);
            }
            res.render('tasks/index',{task});
        });
    });

}
function create(req, res){
    res.render('tasks/create');
}

function store(req, res){
     const data = req.body;

     req.getConnection((err, conn)=>{
        var sql = "INSERT INTO task(titulo, descripcion)VALUES('"+data.titulo+"', '"+data.descripcion+"')";
        conn.query(sql, (err, rows)=>{
            res.redirect('/tasks');
        });
    });
}

function destroy(req, res){
    const id= req.body;

    req.getConnection((err, conn)=>{
        var sql="DELETE FROM task WHERE id="+id.id;
        conn.query(sql, (err, rows)=>{
            res.redirect('/tasks');
        });
    });
}

function edit(req, res){
    const id= req.params.id;
    req.getConnection((err, conn)=>{
        var sql="SELECT id, titulo, descripcion FROM task WHERE id="+id;
        conn.query(sql,(err, task)=>{
            if(err){
                res.json(err);
            }
            res.render('tasks/edit',{task});
        });
    });
}

function update(req, res){
    const id= req.params.id;
    const data = req.body;

    req.getConnection((err, conn)=>{
       var sql = "UPDATE task set titulo='"+data.titulo+"', descripcion='"+data.descripcion+"' WHERE id="+id;
       conn.query(sql, (err, rows)=>{
           res.redirect('/tasks');
       });
   });
}

module.exports={
    index: index,
    create: create,
    store: store,
    destroy:destroy,
    edit:edit,
    update:update,
}