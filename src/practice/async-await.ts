// interface User{
//     readonly id: number;
//     firstName: string;
//     lastName: string;
//     email?: string
// }

// interface ApiResponse {
//     users: User[]
// }

// function mappedUserResponse(users: User[]): User[] {
//     return users.map((el) => ({
//         id: el.id,
//         firstName: el.firstName,
//         lastName: el.lastName,
//         email: el.email
//     }))
// }

// const delay: number = 3000;

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

// fetchData().then(data => console.log(data))
// .catch(err => console.log(err))


// interface User{
//     readonly id: number;
//     firstname: string;
//     lastName: string;
//     email?: string
// }

// interface ApiResponse {
//     users: User[]
// }

// function mappedUserData(user: User[]): User[] {
//     return user.map((el) => ({
//         id: el.id,
//         firstname: el.firstname,
//         lastName: el.lastName,
//         email: el.email
//     }))
// }

// const delay = 3000;

// async function getUserData(url: string): Promise<User[]> {
//     console.log('New timer start')

//     for(let i = delay/1000; i > 0; i--) {
//         setTimeout(()=> console.log(i), i*1000)
//     }

//     await new Promise<void>(reslove=>setTimeout(() => {
//         console.log('Api calling start')
//         reslove();
//     }, delay))

//     let response = await fetch(url)
//     console.log('Api called')

//     if(!response.ok) {
//         console.log('Unable to fetch user data!!')
//         for(let i = 0; i < 3; i++) {
//             console.log('calling API again!!')
//             await new Promise((reslove) => setTimeout(reslove, i*1000))
//             response = await fetch(url);
//             if(response.ok) {
//                 const data: ApiResponse = await response.json();
//                 return mappedUserData(data?.users)
//             }
//         }
//         throw new Error('Failed after 3 retries')
//     }

//     const data: ApiResponse = await response.json();
    
//     return mappedUserData(data?.users)
// } 


// getUserData('https://dummyjson.com/users1')
// .then(data => console.log(data))
// .catch(err => console.log(err))

//Date --> 23/04/26

interface User{
    readonly id: string;
    firstName: string;
    lastName: string;
    email?: string
}

interface ApiResponse {
    users: User[]
}

function mappedUserData(apiUser: User[]): User[] {
    return apiUser.map(el => ({
        id: el.id,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email
    }))
}

function mappedUserResponse<T extends User>(apiUsers: T[]): T[] {
    return apiUsers.map(el => ({
        ...el
    }))
}

const delay = 4000;

async function getUserData(url: string): Promise<User[]> {

    console.log('countdown start')
    // for(let i = delay/1000; i >= 0; i--) {
    //     setTimeout(() => {
    //         console.log(i)
    //     }, (delay/1000 - i)*1000)
    // }

    for(let i = 0; i <= delay/1000; i++) {
        setTimeout(() => {
         console.log(i)   
        }, i * 1000)
    }

    // await new Promise<void>((resolve) => setTimeout(() => {
    //     console.log('Calling API')
    //     resolve()
    // }, delay))

    await new Promise(reslove => setTimeout(reslove, delay))

    console.log('Calling API')

    let response = await fetch(url);

    if(!response.ok) {
        //throw new Error('Unable to fetch the data')
        console.log('unable to fetch the data, retrying again!')
        for(let i = 0; i < 3; i++) {
            console.log('Calling API again!')
            await new Promise (resolve => setTimeout(resolve, i*1000))
            response = await fetch(url)
            if(response.ok) {
                const data: ApiResponse = await response.json();
                return mappedUserData(data.users)
            }
        }
        throw new Error('Failed after 3 retries')
    }

    const data: ApiResponse = await response.json()
    

    return mappedUserData(data.users)
    // return mappedUserResponse(data.users)
}

getUserData('https://dummyjson.com/users1')
.then(data => console.log(data, 'data'))
.catch(err => console.log(err))