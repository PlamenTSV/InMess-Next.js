import Pusher from 'pusher-js';

const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUSHER_CLUSTER || 'eu',
    authEndpoint: '/api/pusher/auth'
})

export default pusherClient;