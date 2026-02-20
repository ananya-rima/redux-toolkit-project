import axios from 'axios';
import React from 'react';
let cacheData: any = null;
let cacheTime=0;
let ReValidate_Times=60;
export default async function ISR() {
    const date= Date.now();
    if(!cacheData || (date - cacheTime) > ReValidate_Times * 1000){
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
       ((cacheData = response.data),(cacheTime = date));
    } else{
        console.log("serve the cache data");
    }

    const posts= cacheData;
    return (
        <>
        <div style={{padding:"2 rem"}}>
            <h1>Posts (axios+ Manual ISR)</h1>
            <p>
                Pages fetches new data every 60 seconds,otherwise serves cached HTML
            </p>
            <ul>
                {posts.slice(0,5).map((post)=>(
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>

        </div>
        </>
    );

    }

