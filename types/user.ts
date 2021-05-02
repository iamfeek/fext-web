export default interface IUser {
  jwt: string;
  id: number;
  username: string;
  profile: UserProfile;
  recipient?: Recipient;
}

export default interface ICredentialsBasedUser {
  jwt: string;
  user: {
    id: number;
    username: string;
    profile: UserProfile;
    recipient?: Recipient;
  }
}

export interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  StripeCustomerId?: string;
  StripeSetupIntentClientSecretId?: string;
  StripeLast4?: string;
}

export interface Recipient {
  id: number;
  name: string;
}
