import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { singinuser } from "@/app/action/auth/singinUser"
import bdconnect, { CollectionObjName } from "./bdConnect";
export const authOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            Email: { label: "email", type: "email", placeholder: "email" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
        
          
   
              // Add logic here to look up the user from the credentials supplied
             
              const user = await singinuser(credentials)
        
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
        }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          })
      
      ],
      pages: {
          signIn: '/login', 
        },

        callbacks: {
          async signIn({ user, account, profile, email, credentials }) {
            console.log({ user, account, profile, email, credentials });
            if(account){
              const { providerAccountId, provider } = account
              const { email: user_email, image, name } = user
              const usercollection = bdconnect(CollectionObjName.usecollection);
              const userExist = await usercollection.findOne({providerAccountId})
              console.log(userExist);
              
              if(!userExist){
                const payload= {providerAccountId, provider,email:user_email, imageUrl, name}
                await usercollection.insertOne(payload)
              }
            }
            return true
          },
        
        }

}