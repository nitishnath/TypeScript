// interface User {
//     readonly id: number;
//     firstName: string;
//     lastName: string;
//     email?: string;
// }

// interface ApiResponse {
//     users: User[];
// }

// function mapToUserData(apiUsers: User[]): User[] {
//     return apiUsers.map((el) => ({
//         id: el.id,
//         firstName: el.firstName,
//         lastName: el.lastName,
//         email: el.email
//     }));
// }

// // User[] -> API has more than one user.
// async function fetchData(): Promise<User[]> {
//     const response = await fetch('https://dummyjson.com/users');
//     if(!response.ok) {
//         throw new Error('Unable to fetch user data!')
//     }
//     const data: ApiResponse = await response.json()

//     return mapToUserData(data.users);
// }

// async function fetchData(): Promise<User[]> {
//     console.log('timer start');
//     for(let i = delay/1000; i > 0; i--) {
//         setTimeout(() => {
//             console.log(i)
//         }, i*1000)
//     }
    
//     //Here added Promise<void> type annotation and passed undefined to reslove(), the promise now properly resolves after the timeout, allowing the async function to continue execution.
//     await new Promise<void>((resolve) => setTimeout(() => {
//         console.log('Calling API')
//         resolve()
//         // resolve(undefined)
//     }, delay))

//     console.log('API called')
//     let response = await fetch('https://dummyjson.com/users1');
    
//     // if(!response?.ok) {
//     //     throw new Error('Unable to fetch user data!')
//     // }

//     try {
//         const data = await response.json();
//         return mappedUserResponse(data.users);
//     } catch(error) {
//         console.log('Failed to parse JSON, retrying...');
//         for(let i = 0; i < 3; i++) {
//             await new Promise(resolve => setTimeout(resolve, i * 1000));
//             console.log('calling API again');
//             response = await fetch('https://dummyjson.com/users1');
//             if(response.ok) {
//                 const data = await response.json();
//                 return mappedUserResponse(data.users);
//             }
//         }
//         throw new Error('Failed after 3 retries');
//     }
    
//     // const data: ApiResponse = await response.json();
//     // return mappedUserResponse(data.users)
// }

// fetchData()
// .then((user) => console.log(user, 'user'))
// .catch(err => console.log(err))



interface User {
    readonly id: number;
    firstName: string;
    lastName: string;
    email?: string
}

interface ApiResponse {
    users: User[]
}

const delay: number = 3000

//Here T can be User or any type that extends User
//Here I have not preserving the generic type
// function mappedUserData<T extends User>(usersData: T[]){
//     return usersData.map(user => ({
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email
//     }))
// }

//Make sense to use generics
function mappedUserData<T extends User>(usersData: T[]): T[]{
    return usersData.map(user => ({
        ...user
    }))
}

async function getUserData(apiUrl: string): Promise<User[]> {
    // Wait for 3 seconds before making the API call
    await new Promise(resolve => setTimeout(resolve, delay));

    const response = await fetch(apiUrl);

    if(!response.ok) throw new Error('Failed to get user data!')
    
    const data: ApiResponse = await response.json();

    return mappedUserData(data.users)
}

console.log('Api calling started')

getUserData('https://dummyjson.com/users')
.then(data => {
    console.log(data,'data')
    console.log(`got result after ${delay/1000} sec`)
})
.catch(error => console.log(error, 'error'))