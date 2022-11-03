const fs = require('fs');

class Contenedor {

    arrayObj = [];
    id = this.arrayObj.length
    
    constructor(fileName){
        this.fileName = fileName;
        if(fs.existsSync(fileName)){
            this.arrayObj = JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
            console.log("exists")
        } else{
            console.log("it doesn't exists")

        }
    }
    async save(object){
            object[id] = this.id;
            this.id++;
            this.arrayObj.push(object)
            await fs.promises.writeFile(this.fileName, JSON.stringify(this.arrayObj));
                console.log("uploaded" + object.id);
                return Promise.resolve(object.id);
            }
            catch (err){    
                console.log(err)
            }
    getById(reqId){
        obj = null
        this.arrayObj.map((o) => {
            if(o.id === reqId){
                obj = o
                console.log(obj)
            } else{
                console.log(obj)
            }
        })
    }
    getAll(){
        try{
            const data = fs.promises.readFile(this.fileName, "utf-8")
            this.arrayObj = JSON.parse(data)
            console.log(this.arrayObj)
        }catch(err){
            console.log(err)
        }
    }
    deleteById = (reqId) => this.arrayObj.filter(o => o.id !== reqId);
}
