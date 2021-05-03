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
    Staff: {

    }
}