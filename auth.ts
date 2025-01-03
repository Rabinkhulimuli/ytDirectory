
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { Author_by_github_id_query } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user,profile}) {
      try {
        const {id,avatar_url:image,name,email,bio,login}=  profile
       
        const existingUser = await client.withConfig({useCdn:false}).fetch(Author_by_github_id_query, {
          id,
        });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: id,
            name: name || "",
            username: login || "",
            email: email || "",
            image: image || user.image || '',
            bio:bio || "",
          });
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client.withConfig({useCdn:false}).fetch(Author_by_github_id_query, {
            id: profile?.id,
          });
          if (user) {
            token.id = user._id;
          }
        } catch (error) {
          console.error("Error fetching user in JWT callback:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        id: token.id,
      };
    },
  },
});
