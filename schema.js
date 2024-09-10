const { pgTable, serial, text, varchar, boolean, timestamp } = require("drizzle-orm/pg-core");

const TodoTable=pgTable("Todo",{
    title:text("title").notNull(),
    desc:varchar("desc",{length:255}).notNull(),
    isComplete:boolean("isComplete").default(false),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").$onUpdateFn(()=> new Date())
})

module.exports ={
    TodoTable
}