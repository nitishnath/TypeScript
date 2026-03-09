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