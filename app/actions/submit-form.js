'use server'

import { z } from 'zod'

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
})

export async function submitForm(formData) {

  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })
 

  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors }
  }

  // // Here you would typically save the data to a database
  // // For this example, we'll just simulate a delay
  // await new Promise(resolve => setTimeout(resolve, 1000))

  // return { success: true, message: 'Form submitted successfully!' }

  const API_ENDPOINT = 'https://api.example.com/submit-form'

  try {
    // Here we're simulating an API call
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    })

    if (!response.ok) {
      throw new Error('API call failed')
    }

    const result = await response.json()

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return { success: true, message: 'Form submitted successfully!', data: result }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { success: false, message: 'An error occurred while submitting the form. Please try again.' }
  }
}