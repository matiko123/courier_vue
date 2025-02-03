export const userHasPermission = (permission) => {
  const storedData = sessionStorage.getItem('user-permission');
  if (storedData) {
    try {
      const permissionsData = JSON.parse(storedData);
      if (permissionsData && permissionsData.scopes) {
        for (const scope of permissionsData.scopes) {
          if (scope.permissions && scope.permissions.includes(permission)) {
            return true;
          }
        }
      }
    } catch (error) {
      console.error('Error parsing stored permissions:', error);
      return false;
    }
  }
  return false;
};
