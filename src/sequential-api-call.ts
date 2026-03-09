// interface User {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
// }
// interface Post {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// }

// async function fetchSequentially<T extends { id: number }, U>(
//   userUrl: string,
//   postUrl: string
// ): Promise<U> {

//   const userResponse = await fetch(userUrl);
//   if (!userResponse.ok) {
//     throw new Error("Failed to fetch user");
//   }

//   const user: T = await userResponse.json();

//   const postResponse = await fetch(`${postUrl}/${user.id}`);
//   if (!postResponse.ok) {
//     throw new Error("Failed to fetch post");
//   }

//   const post: U = await postResponse.json();

//   return post;
// }

// // Usage example
// fetchSequentially<User, Post>(
//     'https://jsonplaceholder.typicode.com/users/1',
//     'https://dummyjson.com/posts'
// )
// .then(post => console.log(post, 'post'))
// .catch(error => console.log(error));


interface User {
  readonly id: number;
  name: string;
  username: string;
  email?: string
}

interface Post {
  readonly id: number;
  title: string;
  body: string
}

async function fetchSequentially<T extends {id: number}, U>(
  userUrl: string,
  postUrl: string
): Promise<U> {
  const userRes = await fetch(userUrl);
  if(!userRes.ok) {
    throw new Error('Failed to load data!')
  }

  const user: T = await userRes.json()

  const postRes = await fetch(`${postUrl}/${user.id}`)

  if(!postRes.ok) {
    throw new Error('Failed to load post')
  }

  const post: U = await postRes.json()

  return post;
}

fetchSequentially<User, Post>(
 'https://jsonplaceholder.typicode.com/users/1',
 'https://dummyjson.com/posts'
)
.then(data => console.log(data, 'data'))
.catch(error => console.log(error));