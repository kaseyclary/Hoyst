import { client } from '@/lib/contentful/client.js'
import RichText from '@/components/RichText'
import Head from 'next/head'

export default function Post({ post, preview }) {
    
    return (
        <>
            <Head>
                <title>{post.fields.title} | Blog</title>
                <meta name="description" content={post.fields.description} />
                <meta property="og:title" content={post.fields.title} />
                <meta property="og:description" content={post.fields.description} />
                <meta property="og:url" content={`https://www.hoyst.app/blog/${post.fields.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Hoyst" />
                <meta property="keywords" content={post.fields.keywords} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@hoystapp" />
                <meta name="twitter:creator" content="@hoystapp" />
                <meta name="twitter:title" content={post.fields.title} />
                <meta name="twitter:description" content={post.fields.description} />
                <link rel="canonical" href={`https://www.hoyst.app/blog/${post.fields.slug}`} />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="google" content="notranslate" />
            </Head>
            <main className="text-slate-700 max-w-[600px] mx-auto max-md:px-4 mt-[100px] mb-[150px]">
                <h1 className="font-bold text-[1.5rem] mb-6">{post.fields.title}</h1>
                <RichText content={post.fields.content} />
            </main>
        </>
    )
}

export const getStaticProps = async ({ params, preview = false }) => {
    const cfClient = preview ? previewClient : client

    const { slug } = params
    const response = await cfClient.getEntries({
        content_type: 'post',
        'fields.slug': slug,
    })

    if (!response.items.length) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            post: response.items[0],
            preview,
            revalidate: 60
        }
    }
}

export const getStaticPaths = async () => {
    const response = await client.getEntries({content_type: 'post'})
    const paths = response.items.map(item => ({
        params: { slug: item.fields.slug }
    }))
    return {
        paths,
        fallback: false
    }
}
