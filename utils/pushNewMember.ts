import pusherServer from "./pusherServer";

export default async function pushNewMember(channel: string, event: string, data: any){
    await pusherServer.trigger(channel, event, data);
}