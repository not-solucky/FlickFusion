'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
function DemoApp() {
    const accessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN
    console.log(accessToken);

    const [movies, setMovies] = useState([])
    const { data: session } = useSession()
    const router = useRouter()

    const handleLogout = async () => {
        await signOut({
            redirectTo: '/'
        })
    }

    const CheckSession = () => {
        if (!session) {
            router.push('/')
        }
    }
    useEffect(() => {
        CheckSession()

        try {
            const fetchMovie = async () => {
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
                    }
                })
                console.log(response.data);
                setMovies(response.data.results)

            }
            fetchMovie()
        } catch (error) {

        }
    }, [])

    console.log(movies);


    return (
        <div className='py-32'>
            <button onClick={handleLogout}>Logout</button>
            <div className='flex flex-wrap gap-6 justify-center items-center'>
                {movies.map((movie: any) => (
                    <div key={movie.id} className='mt-4'>
                        <Link href={`/main/${movie.id}`}>
                            <Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' width={200} height={200} />
                        </Link>
                        <Link href={`/main/${movie.id}`} className='text-center text-white/70 font-semibold'>
                            <h1>{movie.title}</h1>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DemoApp
