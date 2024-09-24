# Drizzle: A Lightweight ORM for TypeScript and JavaScript
[Chatgpt](https://chatgpt.com/share/6eb7f0d7-111f-4dfc-8a21-79b3f57ffbc4)

Drizzle is a lightweight ORM (Object-Relational Mapping) designed to work seamlessly with modern TypeScript and JavaScript applications. It provides a type-safe way to interact with SQL databases like PostgreSQL, MySQL, and SQLite, making database management more straightforward while leveraging the full power of TypeScript's type system.

## Key Features of Drizzle
- Type Safety: Leverages TypeScript for type safety, reducing runtime errors and making database queries safer.
- Minimalistic: Lightweight and easy to integrate, with no large dependencies or complex setup.
- Flexible: Supports raw SQL queries while also providing high-level abstractions for common operations.
- SQL First: Drizzle encourages the use of SQL, providing a familiar and performant way to work with your database.

## Setting Up Drizzle with Vercel Postgres ⭐⭐

### 1.Install
```
npm i drizzle-orm @vercel/postgres
npm i -D drizzle-kit
```
### 2.Create drizzle.config.js file 
```
const {defineConfig} =require("drizzle-kit")

require('dotenv').config();
module.exports =defineConfig({
    dialect: 'postgresql',   --> tells what type of databased will used
    out:"./migration",       --> Where the migration fille will generate
    schema: "./schema.js",   --> Where the schema fille
    dbCredentials:{
    url:process.env.POSTGRES_URL
   }
  })
```

### 3. Creating Schema/Model
```
const { pgTable, serial, text, varchar, boolean, timestamp } = require("drizzle-orm/pg-core");

const TodoTable=pgTable(<Table_Name>,{
    id:serial("id").primaryKey(),
    title:text("title").notNull(),
    desc:varchar("desc",{length:255}).notNull(),
    isComplete:boolean("isComplete").default(false),
    created_at:timestamp("created_at").defaultNow(),
    updated_at:timestamp("updated_at").$onUpdateFn(()=> new Date())
})

module.exports ={
    TodoTable
}

pgTable: A function used to define a new PostgreSQL table schema.
serial: A function to define an auto-incrementing integer column, typically used for primary keys.
text: A function to define a column with a text data type.
varchar: A function to define a column with a variable character length, with the option to specify a maximum length.
boolean: A function to define a column with a boolean data type (true or false values).
timestamp: A fu
```
### 4.Client Generate and Migrate

```
npx drizzle-kit generate -> used to generate migration files based on changes in your schema definitions.
npx drizzle-kit migrate  -> used to apply the generated migrations to the database, effectively updating the database schema.
```

### 5.Creating db.config.js file
```
const { drizzle } = require("drizzle-orm/vercel-postgres"); // Correct path without '@'
const { sql } = require("@vercel/postgres"); // Correct package name

const db = drizzle(sql);

module.exports = db;

```

### CRUD Operation
```
1. Data Insertion ->
const item=({
        title:"Moring walk",
        desc:"Today i will definitly go for moring walk.This is my duety"
    })
    const todos=await db.insert(TodoTable).values(item).returning()

2. Data Read/GET
  const todos=await db.select({
        title:TodoTable.title,
        desc:TodoTable.desc
    }).from(TodoTable).where(eq(TodoTable.id,1))
    return res.send({
        message:
        todos
    })

```

---

## Relation in Drizzle

### Drizzle ORM Conditional Filters

Here is a list of commonly used conditional filters in Drizzle ORM, often used with `queryBuilder`:

1. **Equality Filter (`eq`)**
   - Checks if a column's value is equal to a specified value.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.title.eq('Example'));
   ```

2. **Not Equal Filter (`neq`)**
   - Checks if a column's value is not equal to a specified value.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.title.neq('Example'));
   ```

3. **Greater Than Filter (`gt`)**
   - Checks if a column's value is greater than a specified value.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.id.gt(10));
   ```

4. **Greater Than or Equal Filter (`gte`)**
   - Checks if a column's value is greater than or equal to a specified value.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.id.gte(10));
   ```

5. **Less Than Filter (`lt`)**
   - Checks if a column's value is less than a specified value.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.id.lt(10));
   ```

6. **Less Than or Equal Filter (`lte`)**
   - Checks if a column's value is less than or equal to a specified value.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.id.lte(10));
   ```

7. **IN Filter (`in`)**
   - Checks if a column's value is within a specified set of values.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.id.in([1, 2, 3]));
   ```

8. **NOT IN Filter (`notIn`)**
   - Checks if a column's value is not within a specified set of values.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.id.notIn([1, 2, 3]));
   ```

9. **LIKE Filter (`like`)**
   - Checks if a column's value matches a specified pattern using SQL's LIKE syntax.
   ```javascript
   db.select().from(TodoTable).where(TodoTable.title.like('%example%'));
   ```

10. **NOT LIKE Filter (`notLike`)**
    - Checks if a column's value does not match a specified pattern.
    ```javascript
    db.select().from(TodoTable).where(TodoTable.title.notLike('%example%'));
    ```

11. **IS NULL Filter (`isNull`)**
    - Checks if a column's value is NULL.
    ```javascript
    db.select().from(TodoTable).where(TodoTable.desc.isNull());
    ```

12. **IS NOT NULL Filter (`isNotNull`)**
    - Checks if a column's value is not NULL.
    ```javascript
    db.select().from(TodoTable).where(TodoTable.desc.isNotNull());
    ```

13. **AND Logical Operator (`and`)**
    - Combines multiple conditions where all conditions must be true.
    ```javascript
    db.select().from(TodoTable).where(
      TodoTable.isComplete.eq(false).and(TodoTable.title.like('%example%'))
    );
    ```

14. **OR Logical Operator (`or`)**
    - Combines multiple conditions where at least one condition must be true.
    ```javascript
    db.select().from(TodoTable).where(
      TodoTable.isComplete.eq(false).or(TodoTable.title.like('%example%'))
    );
    ```

15. **NOT Logical Operator (`not`)**
    - Negates a condition, returning true if the condition is false.
    ```javascript
    db.select().from(TodoTable).where(TodoTable.isComplete.not());
    ```

### Example of Combining Filters

Here’s a more complex example that combines several of these filters in one query:

```javascript
const result = await db.select().from(TodoTable).where(
  TodoTable.isComplete.eq(false)
    .and(TodoTable.title.like('%task%'))
    .or(TodoTable.created_at.gte(new Date('2024-01-01')))
);
```
---