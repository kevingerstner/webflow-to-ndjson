import Webflow from "webflow-api";

export default function handler(req, res) {
    const webflow = new Webflow();

    const authUrl = webflow.authorizeUrl({ client_id: process.env.WEBFLOW_CLIENT_ID });
    console.log(authUrl);

    return res.status(307).json(authUrl);
}