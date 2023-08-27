import { client } from '@/lib/contentful/client.js'
import Head from 'next/head'
import Link from 'next/link'

export default function Blog({ posts }) {
    console.log(posts)

    const sortedPosts = posts.sort((a, b) => {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
    });

    return (
        <>
            <Head>
                <title>Hoyst Blog | The Science Behind the Strength</title>
                <meta name="description" content="Learn about the best supplements, training programs, lifts, and scientific best practices to increase strength, size, and performance." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="google" content="notranslate" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="mt-[75px] max-w-[600px] mx-auto max-md:px-4 text-slate-700">
                {sortedPosts.map((post) => (
                    <div key={post.sys.id} className="mb-8 p-4 shadow-md">
                        <Link href={`/blog/${post.slug}`}>
                            <h2 className="text-[1.1rem] font-bold">{post.title}</h2>
                            <p className="text-sm font-medium my-2">{new Date(post.publishedAt).toLocaleDateString()}</p>
                        <p>{post.description}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export const getStaticProps = async() => {
    const posts = await client.getEntries({ content_type: 'post' })
    
    return {
        props: { posts: posts.items.map((post) => ({ 
            title: post.fields.title, 
            sys: post.sys, 
            publishedAt: post.fields.publishedAt,
            description: post.fields.description,
            slug: post.fields.slug,
        })) },
        revalidate: 1,
    }
}
