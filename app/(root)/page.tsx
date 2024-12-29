import SearchForm from "../../components/searchform";
import StartupCard from "@/components/startupcard";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1,name:"Adrian" },
      _id: 1,
      description: "This is a description",
      image:
        "https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-robot-white-with-green-cute-robot-fantasy-scene-image_2199816.jpg",
      category: "bots",
      title: "We robots",
    },
  ];
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
            posts.map((post: StartupCardType, index: number) => <StartupCard  key={post?._id} post={post}/>)
          ) : (
            <p className="no-results">No startup found</p>
          )}
        </ul>
      </section>
    </>
  );
}
