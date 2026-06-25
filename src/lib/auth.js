import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.TICKETIX_URI);
const db = client.db("Ticketix");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),

    user: {
        additionalFields: {
            isFraud: {
                type: "boolean",
                defaultValue: false,
                input: false,
            },
        },
    },

    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 60 * 24 * 30,
        },
    },

    plugins: [
        admin({
            defaultRole: "user",
            adminRoles: ["admin"],
        }),
        jwt(),
    ],

    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    let role = "user";

                    try {
                        const cookieStore = await cookies();
                        const pendingRole =
                            cookieStore.get("pending_role")?.value;

                        if (
                            pendingRole &&
                            ["user", "vendor"].includes(pendingRole)
                        ) {
                            role = pendingRole;
                        }
                    } catch (err) {}

                    return {
                        data: {
                            ...user,
                            role,
                        },
                    };
                },
            },
        },
    },
});
