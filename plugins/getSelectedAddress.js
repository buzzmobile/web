import R from "ramda";

export default ({ addressGroups, selectedAddressGroupId, selectedAddressId, selectedAddress }) => {
    return selectedAddress || addressGroups.find(
            R.propEq("id", selectedAddressGroupId))
        .addresses.find(
            R.propEq("id", selectedAddressId));
};
