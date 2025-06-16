export const fetchToOsu = async (uri: string, ...params: any[]) => {
    if (!uri.startsWith("https://osu.ppy.sh") || typeof uri !== "string") throw new Error("must be an osu link");

    try {
        let _request = await $fetch(uri, ...params);
        return _request;
    } catch (error) {
        throw error;
    }
}