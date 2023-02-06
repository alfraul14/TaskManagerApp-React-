import { useEffect, useState } from "react";
import { Footer } from "./components/footer";
import { FooterInfo } from "./components/footerInfo";
import { HeaderInput } from "./components/HeaderInput";
import { getTasks,searchTasks,updateTasks } from "./helpers/getServices";

const App = () => {
    const [tasks, setTasks] = useState([])
    const [filter, setFilter]= useState('All');
    const [input, setInput]= useState('');
    
    const handleInput = (e) => { 
        if(e.key==='Enter'){            
            if(filter==='Search'){
                searchTasks(e.target.value).then(resp => setTasks(resp))                
            }else{
                let name=e.target.value;
                inputAsync(name,'POST');
            }
        };
    }
    const inputAsync = async(name,method)=>{        
        let newdata = await updateTasks({
            'name':name,
            'completed':false
        },method);
        setInput('')        
        setTasks([...tasks,newdata])
    }
   
    const handleUpdate = (task) =>{
        task={
            ...task,
            completed:!task.completed
        }
        updateTasks(task,'PUT').then(()=>{
            setTaskAsync()
        });
        
    }

     const setTaskAsync = async() => {
        const { all, completed } = await getTasks();
        switch (filter) {
            case "All":
            setTasks( all );
            break;
            case "Completed":
            setTasks( completed );
            break;
            case "Uncompleted":
            setTasks(all.filter((task) => !task.completed));
            break;
            case "Search":
            setTasks([]);
            break;
            default:
            setTasks( all );
            break;
        }        
    }
    const removeTask = (id) =>{
        updateTasks(id,'DELETE');
        setTasks(tasks.filter(task=>task.id!==id))
    }
    useEffect(()=>{
        setTaskAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filter])
  return (
    <>
    <section className="todoapp">
        <HeaderInput input={input} setInput={setInput}handleInput={handleInput}/>
        <section className="main">
          
            <ul className="todo-list">
                {
                   tasks ? tasks.map( (task) => (
                        <li key={task.id} className={`${task.completed ? 'completed': ''}`} >
                            <div className="view">
                                <input className="toggle" onClick={()=>handleUpdate(task)}type="checkbox" defaultChecked={task.completed}/>
                                <label> {task.name} </label>
                                <button className="destroy" onClick={()=>removeTask(task.id)}></button>
                            </div>
                            <input className="edit" />
                        </li>
                    ))
                    :null
                   }
               
            </ul>
        </section>

        <Footer filter={filter} setFilter={setFilter} />
    </section>
    <FooterInfo />
</>
  );
}

export default App;
