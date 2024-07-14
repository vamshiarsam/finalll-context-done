import { z } from "zod"

export async function createtodo(prev,formdata){
    const schema =z.object({
        todo:z.string().nonempty()
    })
    const data= schema.parse({
        todod:formdata.get('todo'),
    })

    console.log("dataaaaaaaaaaaaaa",data)

}