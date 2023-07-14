/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";


const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: ({ data }) => ({
                url: `/api/v1/auth/signup`,
                method: 'POST',
                body: data,
            }),
        })
    })
})


export const {
    useCreateUserMutation
} = userApi