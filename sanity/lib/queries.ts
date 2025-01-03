import { defineQuery } from "next-sanity";

export const Startup_queries=defineQuery(`
    *[_type=="startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc) {
  _id,title,slug,_createdAt,author-> {
    _id,name,image,bio
  },views,description,category,image
}
    `)

export const Startup_by_id_querys=defineQuery(`
  *[_type=="startup" && _id==$id][0]{
  _id,title,slug,_createdAt,
    author-> {
    _id,name,username,
    image,bio
  },image,pitch,
    views,description,category
}
  `)

export const startup_views_query=defineQuery(`*[_type=="startup" && _id==$id][0]{
  _id,
 views
}`)
export const Author_by_github_id_query=defineQuery(`
  *[_type=="author" && id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
  }
  `)
export const Author_by_id_query=defineQuery(`
  *[_type=="author" && _id==$id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
  }
  `)
  export const Startup_queries_by_author_id=defineQuery(`
    *[_type=="startup" && author._ref==$id ]| order(_createdAt desc) {
  _id,title,slug,_createdAt,author-> {
    _id,name,image,bio
  },views,description,category,image
}
    `)

export const Playlist_by_slug_query= defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]-> {
  _id,
  _createdAt,
  title,
  slug,
  author-> {
  _id,
  name,
  slug,
  image,
  bio
  },
  views,
  description,
  category,
  image,
  pitch
  }
  
  } `)