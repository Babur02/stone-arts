import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { db } from '@/firebase';
import { collection, onSnapshot, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';

export default function CheckSchedule() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const designId = searchParams.get('id');
    const [loading, setLoading] = useState(false);
    const [schedule, setSchedule] = useState(null);
    useEffect(() => {
        const docRef = doc(db, "designs", designId);
        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setSchedule(data.schedule);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        setLoading(false);
    }, [])

    return (<>
        {!loading && <div>
            <div className='w-full pl-8'>
                <button className='bg-slate-300 p-2 rounded-lg'
                    onClick={() => router.back()}>
                    Go Back
                </button>
            </div>
            <div className='flex flex-col'>
                <p className='text-2xl mx-auto font-bold'>Schedule of Design {designId}</p>
            </div>
            <div className='flex flex-col gap-4 mt-8 items-center' >
                {schedule && <p>Schedule is ready - {schedule}</p>}
                {!schedule && <p>Schedule is not given yet</p>}

            </div>
        </div>}
    </>
    )
}
