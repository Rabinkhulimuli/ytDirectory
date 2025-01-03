import { client } from "@/sanity/lib/client"
import { Startup_queries_by_author_id } from "@/sanity/lib/queries"
import StartupCard, { StartupTypeCard } from "./startupcard"

export default async function UserStartup({id}:{id:string}){
    const startups= await client.fetch(Startup_queries_by_author_id,{id})
    return (<>
        {
            startups.length > 0? startups.map((startup:StartupTypeCard)=> {
                return <StartupCard key={startup._id} post={startup} />
            }): <div className="no-result">No Post Yet </div>
        }
    </>)
}