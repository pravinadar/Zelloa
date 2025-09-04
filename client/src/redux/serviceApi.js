import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { addUserInfo } from "./serviceSlice";

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
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ["Me"]
        }),

        myInfo: builder.query({
            query: () => ({
                url: "user",
                method: "GET"
            }),
            providesTags: ["Me"],
            async onQueryStarted(params, {dispatch, queryFulfilled}){
                try {
                    const {data} = await queryFulfilled;
                    if(!data) return;
                    console.log("Fetched User Info : ", data);
                    dispatch(addUserInfo({data}))
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        logout: builder.mutation({
            query: () => ({
                url: "user/logout",
                method: "POST"
            }),
            invalidatesTags: ["Me"]
        })
    })
})

export const { 
    useSignUpMutation, 
    useLoginMutation,
    useMyInfoQuery,
    useLogoutMutation

} = serviceApi