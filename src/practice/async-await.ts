interface User{
    readonly id: number;
    firstName: string;
    lastName: string;
    email?: string
}

interface ApiResponse {
    users: User[]
}

function mappedUserResponse(users: User[]): User[] {
    return users.map((el) => ({
        id: el.id,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email
    }))
}

const delay: number = 3000;

async function fetchData(): Promise<User[]> {
    console.log('timer start');
    for(let i = delay/1000; i > 0; i--) {
        setTimeout(() => {
            console.log(i)
        }, i*1000)
    }
    
    //Here added Promise<void> type annotation and passed undefined to reslove(), the promise now properly resolves after the timeout, allowing the async function to continue execution.
    await new Promise<void>((resolve) => setTimeout(() => {
        console.log('Calling API')
        resolve()
        // resolve(undefined)
    }, delay))

    console.log('API called')
    let response = await fetch('https://dummyjson.com/users1');
    
    // if(!response?.ok) {
    //     throw new Error('Unable to fetch user data!')
    // }

    try {
        const data = await response.json();
        return mappedUserResponse(data.users);
    } catch(error) {
        console.log('Failed to parse JSON, retrying...');
        for(let i = 0; i < 3; i++) {
            await new Promise(resolve => setTimeout(resolve, i * 1000));
            console.log('calling API again');
            response = await fetch('https://dummyjson.com/users1');
            if(response.ok) {
                const data = await response.json();
                return mappedUserResponse(data.users);
            }
        }
        throw new Error('Failed after 3 retries');
    }
    
    // const data: ApiResponse = await response.json();
    // return mappedUserResponse(data.users)
}

fetchData().then(data => console.log(data))
.catch(err => console.log(err))
