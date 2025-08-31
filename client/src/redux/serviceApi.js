import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const serviceApi = createApi({
    reducerPath: "ServiceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/", // Testing in Development
        credentials: "include",
    }),
    keepUnusedDataFor: 60 * 60 * 24,
    tagTypes: ["Post", "User", "Me"],
    endpoints: (builder) => ({

        SignUp: builder.mutation({
            query: (credentials) => ({
                url: "signup",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["Me"]
        })
    })
})

export const { useSignUpMutation } = serviceApi