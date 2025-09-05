import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { addSinglePost, addToAllPosts, addUserInfo, deletePost } from "./serviceSlice";

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
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (!data) return;
                    console.log("Fetched User Info : ", data);
                    dispatch(addUserInfo({ data }))
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
        }),

        userDetails: builder.query({
            query: (id) => ({
                url: `user/${id}`,
                method: "GET"
            }),
            providesTags: (result, error, { id }) => [
                {
                    type: "User",
                    id
                }
            ],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addUser( data ))
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        searchUser: builder.query({
            query: (username) => ({
                url: `user/search/${username}`,
                method: "GET"
            }),
        }),

        followUser: builder.mutation({
            query: (id) => ({
                url: `user/follow/${id}`,
                method: "PUT"
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "User", id },
            ]
        }),

        addPost: builder.mutation({
            query: (post) => ({
                url: "zip/add",
                method: "POST",
                body: post
            }),
            invalidatesTags: ["Post"],
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addSinglePost(data));
                } catch (err) {
                    console.log(err);
                }
            }
        }),

        allPost: builder.query({
            query: (page) => ({
                url: `zip?page=${page}`,
                method: "GET",
            }),
            providesTags: (result) => {
                return result
                    ? [
                        ...result.posts.map(({ _id }) => ({ type: "Post", id: _id })),
                        { type: "Post", id: "LIST" },
                    ]
                    : [{ type: "Post", id: "LIST" }];
            },
            async onQueryStarted(params, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(addToAllPosts(data));
                } catch (err) {
                    console.log(err);
                }
            },
        }),

        deletePost: builder.mutation({
            query: (id) => ({
                url: `zip/${id}`,
                method: "DELETE"
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(deletePost(data))
                } catch (error) {
                    console.log(error)
                }
            }
        }),

        likePost: builder.mutation({
            query: (id) => ({
                url: `zip/like/${id}`,
                method: "PUT"
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Post", id },
            ]
        }),

        singlePost: builder.query({
            query: (id) => ({
                url: `zip/${id}`,
                method: "GET"
            }),
            providesTags: (result, error, { id }) => [
                {
                    type: "Post",
                    id
                }
            ]
        }),

        rePost: builder.mutation({
            query: (id) => ({
                url: `zip/rezip/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ["User"],
        }),

        addComment: builder.mutation({
            query: ({ id, text }) => ({
                url: `comment/${id}`,
                method: "POST",
                body: { text }
            }),
            invalidatesTags: ["User", "Post"],
        }),

        deleteComment: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `comment/${postId}/${commentId}`,
                method: "DELETE"
            }),
            invalidatesTags:(result, error, { postId }) => [
                { type: "Post", id: postId },
            ]
        }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: `user/update/${data.id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Me", "User"]
        })

    })
})

export const {
    useSignUpMutation,
    useLoginMutation,
    useMyInfoQuery,
    useLogoutMutation,
    useUserDetailsQuery,
    useSearchUserQuery,
    useAllPostQuery,
    useFollowUserMutation,
    useAddPostMutation,
    useDeletePostMutation,
    useAddCommentMutation,
    useDeleteCommentMutation,
    useLikePostMutation,
    useSinglePostQuery,
    useRePostMutation,
    useUpdateProfileMutation,
} = serviceApi