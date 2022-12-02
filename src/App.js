import React from 'react';
import './App.css';

let numId = 3
export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Tarea 1", done: false },
    { id: 2, text: "Tarea 2", done: false },
    { id: 3, text: "Tarea 3", done: false }
  ]);

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}


// "todos" son las props escrito con destructuring , al llevar llaves referencio eso mismo debajo
function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    let updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, done: !t.done } : t);
    setTodos(updatedTodos);
  }
  if (!todos.length) {
    return <p>No hay tareas!</p>
  }

  return (
    <ul>
      {/* mapeo la lista y guardo los datos del mapeo en "todo" (lo que esta despues del parentesis) */}
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

// el componente AddTodo envia los nuevos value del input a mi lista de "todos" 
function AddTodo({ setTodos }) {

  // una ref es una funcion de react para hacer referencia a un elemento del DOM. Aqui la utilizamos para referenciar el input y luego dale un valor vacio, para que cuando acabemos de escribir no siga el valor escrito en el input. La referencio en el input ref={inputRef} y luego le doy un valor en la funcion que recoge los nuevos input (handleAddTodo())
  const inputRef = React.useRef();


  // creo una funcion que recoge los resultados del formulario
  function handleAddTodo(event) {

    // evita que se produzca el evento por defecto, en el caso del formulario la actualizacion de la pagina 
    event.preventDefault();

    //delega el evento llamando al input por su name  
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: {numId},
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo);
    })
    inputRef.current.value = ""
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input name='addTodo' placeholder='Add todo' ref={inputRef} />
      <button type='submit'> Submit</button>
    </form>
  );
}


function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Borrar?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      })
    }
  }
  return (
    <span onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "black",
        cursor: "pointer",
        border: "white"
      }}
  >*</span>
  )
}


//  <Todo List todos= {todos} />  aqui hago referencia a todos como props del componente. la props le puedo poner cualquier nombre en este caso se llama todos, igualando a su prop. Esta prop es el array de datos que se encuenta declarado en App.

// Para acceder a todos los elementos de la prop uso map, envuelvo esto en llaves para mostrarlo como JSX -> {props.todos.map(todo=>(<li></li>))} (dentro de la funcion todoList)

// Para mostrar los datos que quiera, del mapeado que hice, uso llaves llamando a lo que quiero mostrar de mi array -> {todo.text}

// React tiene una prop llamada key que debe ser unica, por eso la igualamos a su id dentro del mapeado -> key={todo.id}

// Como solo tenemos una prop podemos usar destructuring para hacer el codigo mas corto llamando directamente a la prop utilizando llaves -> TodoList({todos}){ return(  todos.map(( ...

// Para añadir nuevos elementos a la lista de tareas agregamos un nuevo componente que en su funcion agregue nuevos componentes-> <AddTodo /> lo agrego en app y luego debajo desarrollo su function que tenga un  formulario que tenga su input y su boton. 

// Normalmente al input le agregaria un value="" que agregaria lo que se tiene que escribir en la barra del input, en react se agrega el placeholder="Add todo".

// Para trabajar con el evento de submit del boton hay que llamar al evento onSubmit que acepta un funcion dentro de un conjunto de llaves, para ellos creamos una funcion que nos permita utilizarlo, esta nueva funcion la creamos dentro del componente AddTodo porque tiene que enviarse cuando complete una nueva tarea.

// event.preventDefault() evita la accion por defecto cada vez que enviamos un formulario

//  para acceder a lo que se escribio en la entrada para crear una nueva tarea  utilizo event.target.elements que nos da -> event devolveria el boton, elements nos dara el input, para hacer que nos devuelve la entrada de texto le doy un atributo name al input, con el valor addTodo y tomo su valor -> event.target.element.addTodo.value

// creo la tarea nueva con id, text y done, donde se va a cargar lo que pongamos en el input que recogimos con el -event.target.element.addTodo.value- 

// hasta aqui todos los datos son estatitos, no cambian de estado. Para esto vamos a usar un hook useState, para comenzar a usarlo lo primero que hay que hacer es importarlo, porque viene de la libreria central de react, y ahora ya podemos pasar nuestra array -todos- como datos iniciales.

// useState devuelve un array con dos elementos 1- el valor inicial (nuestro array de -todos-) 2- una funcion que nos permite actualizar lo almacenado en la variable de estado.

// desestructuramos los valor que se devuelven desde useState añadiendo un conjunto de corchetes para obtener los valores que se devuelven desde el, primero el estado y luego la funcion  const [todos, setTodos] = React.useState([id...])   al setter para gestionar nuestro estado es setTodos y la variable de estado -todos- se añade como si fuera la prop dentro de AddTodo y luego llamar a setTodos en la parte inferior de handleAddTodo

// con setTodos tenemos acceso a los datos anteriores de todo y con la funcion le proporcionamos lo que queremos que sea el nuevo estado

// la re renderizacion que hacemos con el setTodos hace que se cree un nuevo array con la tarea actualizada  sin concatenar las anteriores por eso usamos concat() para unir las tareas escritas mas las que vamos agregando

// en set todo agregamos en el return prevTodos.concat(todo);

// para borrar la entrada de lo que pusimos usamos React refs que es un elemento del DOM para hacer referencia a un elemento del DOM

// utiliza la propiedad inputRef.current que contiene el elemento de entrada, parar borrar el valor establecemos una cadena vacia 








