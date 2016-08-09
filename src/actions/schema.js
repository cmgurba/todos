import { Schema, arrayOf } from 'normalizr';
// use normalizr to make a "Schema" of todos.  library to normalize api responses to the 
// same shape.
// still kind of magic to me how this is finding todos from the 
//response.. probably need to look at normalizr library.
export const todo = new Schema('todos');
// corresponses to the responses that contain arrays of todo objects (the above)
export const arrayOfTodos = arrayOf(todo);
