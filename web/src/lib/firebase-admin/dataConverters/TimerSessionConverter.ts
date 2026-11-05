import { TimerSession } from "@/lib/firebase-admin/types/TimerSession"
import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"

interface TimerSessionDbModel {
    started_at: number,
    duration: number,
    value: number,
    status: string
}

export const TimerSessionConverter = {
    toFirestore(timerSession: TimerSession): TimerSessionDbModel {
        return {
            ...timerSession,
            started_at: timerSession.started_at.getTime()
        }
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): TimerSession {
        const data = snapshot.data(options) as TimerSessionDbModel;

        return {
            ...data,
            started_at: new Date(data.started_at),
            status: data.status as TimerSession['status']
        }
    }
}