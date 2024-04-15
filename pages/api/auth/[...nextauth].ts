import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import  CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'

export default NextAuth({
  providers: [

    CredentialsProvider({
        name:'credentials',
        credentials:{
            email:{
                label:'email',
                type:'text'
            },
            password:{
                label:'password',
                type:'password'
            }
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials.password){
                throw new Error("Invalid email or password")
            }

            // const user = await prisma.user.findUnique({
            //     where:{
            //         email:credentials.email
            //     }
            // })

            const user = JSON.parse(localStorage.getItem("USER") || '{}')
            console.log(user.password,"dipun")

            if(!user || !user?.password){
                throw new Error("Invalid email or password")
            }

            const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.password
            )

            if(!isCorrectPassword){
                throw new Error("Invalid email or password") 
            }

            return user;


        }
    })
    
  ],
  pages:{
    signIn:'/login'
  },
  debug:process.env.NODE_ENV === 'development',
  session:{
    strategy:'jwt'
  },
  secret:process.env.NEXTAUTH_SECRET,
})