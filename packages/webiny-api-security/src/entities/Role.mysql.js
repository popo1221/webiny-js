// @flow
import { MySQLTable } from "webiny-api";

class Role extends MySQLTable {
    constructor() {
        super();
        this.column("createdBy").char(24);
        this.column("name")
            .varChar(50)
            .setNotNull();
        this.column("description")
            .varChar(200)
            .setNotNull();
        this.column("system")
            .tinyInt(1)
            .setDefault(0);
        this.column("slug")
            .varChar(50)
            .setNotNull();
        this.column("scopes").text();
    }
}

Role.setName("Security_Roles");

export default Role;
