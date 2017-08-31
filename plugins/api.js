import axios from "axios";
import R from "ramda";

import getSelectedAddress from "./getSelectedAddress";

const auth = {
    username: "ij34ut983u89uagkknekjnevjrg322jfnknvkjdf", // base64 decoded from pr config
    password: ""
};

async function getQuotes (query) {
    const { type, baseApiUrl, line, meterTypes, currentMonthlyCost, postCode, whitelabel, uniqueIdentifier, mprn } = query;
    const { companyNumber, companyType, contractEndDate, currentSupplier } = query;
    const isElec = type !== "gas";
    const quoteApiFragment = isElec ? "elecquotes" : "gasquotes";
    const getQuotesUrl = `${baseApiUrl}/${quoteApiFragment}`;
    const options = {
        params: {
            addressLine: line,
            consumptionBasis: "monthlySpend",
            currentCostFrequency: "monthly",
            meterTypes,
            currentCost: currentMonthlyCost,
            monthlySpend: currentMonthlyCost,
            postCode,
            whitelabel,
            companyNumber,
            companyType,
            contractEndDate,
            currentSupplier
        }
    };
    if (isElec) {
        options.params.partialMpan = uniqueIdentifier;
    } else {
        options.params.partialMprn = mprn;
    }
    const res = await axios.get(getQuotesUrl, options);
    return res.data;
}

export async function getQuotesServerSide (env, params) {
    const { baseApiUrl } = env;
    const { id } = params;
    const getSwitchRes = await axios.get(`${baseApiUrl}/switches/${id}`);
    const switchData = getSwitchRes.data;
    const { supplyAddress, currentMonthlyCost, supplyPostcode: postCode } = switchData.start;
    const { whitelabel, type } = switchData;
    const { line, meterTypes, uniqueIdentifier, mprn } = supplyAddress;
    const { currentSupplier, estimateRenewalDate, renewalDate, business } = switchData.details || {};
    const contractEndDate = estimateRenewalDate ? null : renewalDate;
    const { type: companyType, autocomplete } = business || {};
    const { companyNumber } = autocomplete || {};
    const query = { type, baseApiUrl, line, meterTypes, currentMonthlyCost, postCode, whitelabel, uniqueIdentifier, mprn, companyNumber, companyType, contractEndDate, currentSupplier };
    const quoteMetaAndData = await getQuotes(query);
    return { switchData, quoteMetaAndData };
};

export async function getQuotesClientSide (state) {
    const { env, whitelabel, type, postCode, currentMonthlyCost, companyPick, businessType, estimateRenewalDate, renewalDate, currentSupplier } = state;
    const { baseApiUrl } = env;
    const { companyNumber } = companyPick || {};
    const { type: companyType } = businessType || {};
    const { line, meterTypes, uniqueIdentifier, mprn } = getSelectedAddress(state);
    const contractEndDate = estimateRenewalDate ? null : renewalDate;
    const query = { type, baseApiUrl, line, meterTypes, currentMonthlyCost, postCode, whitelabel, uniqueIdentifier, mprn, companyNumber, companyType, contractEndDate, currentSupplier };
    return getQuotes(query);
};

async function getCurrentSupplierPickList ({ baseApiUrl, whitelabel }) {
    const currentSupplierPickListRes = await axios.get(`${baseApiUrl}/suppliers?whitelabel=${whitelabel}`);
    const currentSupplierPickList = currentSupplierPickListRes.data;
    return currentSupplierPickList;
}

