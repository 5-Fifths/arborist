import { Project, Task } from "@/types/WorkItem";
import { useDate } from "../../_util/useDate";

interface CalendarProps {
    projects: Project[],
    tasks: Task[]
}

type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'  | 'Saturday';

export default function Calendar({ projects, tasks }: CalendarProps) {
    const { date } = useDate();
    
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
    const year = date.getFullYear();
    const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
    const firstDay = new Date(year, date.getMonth(), 1).getDay();

    const a: Day = firstDay;

    return (
        <table>
            <thead>
                <tr>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    )
}