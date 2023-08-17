import { useRouter } from 'next/router'

export default function Followers() {

    const router = useRouter()
    const { email } = router.query

    return (
        <div>
            <h1>Followers</h1>
        </div>
    )
}




