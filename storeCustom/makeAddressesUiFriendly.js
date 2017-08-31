import R from "ramda";

export default ({ unGroupedAddresses, type }) => {
    const removeNoMeterTypes = R.reject(x => type === "electricity" && x.meterTypes.length === 0);
    const addDiscrim = R.map(x => R.merge(x, {
        discrim: (type === "electricity" ? x.uniqueIdentifier : x.mprn)
    }));
    const group = R.reduce((memo, obj) => {
        const theList = memo[0];
        const findByLine = R.find(R.propEq("displayLine", obj.line), theList);
        if (findByLine) {
            findByLine.addresses.push(obj);
        } else {
            theList.push({ id: `addGrp-${memo[1]++}`, displayLine: obj.line, addresses: [obj] });
        }
        return memo;
    }, [[], 0]);
    return R.pipe(removeNoMeterTypes, addDiscrim, group, R.nth(0))(unGroupedAddresses);
};