export async function getDetailsServerSide (env, params) {
    const { baseApiUrl } = env;
    const { id } = params;
    const getSwitchRes = await axios.get(`${baseApiUrl}/switches/${id}`);
    const switchData = getSwitchRes.data;
    const { whitelabel } = switchData;
    const companyType = R.pathOr(null, "details.business.type".split("."), switchData);
    const businessName = R.pathOr(null, "details.business.name".split("."), switchData);
    let searchForCompanyPromise = Promise.resolve(null);
    if (companyType && businessName) {
        const businessType = { type: companyType };
        searchForCompanyPromise = searchForCompany({ businessName, businessType, env });
    }
    const getCurrentSupplierPickListPromise = getCurrentSupplierPickList({ baseApiUrl, whitelabel });
    const [currentSupplierPickList, companyPickList] = await Promise.all([
        getCurrentSupplierPickListPromise,
        searchForCompanyPromise]);
    return { switchData, currentSupplierPickList, companyPickList };
};

export async function getSummaryServerSide (env, params) {
    const { baseApiUrl } = env;
    const { id } = params;
    const res = await axios.get(`${baseApiUrl}/switches/${id}`);
    const switchData = res.data;
    return switchData;
};

export async function getDetailsClientSide (state) {
    const { env } = state;
    const whitelabel = state.whitelabel;
    const { baseApiUrl } = env;
    return getCurrentSupplierPickList({ baseApiUrl, whitelabel });
};

export async function getAddressesPickList (state) {
    const { env, type, postCode } = state;
    const { baseApiUrl } = env;
    const options = {
        params: {
            elec: type === "electricity",
            postCode
        }
    };
    const res = await axios.get(`${baseApiUrl}/addresses`, options);
    return res.data.data;
};

export async function createSwitch (state) {
    const { env, type, currentMonthlyCost, postCode: supplyPostcode } = state;
    const { baseApiUrl } = env;
    const supplyAddress = getSelectedAddress(state);
    const body = {
        _id: null,
        type,
        whitelabel: "energyscanner",
        start: {
            _id: null,
            currentMonthlyCost,
            supplyPostcode,
            supplyAddress
        }
    };
    const res = await axios.post(`${baseApiUrl}/switches`, body);
    return res.data;
};

export async function upsertStart (switchId, state) {
    const { env, currentMonthlyCost, postCode: supplyPostcode } = state;
    const { baseApiUrl } = env;
    const supplyAddress = getSelectedAddress(state);
    const body = {
        _id: null,
        currentMonthlyCost,
        supplyPostcode,
        supplyAddress
    };
    await axios.put(`${baseApiUrl}/switches/${switchId}/start`, body);
};

export async function upsertUsage (switchId, state) {
    const { env, quotesMeta, usageId: _id } = state;
    const { baseApiUrl } = env;
    const {
        currentCost: currentMonthlyCost,
        dayConsumption,
        nightConsumption = null,
        weekendConsumption = null
    } = quotesMeta;
    const body = {
        _id,
        currentMonthlyCost,
        dayConsumption,
        email: null,
        estimateConsumption: true,
        nightConsumption,
        paymentType: "monthlyDirectDebit",
        term: null,
        weekendConsumption
    };
    const res = await axios.put(`${baseApiUrl}/switches/${switchId}/usage`, body);
    return res.data;
};

export async function upsertQuote (switchId, state, quote) {
    const { env, pricesId: _id } = state;
    const { baseApiUrl } = env;
    const body = {
        _id,
        quote
    };
    const res = await axios.put(`${baseApiUrl}/switches/${switchId}/prices`, body);
    return res.data;
};

export async function upsertReview (switchId, state, review) {
    const { env, reviewId: _id } = state;
    const { baseApiUrl } = env;
    const body = {
        _id,
        quote: review
    };
    const res = await axios.put(`${baseApiUrl}/switches/${switchId}/review`, body);
    return res.data;
};

export async function searchForCompany (state) {
    const { businessName: query, businessType, env } = state;
    const { baseApiUrl } = env;
    const { type: companyType } = businessType;
    const options = {
        params: {
            companyType,
            query
        },
        auth
    };
    const res = await axios.get(`${baseApiUrl}/company`, options);
    return res.data.data;
}

