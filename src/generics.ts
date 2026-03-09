// interface ApiResponse < k > {
//     data: {
//         readonly id: k;
//         name: String;
//     },
//     isError: boolean
// }

type ApiResponse <k> = {
    data: k;
    isError: boolean
}

type UserDataResponse = ApiResponse<{ readonly id: number, name: string }>
type BlogResponse = ApiResponse<{ readonly id: number, title: string }>

const getUserData: UserDataResponse = {
    data: {
        id: Date.now(),
        name: 'Nitish'
    },
    isError: false
}

const getBlogData: BlogResponse = {
    data: {
        id: Date.now(),
        title: 'My First Blog'
    },
    isError: false
}

console.log(getUserData, 'getUserData')

console.log(getBlogData, 'getBlogData')