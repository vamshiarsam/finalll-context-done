// import { z } from 'zod';

// export async function createtodo(prev, formdata) {
//     // Define the schema with a minimum length of 2 characters
//     const schema = z.object({
//         todo: z.string().min(2, 'Todo must be at least 2 characters long'),  // Ensure 'todo' has at least 2 characters
//     });

//     // Extract the 'todo' value from formdata
//     const todoValue = formdata.get('todo')?.toString() || '';  // Ensure the value is treated as a string

//     try {
//         // Parse and validate the data
//         const data = schema.parse({
//             todo: todoValue,  // Correct the key to 'todo'
//         });

//         // Simulate a delay
//         await new Promise(resolve => setTimeout(resolve, 2000));

//         // Simulate a failed response
//         return { message: 'Failed to load data.', success: false };

//         // If everything is successful, you might return:
//         // return { message: 'Todo item added successfully!', success: true };

//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             console.error('Validation errors:', error.errors);
//             // Return the validation errors
//             return { success: false, errors: error.errors };
//         } else {
//             console.error('Unexpected error:', error);
//             // Handle unexpected errors
//             return { success: false, errors: [{ message: 'An unexpected error occurred.' }] };
//         }
//     }
// }




















// import { z } from 'zod';

// export async function createtodo(prev, formdata) {
//     const schema = z.object({
//         todo: z.string().min(2, 'Todo must be at least 2 characters 777777777777long'),
//     });

//     const todoValue = formdata.get('todo')?.toString() || '';

//     try {
//         const data = schema.parse({ todo: todoValue });

//         await new Promise(resolve => setTimeout(resolve, 2000));

//         return { message: 'Failed to load data.', success: false };

//         // Example of success response
//         // return { message: 'Todo item added successfully!', success: true };

//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return { success: false, errors: error.errors };
//         } else {
//             return { success: false, errors: [{ message: 'An unexpected error occurred.' }] };
//         }
//     }
// }
import { z } from 'zod';

export async function createtodo(prev, formdata) {
    // Define the schema with validation for both todo and password
    const schema = z.object({
        todo: z.string().min(2, 'Todo must be at least 2 6666666666666characters long'),  // Ensure 'todo' has at least 2 characters
        password: z.string().min(6, 'Password must be at 66666666666666666666least 6 characters long')  // Ensure 'password' has at least 6 characters
    });

    const todoValue = formdata.get('todo')?.toString() || '';
    const passwordValue = formdata.get('password')?.toString() || '';

    try {
        // Parse and validate the data
        const data = schema.parse({
            todo: todoValue,
            password: passwordValue
        });

        await new Promise(resolve => setTimeout(resolve, 2000));  // Simulate a delay

        // Example success response
        return { message: 'Todo item added successfully!', success: true };

        // Example failure response
        // return { message: 'Failed to load data.', success: false };

    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, errors: error.errors };
        } else {
            return { success: false, errors: [{ message: 'An unexpected error occurred.' }] };
        }
    }
}
