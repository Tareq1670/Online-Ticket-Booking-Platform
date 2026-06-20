import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { cookies } from "next/headers";
import { admin } from "better-auth/plugins";

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

    // ✅ role field টা remove করেছি — admin plugin এটা handle করবে
    user: {
        additionalFields: {
            isFraud: {
                type: "boolean",
                defaultValue: false,
                input: false, // client থেকে set করতে দিবে না
            },
        },
    },

    // ✅ admin plugin এ default role configure করেছি
    plugins: [
        admin({
            defaultRole: "user",
            adminRoles: ["admin"],
        }),
    ],

    // ✅ Cookie থেকে role নিয়ে server side এ set করব (secure way)
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
                    } catch (err) {
                        // fallback to "user"
                    }

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