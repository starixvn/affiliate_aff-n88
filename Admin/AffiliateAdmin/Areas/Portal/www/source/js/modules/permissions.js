export const permissionResource = {
    AffReport: "[AffReport]",
    TransferPlayerSetting: "[TransferPlayerSetting]",
    TransferPlayerReport: "[TransferPlayerReport]"
}

export const Permission = (() => {
    const { permissions } = window.globalVariables || { permissions: [] };

    const getPermissionInfo = (functionName) => {
        return permissions.find(p => p.FunctionName === functionName);
    }

    return {
        getPermissionInfo,
        hasPermission: (functionName) => !!getPermissionInfo(functionName)
    }
})()