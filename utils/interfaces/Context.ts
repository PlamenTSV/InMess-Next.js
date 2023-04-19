import { ActiveMember } from "./ActiveMember";
import { Channel } from "./Channel";
import { Session } from "./Session";

export interface IContext {
  channels: Channel[],
  setChannels: (channels: Channel[]) => void,
  session: Session | undefined,
  setSession: (session: Session | undefined) => void,
  activeChannel: Channel | undefined,
  setActiveChannel: (channel: Channel | undefined) => void,
  activeMembers: ActiveMember[],
  setActiveMembers: (members: ActiveMember[]) => void
}