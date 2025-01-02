import SearchForm from "../../components/searchform";
import StartupCard from "@/components/startupcard";

import { Startup_queries } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/startupcard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

 
  /*  const posts = await client.fetch(Startup_queries) */
  const { data: posts } = await sanityFetch({ query: Startup_queries, params }); //revalidate page when new changes are made

  return (
    <>
      <section className=" pink_container">
        <h1 className="heading">
          Pitch Your Startup,<br></br>Connect with Enterpreneurs
        </h1>
        <p className="sub-heading !max-w-3xl capitalize">
          submit ideas,vote on pitches and get notice in virtual competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startup found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
