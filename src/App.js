import React,{useEffect, useState} from "react"
import './App.css';

const getData=()=>{
  let list=localStorage.getItem('lists');
  console.log(list);
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }
  else{
    return [];
  }
}

function App() {
  const[data,setData]=useState();
  const[item,setItem]=useState(getData());
  const[Toggle,setToggle]=useState(true);
  const[isEdit,setIsEdit]=useState(null);

  const addItem =()=>{
  if(!data){

  }
  else if(data && !Toggle){
    setItem(item.map((elem)=>{
         if(elem.id===isEdit){
           return {...elem,name:data};
         }
         return elem;
    }))
    setToggle(true)
    setData('');
    setIsEdit(null);

  }
  else{
    const alldata={id:new Date().getTime().toString(),name:data}
    setItem([...item,alldata]);
  setData('');

  }
  }
  const deleteItem=(index)=>{
    const update=item.filter((elem)=>{
      return index!==elem.id;

    })
    setItem(update);
    }

    useEffect(()=>{
      localStorage.setItem('lists',JSON.stringify(item));
      

    },[item])

    // when user click on edit button
    //1.get id and name of data which user click edit
    //2.set and toggle mode to chnage submit button into edit button
    //3.new update the value of setinput with new update value to edit
    //4.to pass current elememnt id to new state variable for reference

    const editItem=(id)=>{
      let newEdititem=item.find((elem)=>{
             return elem.id===id;
      })
     console.log(newEdititem);
     setToggle(false)
     setData(newEdititem.name);
     setIsEdit(id);
    
    }

  return (
   
<>

<div className="parent">
  <div className="child">
<div className='addItem'>
  <h2>Todo App</h2>
  <input type="text" placeholder='add item'
    value={data} onChange={(e)=>setData(e.target.value)} />
      {
        Toggle? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:
        <i className="fa fa-edit add-btn" title="update Item" onClick={addItem}></i>
      }
  </div>


  {
  item.map((elem) =>{
    return(
      <div className="eachItem" key={elem.id}>
                <h2> {elem.name} 
     

      <i className="fa  fa-edit add-btn" title="Edit Item" onClick={()=> editItem(elem.id)}></i>
      <i className="fa  fa-trash add-btn" title="Delete Item" onClick={()=>deleteItem(elem.id)}></i>
      </h2>
      
      </div>
     

    )
  })
}
 
</div>
</div>


</>
  );
}

export default App;


