export interface IMessage {
  id?: string;
  isBot: boolean;
  message: string;
  timestamp: string;
}

export interface IUser {
  id?: string;
  name: string;
  mobileNumber: string;
  language: string;
}
