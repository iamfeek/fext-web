import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import IAccount from 'types/account';
import iToken from 'types/token';
import IUser from 'types/user';
import ISession from 'types/session';
import ICredentialsBasedUser from 'types/user';
import { isEmpty } from 'lodash';

const options = {
    providers: [
        Providers.Google({
                             clientId: process.env.GOOGLE_CLIENT_ID,
                             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                         }),
        Providers.Credentials({
                                  async authorize(credentials: any) {
                                      console.log('=== AUTHORIZE ===');

                                      const payload = {
                                          identifier: credentials.email,
                                          password: credentials.password
                                      };

                                      const raw = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                                          method: 'POST',
                                          headers: {
                                              'Content-Type': 'application/json'
                                          },
                                          body: JSON.stringify(payload)
                                      });

                                      // Add logic here to look up the user from the credentials supplied
                                      let data = await raw.json();
                                      if (data.statusCode === 400) {
                                          return null;
                                      } else {
                                          return {
                                              jwt: data.jwt,
                                              ...data.user
                                          };
                                      }
                                  }
                              })

    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        jwt: true,
    },
    debug: true,
    callbacks: {
        session: async (session: ISession, user: iToken) => {
            session.jwt = user.jwt;
            session.id = user.id;
            session.isRecipientManager = user.isRecipientManager;
            if (user.recipientId != null) {
                session.recipientId = user.recipientId;
            }

            return Promise.resolve(session);
        },
        jwt: async (token: iToken, data: IUser | ICredentialsBasedUser, account: IAccount) => {
            const isSignIn = !!data;

            if (isSignIn) {
                if (account.type === 'credentials') {
                    const isRecipientManager = !isEmpty(data.recipient);

                    token.jwt = data.jwt;
                    token.id = data.id;
                    token.name = data.username;
                    token.isRecipientManager = !isEmpty(data.recipient);
                    if (isRecipientManager) {
                        token.recipientId = data.recipient?.id;
                    }
                } else {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
                    );

                    const data = await response.json();

                    token.jwt = data.jwt;
                    token.id = data.user.id;
                }
            }

            return Promise.resolve(token);
        },
    },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options);

export default Auth;
