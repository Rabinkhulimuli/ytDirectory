import SearchForm from "../components/searchform";

export default async function Home({searchParams}:{
  searchParams: Promise<{query?:string}>
}) {
  const query=(await searchParams).query
  return (
    <>
      <section  className=" pink_container">
          <h1 className="heading" >Pitch Your Startup,<br></br>Connect with Enterpreneurs</h1>
          <p className="sub-heading !max-w-3xl capitalize">
            submit ideas,vote on pitches and get notice in virtual competitions.

          </p>
          <SearchForm query={query}/>
      </section>
      
    </>
  );
}