export async function upsertDetails (switchId, state) {
    const { env, detailsId: _id, currentSupplier } = state;
    const { email, estimateRenewalDate, firstName, lastName } = state;
    const { position, renewalDate, telephone } = state;
    const { companyPick: autocomplete, businessType, businessName: name } = state;
    const { type } = businessType;
    const { baseApiUrl } = env;
    const body = {
        _id,
        currentSupplier,
        email,
        estimateRenewalDate,
        firstName,
        lastName,
        position,
        renewalDate,
        telephone,
        business: {
            type,
            name,
            autocomplete
        }
    };
    const res = await axios.put(`${baseApiUrl}/switches/${switchId}/details`, body);
    return res.data;
};

async function getNonce (state) {
    const { env, email } = state;
    const { baseApiUrl } = env;
    const options = {
        validateStatus (status) {
            return status === 200 || status === 404;
        }
    };
    return await axios.get(`${baseApiUrl}/user/${email}/nonce`, options);
};

export async function ensureNonce (state) {
    const { env, email, firstName, lastName } = state;
    const { baseApiUrl } = env;
    let nonceResp = await getNonce(state);
    const userNeedsToBeRegistered = nonceResp.status === 404 && nonceResp.data.errors.email;
    if (userNeedsToBeRegistered) {
        const body = {
            email,
            firstName,
            lastName
        };
        await axios.post(`${baseApiUrl}/register`, body);
        nonceResp = await getNonce(state);
    }
    return nonceResp.data;
};

export async function associateSwitchAndUser (state, nonce) {
    const { env, switchId } = state;
    const { baseApiUrl } = env;
    const body = {
        nonce
    };
    const res = await axios.put(`${baseApiUrl}/switches/${switchId}/user`, body);
    return res.data;
};

export async function getCreditReportFrag (state) {
    const { env, businessType, companyPick } = state;
    const { baseApiUrl } = env;
    const { type: companyType } = businessType;
    const { companyNumber } = companyPick;
    const options = {
        params: {
            companyType,
            companyNumber
        },
        auth
    };
    const res = await axios.get(`${baseApiUrl}/creditreport`, options);
    return res.data;
};

export async function upsertCreditCheck (switchId, state, { creditReport }) {
    const { env, creditCheckAccepted: termsAccepted, creditCheckId } = state;
    const { baseApiUrl } = env;
    const body = {
        _id: creditCheckId,
        termsAccepted,
        creditReport
    };
    const res = await axios.put(`${baseApiUrl}/switches/${switchId}/creditcheck`, body);
    return res.data;
};

export async function upsertSummary (switchId, state) {
    const { env, summaryId: _id, tncAccepted: termsAccepted } = state;
    const { accountHolder1: accountHolder1Name, accountHolder2: accountHolder2Name, accountNumber, bank } = state;
    const accountSortCode = getSortCodeToSend(state);
    const switchConfirmed = true;
    const { baseApiUrl } = env;
    const body = {
        _id,
        accountHolder1Name,
        accountHolder2Name,
        accountNumber,
        accountSortCode,
        bank,
        termsAccepted,
        switchConfirmed
    };
    const res = await axios.put(`${baseApiUrl}/switches/${switchId}/summary`, body);
    return res.data;
};

const getSortCodeToSend = state => {
    const { sortCode } = state;
    const sortCodePart1 = sortCode.substring(0, 2);
    const sortCodePart2 = sortCode.substring(2, 4);
    const sortCodePart3 = sortCode.substring(4, 6);
    return `${sortCodePart1}-${sortCodePart2}-${sortCodePart3}`;
};

export async function getBank (state) {
    const { env } = state;
    const sortCodeSend = getSortCodeToSend(state);
    const options = {
        auth
    };
    const { baseApiUrl } = env;
    const res = await axios.get(`${baseApiUrl}/bank/${sortCodeSend}`, options);
    return res.data;
};

export async function getSignatureUrl (state) {
    const { env } = state;
    const options = {};
    const { baseApiUrl } = env;
    const res = await axios.get(`${baseApiUrl}/hs/create`, options);
    return res.data;
};
