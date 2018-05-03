import { Entity } from "webiny-api";
import Role from "./role.entity";
import Role2Permission from "./role2Permission.entity";
import nameSlugDesc from "./helpers/nameSlugDesc";

class Permission extends Entity {
    constructor() {
        super();
        nameSlugDesc(this);
        this.attr("scope").object();
        this.attr("roles")
            .entities(Role)
            .setUsing(Role2Permission);

        this.on("beforeDelete", () => {
            if (this.slug === "anonymous") {
                throw Error('"anonymous" permission cannot be deleted.');
            }
        });
    }
}

Permission.classId = "SecurityPermission";
Permission.tableName = "Security_Permissions";

export default Permission;
