// const { setUserType } = require("./authentication");

class Spatie {
    constructor() {
        this.user = this.setUser();
        this.name = "Spatie";
    }

    /** Set authenticated user */
    setUser(user) {
        const authUser = user || localStorage.getItem('user');
        if (!authUser) {
            throw 'User not found in local storage.';
        }
        return JSON.parse(authUser);
    }

    getUserPermissions() {
        return this.user.permissions;
    }

    getUserRoles() {
        return this.user.roles;
    }

    userHasRole(roleName) {
        const roles = this.getUserRoles();
        return this.findMatchIn(roles, 'name', roleName);
    }

    userCan(permissionName) {
        if (typeof permissionName !== 'string') {
            throw (this.name + ".userHasPermissionTo() expects string but " + typeof permissionName + " given.");
        }
        const permissions = this.getUserPermissions();
        return this.findMatchIn(permissions, 'name', permissionName);
    }

    userHasAnyPermission(permissionArray) {
        const permissions = this.getUserPermissions();
        if (!Array.isArray(permissionArray)) {
            throw (this.name + ".userHasAllPermissions() expects array but " + typeof argPermissions + " given.");
        }
        const results = permissions.filter(item => {
            return item.name == permissionArray.find(foo => foo == item.name);
        });
        return !!results.length;
    }

    userHasAllPermissions(permissionArray) {
        if (!Array.isArray(permissionArray)) {
            throw (this.name + ".userHasAllPermissions() expects array but " + typeof argPermissions + " given.");
        }

        const permissions = [];
        this.getUserPermissions() && this.getUserPermissions().forEach(item => permissions.push(item.name));
        if (permissionArray.length > permissions.length) return false;

        const results = permissions.filter((item, index) => {
            return item == permissionArray[index];
        });
        return results.length == permissionArray.length ? true : false;
    }

    /** 
     * Prev Code Example: 
     * if (roles.length) {
            return roles.find(item => item.name === roleName) ? true : false;
        }
     */
    findMatchIn(hay, prop, stack) {
        if (hay.length) {
            return hay.find(item => item[prop] === stack) ? true : false;
        }
    }

}
export default Spatie;
