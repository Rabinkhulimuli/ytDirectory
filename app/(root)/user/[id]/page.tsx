import { auth } from "@/auth"
import { Author_by_id_query } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"

export default async function Page({params}:{params:Promise<{id:string}>}){
   const id =(await params).id
   
   const session = await auth()
   const  user= await client.fetch(Author_by_id_query,{id})
   if (!user){
    return notFound()
   }
    return(<>
    <div>user page {session?.user?.name}</div>
    </>)
}