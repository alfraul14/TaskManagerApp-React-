
export const HeaderInput = ({input,setInput,handleInput}) => {
    return (
        <header className="header">
            <h1>Tareas</h1>
            
                <input id="new-todo-input" 
                className="new-todo"
                 placeholder="¿Qué necesitas hacer?" 
                 autoFocus
                 value = {input} 
                 onChange={(e)=>{setInput(e.target.value)}}
                 onKeyDown={handleInput}
                 />
                
            
            
        </header>
    )
}