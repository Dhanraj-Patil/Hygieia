'use client'

import { Card, CardContent } from "./ui/card"
import { Clock, MessageSquare, Bell } from "lucide-react"

export default function Notification({notification}) {
    return (
        <Card key={notification.id}>
            <CardContent className="flex items-center p-4">
                {notification.type === 'reminder' && <Clock className="h-5 w-5 text-blue-500 mr-4" />}
                {notification.type === 'message' && <MessageSquare className="h-5 w-5 text-green-500 mr-4" />}
                {notification.type === 'alert' && <Bell className="h-5 w-5 text-red-500 mr-4" />}
                <p>{notification.message}</p>
            </CardContent>
        </Card>
    )
}