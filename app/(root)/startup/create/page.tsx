import { auth } from "@/auth"
import StartupForm from "@/components/startupForm"
import { redirect } from "next/navigation"

export default async function Create(){
    const session = await auth()
    if (!session) return redirect("/")
    return (<>
        <section className="pink_container  !min-h-[230px]">
            <h1 className="heading">
                Submit Your Startup
            </h1>
        </section>
        <StartupForm/>
    </>)
}