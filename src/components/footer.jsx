
export const Footer = ({filter,setFilter}) => {
    const filters = [
        {
            id:'All',
            label:'Todos'
        },
        {
            id:'Uncompleted',
            label:'Pendientes'
        },
        {
            id:'Completed',
            label:'Completados'
        },
        {
            id:'Search',
            label:'Buscar'
        }
    ]
    return (
        <footer className="footer">

        <span className="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
     
        <ul className="filters">
            {
            filters.map(({ id, label }) =>(
                <li key={id}>
                    <a 
                     className={`${id === filter ? 'selected filtro selected':'filtro'}`}
                     href="#/"
                     onClick={()=>setFilter(id)}
                     >{label}</a>
                </li>
            ))
                }
            
        </ul>
   
   
    </footer>
    )
}