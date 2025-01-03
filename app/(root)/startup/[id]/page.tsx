import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { Playlist_by_slug_query, Startup_by_id_querys } from "@/sanity/lib/queries"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import markdownit from "markdown-it"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/view"
import StartupCard, { StartupTypeCard } from "@/components/startupcard"

const md=markdownit()
export const experimental_ppr=true
export default async function Page({params}:{params:Promise<{id:string}>}){
    const id= (await params).id
    if (!id){
        return <div>Page not found</div>
    }
    const[post,{select:editorPosts}]= await Promise.all([
        client.fetch(Startup_by_id_querys,{id}),//PPR
        client.fetch(Playlist_by_slug_query,{slug:'editor-picks'})
    ])
  
    if (!post){
        return notFound()
    }
    const parsedContent=md.render(post?.pitch || "")
    return (<>
        <section className="pink_container !min-h-[230px]">
            <p className="tag">
                {formatDate(post?._createdAt)}
            </p>
            <h1 className="heading">
                {post.title}
            </h1>
            <p className="sub-heading !max-w-5xl">
                {post.description}
            </p>
        </section>
        <section className="section_container">
            <Image src={post.image} width={100} height={100}  className="w-full h-auto rounded-xl" alt="thumbnail"  />
        </section>
        <section className="section_container">
            <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                <div className="flex-between gap-5">
                    <Link href={`/user/${post.author._id}`}
                    className="flex gap-2 items-center mb-3"
                    >
                            <Image  src={post.author?.image} width={64} height={64}
                            className="rounded-full drop-shadow-lg"
                            alt="avatar"
                            />
                            <div>
                                <p className="text-20-medium">
                                    {post.author.name}
                                </p>
                                <p className="text-16-medium">
                                    @{post.author.username}
                                </p>
                            </div>
                    </Link>
                   
                        <p className="category-tag">
                            {post.category}
                        </p>
                  
                </div>
                <h3 className="text-30-bold">
                    Pitch Detail
                </h3>
                {parsedContent ? (
                    <article 
                        dangerouslySetInnerHTML={{__html:parsedContent}}
                        className="prose max-w-4xl font-work-sans break-all"
                    />
                ):(
                    <p className="no-result">
                        No details provided
                    </p>
                )}
            </div>
            <hr className="divider" />
            {/* todo: editor selected startup */}
                {
                    editorPosts.length >0 && (
                        <div className="max-w-4xl mx-auto" >
                            <p className="text-30-semibold">
                                Editor Picks
                            </p>
                            <ul className="mt-7 card_grid-sm" >
                                {editorPosts.map((post:StartupTypeCard,index:number)=> (
                                    <StartupCard key={index} post={post}  />
                                ))}
                            </ul>
                        </div>
                    )
                }
            {/* make dynamic for ppr */}
            <Suspense fallback={<Skeleton/> } >
                    <View id={id} />
            </Suspense>
        </section>
    </>)
}