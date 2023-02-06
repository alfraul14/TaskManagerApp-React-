const url_env= process.env.REACT_APP_API_URL;

    export const getTasks = async() =>{        
        console.log(`${url_env}`)
        const request = await fetch(`${url_env}/tasks`);
        const listTasks = await request.json();        
        return {
            all:listTasks?.All,
            completed:listTasks?.Completed
        };
     }
    export const searchTasks = async(name) =>{
        const url=`${url_env}/searchTask/${name}`
        const request = await fetch(url);
        const listTasks = await request.json();       
        return listTasks?.Found
     }
     export const updateTasks = async(task,method) =>{
        
        let body = {
            method: method,
            headers: {
              "Content-Type": "application/json"
            }
        }
        let url=`${url_env}/tasks/${task}`
        if(method==='POST'){
            body = {
                method: "POST",
                body: JSON.stringify(task),
                headers: {
                  "Content-Type": "application/json"
                }
            }
            url=`${url_env}/tasks`
        }
        if(method==='PUT'){
            body = {
                method: "PUT",
                body: JSON.stringify(task),
                headers: {
                  "Content-Type": "application/json"
                }
            }
             url=`${url_env}/tasks/${task.id}`
        }
       const response = await fetch(url, body );
        const newdata = await response.json(); 
        return newdata?.data
    }