import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>
}

export const SingleTodo = ({todo, todos, setTodos}: Props) => {
  
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todoText);
  
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(
      todos.filter((todo =>
        todo.id !== id)
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(()=> {
    inputRef.current?.focus();
  }, [edit])

  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <form className="todos__single">
      {
        edit?(
          <input className='todos_single--text'
          ref = {inputRef}
          onSubmit={ (e)=> handleEdit(e, todo.id)}
          value={editTodo}
          onChange={ (e)=> setEditTodo(e.target.value)
          }/>
        ) : (
          todo.isDone? (
            <s className='todos__single--text'>{todo.todoText}</s> // Strike tag
          ) : (
            <span className='todos__single--text'>{todo.todoText}</span>
          )
        )
      }

    <div>
      <span className='icon' 
      onClick={ ()=> {
        if(!edit && !todo.isDone) {
          setEdit(!edit)
        }
      }}>
      <AiFillEdit/>
      </span>

      <span className='icon'  onClick={ ()=>handleDelete(todo.id) }>
        <AiFillDelete/>
      </span>

      <span className='icon' onClick={ ()=>handleDone(todo.id) }>
        <MdDone/>
      </span>
    </div>
  
    </form>
  )
}
