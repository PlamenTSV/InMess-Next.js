import Pusher from "pusher";

const pusherServer = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APPID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    secret: process.env.NEXT_PUBLIC_PUSHER_SECRET!,
    useTLS: true
});

export default pusherServer;