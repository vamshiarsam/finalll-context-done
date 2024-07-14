// 'use client'
// import React from 'react'
// import { useFormState, useFormStatus } from 'react-dom';
// import { createtodo } from '../components/actions';

// const initialState = {
//   message: null,
//   // errors: []
// };

// export const Submitbutton = () => {
//   const { pending } = useFormStatus();
//   return (
//     <button type="submit" disabled={pending}>
//       {pending ? "Submitting..." : "Submit"}
//     </button>
//   );
// };

// export default function Page() {
//   const [state, Formaction] = useFormState(createtodo, initialState);

//   return (
//     <div>
//       <h1>About Component</h1>
//       <form action={Formaction}>
//         <input
//           type="text"
//           placeholder="Enter todo"
//           id="todo"
//           name="todo"
//         />
//         <Submitbutton />

//         {console.log(state?.message,"ssssssssssssssssssssssss")}
//         {console.log("state?.errorsstate?.errors",state?.errors)}
//         {state?.errors?.length > 0 && (
//           <ul>
//             {state.errors.map((error, index) => (
//               <li key={index} style={{ color: 'red' }}>{error.message}</li>
//             ))}
//           </ul>
//         )}
//         {state?.message && <p>{state.message}</p>}
//       </form>
//     </div>
//   );
// }



// 'use client'
// import React, { useEffect, useState } from 'react'
// import { useFormState, useFormStatus } from 'react-dom';
// import { createtodo } from '../components/actions';

// const initialState = {
//   message: null,
//   errors: []
// };

// export const Submitbutton = () => {
//   const { pending } = useFormStatus();
//   return (
//     <button type="submit" disabled={pending}>
//       {pending ? "Submitting..." : "Submit"}
//     </button>
//   );
// };

// export default function Page() {
//   const [state, Formaction] = useFormState(createtodo, initialState);
//   const { pending } = useFormStatus();
  
//   // Local state for handling input validation
//   const [formData, setFormData] = useState({ todo: '' ,password:''});
//   const [localErrors, setLocalErrors] = useState({});

//   const validateTodo = (value) => {
//     if (value?.length < 2) {
//       return 'Todo must be at least 2 characters long';
//     }
//     return '';
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
    
//     const error = validateTodo(value);
//     setLocalErrors(prev => ({
//       ...prev,
//       [name]: error,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Validate before submit
//     const error = validateTodo(formData.todo);
//     if (error) {
//       setLocalErrors({ todo: error });
//       return;
//     }

//     // Call form action
//     const result = await Formaction(new FormData(event.currentTarget));
//     // Handle form submission result
//     if (result?.errors) {
//       setLocalErrors(result.errors.reduce((acc, error) => {
//         acc[error.path[0]] = error.message;
//         return acc;
//       }, {} ));
//     }
//   };

//   return (
//     <div>
//       <h1>About Component</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter todo"
//           id="todo"
//           name="todo"
//           value={formData.todo}
//           onChange={handleChange}
//         />
//         <input   type="password"
//           placeholder="Enter password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}></input>
//         {localErrors?.todo && <p style={{ color: 'red' }}>{localErrors.todo}</p>}
//         <Submitbutton />

//         {/* Display validation errors from server-side validation after submission */}
//         {!pending && state?.errors?.length > 0 && (
//           <ul>
//             {state.errors.map((error, index) => (
//               <li key={index} style={{ color: 'red' }}>{error.message}</li>
//             ))}
//           </ul>
//         )}

//         {/* Display success or failure messages */}
//         {state?.message && <p>{state.message}</p>}
//       </form>
//     </div>
//   );
// }



'use client'
import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { createtodo } from '../components/actions';

const initialState = {
  message: null,
  errors: []
};

export const Submitbutton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

export default function Page() {
  const [state, Formaction] = useFormState(createtodo, initialState);
  const { pending } = useFormStatus();
  
  // Local state for handling input validation
  const [formData, setFormData] = useState({ todo: '', password: '' });
  const [localErrors, setLocalErrors] = useState({});

  const validateTodo = (value) => {
    if (value?.length < 2) {
      return 'Todo must be at least 2 characters long';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (value?.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let error;
    if (name === 'todo') {
      error = validateTodo(value);
    } else if (name === 'password') {
      error = validatePassword(value);
    }

    setLocalErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate before submit
    const todoError = validateTodo(formData.todo);
    const passwordError = validatePassword(formData.password);

    if (todoError || passwordError) {
      setLocalErrors({
        todo: todoError,
        password: passwordError
      });
      return;
    }

    // Call form action
    const result = await Formaction(new FormData(event.currentTarget));
    // Handle form submission result
    if (result?.errors) {
      setLocalErrors(result.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {} ));
    }
  };

  return (
    <div>
      <h1>About Component</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo"
          id="todo"
          name="todo"
          value={formData.todo}
          onChange={handleChange}
        />
        {localErrors?.todo && <p style={{ color: 'red' }}>{localErrors.todo}</p>}

        <input
          type="password"
          placeholder="Enter password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {localErrors?.password && <p style={{ color: 'red' }}>{localErrors.password}</p>}

        <Submitbutton />

        {/* Display validation errors from server-side validation after submission */}
        {!pending && state?.errors?.length > 0 && (
          <ul>
            {state.errors.map((error, index) => (
              <li key={index} style={{ color: 'red' }}>{error.message}</li>
            ))}
          </ul>
        )}

        {/* Display success or failure messages */}
        {state?.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}

