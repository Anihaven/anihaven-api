module.exports = {
    Query: {
        staff(content, args, context) {
            return ([{
                position: ["CREATOR"],
                staff: {
                    id: 1,
                    name: "Hero"
                }
            }])
        }
    },
    StaffPosition: {
        // staff(staffposition, args, context) {
        //     return context.dataSources.contentAPI.getStaffFromStaffPosition(staffposition)
        // }
    },
    Staff: {

    }
}