import { auth } from "@/auth"
import { Author_by_id_query } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import Image from "next/image"
import UserStartup from "@/components/userStartups"
import { Suspense } from "react"
import { StartupCardSkeleton } from "@/components/startupcard"
export const experimental_ppr=true
export default async function Page({params}:{params:Promise<{id:string}>}){
   const id =(await params).id
   
   const session = await auth()
   const  user= await client.fetch(Author_by_id_query,{id})
   if (!user){
    return notFound()
   }
    return(<>
    <section className=" profile_container">
        <div className="profile_card ">
            <div className=" profile_title">
                <h3 className="text-24-black uppercase text-center ">
                {user?.name}
                </h3>
               
            </div>
            <Image 
                src={user.image|| ''}
                alt="user.name"
                width={220}
                height={220}
                className="profile_image"
                />
                <p className="text-30-extrabold mt-7 text-center">
                    @{user?.username}
                </p>
                <p className="mt-1 text-center  text-14-normal " >
                    {user?.bio}
                </p>
           
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mg-5" >
                <p className="text-30-bold">
                    {session?.id === id ? "Your ": "All "} Startups
                </p>
                <ul>
                    <Suspense fallback={<StartupCardSkeleton/>} >
                        <UserStartup  id={id} />
                    </Suspense>
                    
                </ul>
            </div>
    </section>
    </>)
}