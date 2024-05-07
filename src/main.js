import { UserManager } from 'oidc-client-ts';

const domain = window.location.origin;

var userManager = new UserManager({
    authority: "https://identity-staging.inflosoftware.com",
    client_id: "27ef75ca-914d-4f86-b49c-deab3352b07b",
    redirect_uri: domain + "/RedirectTest.html",
    response_type: "code",
    scope: "openid profile email inflo_apiserver ApiPublic AccountingDataExport",
    loadUserInfo: true,
    monitorAnonymousSession: true,
    revokeAccessTokenOnSignout: true,
});

export async function startSignIn() {
    try {
        await userManager.signinRedirect();
    }
    catch (err) {
        console.error(err);
    }
}

export async function completeSignIn() {
    try {
        return await userManager.signinCallback();
    } 
    catch (err) {
        console.error(err);
    }
}

export async function sendApiRequest(token) {
     const response = await fetch("https://staging.inflosoftware.com/api/v1/engagements", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.json();
}