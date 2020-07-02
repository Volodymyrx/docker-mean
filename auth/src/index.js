const app = require('./app');
const config = require('./config/config')
const port = config.port || 3000;

app.get('/', (req, res) => {
    res.send(`Server <b>Auth</b> work successfully`)
})

app.listen(port, ()=>{
    console.log(`Server auth started on port ${port} successfully`)
})

