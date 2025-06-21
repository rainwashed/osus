const OSU_CLIENTID: string | undefined = process.env["OSU_CLIENT_ID"];
const OSU_CLIENTSECRET: string | undefined = process.env["OSU_CLIENT_SECRET"];
const OSU_SCOPE_PERMISSIONS = "public identify";
const REDIRECT_URI: string | undefined = process.env["OAUTH_REDIRECTION_LINK"]

if (OSU_CLIENTID === undefined) throw new Error("OSU_CLIENT_ID is not set in .env");
if (OSU_CLIENTSECRET === undefined) throw new Error("OSU_CLIENT_SECRET is not set in .env");
if (REDIRECT_URI === undefined) throw new Error("OAUTH_REDIRECTION_LINK is not set in .env");

export const createOsuAuthorizationLink = () => {
    const _params = new URLSearchParams({
        response_type: "code",
        client_id: OSU_CLIENTID,
        scope: OSU_SCOPE_PERMISSIONS,
        state: Math.floor(Date.now() * Math.random()).toString(),
    });

    return `https://osu.ppy.sh/oauth/authorize?${_params.toString()}&redirect_uri=${REDIRECT_URI}`;
};

type OsuApiToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
};

export const elevateOsuAuthorizationCodeToAccessToken = async (authorizationCode: string) => {
    console.log(authorizationCode);

    try {
        const params = new URLSearchParams();
        params.append("client_id", OSU_CLIENTID);
        params.append("grant_type", "authorization_code");
        params.append("client_secret", OSU_CLIENTSECRET);
        params.append("code", authorizationCode);
        params.append("redirect_uri", REDIRECT_URI);

        const _request: OsuApiToken = await $fetch("https://osu.ppy.sh/oauth/token", {
            method: "POST",
            body: params.toString(),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        console.log(_request);

        return _request;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
